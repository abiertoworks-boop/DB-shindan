/* 個別に作り込んだ「表×裏」の組み合わせ。キーは "表ID-裏ID"。
   ここに無い組み合わせは characters.js のパーツから engine.js が自動合成する。
   stars を省略するとレア度は axes から自動算出される。 */
(function (g) {
  var D = (g.DBT = g.DBT || {});

  D.combos = {
    "goku-frieza": {
      image: "assets/results/goku-frieza.webp",
      stars: 5, name: "無邪気な戦略家",
      move: "気づいたら相手の懐に入っている",
      summary: "表では自由人。でも裏では、誰と組めば面白くなるかをちゃんと見ている。",
      strength: "人との距離を一気に縮め、場を動かすことができる。",
      caution: "自分では自然にやっていることが、相手には少し押しが強く見えることがある。"
    },
    "vegeta-krillin": {
      image: "assets/results/vegeta-krillin.webp",
      stars: 4, name: "強気な仲間思い",
      move: "興味ないフリして、ちゃんと覚えている",
      summary: "表では自分の意見を通す。でも裏では、仲間を誰より大切にしている。",
      strength: "強気な態度で場を引っ張りながら、仲間のピンチを誰より早く察知して動く。",
      caution: "素っ気なく見える態度のせいで、せっかくの気遣いが伝わりにくいことがある。"
    },
    "gohan-vegeta": {
      image: "assets/results/gohan-vegeta.webp",
      stars: 5, name: "優等生の隠れ負けず嫌い",
      move: "譲ったように見せて、最後は自分の案を通す",
      summary: "表では穏やかに相手を尊重する。でも裏では、静かに勝つ道筋を探している。",
      strength: "丁寧で誠実な対応で信頼を積み上げ、要所で確実に結果を出す。",
      caution: "譲ったつもりの本人と、押し切られたと感じる相手との間で、温度差が出ることがある。"
    },
    "piccolo-buu": {
      image: "assets/results/piccolo-buu.webp",
      stars: 5, name: "静かな顔した自由人",
      move: "静かにしているのに、突然全部持っていく",
      summary: "表では冷静に場を見ている。でも裏では、気分で動きたい自分がいる。",
      strength: "落ち着いた佇まいで場を整え、必要な瞬間に一気に流れを変える。",
      caution: "普段との落差が大きく、周囲が驚いて戸惑うことがある。"
    },
    "krillin-frieza": {
      image: "assets/results/krillin-frieza.webp",
      stars: 5, name: "人当たりのいい策士",
      move: "笑顔のまま相手の懐に入る",
      summary: "表では親しみやすく距離を縮める。でも裏では、相手をかなり観察している。",
      strength: "誰とでも自然に打ち解け、気づけば人脈の中心に立っている。",
      caution: "観察されていると気づいた相手が、少し身構えてしまうことがある。"
    },
    "bulma-vegeta": {
      image: "assets/results/bulma-vegeta.webp",
      stars: 5, name: "アイデアマンに見えて実は勝負師",
      move: "楽しそうに見えて、実は勝ち筋を探している",
      summary: "表では発想力で場を動かす。でも裏では、楽しそうに振る舞いながら常に勝ち筋を探している。",
      strength: "次々と企画を生み出し、場に新しい話題と勢いを持ち込む。",
      caution: "勝負モードに入ると、楽しい雰囲気が少し張りつめることがある。"
    },
    "android18-krillin": {
      image: "assets/results/android18-krillin.webp",
      stars: 5, name: "一人が好き。でも本当はつながりたい",
      move: "距離を取っているようで、ちゃんと見ている",
      summary: "表では自立してマイペース。でも裏では、人とのつながりを大切にしている。",
      strength: "適度な距離感を保ちながら、必要な人と確実につながっていく。",
      caution: "本当は歓迎しているのに、「興味なし」と受け取られることがある。"
    },
    "frieza-krillin": {
      image: "assets/results/frieza-krillin.webp",
      stars: 5, name: "策士に見えて実は人情派",
      move: "損得で近づいたはずが、最後は情で動く",
      summary: "表では戦略的に人や場を見る。でも裏では、人とのつながりを大切にしている。",
      strength: "損得を冷静に見極める頭脳で、場を有利に組み立てていく。",
      caution: "割り切ったつもりが割り切れず、あとから自分で迷うことがある。"
    },
    "satan-frieza": {
      image: "assets/results/satan-frieza.webp",
      variants: [{
        image: "assets/results/satan-frieza-2.webp",
        stars: 5, name: "自分をブランド化する男",
        move: "自分まで話題に変える",
        summary: "表では場を盛り上げ、主役になる。でも裏では、見せ方とタイミングを緻密に計算している。",
        strength: "自分自身を話題に変え、気づけば場の中心になっている。",
        caution: "話題づくりに全力で、素の自分を見せる機会が減ることがある。"
      }],
      stars: 5, name: "究極のセルフプロデューサー",
      move: "自分までコンテンツにする",
      summary: "表では場を盛り上げ、人を楽しませる。でも裏では、見せ方と損得をかなり計算している。",
      strength: "自分を最大のコンテンツに変え、場の注目を一気に集める。",
      caution: "見せ方を考えすぎて、素の自分が伝わりにくくなることがある。"
    },
    "goku-vegeta": {
      image: "assets/results/goku-vegeta.webp",
      stars: 4, name: "楽しく勝ちたい人",
      move: "遊んでいるようで、しっかり勝負している",
      summary: "表では誰とでも楽しく打ち解ける。でも裏では、勝ち負けにしっかりこだわっている。",
      strength: "誰とでもすぐ打ち解け、楽しみながら場を前に進める。",
      caution: "遊びのつもりの勝負に熱が入りすぎて、相手が引いてしまうことがある。"
    },
    "goku-piccolo": {
      image: "assets/results/goku-piccolo.webp",
      stars: 3, name: "天然の世話焼き",
      move: "本人は自然体なのに、なぜか人が集まる",
      summary: "表では自然体で人を巻き込む。でも裏では、放っておけず面倒を見ている。",
      strength: "自然体のまま場に溶け込み、気づけば人を引き寄せている。",
      caution: "世話を焼いている自覚がなく、相手に気を遣わせることがある。"
    },
    "gohan-frieza": {
      image: "assets/results/gohan-frieza.webp",
      stars: 4, name: "優しい顔した戦略家",
      move: "相手を尊重しながら、ちゃっかり主導権を取る",
      summary: "表では穏やかに相手を尊重する。でも裏では、先を読んで損得を見ている。",
      strength: "相手を立てながら信頼を得て、主導権を静かに握る。",
      caution: "丁寧な物腰の裏の計算に気づかれたとき、印象が変わってしまうことがある。"
    },
    "bulma-goku": {
      image: "assets/results/bulma-goku.webp",
      stars: 4, name: "発明する行動派",
      move: "話しているうちに新しい企画が生まれる",
      summary: "表ではアイデアで場を動かす。でも裏では、細かいことより勢いで決めたい。",
      strength: "次々と企画を生み出し、周囲を巻き込んで前に進める。",
      caution: "勢いで決めた話が、あとで細部の詰め不足になることがある。"
    },
    "android18-goku": {
      image: "assets/results/android18-goku.webp",
      stars: 4, name: "クールに見えて実は遊び好き",
      move: "興味なさそうに見えて、一番楽しんでいる",
      summary: "表ではクールで自分のペース。でも裏では、遊びの場が大好き。",
      strength: "適度な距離を保ちながら、本当に気の合う相手とだけ深くつながる。",
      caution: "ノリの良さを隠すと、気の合う人に気づいてもらえないことがある。"
    },
    "satan-goku": {
      image: "assets/results/satan-goku.webp",
      stars: 3, name: "目立ちたがりのピュア人間",
      move: "場の空気を一瞬で変える",
      summary: "表では場を盛り上げる主役。でも裏では、褒められると素直に喜ぶ純粋さがある。",
      strength: "場の空気を一瞬で明るく変え、誰もが話しやすくなる空気を作る。",
      caution: "場を明るくするあまり、深い話に入るきっかけを逃すことがある。"
    },
    "vegeta-satan": {
      image: "assets/results/vegeta-satan.webp",
      stars: 5, name: "評価が気になる王子様",
      move: "褒められると、さらに本気を出す",
      summary: "表では自分の軸を貫く。でも裏では、周りからの評価をよく見ている。",
      strength: "高い基準で場を引き締め、結果で周囲の信頼を得ていく。",
      caution: "評価されたい気持ちを隠すほど、態度が強く出てしまうことがある。"
    },
    "piccolo-krillin": {
      image: "assets/results/piccolo-krillin.webp",
      stars: 3, name: "静かな橋渡し役",
      move: "気づいたら全員が話しやすくなっている",
      summary: "表では静かに周囲を見ている。でも裏では、人と人をつなぎたい。",
      strength: "主張しすぎず、人と人の間に立ちながら場全体をつないでいく。",
      caution: "つなぎ役に徹しすぎて、自分の話をする機会を逃すことがある。"
    },
    "krillin-vegeta": {
      image: "assets/results/krillin-vegeta.webp",
      stars: 4, name: "愛される負けず嫌い",
      move: "笑顔で張り合う",
      summary: "表では親しみやすく打ち解ける。でも裏では、静かに闘志を燃やしている。",
      strength: "親しみやすい笑顔で誰とでも打ち解け、場を和ませていく。",
      caution: "笑顔の裏の対抗心が、ふとした一言ににじむことがある。"
    },
    "bulma-frieza": {
      image: "assets/results/bulma-frieza.webp",
      stars: 5, name: "発想型の交渉人",
      move: "面白そうですね、と言いながら条件を詰めている",
      summary: "表ではアイデアで場を動かす。でも裏では、条件と損得を冷静に詰めている。",
      strength: "相手の話を引き出しながら、新しい可能性をどんどん形にしていく。",
      caution: "盛り上がっているうちに話が進み、相手が断りづらく感じることがある。"
    },
    "trunks-frieza": {
      image: "assets/results/trunks-frieza.webp",
      stars: 5, name: "未来を変える戦略家",
      move: "今の話を、次の一手に変える",
      summary: "表では誠実に新しい挑戦へ飛び込む。でも裏では、先を読んで静かに布石を打っている。",
      strength: "誠実な対応で信頼を集めながら、常に次の一手を準備している。",
      caution: "先回りの準備が、相手には用意周到すぎて見えることがある。"    },
    "satan-yamcha": {
      image: "assets/results/satan-yamcha.webp",
      stars: 4, name: "褒められたい社交家",
      move: "相手を褒めて、自分も褒めてもらう",
      summary: "表では場を盛り上げ、人を楽しませる。でも裏では、自分も認められたくて密かに努力を重ねている。",
      strength: "相手を褒めるのが自然にうまく、場を明るくする。",
      caution: "褒め合いを期待しすぎて、反応が薄いと落ち込むことがある。"
    },
    "goku-android18": {
      image: "assets/results/goku-android18.webp",
      stars: 4, name: "自由すぎるマイペース人間",
      move: "相手に合わせているようで、全然合わせていない",
      summary: "表では誰とでも楽しく打ち解ける。でも裏では、自分のペースを誰よりも大事にしている。",
      strength: "誰とでも合わせられるように見えて、自分の軸を絶対に手放さない。",
      caution: "合わせているつもりのない自由さが、相手には掴みどころなく映ることがある。"
    },
    "trunks-krillin": {
      image: "assets/results/trunks-krillin.webp",
      stars: 4, name: "行動派の人情ネットワーカー",
      move: "いい人を見つけると、すぐ仲間にする",
      summary: "表では新しい出会いに積極的に飛び込む。でも裏では、損得よりも人情で人を選んでいる。",
      strength: "人を見る目が確かで、良いと思った相手にはすぐ動いてつながる。",
      caution: "つながりを広げるスピードが速く、一人ひとりへのフォローが追いつかないことがある。"
    },
    "android18-frieza": {
      image: "assets/results/android18-frieza.webp",
      stars: 5, name: "マイペースな支配者",
      move: "無理に動かず、気づけば自分のペース",
      summary: "表では必要以上に群れず、自分のペースを保つ。でも裏では、相手の出方を静かに見極めている。",
      strength: "自分のペースを崩さず、気づけば場の主導権を握っている。",
      caution: "動かないまま主導権を握る様子が、相手には威圧的に映ることがある。"
    },
    "frieza-vegeta": {
      image: "assets/results/frieza-vegeta.webp",
      stars: 4, name: "勝負を仕掛ける戦略家",
      move: "相手の出方を見て、一番おいしいところを取る",
      summary: "表では人や状況を観察して流れを作る。でも裏では、常に勝ち筋を計算している。",
      strength: "相手の出方を読みながら、勝負どころで確実に一手を打つ。",
      caution: "勝ちを狙う姿勢が、相手には抜け目なく見えることがある。"
    },
    "piccolo-roshi": {
      image: "assets/results/piccolo-roshi.webp",
      stars: 5, name: "真面目そうで実は遊び人",
      move: "真面目な話から、突然くだらない話に持っていく",
      summary: "表では静かに周囲を見ている。でも裏では、遊び心が強く場を楽しませるのが得意。",
      strength: "真面目な話と冗談を自在に行き来し、場の緊張をほぐしていく。",
      caution: "急な話題の切り替えに、相手が戸惑うことがある。"
    },
    "gohan-krillin": {
      image: "assets/results/gohan-krillin.webp",
      stars: 3, name: "安心感のある聞き上手",
      move: "相手の話を全部覚えている",
      summary: "表では相手を尊重して丁寧に関係を作る。でも裏では、人の話をよく覚えていて、後でちゃんと気にかけている。",
      strength: "相手の話を丁寧に受け止め、誰でも安心して話せる空気を作る。",
      caution: "聞き役に回りすぎて、自分の話や意見が後回しになることがある。"
    },
    "bulma-roshi": {
      image: "assets/results/bulma-roshi.webp",
      stars: 5, name: "天才的な悪ノリ発明家",
      move: "「面白そう。それ、やってみよう」で始める",
      summary: "表ではアイデアで場を動かす。でも裏では、ノリだけでなく技術と段取りでちゃんと仕上げている。",
      strength: "突拍子もない思いつきを形にし、場を一気に盛り上げる。",
      caution: "ノリで始めた話が大きくなりすぎて、収拾に手間がかかることがある。"
    }

  };
})(typeof window !== "undefined" ? window : globalThis);
