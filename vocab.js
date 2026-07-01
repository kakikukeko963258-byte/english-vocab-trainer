const VOCAB = [
  {
    id: 190,
    word: "acquire",
    group: "得る・手に入れる",
    meanings: ["獲得する"],
    accepts: ["習得する", "得る", "身につける"],
    note: "acquire a reputation = 名声を得る"
  },
  {
    id: 191,
    word: "derive",
    group: "得る・手に入れる",
    meanings: ["得る", "由来する"],
    accepts: ["引き出す", "派生する"],
    note: "derive a conclusion from = ～から結論を導き出す"
  },
  {
    id: 192,
    word: "fetch",
    group: "得る・手に入れる",
    meanings: ["行って取ってくる"],
    accepts: ["取ってくる", "連れてくる"],
    note: "fetch a doctor = 医者を連れてくる"
  },
  {
    id: 193,
    word: "gain",
    group: "得る・手に入れる",
    meanings: ["得る", "進歩する"],
    accepts: ["獲得する", "増す"],
    note: "gain a reputation = 名声を得る"
  },
  {
    id: 194,
    word: "earn",
    group: "得る・手に入れる",
    meanings: ["お金などを得る"],
    accepts: ["稼ぐ", "得る"],
    note: "earn a degree = 学位を取る"
  },
  {
    id: 195,
    word: "obtain",
    group: "得る・手に入れる",
    meanings: ["獲得する", "取る"],
    accepts: ["手に入れる", "取得する"],
    note: "obtain a position = 地位を得る"
  },
  {
    id: 196,
    word: "purchase",
    group: "得る・手に入れる",
    meanings: ["購入する", "買う", "購入", "買い入れ"],
    accepts: ["買い入れる"],
    note: "purchase a piece of land = 土地を購入する"
  },
  {
    id: 197,
    word: "reserve",
    group: "得る・手に入れる",
    meanings: ["予約する", "蓄え"],
    accepts: ["取っておく", "確保する"],
    note: "reserve a ticket = 切符を予約する"
  },
  {
    id: 198,
    word: "undertake",
    group: "得る・手に入れる",
    meanings: ["仕事を引き受ける"],
    accepts: ["引き受ける", "請け負う", "担う"],
    note: "undertake a role = 役割を担う"
  },
  {
    id: 199,
    word: "afford",
    group: "与える・捧げる・提供する",
    meanings: ["する余裕がある"],
    accepts: ["余裕がある", "買う余裕がある"],
    note: "afford a house = 家を買う余裕がある"
  },
  {
    id: 200,
    word: "award",
    group: "与える・捧げる・提供する",
    meanings: ["～を…に与える", "賞"],
    accepts: ["授与する", "与える"],
    note: "award a medal = メダルを授与する"
  },
  {
    id: 201,
    word: "confer",
    group: "与える・捧げる・提供する",
    meanings: ["与える", "相談する"],
    accepts: ["授ける", "協議する"],
    note: "confer a degree = 学位を授ける"
  },
  {
    id: 202,
    word: "dedicate",
    group: "与える・捧げる・提供する",
    meanings: ["捧げる"],
    accepts: ["専念する"],
    note: "dedicate efforts to = ～に精力を捧げる"
  },
  {
    id: 203,
    word: "devote",
    group: "与える・捧げる・提供する",
    meanings: ["～を…に捧げる"],
    accepts: ["費やす", "専念する", "注ぐ"],
    note: "devote one's attention to = 注意を～に払う"
  },
  {
    id: 204,
    word: "donate",
    group: "与える・捧げる・提供する",
    meanings: ["寄贈する", "寄付する", "贈与する"],
    accepts: ["寄付する"],
    note: "donate money to the school = 学校にお金を寄付する"
  },
  {
    id: 205,
    word: "endow",
    group: "与える・捧げる・提供する",
    meanings: ["寄付する", "授与する"],
    accepts: ["与える", "授ける"],
    note: "endow a scholarship = 奨学基金を寄付する"
  },
  {
    id: 206,
    word: "distribute",
    group: "与える・捧げる・提供する",
    meanings: ["分配する", "配る"],
    accepts: ["配布する"],
    note: "distribute copies = コピーを配布する"
  },
  {
    id: 207,
    word: "feed",
    group: "与える・捧げる・提供する",
    meanings: ["食物を与える", "食物を食べる"],
    accepts: ["養う", "餌をやる"],
    note: "feed a large family = 大家族を養う"
  },
  {
    id: 208,
    word: "grant",
    group: "与える・捧げる・提供する",
    meanings: ["与える", "付与"],
    accepts: ["許可する", "認める"],
    note: "grant someone's request = ～の願いを聞く"
  },
  {
    id: 209,
    word: "offer",
    group: "与える・捧げる・提供する",
    meanings: ["申し出る", "申し出", "提供"],
    accepts: ["提供する", "差し出す"],
    note: "offer a job as = ～という仕事を提供する"
  },
  {
    id: 210,
    word: "supply",
    group: "与える・捧げる・提供する",
    meanings: ["供給する", "供給"],
    accepts: ["補充する"],
    note: "supply goods to = ～に商品を供給する"
  },
  {
    id: 211,
    word: "bestow",
    group: "与える・捧げる・提供する",
    meanings: ["授ける"],
    accepts: ["与える"],
    note: "bestow a knighthood upon = ～にナイトの位を授ける"
  },
  {
    id: 212,
    word: "alter",
    group: "変更する・変換する",
    meanings: ["変える", "変わる"],
    accepts: ["変更する", "仕立て直す"],
    note: "alter one's schedule = 予定を変更する"
  },
  {
    id: 213,
    word: "barter",
    group: "変更する・変換する",
    meanings: ["物々交換する", "交換する"],
    accepts: ["取引する"],
    note: "barter for a position = 位置を交換する"
  },
  {
    id: 214,
    word: "convert",
    group: "変更する・変換する",
    meanings: ["変形させる", "変える", "変形する", "変わる"],
    accepts: ["変換する", "転換する"],
    note: "convert sunlight into electricity = 太陽熱を電気に変換する"
  },
  {
    id: 215,
    word: "disguise",
    group: "変更する・変換する",
    meanings: ["変装させる", "変装"],
    accepts: ["偽装する", "隠す"],
    note: "disguise the fact that = 事実を偽装する"
  },
  {
    id: 216,
    word: "modify",
    group: "変更する・変換する",
    meanings: ["変える"],
    accepts: ["変更する", "修正する"],
    note: "modify automobile designs = 自動車のデザインを変更する"
  },
  {
    id: 217,
    word: "renew",
    group: "変更する・変換する",
    meanings: ["更新する", "再び始まる"],
    accepts: ["再開する"],
    note: "renew a passport = パスポートを更新する"
  },
  {
    id: 218,
    word: "replace",
    group: "変更する・変換する",
    meanings: ["取り替える", "取り換える"],
    accepts: ["交換する", "置き換える"],
    note: "replace the battery = 電池を交換する"
  },
  {
    id: 219,
    word: "revise",
    group: "変更する・変換する",
    meanings: ["見直す", "改訂する", "印刷再校刷り"],
    accepts: ["訂正する", "修正する"],
    note: "revise a website code = ウェブサイトのソースコードを訂正する"
  },
  {
    id: 220,
    word: "translate",
    group: "変更する・変換する",
    meanings: ["翻訳する"],
    accepts: ["訳す"],
    note: "translate the document into = 文書を～に翻訳する"
  },
  {
    id: 221,
    word: "vary",
    group: "変更する・変換する",
    meanings: ["形を変える", "形や外観が変わる"],
    accepts: ["変わる", "変化する"],
    note: "vary by region = 地域によって変わる"
  },
  {
    id: 222,
    word: "fix",
    group: "修繕する・回復する",
    meanings: ["修理する", "固定する"],
    accepts: ["直す", "修正する"],
    note: "fix an error = 誤りを修正する"
  },
  {
    id: 223,
    word: "mend",
    group: "修繕する・回復する",
    meanings: ["修繕する", "快方に向かう"],
    accepts: ["直す", "繕う"],
    note: "mend a sock = 靴下を繕う"
  },
  {
    id: 224,
    word: "recover",
    group: "修繕する・回復する",
    meanings: ["取り戻す", "回復する"],
    accepts: ["回収する", "復旧する"],
    note: "recover from one's disease = 病気から回復する"
  },
  {
    id: 225,
    word: "retrieve",
    group: "修繕する・回復する",
    meanings: ["取り戻す", "獲物を取ってくる"],
    accepts: ["回収する", "検索する"],
    note: "retrieve data = データを取り戻す"
  },
  {
    id: 226,
    word: "ascend",
    group: "移動する・進む・伝達する",
    meanings: ["上昇する", "登る"],
    accepts: ["上る"],
    note: "ascend a ladder = はしごを登る"
  },
  {
    id: 227,
    word: "commute",
    group: "移動する・進む・伝達する",
    meanings: ["通勤する", "通学する", "通勤"],
    accepts: ["通う"],
    note: "commute by bus = バスで通勤する"
  },
  {
    id: 228,
    word: "descend",
    group: "移動する・進む・伝達する",
    meanings: ["下る", "下りる"],
    accepts: ["降りる"],
    note: "descend the slope = スロープを下る"
  },
  {
    id: 229,
    word: "divert",
    group: "移動する・進む・伝達する",
    meanings: ["迂回させる"],
    accepts: ["そらす", "向ける", "迂回する"],
    note: "divert someone's attention = ～の気を散らす"
  },
  {
    id: 230,
    word: "navigate",
    group: "移動する・進む・伝達する",
    meanings: ["航海する"],
    accepts: ["操縦する", "進路を決める"],
    note: "navigate by the stars = 星を頼りに航行する"
  },
  {
    id: 231,
    word: "proceed",
    group: "移動する・進む・伝達する",
    meanings: ["進む", "利益"],
    accepts: ["続行する"],
    note: "proceed as scheduled = 予定どおりに進む"
  },
  {
    id: 232,
    word: "transfer",
    group: "移動する・進む・伝達する",
    meanings: ["移す", "移る"],
    accepts: ["転送する", "乗り換える"],
    note: "transfer data to = データを～へ転送する"
  },
  {
    id: 233,
    word: "transmit",
    group: "移動する・進む・伝達する",
    meanings: ["伝える", "電波で送信する"],
    accepts: ["送信する", "感染させる"],
    note: "transmit a message = 情報を送信する"
  },
  {
    id: 234,
    word: "transplant",
    group: "移動する・進む・伝達する",
    meanings: ["移植する", "植え換える"],
    accepts: ["移住させる"],
    note: "transplant an organ = 臓器を移植する"
  },
  {
    id: 235,
    word: "shift",
    group: "移動する・進む・伝達する",
    meanings: ["移す", "移動する"],
    accepts: ["変える", "入れ替える"],
    note: "shift one's attention to = ～へ注意を移す"
  },
  {
    id: 236,
    word: "accuse",
    group: "責める・告発する",
    meanings: ["告発する"],
    accepts: ["非難する", "訴える"],
    note: "accuse someone of murder = ～を殺人罪で告訴する"
  },
  {
    id: 237,
    word: "blame",
    group: "責める・告発する",
    meanings: ["責任を負わせる", "非難"],
    accepts: ["責める", "非難する"],
    note: "blame someone for the mistake = その間違いで～を責める"
  },
  {
    id: 238,
    word: "complain",
    group: "責める・告発する",
    meanings: ["不平を言う"],
    accepts: ["文句を言う", "苦情を言う", "訴える"],
    note: "complain to one's doctor = 医者に苦痛を訴える"
  },
  {
    id: 239,
    word: "condemn",
    group: "責める・告発する",
    meanings: ["非難する"],
    accepts: ["責める"],
    note: "condemn terrorism = テロを非難する"
  },
  {
    id: 240,
    word: "convict",
    group: "責める・告発する",
    meanings: ["有罪を宣告する", "受刑者"],
    accepts: ["有罪にする"],
    note: "convict someone of manslaughter = ～を過失致死罪で有罪とする"
  },
  {
    id: 241,
    word: "criticize",
    group: "責める・告発する",
    meanings: ["非難する", "批評する"],
    accepts: ["批判する"],
    note: "criticize the media = メディアを非難する"
  },
  {
    id: 242,
    word: "deplore",
    group: "責める・告発する",
    meanings: ["非難する"],
    accepts: ["嘆く", "悔いる"],
    note: "deplore someone's loss = ～の死を悼む"
  },
  {
    id: 243,
    word: "prosecute",
    group: "責める・告発する",
    meanings: ["起訴する", "遂行する"],
    accepts: ["告訴する", "行う"],
    note: "prosecute the crime = 犯罪を起訴する"
  },
  {
    id: 244,
    word: "punish",
    group: "責める・告発する",
    meanings: ["罰する"],
    accepts: ["処罰する"],
    note: "punish someone for one's crime = 人を犯した罪で罰する"
  },
  {
    id: 245,
    word: "reproach",
    group: "責める・告発する",
    meanings: ["非難する", "非難", "叱責"],
    accepts: ["責める", "とがめる"],
    note: "reproach oneself = 自分を責める"
  },
  {
    id: 246,
    word: "scold",
    group: "責める・告発する",
    meanings: ["叱る", "がみがみ言う"],
    accepts: ["怒る"],
    note: "scold someone's child = ～の子を叱る"
  },
  {
    id: 247,
    word: "sue",
    group: "責める・告発する",
    meanings: ["告訴する", "訴訟を起こす"],
    accepts: ["訴える"],
    note: "sue for damages = 損害賠償の訴訟を起こす"
  },
  {
    id: 248,
    word: "chat",
    group: "言う・口に出す・話す",
    meanings: ["おしゃべりする"],
    accepts: ["雑談する"],
    note: "chat with one's neighbor = 近所の人とおしゃべりする"
  },
  {
    id: 249,
    word: "confess",
    group: "言う・口に出す・話す",
    meanings: ["告白する", "白状する"],
    accepts: ["打ち明ける"],
    note: "confess one's crime = 罪を告白する"
  },
  {
    id: 250,
    word: "converse",
    group: "言う・口に出す・話す",
    meanings: ["談話する", "話し合う"],
    accepts: ["会話する"],
    note: "converse with = ～と話を交わす"
  },
  {
    id: 251,
    word: "disclose",
    group: "言う・口に出す・話す",
    meanings: ["明らかにする", "暴露する"],
    accepts: ["公表する", "ばらす"],
    note: "disclose evidence of = ～の証拠を明らかにする"
  },
  {
    id: 252,
    word: "describe",
    group: "言う・口に出す・話す",
    meanings: ["述べる", "説明する"],
    accepts: ["描写する", "記述する"],
    note: "describe one's symptoms = 症状を説明する"
  },
  {
    id: 253,
    word: "exclaim",
    group: "言う・口に出す・話す",
    meanings: ["叫ぶ", "声高に言う"],
    accepts: ["大声で言う"],
    note: "exclaim with delight = 喜んで叫ぶ"
  },
  {
    id: 254,
    word: "mutter",
    group: "言う・口に出す・話す",
    meanings: ["ぶつぶつ言う", "つぶやく"],
    accepts: ["小声で言う"],
    note: "mutter to oneself = ぶつぶつ独り言を言う"
  },
  {
    id: 255,
    word: "recite",
    group: "言う・口に出す・話す",
    meanings: ["暗唱する", "暗唱をする"],
    accepts: ["朗読する"],
    note: "recite the times tables = 掛け算の九九を暗唱する"
  },
  {
    id: 256,
    word: "reveal",
    group: "言う・口に出す・話す",
    meanings: ["明かす", "暴露"],
    accepts: ["明らかにする", "暴露する"],
    note: "reveal details about = ～の詳細を明らかにする"
  },
  {
    id: 257,
    word: "roar",
    group: "言う・口に出す・話す",
    meanings: ["大声で言う", "吠える", "どなる"],
    accepts: ["叫ぶ"],
    note: "roar in rage = 怒って叫ぶ"
  },
  {
    id: 258,
    word: "scream",
    group: "言う・口に出す・話す",
    meanings: ["金切り声で言う", "悲鳴をあげる"],
    accepts: ["叫ぶ"],
    note: "scream in terror = 恐怖に悲鳴をあげる"
  },
  {
    id: 259,
    word: "utter",
    group: "言う・口に出す・話す",
    meanings: ["言葉を口に出す", "話す"],
    accepts: ["発する"],
    note: "utter a groan = うめき声を立てる"
  },
  {
    id: 260,
    word: "whisper",
    group: "言う・口に出す・話す",
    meanings: ["ささやく"],
    accepts: ["小声で言う"],
    note: "whisper in someone's ear = ～の耳元でささやく"
  },
  {
    id: 261,
    word: "yell",
    group: "言う・口に出す・話す",
    meanings: ["大声で鋭く叫ぶ", "叫んで言う"],
    accepts: ["叫ぶ"],
    note: "yell for help = 助けを求めて叫ぶ"
  },
  {
    id: 262,
    word: "advocate",
    group: "主張する・提案する",
    meanings: ["支持する", "推奨する"],
    accepts: ["擁護する"],
    note: "advocate the plan = 計画を支持する"
  },
  {
    id: 263,
    word: "assert",
    group: "主張する・提案する",
    meanings: ["言い張る"],
    accepts: ["主張する", "断言する"],
    note: "assert one's right = 権利を主張する"
  },
  {
    id: 264,
    word: "boast",
    group: "主張する・提案する",
    meanings: ["誇る", "誇張して話す"],
    accepts: ["自慢する"],
    note: "boast about one's strength = 力自慢をする"
  },
  {
    id: 265,
    word: "claim",
    group: "主張する・提案する",
    meanings: ["言い張る", "要求する", "要求", "主張"],
    accepts: ["主張する", "請求する"],
    note: "claim a full refund = 全額返還を要求する"
  },
  {
    id: 266,
    word: "declare",
    group: "主張する・提案する",
    meanings: ["宣言する"],
    accepts: ["申告する", "表明する"],
    note: "declare independence = 独立を宣言する"
  },
  {
    id: 267,
    word: "demonstrate",
    group: "主張する・提案する",
    meanings: ["実証する", "実演する", "意思表示する"],
    accepts: ["証明する", "説明する"],
    note: "demonstrate the validity of = ～の正当性を実証する"
  },
  {
    id: 268,
    word: "emphasize",
    group: "主張する・提案する",
    meanings: ["強調する"],
    accepts: ["重視する"],
    note: "emphasize the fact that = ～という事実を強調する"
  },
  {
    id: 269,
    word: "exaggerate",
    group: "主張する・提案する",
    meanings: ["誇張する", "誇張して書く"],
    accepts: ["大げさに言う"],
    note: "exaggerate the difference = 相違点を誇張する"
  },
  {
    id: 270,
    word: "insist",
    group: "主張する・提案する",
    meanings: ["強く主張する"],
    accepts: ["言い張る"],
    note: "insist on one's rights = 権利を主張する"
  },
  {
    id: 271,
    word: "persist",
    group: "主張する・提案する",
    meanings: ["主張しつづける", "しつこく～する"],
    accepts: ["固執する", "続ける"],
    note: "persist in one's beliefs = 自己の信念を貫く"
  },
  {
    id: 272,
    word: "plead",
    group: "主張する・提案する",
    meanings: ["弁論する", "嘆願する", "弁護する", "主張する"],
    accepts: ["求める"],
    note: "plead for help = 必死で助けを求める"
  },
  {
    id: 273,
    word: "proclaim",
    group: "主張する・提案する",
    meanings: ["宣言する"],
    accepts: ["声明する"],
    note: "proclaim peace = 平和を宣言する"
  },
  {
    id: 274,
    word: "remark",
    group: "主張する・提案する",
    meanings: ["述べる", "言う", "感想を述べる"],
    accepts: ["意見を述べる"],
    note: "remark on the difference = 相違について述べる"
  },
  {
    id: 275,
    word: "suggest",
    group: "主張する・提案する",
    meanings: ["提案する"],
    accepts: ["示唆する", "勧める"],
    note: "suggest having a rest = ちょっと休もうと提案する"
  },
  {
    id: 276,
    word: "warn",
    group: "主張する・提案する",
    meanings: ["警告する"],
    accepts: ["注意する", "知らせる"],
    note: "warn someone of danger = ～に危険を警告する"
  },
  {
    id: 277,
    word: "breathe",
    group: "口を通じて起きる現象",
    meanings: ["呼吸する"],
    accepts: ["息をする"],
    note: "breathe deeply = 深呼吸する"
  },
  {
    id: 278,
    word: "digest",
    group: "口を通じて起きる現象",
    meanings: ["消化する"],
    accepts: ["要約する"],
    note: "digest information = 情報を消化する"
  },
  {
    id: 279,
    word: "choke",
    group: "口を通じて起きる現象",
    meanings: ["窒息させる", "窒息する"],
    accepts: ["のどに詰まらせる"],
    note: "choke on one's food = 食べ物をのどに詰まらせる"
  },
  {
    id: 280,
    word: "pant",
    group: "口を通じて起きる現象",
    meanings: ["息を切らす", "喘ぎながら言う"],
    accepts: ["あえぐ"],
    note: "pant for air = あえいで息をする"
  },
  {
    id: 281,
    word: "sigh",
    group: "口を通じて起きる現象",
    meanings: ["ため息をつく", "ため息混じりに言う"],
    accepts: ["嘆息する"],
    note: "sigh with relief = 安堵のため息をつく"
  },
  {
    id: 282,
    word: "swear",
    group: "口を通じて起きる現象",
    meanings: ["誓う", "ののしる", "罵う"],
    accepts: ["悪態をつく"],
    note: "swear by God = 神にかけて誓う"
  },
  {
    id: 283,
    word: "cough",
    group: "口を通じて起きる現象",
    meanings: ["せきをする", "せき"],
    accepts: ["咳をする"],
    note: "cough up blood = 咳をして血を吐く"
  },
  {
    id: 284,
    word: "sneeze",
    group: "口を通じて起きる現象",
    meanings: ["くしゃみする", "くしゃみ"],
    accepts: ["くしゃみをする"],
    note: "sneeze into a handkerchief = ハンカチにくしゃみをする"
  },
  {
    id: 285,
    word: "suck",
    group: "口を通じて起きる現象",
    meanings: ["吸う", "吸うこと"],
    accepts: ["すする", "吸い込む"],
    note: "suck nectar from a flower = 花から蜜を吸う"
  },
  {
    id: 286,
    word: "swallow",
    group: "伝える・発信する",
    meanings: ["飲み込む", "抑える"],
    accepts: ["飲み下す", "こらえる"],
    note: "swallow one's pride = 自尊心を抑える"
  },
  {
    id: 287,
    word: "acquaint",
    group: "伝える・発信する",
    meanings: ["熟知させる", "知り合う"],
    accepts: ["知らせる", "知り合いになる"],
    note: "be acquainted with = ～をよく知っている"
  },
  {
    id: 288,
    word: "advertise",
    group: "伝える・発信する",
    meanings: ["宣伝する", "広告を出す"],
    accepts: ["広告する"],
    note: "advertisement = 広告"
  },
  {
    id: 289,
    word: "announce",
    group: "伝える・発信する",
    meanings: ["発表する", "立候補を表明する"],
    accepts: ["知らせる", "告知する"],
    note: "announcement = 発表"
  },
  {
    id: 290,
    word: "broadcast",
    group: "伝える・発信する",
    meanings: ["放送する", "放送が行われる"],
    accepts: ["放送される"],
    note: "broadcast live = 生放送する"
  },
  {
    id: 291,
    word: "convey",
    group: "伝える・発信する",
    meanings: ["運ぶ", "伝える"],
    accepts: ["運搬する", "伝達する"],
    note: "convey information = 情報を伝達する"
  },
  {
    id: 292,
    word: "inform",
    group: "説得する・教育する",
    meanings: ["知らせる", "情報を提供する"],
    accepts: ["通知する"],
    note: "inform someone of an accident = ～に事故を知らせる"
  },
  {
    id: 293,
    word: "educate",
    group: "説得する・教育する",
    meanings: ["教育する"],
    accepts: ["教える", "育てる"],
    note: "education = 教育"
  },
  {
    id: 294,
    word: "induce",
    group: "説得する・教育する",
    meanings: ["説いて～させる"],
    accepts: ["誘導する", "誘発する", "そそのかす"],
    note: "induce someone to buy = ～の購買心をそそる"
  },
  {
    id: 295,
    word: "intervene",
    group: "説得する・教育する",
    meanings: ["取りなす", "干渉する"],
    accepts: ["仲裁する", "介入する"],
    note: "intervene in politics = 政治に干渉する"
  },
  {
    id: 296,
    word: "mislead",
    group: "説得する・教育する",
    meanings: ["だます", "誤解させる"],
    accepts: ["欺く", "惑わす"],
    note: "misleading = 誤解を招きやすい"
  },
  {
    id: 297,
    word: "persuade",
    group: "説得する・教育する",
    meanings: ["説得する"],
    accepts: ["思いとどまらせる"],
    note: "persuade someone to compromise = 譲歩するよう説得する"
  },
  {
    id: 304,
    word: "testify",
    group: "認識する・気づく・疑う",
    meanings: ["証明する", "証言する"],
    accepts: ["立証する"],
    note: "testify about = ～について証言する"
  },
  {
    id: 305,
    word: "verify",
    group: "認識する・気づく・疑う",
    meanings: ["真実であることを証明する", "確認する"],
    accepts: ["立証する", "検証する"],
    note: "verify a claim = 主張を証明する"
  },
  {
    id: 306,
    word: "acknowledge",
    group: "認識する・気づく・疑う",
    meanings: ["認める"],
    accepts: ["承認する", "受け取る"],
    note: "acknowledge payment = 支払いを了承する"
  },
  {
    id: 307,
    word: "beware",
    group: "認識する・気づく・疑う",
    meanings: ["用心する", "注意する"],
    accepts: ["警戒する", "気をつける"],
    note: "beware of fire = 火に気をつける"
  },
  {
    id: 308,
    word: "comprehend",
    group: "認識する・気づく・疑う",
    meanings: ["理解する"],
    accepts: ["把握する"],
    note: "comprehension = 理解"
  },
  {
    id: 309,
    word: "doubt",
    group: "認識する・気づく・疑う",
    meanings: ["疑う", "疑い"],
    accepts: ["疑問に思う"],
    note: "doubt someone's ability = ～の能力を疑う"
  },
  {
    id: 310,
    word: "identify",
    group: "認識する・気づく・疑う",
    meanings: ["身元を確認する", "見解を同じくする"],
    accepts: ["特定する", "確認する"],
    note: "identify victims = 犠牲者の身元を明かす"
  },
  {
    id: 311,
    word: "interpret",
    group: "認識する・気づく・疑う",
    meanings: ["解釈する", "通訳する"],
    accepts: ["通訳をする"],
    note: "interpret English into Japanese = 英語を日本語に通訳する"
  },
  {
    id: 312,
    word: "notice",
    group: "認識する・気づく・疑う",
    meanings: ["気がつく", "注目", "通知"],
    accepts: ["気づく"],
    note: "notice a difference = 違いに気づく"
  },
  {
    id: 313,
    word: "perceive",
    group: "認識する・気づく・疑う",
    meanings: ["気づく", "知覚する"],
    accepts: ["認識する"],
    note: "perceive the difference between = ～間の違いに気づく"
  },
  {
    id: 314,
    word: "recognize",
    group: "認識する・気づく・疑う",
    meanings: ["～と分かる"],
    accepts: ["認識する", "見分ける", "承認する", "分かる"],
    note: "recognize a human face = 人間の顔を見分ける"
  },
  {
    id: 315,
    word: "regard",
    group: "認識する・気づく・疑う",
    meanings: ["～を…とみなす", "注意を払う"],
    accepts: ["みなす", "考える"],
    note: "regard A as B = AをBとみなす"
  },
  {
    id: 316,
    word: "obsess",
    group: "認識する・気づく・疑う",
    meanings: ["取りつく", "こだわる", "気にする"],
    accepts: ["執着する"],
    note: "be obsessed with = ～に取りつかれる"
  },
  {
    id: 317,
    word: "suspect",
    group: "考える・思う・意図する",
    meanings: ["～らしいと疑う", "怪しむ"],
    accepts: ["疑う"],
    note: "suspect someone of lying = ～がうそをついていると疑う"
  },
  {
    id: 318,
    word: "conceive",
    group: "考える・思う・意図する",
    meanings: ["考え出す", "想像する"],
    accepts: ["思いつく", "考案する"],
    note: "conceive of the idea of = ～のアイデアを考え出す"
  },
  {
    id: 319,
    word: "consider",
    group: "考える・思う・意図する",
    meanings: ["熟考する"],
    accepts: ["検討する", "考える", "考慮する"],
    note: "consider a problem = 問題を検討する"
  },
  {
    id: 320,
    word: "contemplate",
    group: "考える・思う・意図する",
    meanings: ["熟考する"],
    accepts: ["じっくり考える", "検討する"],
    note: "contemplate a job switch = 転職を検討する"
  },
  {
    id: 321,
    word: "ponder",
    group: "考える・思う・意図する",
    meanings: ["熟考する"],
    accepts: ["じっくり考える", "思案する"],
    note: "ponder the question = 問題をじっくり考える"
  },
  {
    id: 322,
    word: "contrive",
    group: "考える・思う・意図する",
    meanings: ["もくろむ"],
    accepts: ["企てる", "工夫する", "考案する"],
    note: "contrive a plot = 陰謀を企てる"
  },
  {
    id: 323,
    word: "suppose",
    group: "考える・思う・意図する",
    meanings: ["～と思う", "仮定する"],
    accepts: ["思う", "想定する"],
    note: "suppose so = そう思う"
  },
  {
    id: 324,
    word: "intend",
    group: "考える・思う・意図する",
    meanings: ["つもりである", "目的をもつ"],
    accepts: ["意図する"],
    note: "intend to become = ～を志す"
  },
  {
    id: 325,
    word: "anticipate",
    group: "予想する・推察する",
    meanings: ["予想する", "予測する"],
    accepts: ["期待する", "見込む"],
    note: "anticipate trouble = 面倒になると予想する"
  },
  {
    id: 326,
    word: "assume",
    group: "予想する・推察する",
    meanings: ["当然のことと思う"],
    accepts: ["思い込む", "想定する", "仮定する"],
    note: "assume someone's forgiveness = ～が許してくれると思う"
  },
  {
    id: 327,
    word: "estimate",
    group: "予想する・推察する",
    meanings: ["見積もる", "見積もりをする"],
    accepts: ["推定する"],
    note: "estimate the damage at = 損害額を～と見積もる"
  },
  {
    id: 328,
    word: "expect",
    group: "予想する・推察する",
    meanings: ["予期する", "思う"],
    accepts: ["期待する", "予想する"],
    note: "expect a prompt answer = 即答を期待する"
  },
  {
    id: 329,
    word: "foresee",
    group: "予想する・推察する",
    meanings: ["予感する"],
    accepts: ["予見する", "見通す"],
    note: "foresee the results = 結果を予測する"
  },
  {
    id: 330,
    word: "forecast",
    group: "予想する・推察する",
    meanings: ["予測する"],
    accepts: ["予報する"],
    note: "weather forecast = 天気予報"
  },
  {
    id: 331,
    word: "presume",
    group: "予想する・推察する",
    meanings: ["推定する", "推量する"],
    accepts: ["見なす", "思う"],
    note: "presume someone's innocence = ～の無罪を推定する"
  },
  {
    id: 332,
    word: "predict",
    group: "予想する・推察する",
    meanings: ["予言する"],
    accepts: ["予測する"],
    note: "predict an earthquake = 地震を予知する"
  },
  {
    id: 333,
    word: "speculate",
    group: "予想する・推察する",
    meanings: ["推測する", "あれこれ考える"],
    accepts: ["思いを巡らす"],
    note: "speculate about motives = 動機について考える"
  },
  {
    id: 334,
    word: "apologize",
    group: "嘆く・後悔する・謝罪する",
    meanings: ["謝罪する"],
    accepts: ["謝る"],
    note: "apologize for causing trouble = 騒動を起こしたことを謝罪する"
  },
  {
    id: 335,
    word: "lament",
    group: "嘆く・後悔する・謝罪する",
    meanings: ["嘆き悲しむ", "悲しむ"],
    accepts: ["嘆く"],
    note: "lament one's misfortunes = 身の不運を嘆く"
  },
  {
    id: 336,
    word: "mourn",
    group: "嘆く・後悔する・謝罪する",
    meanings: ["嘆く", "追悼する"],
    accepts: ["悼む"],
    note: "mourn someone's death = ～の死を悼む"
  },
  {
    id: 337,
    word: "regret",
    group: "嘆く・後悔する・謝罪する",
    meanings: ["後悔する", "遺憾"],
    accepts: ["残念に思う"],
    note: "regret one's remarks = 発言を後悔する"
  },
  {
    id: 338,
    word: "arouse",
    group: "目を覚ます・目がくらむ",
    meanings: ["誘発する", "かき立てる", "目を覚ます"],
    accepts: ["呼び起こす", "刺激する"],
    note: "arouse interest in = ～への興味をかき立てる"
  },
  {
    id: 339,
    word: "awaken",
    group: "目を覚ます・目がくらむ",
    meanings: ["目を覚まさせる", "目が覚める"],
    accepts: ["目覚める", "呼び起こす"],
    note: "awaken from a dream = 夢から目が覚める"
  },
  {
    id: 340,
    word: "dazzle",
    group: "目を覚ます・目がくらむ",
    meanings: ["目をくらませる", "目がくらむ"],
    accepts: ["まぶしくする"],
    note: "be dazzled by sunlight = 日光に目がくらむ"
  },
  {
    id: 341,
    word: "amuse",
    group: "魅了する・満たす",
    meanings: ["楽しませる", "おもしろがらせる"],
    accepts: ["遊ばせる"],
    note: "amuse oneself in a game = 遊技に興じる"
  },
  {
    id: 342,
    word: "attract",
    group: "魅了する・満たす",
    meanings: ["引きつける"],
    accepts: ["魅了する"],
    note: "attract buyers = 買い手を引きつける"
  },
  {
    id: 343,
    word: "captivate",
    group: "魅了する・満たす",
    meanings: ["心を奪う"],
    accepts: ["魅了する"],
    note: "be captivated by someone's voice = ～の声に魅了される"
  },
  {
    id: 344,
    word: "enchant",
    group: "魅了する・満たす",
    meanings: ["大いに喜ばせる"],
    accepts: ["魅了する", "うっとりさせる"],
    note: "be enchanted by the performance = 演技に魅了される"
  },
  {
    id: 345,
    word: "entertain",
    group: "魅了する・満たす",
    meanings: ["楽しませる", "もてなす", "楽しむ"],
    accepts: ["歓待する"],
    note: "entertain a client = 客をもてなす"
  },
  {
    id: 346,
    word: "fascinate",
    group: "魅了する・満たす",
    meanings: ["魅了する", "人の心を奪う"],
    accepts: ["惹きつける"],
    note: "fascinate the audience = 観客を魅了する"
  },
  {
    id: 347,
    word: "impress",
    group: "魅了する・満たす",
    meanings: ["感銘させる", "感動させる", "好印象をもたらす"],
    accepts: ["印象づける"],
    note: "impress the audience = 観客に感銘を与える"
  },
  {
    id: 348,
    word: "overwhelm",
    group: "魅了する・満たす",
    meanings: ["圧倒する"],
    accepts: ["圧倒される"],
    note: "be overwhelmed with emotion = 感情で胸がいっぱいになる"
  },
  {
    id: 349,
    word: "preoccupy",
    group: "魅了する・満たす",
    meanings: ["夢中にさせる"],
    accepts: ["心を奪う", "気を取られる"],
    note: "be preoccupied by work = 仕事に気を取られる"
  },
  {
    id: 350,
    word: "urge",
    group: "魅了する・満たす",
    meanings: ["駆り立てる", "衝動"],
    accepts: ["促す", "催促する"],
    note: "urge payment = 支払いを催促する"
  },
  {
    id: 351,
    word: "satisfy",
    group: "魅了する・満たす",
    meanings: ["満足させる"],
    accepts: ["満たす"],
    note: "satisfy one's customers = 客を満足させる"
  },
  {
    id: 352,
    word: "indulge",
    group: "魅了する・満たす",
    meanings: ["ふける", "満足させる"],
    accepts: ["甘やかす"],
    note: "indulge in one's hobby = 道楽にふける"
  }
];
