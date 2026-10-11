/* UI：画面遷移・質問表示・結果描画。判定は DBT.engine、文言/データは DBT.* に委譲 */
(function () {
  var D = window.DBT, C = D.config, E = D.engine, S = D.share;
  var $ = function (id) { return document.getElementById(id); };
  var LETTERS = ["A", "B", "C", "D", "E"];
  var state = { idx: 0, answers: [], busy: false, result: null, fromLink: false };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function show(id) {
    document.querySelectorAll(".screen").forEach(function (s) { s.classList.toggle("active", s.id === id); });
    window.scrollTo(0, 0);
  }
  function toast(msg) {
    var t = $("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  var KEY = "dbt:last";
  function saveLast(res) { try { localStorage.setItem(KEY, res.main.id + "." + res.sub.id + "." + (res.variant || 0)); } catch (e) {} }
  function loadLast() {
    try {
      var m = /^([a-z0-9]+)\.([a-z0-9]+)\.(\d+)$/.exec(localStorage.getItem(KEY) || "");
      return m ? E.buildResult(m[1], m[2], +m[3]) : null;
    } catch (e) { return null; }
  }

  /* ---------- start ---------- */
  function initStart() {
    $("start-lead").textContent = C.ui.startLead;
    $("start-sub").textContent = C.subtitle;
    $("start-badge").textContent = C.ui.startBadge;
    $("btn-start-label").textContent = C.ui.startButton;
    $("start-fine").textContent = C.ui.disclaimer;
    $("btn-start").addEventListener("click", startQuiz);
    var last = loadLast();
    if (last) {
      $("btn-last").hidden = false;
      $("btn-last").addEventListener("click", function () {
        state.fromLink = false; state.result = last;
        history.replaceState(null, "", location.pathname + location.search + "#r=" + S.url(last).split("#r=")[1]);
        renderResult(last); show("screen-result");
      });
    }
  }

  /* ---------- quiz ---------- */
  function startQuiz() {
    state.idx = 0; state.answers = []; state.busy = false; state.result = null;
    history.replaceState(null, "", location.pathname + location.search);
    renderQuestion(); show("screen-quiz");
  }

  function renderProgress() {
    var p = $("q-progress"), html = "";
    D.questions.forEach(function (q, i) {
      var cls = i < state.idx ? "done" + (q.phase === "sub" ? " sub" : "") : i === state.idx ? "now" : "";
      html += '<i class="' + cls + '"></i>';
    });
    p.innerHTML = html; p.setAttribute("aria-valuenow", state.idx);
  }

  function renderQuestion() {
    var q = D.questions[state.idx], isSub = q.phase === "sub";
    var ph = $("q-phase");
    ph.textContent = isSub ? C.ui.phaseSub : C.ui.phaseMain;
    ph.className = "phase " + q.phase;
    $("q-count").textContent = "Q" + (state.idx + 1) + " / " + D.questions.length;
    $("btn-back").hidden = state.idx === 0;
    renderProgress();
    var body = $("q-body");
    body.className = "q-body" + (isSub ? " sub-mode" : "");
    body.innerHTML = '<p class="q-num">QUESTION ' + String(state.idx + 1).padStart(2, "0") + '</p>' +
      '<h2 class="q-text">' + esc(q.text) + '</h2><div class="options">' +
      q.options.map(function (o, i) {
        return '<button type="button" class="opt" data-i="' + i + '"><span class="letter">' + LETTERS[i] + '</span><span>' + esc(o.label) + '</span></button>';
      }).join("") + "</div>";
    void body.offsetWidth; body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    window.scrollTo(0, 0);
  }

  function onPick(e) {
    var btn = e.target.closest(".opt");
    if (!btn || state.busy) return;
    state.busy = true;
    var i = +btn.dataset.i;
    btn.classList.add("picked");
    document.querySelectorAll("#q-body .opt").forEach(function (b) { b.disabled = true; });
    state.answers[state.idx] = i;
    setTimeout(function () {
      state.busy = false;
      if (state.idx + 1 < D.questions.length) { state.idx++; renderQuestion(); } else finish();
    }, 260);
  }

  function goBack() {
    if (state.busy || state.idx === 0) return;
    state.idx--; state.answers.length = state.idx; renderQuestion();
  }

  /* ---------- loading → result ---------- */
  function finish() {
    var res = E.diagnose(state.answers);
    state.result = res; state.fromLink = false;
    var msgs = ["表の顔を分析中…", C.ui.loading, "表と裏のギャップを計算中…"], k = 0;
    $("loading-text").textContent = msgs[0];
    show("screen-loading");
    var iv = setInterval(function () { k = Math.min(k + 1, msgs.length - 1); $("loading-text").textContent = msgs[k]; }, 650);
    setTimeout(function () {
      clearInterval(iv);
      saveLast(res);
      history.replaceState(null, "", location.pathname + location.search + "#r=" + res.main.id + "." + res.sub.id + (res.variant ? "." + res.variant : ""));
      renderResult(res); show("screen-result");
    }, 2000);
  }

  function emblem(ch) {
    var inner = ch.image ? '<img src="' + esc(ch.image) + '" alt="">' : esc(ch.glyph);
    return '<div class="emblem' + (ch.glyph.length > 1 ? " long" : "") + '" style="--c:' + ch.color + '" aria-hidden="true">' + inner + "</div>";
  }

  function starsHTML(n) {
    var h = "";
    for (var i = 0; i < 5; i++) h += i < n ? "★" : '<span class="off">★</span>';
    return h;
  }

  function renderResult(res) {
    var m = res.main, s = res.sub, i = 0;
    var rv = function () { return 'class="rv" style="--i:' + (i++) + '"'; };
    var html =
      '<div class="res-wrap"><article class="card" id="card" style="--mc:' + m.color + ';--sc:' + s.color + '">' +
      (res.image ? '<figure class="hero rv" style="--i:' + (i++) + '"><img src="' + esc(res.image) + '" alt="' + esc(m.name + ' × ' + s.name + '｜' + res.typeName) + '"></figure>' : '<div class="rv card-head" style="--i:' + (i++) + '"><p class="t1">DRAGON BALL BUSINESS TYPE</p><p class="t2">あなたの表と裏</p></div>' +
      '<div class="duo">' +
        '<div class="side front rv" style="--i:' + (i++) + '"><p class="tag">表の顔</p>' + emblem(m) +
          '<p class="name">' + esc(m.name) + '</p><p class="meta"><b>' + esc(m.type) + '</b><br>' + esc(m.tagline) + '</p></div>' +
        '<div class="side back rv" style="--i:' + (i++) + '"><p class="tag">でも、あなたの裏には……</p>' + emblem(s) +
          '<p class="name">' + esc(s.name) + '</p><p class="hid">' + esc(s.hidden) + '</p></div>' +
      '</div>' +
      '<p class="cross rv" style="--i:' + (i++) + '"><b>' + esc(m.name) + '</b> × <b>' + esc(s.name) + '</b></p>' +
      '<h2 class="type rv" style="--i:' + (i++) + '">' + esc(res.typeName) + '</h2>' +
      '<div class="rv" style="--i:' + (i++) + '"><p class="stars" aria-label="レア度 ' + res.stars + '">' + starsHTML(res.stars) + '</p><p class="rare">' + esc(res.rarityLabel) + '</p></div>') +
      '<p class="summary rv" style="--i:' + (i++) + '">' + esc(res.summary) + '</p>' +
      '<p class="gap rv" style="--i:' + (i++) + '">' + esc(res.gapLine) + '</p>' +
      (res.image ? '' : '<div class="move rv" style="--i:' + (i++) + '"><small>交流会での必殺技</small><p>「' + esc(res.move) + '」</p></div>') +
      '<div class="boxes">' +
        '<div class="box rv" style="--i:' + (i++) + '"><h3>💪 あなたの強み</h3><p>' + esc(res.strength) + '</p></div>' +
        '<div class="box caution rv" style="--i:' + (i++) + '"><h3>⚠ あなたの注意点</h3><p>' + esc(res.caution) + '</p></div>' +
      '</div>' +
      '<p class="card-foot rv" style="--i:' + (i++) + '">' + esc(C.ui.disclaimer) + '</p>' +
      '</article>' +
      '<section class="share rv" style="--i:' + (i++) + '">' +
        '<p class="ask">' + esc(C.shareCopy) + '</p><p class="ask-sub">結果を見せ合って、隣の人の裏キャラも聞いてみよう</p>' +
        '<div class="btn-row"><button class="btn" id="btn-save" type="button">🖼 画像を保存</button>' +
        '<button class="btn" id="btn-copy" type="button">🔗 リンクをコピー</button></div>' +
        '<button class="btn primary" id="btn-retry" type="button">' + (state.fromLink ? "自分も診断する" : "もう一度診断") + '</button>' +
        '<div class="preview" id="preview" hidden></div>' +
      '</section></div>';
    $("result").innerHTML = html;
    $("btn-save").addEventListener("click", function () { doSave(res); });
    $("btn-copy").addEventListener("click", function () { doCopy(res); });
    $("btn-retry").addEventListener("click", startQuiz);
  }

  /* ---------- share actions ---------- */
  function showPreview(blob) {
    var p = $("preview"), u = URL.createObjectURL(blob);
    p.hidden = false;
    p.innerHTML = '<img alt="あなたの結果カード" src="' + u + '"><p>画像を長押し（PCは右クリック）で保存できます</p>';
    p.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function doSave(res) {
    S.toBlob(res).then(function (blob) {
      var a = document.createElement("a"), u = URL.createObjectURL(blob);
      a.href = u; a.download = "dragonball-business-type-" + res.main.id + "-" + res.sub.id + (blob.type === "image/webp" ? ".webp" : ".png");
      document.body.appendChild(a); a.click(); a.remove();
      showPreview(blob); toast("画像を保存しました");
    }).catch(function () { toast("画像の作成に失敗しました"); });
  }
  function doCopy(res) {
    var text = S.text(res) + "\n" + S.url(res);
    var done = function () { toast("コピーしました"); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(t) {
    var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove();
  }

  /* ---------- background stars ---------- */
  function initStars() {
    var cv = $("stars"), ctx = cv.getContext("2d"), dots = [], raf;
    function size() {
      cv.width = innerWidth; cv.height = innerHeight;
      dots = Array.from({ length: Math.round(innerWidth * innerHeight / 9000) }, function () {
        return { x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.6 + .3, p: Math.random() * 6.3, s: Math.random() * .02 + .005 };
      });
    }
    function tick(t) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      dots.forEach(function (d) {
        ctx.fillStyle = "rgba(255,255,255," + (.25 + .5 * Math.abs(Math.sin(d.p + t * d.s * .06))) + ")";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.3); ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }
    size(); addEventListener("resize", size);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(tick); else tick(0), cancelAnimationFrame(raf);
  }

  /* ---------- boot ---------- */
  function boot() {
    initStart(); initStars();
    $("q-body").addEventListener("click", onPick);
    $("btn-back").addEventListener("click", goBack);
    var m = /#r=([a-z0-9]+)\.([a-z0-9]+)(?:\.(\d+))?/.exec(location.hash);
    if (m) {
      var res = E.buildResult(m[1], m[2], +m[3] || 0);
      if (res) { state.fromLink = true; renderResult(res); show("screen-result"); return; }
    }
  }
  boot();
})();
