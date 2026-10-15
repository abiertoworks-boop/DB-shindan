/* 診断ロジック（UI非依存）。データは DBT.* から読むだけ。 */
(function (g) {
  var D = (g.DBT = g.DBT || {});

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* 各パラメータが取りうる最大値（正規化用）。質問データから自動計算 */
  function maxPossible(side) {
    var totals = {};
    D.questions.forEach(function (q) {
      var best = {};
      q.options.forEach(function (o) {
        var s = o[side] || {};
        Object.keys(s).forEach(function (k) { best[k] = Math.max(best[k] || 0, s[k]); });
      });
      Object.keys(best).forEach(function (k) { totals[k] = (totals[k] || 0) + best[k]; });
    });
    return totals;
  }

  /* answers: 質問ごとの選択肢インデックス配列 */
  function tally(answers, side) {
    var t = {};
    answers.forEach(function (ai, qi) {
      var opt = D.questions[qi] && D.questions[qi].options[ai];
      var s = (opt && opt[side]) || {};
      Object.keys(s).forEach(function (k) { t[k] = (t[k] || 0) + s[k]; });
    });
    return t;
  }

  /* キャラ別スコア(0-1)。プロファイル重みと正規化済みパラメータの加重平均 */
  function rank(chars, totals, maxes) {
    return chars
      .map(function (c, i) {
        var wsum = 0, acc = 0;
        Object.keys(c.profile).forEach(function (k) {
          var w = c.profile[k];
          var n = maxes[k] ? (totals[k] || 0) / maxes[k] : 0;
          acc += w * n; wsum += w;
        });
        return { id: c.id, score: wsum ? acc / wsum : 0, order: i };
      })
      .sort(function (a, b) { return b.score - a.score || a.order - b.order; });
  }

  function axesDistance(a, b) {
    return Math.abs(a.open - b.open) + Math.abs(a.heart - b.heart) + Math.abs(a.power - b.power);
  }

  function starsFor(mainId, subId) {
    var combo = D.combos[mainId + "-" + subId];
    if (combo && combo.stars) return combo.stars;
    var m = byId(D.mainChars, mainId), s = byId(D.subChars, subId);
    var d = axesDistance(m.axes, s.axes);
    var th = D.config.rarity.thresholds;
    for (var i = 0; i < th.length; i++) if (d >= th[i].min) return th[i].stars;
    return 2;
  }

  /* 表×裏から表示用の結果を組み立てる（個別文章があれば優先、無ければ合成） */
  function buildResult(mainId, subId, variant) {
    var m = byId(D.mainChars, mainId), s = byId(D.subChars, subId);
    if (!m || !s) return null;
    var c = D.combos[mainId + "-" + subId];
    if (c && variant > 0 && c.variants && c.variants[variant - 1]) c = Object.assign({}, c, c.variants[variant - 1]);
    var stars = c && c.stars ? c.stars : starsFor(mainId, subId);
    return {
      main: m, sub: s, stars: stars,
      rarityLabel: D.config.rarity.labels[stars],
      gapLine: D.config.rarity.gapLines[stars],
      curated: !!c,
      variant: variant || 0,
      image: c ? c.image || "" : "",
      typeName: c ? c.name : m.lead + s.noun,
      move: c ? c.move : m.moveA + "ようで、" + s.moveB,
      summary: c ? c.summary : "表では、" + m.surface + "。でも裏では、" + s.inner + "。",
      strength: c ? c.strength : m.strength + "、" + s.strength + "。",
      caution: c ? c.caution : m.caution + "。また、" + s.caution + "。"
    };
  }

  function pairScore(m, s, sel) {
    var stars = starsFor(m.id, s.id);
    return m.score + s.score + sel.gapBonus * (stars - 2)
      + (D.combos[m.id + "-" + s.id] ? sel.curatedBonus : 0)
      - (m.id === s.id ? sel.samePenalty : 0);
  }

  function search(mainRank, subRank, mainN, subN, mainDrop, subDrop, needImage) {
    var sel = D.config.selection, mTop = mainRank[0].score, sTop = subRank[0].score, best = null;
    mainRank.slice(0, mainN).forEach(function (m) {
      if (mTop - m.score > mainDrop) return;
      subRank.slice(0, subN).forEach(function (s) {
        if (sTop - s.score > subDrop) return;
        var c = D.combos[m.id + "-" + s.id];
        if (needImage && !(c && c.image)) return;
        var total = pairScore(m, s, sel);
        if (!best || total > best.total) best = { main: m.id, sub: s.id, total: total };
      });
    });
    return best;
  }

  /* 表候補×裏候補から、回答との整合とギャップの面白さで最良の組を選ぶ。
     requireImage=true のときは、結果カード画像のある組み合わせを優先して探し、
     段階的に候補を広げる（見つからなければ画像なしの組にフォールバック） */
  function pickPair(mainRank, subRank) {
    var sel = D.config.selection;
    if (sel.requireImage) {
      for (var i = 0; i < sel.imageTiers.length; i++) {
        var t = sel.imageTiers[i];
        var hit = search(mainRank, subRank, t.main, t.sub, t.mainDrop, t.subDrop, true);
        if (hit) return hit;
      }
      return search(mainRank, subRank, 10, 20, 1, 1, true); // 画像付きカードのみ出す（画像なしの組は選ばない）
    }
    return search(mainRank, subRank, sel.mainCandidates, sel.subCandidates, sel.maxMainDrop, sel.maxSubDrop, false);
  }

  function diagnose(answers) {
    var mainRank = rank(D.mainChars, tally(answers, "main"), maxPossible("main"));
    var subRank = rank(D.subChars, tally(answers, "sub"), maxPossible("sub"));
    var pair = pickPair(mainRank, subRank);
    var cb = D.combos[pair.main + "-" + pair.sub];
    var vn = cb && cb.variants ? cb.variants.length + 1 : 1;
    var result = buildResult(pair.main, pair.sub, Math.floor(Math.random() * vn));
    result.mainRank = mainRank; result.subRank = subRank;
    return result;
  }

  D.engine = {
    byId: byId, maxPossible: maxPossible, tally: tally, rank: rank,
    starsFor: starsFor, buildResult: buildResult, pickPair: pickPair, diagnose: diagnose
  };
})(typeof window !== "undefined" ? window : globalThis);
