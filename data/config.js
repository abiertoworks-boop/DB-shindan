/* 診断全体の設定。判定の調整はここと data/*.js だけで完結する */
(function (g) {
  var D = (g.DBT = g.DBT || {});

  D.config = {
    title: "DRAGON BALL BUSINESS TYPE",
    subtitle: "あなたの表と裏がわかる交流スタイル診断",
    hashtags: ["表と裏診断", "交流会"],
    shareCopy: "あなたの表と裏は？",

    /* 表×裏の組み合わせを決める際の調整値 */
    selection: {
      mainCandidates: 3,   // 表スコア上位から何人を候補にするか
      subCandidates: 4,    // 裏スコア上位から何人を候補にするか
      maxMainDrop: 0.12,   // 1位との差がこれ以内の候補だけ採用（回答との乖離を防ぐ）
      maxSubDrop: 0.15,
      gapBonus: 0.04,      // 星が1つ増えるごとの加点（ギャップのある組み合わせを優遇）
      curatedBonus: 0.02,  // 文章を個別に作り込んだ組み合わせへの加点
      samePenalty: 0.5,    // 表と裏が同一キャラの場合の減点（実質回避）
      requireImage: true,  // true＝結果カード画像のある29枚（28組＋サタン×フリーザ別版）のみ出す。false＝全200組から選ぶ
      imageTiers: [        // 画像付きの組が見つかるまで候補を段階的に広げる
        { main: 3, sub: 4, mainDrop: 0.12, subDrop: 0.15 },
        { main: 4, sub: 8, mainDrop: 0.2, subDrop: 0.3 },
        { main: 10, sub: 20, mainDrop: 1, subDrop: 1 }
      ]
    },

    /* レア度：表キャラと裏キャラの axes（open/heart/power）の距離で自動算出。
       data/combos.js に stars があればそちらを優先 */
    rarity: {
      thresholds: [        // 距離 >= min で stars
        { min: 8, stars: 5 },
        { min: 6, stars: 4 },
        { min: 4, stars: 3 },
        { min: 0, stars: 2 }
      ],
      labels: {
        2: "表と裏が近い",
        3: "少し意外",
        4: "かなりギャップがある",
        5: "非常に意外で特徴的"
      },
      gapLines: {
        2: "表と裏が近い、ブレの少ない交流スタイル。信頼されやすい一貫性があります。",
        3: "表と裏に少しだけ意外な差があります。そこが親しみやすさになっています。",
        4: "表と裏にはっきりしたギャップ。知れば知るほど面白いと言われるタイプです。",
        5: "表と裏の落差が大きい、珍しい組み合わせ。ギャップそのものがあなたの武器です。"
      }
    },

    /* 日本語UI文言 */
    ui: {
      startLead: "あなたの表と裏、見てみる？",
      startBadge: "10問で診断",
      startButton: "START",
      phaseMain: "表の顔",
      phaseSub: "裏の顔",
      loading: "表と裏をスキャン中…",
      disclaimer:
        "非公式のファン診断です。結果は人格を断定するものではなく、あなたの交流スタイルの「傾向」を楽しむためのものです。"
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
