/* 表キャラ(10)・裏キャラ(20)の定義。
   profile : 内部スコアへの重み（判定ロジックが参照）
   axes    : レア度算出用の性格軸 open(外に出す度) / heart(情↔打算) / power(主導↔受容)  -2〜+2
   glyph/color : 公式画像を使わない独自エンブレム表示用。image にパスを入れると画像表示に切り替わる */
(function (g) {
  var D = (g.DBT = g.DBT || {});

  D.mainChars = [
    {
      id: "goku", name: "孫悟空", glyph: "悟", color: "#ff8a1f", image: "",
      type: "巻き込み・突破型", tagline: "人を巻き込み、まず動くタイプ",
      lead: "天真爛漫な", surface: "人を巻き込み、まず動く", moveA: "場を動かしている",
      strength: "自分から動いて人との距離を一気に縮め",
      caution: "自分では自然にやっていることが、相手には少し押しが強く見えることがある",
      profile: { ACTION: 3, CONNECT: 2, LEAD: 1, ENTERTAIN: 1 }, axes: { open: 2, heart: 1, power: 1 }
    },
    {
      id: "vegeta", name: "ベジータ", glyph: "王", color: "#3b6cff", image: "",
      type: "主導・競争型", tagline: "自分の軸が強く、簡単には人に合わせないタイプ",
      lead: "プライド高き", surface: "自分の軸を持ち、簡単には人に合わせない", moveA: "我が道を貫いている",
      strength: "ぶれない軸で場を引き締め",
      caution: "自分の基準の高さが、相手には少し近寄りがたく映ることがある",
      profile: { LEAD: 3, INDEPENDENCE: 1, ACTION: 1, STRATEGY: 1 }, axes: { open: 1, heart: -1, power: 2 }
    },
    {
      id: "gohan", name: "孫悟飯", glyph: "学", color: "#e0b24a", image: "",
      type: "共感・調和型", tagline: "相手を尊重しながら関係を作るタイプ",
      lead: "穏やかで誠実な", surface: "相手を尊重しながら、丁寧に関係を作る", moveA: "穏やかに接している",
      strength: "相手を尊重する姿勢で信頼を積み上げ",
      caution: "相手に合わせすぎて、自分の意見が伝わりにくいことがある",
      profile: { EMPATHY: 3, CONNECT: 1, OBSERVE: 1 }, axes: { open: 0, heart: 2, power: -1 }
    },
    {
      id: "piccolo", name: "ピッコロ", glyph: "静", color: "#3ddc84", image: "",
      type: "観察・サポート型", tagline: "周囲を見ながら必要なところを支えるタイプ",
      lead: "静かな", surface: "周囲を見ながら、必要なところを支える", moveA: "静かに場を整えている",
      strength: "周囲をよく見て、必要な場面で支えとなり",
      caution: "口数が少なく、近寄りがたい印象を与えることがある",
      profile: { OBSERVE: 3, EMPATHY: 2, INDEPENDENCE: 1 }, axes: { open: -1, heart: 1, power: 0 }
    },
    {
      id: "krillin", name: "クリリン", glyph: "友", color: "#ff7a59", image: "",
      type: "親和・橋渡し型", tagline: "人との距離を縮め、場をつなぐタイプ",
      lead: "人当たりのいい", surface: "人との距離を縮め、場をつなぐ", moveA: "人をつないでいる",
      strength: "誰とでも自然に打ち解けて場をつなぎ",
      caution: "みんなに良い顔をして、本音が見えにくくなることがある",
      profile: { CONNECT: 3, EMPATHY: 2, ACTION: 1 }, axes: { open: 1, heart: 2, power: -1 }
    },
    {
      id: "bulma", name: "ブルマ", glyph: "閃", color: "#19c8d6", image: "",
      type: "発想・企画型", tagline: "アイデアを出して場を動かすタイプ",
      lead: "発想豊かな", surface: "アイデアを出して、場を動かす", moveA: "アイデアを広げている",
      strength: "アイデアで新しい話題と勢いを生み",
      caution: "アイデアが次々に出て、相手が付いていけなくなることがある",
      profile: { IDEA: 3, ENTERTAIN: 1, LEAD: 1, ACTION: 1 }, axes: { open: 2, heart: 0, power: 1 }
    },
    {
      id: "trunks", name: "トランクス", glyph: "未", color: "#a98bff", image: "",
      type: "行動・未来志向型", tagline: "新しいことに積極的に飛び込むタイプ",
      lead: "誠実で前向きな", surface: "新しいことに積極的に飛び込む", moveA: "前向きに動いている",
      strength: "誠実な姿勢で新しい挑戦に飛び込み",
      caution: "次の話へ進むのが早く、相手を置いてきぼりにすることがある",
      profile: { FUTURE: 3, ACTION: 1, STRATEGY: 1, IDEA: 1 }, axes: { open: 1, heart: 0, power: 1 }
    },
    {
      id: "android18", name: "人造人間18号", glyph: "18", color: "#6ec3ff", image: "",
      type: "自立・マイペース型", tagline: "必要以上に群れず、自分のペースを保つタイプ",
      lead: "クールな", surface: "必要以上に群れず、自分のペースを保つ", moveA: "マイペースに過ごしている",
      strength: "自分のペースを保ちながら、必要な人とだけ深くつながり",
      caution: "距離を取っているように見え、冷たい印象を与えることがある",
      profile: { INDEPENDENCE: 3, OBSERVE: 1 }, axes: { open: -2, heart: -1, power: 0 }
    },
    {
      id: "frieza", name: "フリーザ", glyph: "策", color: "#b05cff", image: "",
      type: "戦略・コントロール型", tagline: "人や状況を観察し、流れを作るタイプ",
      lead: "冷静な", surface: "人や状況を観察し、流れを作る", moveA: "場を見渡している",
      strength: "状況を冷静に読んで、場を有利に運び",
      caution: "場をコントロールしている様子が、相手には少し怖く映ることがある",
      profile: { STRATEGY: 3, OBSERVE: 2, LEAD: 1 }, axes: { open: -1, heart: -2, power: 2 }
    },
    {
      id: "satan", name: "ミスター・サタン", glyph: "星", color: "#e0344f", image: "",
      type: "演出・社交型", tagline: "場を盛り上げ、人を楽しませるタイプ",
      lead: "華のある", surface: "場を盛り上げ、人を楽しませる", moveA: "場を盛り上げている",
      strength: "場を華やかに盛り上げ、注目を集め",
      caution: "盛り上げ役に徹して、自分の本音が伝わりにくいことがある",
      profile: { ENTERTAIN: 3, LEAD: 1, CONNECT: 1 }, axes: { open: 2, heart: 0, power: 1 }
    }
  ];

  /* 裏キャラ：hidden=結果画面に出す一言 / inner=まとめ文用 / noun=タイプ名用 / moveB=必殺技用 */
  D.subChars = [
    {
      id: "vegeta", name: "ベジータ", glyph: "勝", color: "#3b6cff", image: "", theme: "負けず嫌い",
      hidden: "実は誰にも負けたくない", inner: "誰に対しても負けたくない気持ちを抱えている",
      noun: "隠れ負けず嫌い", moveB: "実は静かに勝負している",
      strength: "負けん気を原動力に最後までやり切る力がある",
      caution: "無意識に張り合ってしまい、相手に緊張感を与えることがある",
      profile: { COMPETITION: 3, PERFECTION: 1, RECOGNITION: 1 }, axes: { open: 1, heart: -1, power: 2 }
    },
    {
      id: "frieza", name: "フリーザ", glyph: "策", color: "#b05cff", image: "", theme: "戦略的",
      hidden: "実は相手や状況をかなり観察している", inner: "誰と組めば得か、どう動けば流れを作れるかを見ている",
      noun: "策士", moveB: "実は損得と流れを見極めている",
      strength: "状況を冷静に読んで先手を打つ力がある",
      caution: "計算して動いている様子が、相手に冷たく映ることがある",
      profile: { STRATEGIC: 3, COMPETITION: 1, PERFECTION: 1 }, axes: { open: -2, heart: -2, power: 2 }
    },
    {
      id: "goku", name: "孫悟空", glyph: "好", color: "#ff8a1f", image: "", theme: "純粋な好奇心",
      hidden: "実は面白いものに目がない", inner: "面白い人や話に出会うと、損得抜きで夢中になる",
      noun: "好奇心の塊", moveB: "実は誰よりも面白がっている",
      strength: "好奇心で相手の魅力を引き出す力がある",
      caution: "興味が移りやすく、約束やフォローが後回しになることがある",
      profile: { CURIOSITY: 3, FREEDOM: 1, COMPETITION: 1 }, axes: { open: 2, heart: 1, power: 0 }
    },
    {
      id: "krillin", name: "クリリン", glyph: "友", color: "#ff7a59", image: "", theme: "仲間意識",
      hidden: "実は仲間をとても大切にしている", inner: "一度仲間だと思った人は、とことん大事にしたいと思っている",
      noun: "仲間思い", moveB: "実は仲間のことをちゃんと覚えている",
      strength: "一度つながった縁を長く育てる力がある",
      caution: "仲間を優先しすぎて、初対面の人との関係づくりが遅れることがある",
      profile: { FRIENDSHIP: 3, CARE: 1 }, axes: { open: 0, heart: 2, power: -1 }
    },
    {
      id: "piccolo", name: "ピッコロ", glyph: "護", color: "#3ddc84", image: "", theme: "世話焼き",
      hidden: "実は放っておけない", inner: "困っている人を見ると、頼まれなくても動いてしまう",
      noun: "世話焼き", moveB: "実は陰で面倒を見ている",
      strength: "さりげない気配りで人の信頼を集める力がある",
      caution: "抱え込みすぎて、自分が疲れてしまうことがある",
      profile: { CARE: 3, FRIENDSHIP: 1, PERFECTION: 1 }, axes: { open: -1, heart: 2, power: 0 }
    },
    {
      id: "gohan", name: "孫悟飯", glyph: "和", color: "#e0b24a", image: "", theme: "安心・平和志向",
      hidden: "実は争いや気まずさが苦手", inner: "場が穏やかであることを何より大事にしている",
      noun: "平和主義者", moveB: "実は場の平和を守っている",
      strength: "誰もが安心して話せる空気を保つ力がある",
      caution: "波風を避けるあまり、本音を飲み込んでしまうことがある",
      profile: { SECURITY: 3, CARE: 1, FRIENDSHIP: 1 }, axes: { open: -1, heart: 2, power: -2 }
    },
    {
      id: "bulma", name: "ブルマ", glyph: "認", color: "#19c8d6", image: "", theme: "認められたい",
      hidden: "実は自分の才能を認めてほしい", inner: "自分のアイデアや存在価値を、ちゃんと認めてほしいと思っている",
      noun: "認められたがり", moveB: "実は反応をこっそり気にしている",
      strength: "認められたい気持ちを、成果を出すエネルギーに変えられる",
      caution: "反応が薄いと、必要以上に気にしてしまうことがある",
      profile: { RECOGNITION: 3, SELFEXPRESSION: 1, CURIOSITY: 1 }, axes: { open: 1, heart: 0, power: 1 }
    },
    {
      id: "trunks", name: "トランクス", glyph: "未", color: "#a98bff", image: "", theme: "未来を変えたい",
      hidden: "実はこの出会いで何かを変えたい", inner: "今日の出会いを、未来の何かにつなげたいと思っている",
      noun: "未来の改革者", moveB: "実は未来を見据えて動いている",
      strength: "目先の会話を、将来の一手に変える力がある",
      caution: "先を見すぎて、今この場の会話を楽しみきれないことがある",
      profile: { STRATEGIC: 2, CURIOSITY: 2, CARE: 1 }, axes: { open: 0, heart: 1, power: 1 }
    },
    {
      id: "android18", name: "人造人間18号", glyph: "孤", color: "#6ec3ff", image: "", theme: "干渉されたくない",
      hidden: "実は自分の領域を守りたい", inner: "踏み込まれすぎず、自分のペースで関わりたいと思っている",
      noun: "一匹狼", moveB: "実は自分の距離感を守っている",
      strength: "ほどよい距離感で、長く続く関係をつくる力がある",
      caution: "壁があるように見えて、相手が近づきにくく感じることがある",
      profile: { FREEDOM: 3, SECURITY: 1, PERFECTION: 1 }, axes: { open: -2, heart: -1, power: 0 }
    },
    {
      id: "cell", name: "セル", glyph: "完", color: "#7bd34a", image: "", theme: "完璧主義",
      hidden: "実は完璧に見せたい", inner: "話し方も印象も、できるだけ隙のない状態にしたいと思っている",
      noun: "完璧主義者", moveB: "実は印象を細かく仕上げている",
      strength: "準備と仕上げの丁寧さで高い信頼を得る力がある",
      caution: "完璧を求めすぎて、自分にも相手にも厳しくなることがある",
      profile: { PERFECTION: 2, SELFEXPRESSION: 1, RECOGNITION: 1 }, axes: { open: -1, heart: -2, power: 1 }
    },
    {
      id: "buu", name: "魔人ブウ", glyph: "自", color: "#ff8fc4", image: "", theme: "自由・気分",
      hidden: "実は気分で動きたい", inner: "縛られず、その時の気分や流れで動きたいと思っている",
      noun: "自由人", moveB: "実はその場の気分で動いている",
      strength: "型にはまらない動きで、場に新しい風を吹き込む力がある",
      caution: "気分の波が、相手には読みにくく映ることがある",
      profile: { FREEDOM: 3, CURIOSITY: 1, SELFEXPRESSION: 1 }, axes: { open: 2, heart: 0, power: -1 }
    },
    {
      id: "roshi", name: "亀仙人", glyph: "遊", color: "#ffa94d", image: "", theme: "遊び心",
      hidden: "実は遊び心が止まらない", inner: "真面目な場でも、どこかで楽しむ余白をつくりたいと思っている",
      noun: "遊び人", moveB: "実はどこかで遊びを仕込んでいる",
      strength: "遊び心で場の緊張をほぐす力がある",
      caution: "冗談のつもりが、真面目な相手には軽く映ることがある",
      profile: { CURIOSITY: 2, SELFEXPRESSION: 1, FRIENDSHIP: 1 }, axes: { open: 2, heart: 1, power: -1 }
    },
    {
      id: "yamcha", name: "ヤムチャ", glyph: "評", color: "#e08a3c", image: "", theme: "評価されたい",
      hidden: "実は周りの評価が気になる", inner: "自分がどう評価されているか、さりげなく気にしている",
      noun: "評価ウォッチャー", moveB: "実は周囲の評価をそっと確かめている",
      strength: "評価への敏感さで、場に合った振る舞いを選べる",
      caution: "評価を気にしすぎて、本来の力を出し切れないことがある",
      profile: { RECOGNITION: 2, SECURITY: 1, FRIENDSHIP: 1, COMPETITION: 1 }, axes: { open: 1, heart: 0, power: -1 }
    },
    {
      id: "tien", name: "天津飯", glyph: "鍛", color: "#5fd08a", image: "", theme: "自己鍛錬",
      hidden: "実は黙々と自分を磨きたい", inner: "交流よりも、自分を高めることに価値を感じている",
      noun: "修行僧", moveB: "実は自分を磨く機会を探している",
      strength: "学びを積み重ねて、確かな実力を示す力がある",
      caution: "ストイックさが、相手に近寄りがたく映ることがある",
      profile: { PERFECTION: 3, FREEDOM: 1, COMPETITION: 1 }, axes: { open: -2, heart: 0, power: 1 }
    },
    {
      id: "yajirobe", name: "ヤジロベー", glyph: "楽", color: "#c9a36a", image: "", theme: "ラクしたい",
      hidden: "実はラクをしたい", inner: "無理せず、ほどほどの力で成果を出したいと思っている",
      noun: "省エネ上手", moveB: "実は最小の力で成果を狙っている",
      strength: "無駄を省いて、効率よく要点をつかむ力がある",
      caution: "省エネが、相手には熱量不足に見えることがある",
      profile: { SECURITY: 2, FREEDOM: 2 }, axes: { open: -1, heart: 0, power: -2 }
    },
    {
      id: "ginyu", name: "ギニュー", glyph: "表", color: "#ff5ad6", image: "", theme: "自己表現",
      hidden: "実は自分を表現したくてたまらない", inner: "自分らしさを、思いきり出せる場を求めている",
      noun: "表現者", moveB: "実は自己表現のチャンスを待っている",
      strength: "自分の個性を堂々と出して印象に残る力がある",
      caution: "自己表現が先走り、相手の話を聞く時間が減ることがある",
      profile: { SELFEXPRESSION: 3, FRIENDSHIP: 1, RECOGNITION: 1 }, axes: { open: 2, heart: 1, power: 1 }
    },
    {
      id: "zarbon", name: "ザーボン", glyph: "美", color: "#3ee0c0", image: "", theme: "格好よく見られたい",
      hidden: "実は格好よく見られたい", inner: "身だしなみも話し方も、スマートに見られたいと思っている",
      noun: "見せ方こだわり派", moveB: "実は見え方をそっと整えている",
      strength: "洗練された立ち振る舞いで好印象をつくる力がある",
      caution: "格好をつけすぎて、素の魅力が伝わりにくいことがある",
      profile: { RECOGNITION: 2, SELFEXPRESSION: 2, PERFECTION: 1 }, axes: { open: 1, heart: -1, power: 1 }
    },
    {
      id: "raditz", name: "ラディッツ", glyph: "守", color: "#8a6bff", image: "", theme: "自分を守りたい",
      hidden: "実は傷つくのが怖い", inner: "失敗や拒絶で傷つかないよう、慎重に動いている",
      noun: "慎重派", moveB: "実は自分を守る逃げ道を用意している",
      strength: "リスクを見極め、堅実に関係を進める力がある",
      caution: "慎重さが、相手には腰が引けて見えることがある",
      profile: { SECURITY: 3, STRATEGIC: 1, PERFECTION: 1 }, axes: { open: -1, heart: -1, power: -2 }
    },
    {
      id: "nappa", name: "ナッパ", glyph: "勢", color: "#c08a4a", image: "", theme: "勢いで押したい",
      hidden: "実は勢いで押し切りたい", inner: "考えるより、勢いで突き進みたいと思っている",
      noun: "勢い任せの人", moveB: "実は勢いで押し切ろうとしている",
      strength: "迷いのない勢いで、物事を一気に動かす力がある",
      caution: "勢いが先行して、細かな確認が抜けることがある",
      profile: { COMPETITION: 2, SELFEXPRESSION: 1, FREEDOM: 1 }, axes: { open: 2, heart: -1, power: 2 }
    },
    {
      id: "satan", name: "ミスター・サタン", glyph: "称", color: "#e0344f", image: "", theme: "認められたい",
      hidden: "実は主役として認められたい", inner: "注目され、称賛される瞬間を求めている",
      noun: "スター志望", moveB: "実は拍手を待っている",
      strength: "称賛を力に変えて、場を盛り上げ続ける力がある",
      caution: "注目を集めたい気持ちが、相手には目立ちたがりに映ることがある",
      profile: { RECOGNITION: 2, SELFEXPRESSION: 2, FRIENDSHIP: 1 }, axes: { open: 2, heart: 0, power: 1 }
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
