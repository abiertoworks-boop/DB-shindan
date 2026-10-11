/* 質問と選択肢ごとの内部スコア。
   main = 表スコア(ACTION/LEAD/EMPATHY/OBSERVE/CONNECT/IDEA/FUTURE/INDEPENDENCE/STRATEGY/ENTERTAIN)
   sub  = 裏スコア(COMPETITION/RECOGNITION/CURIOSITY/FRIENDSHIP/FREEDOM/CARE/PERFECTION/SECURITY/SELFEXPRESSION/STRATEGIC)
   Q1-5は主に表、Q6-10は主に裏。ごく軽い相互シグナルのみ例外的に混ぜている。 */
(function (g) {
  var D = (g.DBT = g.DBT || {});

  D.paramLabels = {
    main: {
      ACTION: "行動力", LEAD: "主導力", EMPATHY: "共感力", OBSERVE: "観察力", CONNECT: "親和力",
      IDEA: "発想力", FUTURE: "未来志向", INDEPENDENCE: "自立性", STRATEGY: "戦略性", ENTERTAIN: "演出力"
    },
    sub: {
      COMPETITION: "競争心", RECOGNITION: "承認欲求", CURIOSITY: "好奇心", FRIENDSHIP: "仲間意識",
      FREEDOM: "自由欲求", CARE: "世話焼き", PERFECTION: "完璧主義", SECURITY: "安心欲求",
      SELFEXPRESSION: "自己表現", STRATEGIC: "戦略性"
    }
  };

  D.questions = [
    {
      id: "Q1", phase: "main",
      text: "初めて参加したビジネス交流会。あなたなら最初にどうする？",
      options: [
        { label: "気になった人に自分からどんどん話しかける", main: { ACTION: 3, CONNECT: 1, LEAD: 1 } },
        { label: "まず全体を見て、話しやすそうな人を探す", main: { OBSERVE: 3, STRATEGY: 1, EMPATHY: 1 } },
        { label: "近くの人と自然に話し始める", main: { CONNECT: 3, EMPATHY: 1 } },
        { label: "誰かが話しかけてくれるのを待ちながら様子を見る", main: { OBSERVE: 2, INDEPENDENCE: 2 } },
        { label: "面白そうな人・影響力がありそうな人を探す", main: { STRATEGY: 3, OBSERVE: 1, LEAD: 1, FUTURE: 1 }, sub: { STRATEGIC: 1 } }
      ]
    },
    {
      id: "Q2", phase: "main",
      text: "初対面の相手から「何をしている人ですか？」と聞かれたら？",
      options: [
        { label: "自分の仕事を熱く語る", main: { LEAD: 2, ENTERTAIN: 1, IDEA: 2, ACTION: 1 } },
        { label: "相手にも質問しながら話す", main: { CONNECT: 2, EMPATHY: 1 } },
        { label: "簡潔に答えて、相手の話を聞く", main: { OBSERVE: 2, INDEPENDENCE: 1 } },
        { label: "相手が分かりやすいように説明する", main: { EMPATHY: 3, CONNECT: 1 } },
        { label: "相手に合わせて話し方を変える", main: { STRATEGY: 2, ENTERTAIN: 1, OBSERVE: 1, FUTURE: 1 } }
      ]
    },
    {
      id: "Q3", phase: "main",
      text: "気になる人を見つけた。でも、その人はすでに他の人と盛り上がっている。あなたなら？",
      options: [
        { label: "「まあいいや」と別の人を探す", main: { INDEPENDENCE: 2, ACTION: 1 }, sub: { FREEDOM: 1 } },
        { label: "タイミングを見て自然に入る", main: { OBSERVE: 2, EMPATHY: 1, CONNECT: 1 } },
        { label: "その場にいる人ごと巻き込んで話す", main: { CONNECT: 2, ENTERTAIN: 2, IDEA: 2, ACTION: 1 } },
        { label: "後で話せるように覚えておく", main: { STRATEGY: 2, FUTURE: 2, OBSERVE: 1 } },
        { label: "「この人と話したい」と思ったら多少強引でも入る", main: { LEAD: 3, ACTION: 2 }, sub: { COMPETITION: 1 } }
      ]
    },
    {
      id: "Q4", phase: "main",
      text: "3人で話しているとき、1人だけ会話に入れていない人がいる。どうする？",
      options: [
        { label: "すぐ話を振る", main: { CONNECT: 2, ACTION: 1, ENTERTAIN: 1, EMPATHY: 1 } },
        { label: "その人が入りやすい話題に変える", main: { EMPATHY: 2, OBSERVE: 2, IDEA: 2 } },
        { label: "特に気にせず会話を続ける", main: { INDEPENDENCE: 2 }, sub: { FREEDOM: 1 } },
        { label: "誰かが気づくのを待つ", main: { OBSERVE: 2, INDEPENDENCE: 1 } },
        { label: "自分がその人と直接話し始める", main: { LEAD: 2, ACTION: 1, EMPATHY: 1, CONNECT: 1, FUTURE: 1 } }
      ]
    },
    {
      id: "Q5", phase: "main",
      text: "交流会終了30分前。まだほとんど名刺交換していない。あなたは？",
      options: [
        { label: "「まだいける！」と一気に動く", main: { ACTION: 3, ENTERTAIN: 1, LEAD: 1 }, sub: { COMPETITION: 1 } },
        { label: "本当に話したい人を2〜3人に絞る", main: { STRATEGY: 2, OBSERVE: 1, LEAD: 1 }, sub: { STRATEGIC: 1 } },
        { label: "今話している人との会話を深める", main: { EMPATHY: 2, CONNECT: 1, OBSERVE: 1 } },
        { label: "焦らず自然に過ごす", main: { INDEPENDENCE: 2, OBSERVE: 1 }, sub: { FREEDOM: 1 } },
        { label: "次につながりそうな人を探す", main: { FUTURE: 3, STRATEGY: 1, IDEA: 1 } }
      ]
    },
    {
      id: "Q6", phase: "sub",
      text: "交流会で一番うれしいのは、実はどれ？",
      options: [
        { label: "「この人とまた会いたい」と思ってもらうこと", sub: { FRIENDSHIP: 2, RECOGNITION: 1, SECURITY: 1 } },
        { label: "「この人すごい」と思ってもらうこと", sub: { RECOGNITION: 3, SELFEXPRESSION: 1, COMPETITION: 1 } },
        { label: "面白い人と出会うこと", sub: { CURIOSITY: 3, FREEDOM: 1 } },
        { label: "自分の仕事につながること", sub: { STRATEGIC: 3, COMPETITION: 1 }, main: { STRATEGY: 1 } },
        { label: "気の合う仲間が増えること", sub: { FRIENDSHIP: 3, SECURITY: 1, CARE: 1 } }
      ]
    },
    {
      id: "Q7", phase: "sub",
      text: "自分より圧倒的に実績のある人と話すことになった。心の中では？",
      options: [
        { label: "「面白い！もっと聞きたい」", sub: { CURIOSITY: 3, SELFEXPRESSION: 1 } },
        { label: "「自分も負けたくない」", sub: { COMPETITION: 3, PERFECTION: 1 } },
        { label: "「何か学べることはないかな」", sub: { PERFECTION: 2, CURIOSITY: 1, STRATEGIC: 1 } },
        { label: "「どう思われているか気になる」", sub: { RECOGNITION: 3, SECURITY: 1 } },
        { label: "「この人とどう関係を作ろう？」", sub: { STRATEGIC: 3, FRIENDSHIP: 1 }, main: { STRATEGY: 1 } }
      ]
    },
    {
      id: "Q8", phase: "sub",
      text: "自分の提案を相手に否定された。一番近いのは？",
      options: [
        { label: "「じゃあ別の方法を考えよう」", sub: { FREEDOM: 2, CURIOSITY: 1, STRATEGIC: 1 } },
        { label: "「いや、でも……」と説得したくなる", sub: { COMPETITION: 2, SELFEXPRESSION: 2 } },
        { label: "「なるほど。なぜそう思ったんだろう？」と考える", sub: { PERFECTION: 2, CURIOSITY: 1, STRATEGIC: 1 } },
        { label: "表面上は笑っているけど、内心かなり引っかかる", sub: { SECURITY: 2, RECOGNITION: 1, COMPETITION: 1 } },
        { label: "「この人には合わなかっただけ」と切り替える", sub: { FREEDOM: 2, SECURITY: 1, STRATEGIC: 1 } }
      ]
    },
    {
      id: "Q9", phase: "sub",
      text: "あなたが一番苦手なのは？",
      options: [
        { label: "自分の自由を制限されること", sub: { FREEDOM: 3 }, main: { INDEPENDENCE: 1 } },
        { label: "自分の能力を認めてもらえないこと", sub: { RECOGNITION: 2, COMPETITION: 2, PERFECTION: 1 } },
        { label: "人間関係がギクシャクすること", sub: { FRIENDSHIP: 1, CARE: 2, SECURITY: 1 } },
        { label: "場の空気が悪くなること", sub: { SECURITY: 2, CARE: 2 } },
        { label: "自分の存在を無視されること", sub: { RECOGNITION: 2, SELFEXPRESSION: 2, SECURITY: 1 } }
      ]
    },
    {
      id: "Q10", phase: "sub",
      text: "もし交流会に「自分とそっくりな人」がいたら……",
      options: [
        { label: "「面白い！仲良くなりたい」", sub: { CURIOSITY: 2, FRIENDSHIP: 2, SELFEXPRESSION: 1 }, main: { CONNECT: 1 } },
        { label: "「ちょっと負けたくない」", sub: { COMPETITION: 3, RECOGNITION: 1 } },
        { label: "「一緒に何かできそう」", sub: { STRATEGIC: 2, CARE: 1 } },
        { label: "「たぶん相性悪いと思う」", sub: { FREEDOM: 2, SECURITY: 1, PERFECTION: 1 } },
        { label: "「自分の弱点を見せられているみたいで嫌」", sub: { PERFECTION: 2, SECURITY: 2, RECOGNITION: 1 } }
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
