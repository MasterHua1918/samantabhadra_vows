(() => {
  "use strict";

  const countlessBuddhasUi = {
    zh: {
      label: "第一願・禮敬諸佛",
      title: "可是，要禮敬多少佛？",
      sudhana: "善財",
      question: "普賢菩薩說「禮敬諸佛」……那究竟要禮敬多少佛呢？",
      hint: "眼前先出現了一尊佛。答案會只是一尊嗎？",
      explore: "開始尋找",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Vow 1 · Honoring All Buddhas",
      title: "But how many Buddhas are there to honor?",
      sudhana: "Sudhana",
      question: "Samantabhadra speaks of “honoring all Buddhas”... so how many Buddhas are there to honor?",
      hint: "At first, one Buddha appears before us. Could the answer be only one?",
      explore: "Begin the search",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Nguyện thứ nhất · Lễ kính chư Phật",
      title: "Nhưng phải lễ kính bao nhiêu vị Phật?",
      sudhana: "Thiện Tài",
      question: "Bồ Tát Phổ Hiền nói “lễ kính chư Phật”... vậy rốt cuộc phải lễ kính bao nhiêu vị Phật?",
      hint: "Trước mắt, một vị Phật xuất hiện. Có phải câu trả lời chỉ là một vị không?",
      explore: "Bắt đầu tìm hiểu",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const challengeUi = {

  zh: {

    vowLabel:
      "第一願・禮敬諸佛",

    observed:
      "已觀察",

    thought:
      "他心裡正在想……",

    sudhana:
      "善財",

    discovery:
      "發現",

    continue:
      "繼續觀察其他人",

    learningLabel:
      "善財的發現",

    completeTitle:
      "原來，同樣是「拜佛」，心可以完全不同。",

    prideTitle:
      "我慢",

    prideText:
      "身體低下，心卻在和別人比較。",

    fameTitle:
      "求名",

    fameText:
      "看似恭敬，其實希望別人讚歎自己。",

    distractedTitle:
      "心不在場",

    distractedText:
      "身體在拜，心卻跑到別的地方去了。",

    sincereTitle:
      "至誠",

    sincereText:
      "身在拜，心也在拜。",

    keyLabel:
      "第一個發現",

    keyText:
      "真正的禮敬，不只看「做了什麼」，還要看「用什麼心去做」。",

    next:
      "那麼，經文怎麼說？",

    changeLanguage:
      "更改語言",

    back:
      "返回"

  },


  en: {

    vowLabel:
      "Vow 1 · Honoring All Buddhas",

    observed:
      "Explored",

    thought:
      "What is this person thinking?",

    sudhana:
      "Sudhana",

    discovery:
      "Discovery",

    continue:
      "Observe the others",

    learningLabel:
      "Sudhana's Discovery",

    completeTitle:
      "The same outward bow can come from very different states of mind.",

    prideTitle:
      "Pride",

    prideText:
      "The body bows down, while the mind compares itself with others.",

    fameTitle:
      "Seeking Recognition",

    fameText:
      "It looks respectful, but the real hope is to receive praise from others.",

    distractedTitle:
      "An Absent Mind",

    distractedText:
      "The body is bowing, but the mind has wandered somewhere else.",

    sincereTitle:
      "Sincerity",

    sincereText:
      "The body bows, and the mind bows too.",

    keyLabel:
      "First Discovery",

    keyText:
      "True reverence is not only about what we do, but also the state of mind with which we do it.",

    next:
      "What does the sutra say?",

    changeLanguage:
      "Change language",

    back:
      "Back"

  },


  vi: {

    vowLabel:
      "Nguyện thứ nhất · Lễ kính chư Phật",

    observed:
      "Đã quan sát",

    thought:
      "Trong tâm người này đang nghĩ gì?",

    sudhana:
      "Thiện Tài",

    discovery:
      "Điều khám phá",

    continue:
      "Tiếp tục quan sát những người khác",

    learningLabel:
      "Khám phá của Thiện Tài",

    completeTitle:
      "Cùng một động tác lễ Phật, nhưng tâm niệm có thể hoàn toàn khác nhau.",

    prideTitle:
      "Ngã mạn",

    prideText:
      "Thân cúi xuống, nhưng tâm lại so sánh mình với người khác.",

    fameTitle:
      "Cầu danh",

    fameText:
      "Bề ngoài có vẻ cung kính, nhưng trong lòng lại mong được người khác khen ngợi.",

    distractedTitle:
      "Tâm không hiện diện",

    distractedText:
      "Thân đang lễ, nhưng tâm đã chạy đi nơi khác.",

    sincereTitle:
      "Chí thành",

    sincereText:
      "Thân đang lễ, và tâm cũng đang lễ.",

    keyLabel:
      "Khám phá đầu tiên",

    keyText:
      "Sự lễ kính chân thật không chỉ nằm ở việc ta làm gì, mà còn ở tâm niệm khi ta thực hiện điều đó.",

    next:
      "Kinh văn nói thế nào?",

    changeLanguage:
      "Đổi ngôn ngữ",

    back:
      "Quay lại"

  }

};

  const karmaUi = {

    zh: {
      screenLabel: "經文怎麼說？",
      screenTitle: "普賢菩薩把答案說得更深了一層",
      source: "《普賢行願品》",
      quote: "深心信解，如對目前，悉以清淨身語意業，常修禮敬。",
      sudhana: "善財",
      sudhanaQuestion: "原來真正的禮敬，不只是身體做了一個動作。那麼「身、語、意」究竟是什麼意思呢？",
      instruction: "點擊「身、語、意」，和善財一起看看。",
      progress: "已理解",
      bodyTitle: "身",
      bodyShort: "我的行動",
      bodyExplanation: "「身」是我們實際做出的行為。禮敬時，身體恭敬，不輕慢、不敷衍。",
      bodyExample: "剛才有些人外表也在拜，所以只有身體的動作，還不能完整代表真正的禮敬。",
      speechTitle: "語",
      speechShort: "我的言語",
      speechExplanation: "「語」是我們說出的話。清淨的語業，不用言語輕慢、譏諷或傷害，而以恭敬心說話。",
      speechExample: "一個人即使正在拜佛，如果離開佛前便用言語輕慢別人，這份恭敬還沒有貫穿他的語業。",
      mindTitle: "意",
      mindShort: "我的心念",
      mindExplanation: "「意」是心中的念頭。經文說「深心信解，如對目前」——禮敬時，心也真正專注、信解而恭敬。",
      mindExample: "這正是剛才我慢、求名和心不在場的關鍵：動作相似，內心卻完全不同。",
      exampleLabel: "回看剛才",
      understood: "我明白了",
      completeLabel: "善財明白了",
      completeTitle: "真正的禮敬，要讓身、語、意一起恭敬。",
      completeExplanation: "所以問題不只是「我有沒有拜」，而是當我禮敬時，身體、言語和心念，是否都在清淨而專一地恭敬。",
      connectionLabel: "再看一次經文",
      connectionText: "「悉以清淨身語意業，常修禮敬。」",
      rewardLabel: "獲得第一片行願花瓣",
      rewardName: "清淨身・語・意",
      next: "可是，要禮敬多少佛？",
      back: "返回",
      changeLanguage: "更改語言"
    },

    en: {
      screenLabel: "What does the sutra say?",
      screenTitle: "Samantabhadra takes the answer one level deeper",
      source: "The Conduct and Vows of Samantabhadra",
      quote: "With deep faith and understanding, as though the Buddhas were directly before me, I constantly practice reverence with pure body, speech, and mind.",
      sudhana: "Sudhana",
      sudhanaQuestion: "So true reverence is more than making a physical bow. What do “body, speech, and mind” mean here?",
      instruction: "Open body, speech, and mind and discover them with Sudhana.",
      progress: "Understood",
      bodyTitle: "Body",
      bodyShort: "My actions",
      bodyExplanation: "“Body” means what we actually do. In reverence, our physical actions are respectful rather than careless or dismissive.",
      bodyExample: "Some of the worshippers we just observed were also physically bowing. So the outward action alone does not yet reveal complete reverence.",
      speechTitle: "Speech",
      speechShort: "My words",
      speechExplanation: "“Speech” means the words we use. Pure speech does not belittle, mock, or harm; it expresses respect.",
      speechExample: "If someone bows before a Buddha but then speaks contemptuously to others, reverence has not yet permeated that person's speech.",
      mindTitle: "Mind",
      mindShort: "My thoughts",
      mindExplanation: "“Mind” refers to our inner intention. The sutra speaks of deep faith and understanding and of being as though the Buddhas were directly before us: the mind itself is attentive and reverent.",
      mindExample: "This is the key to the pride, desire for recognition, and distraction we just observed: the outward action looked similar, but the minds were very different.",
      exampleLabel: "Look back at what you saw",
      understood: "I understand",
      completeLabel: "Sudhana Understands",
      completeTitle: "True reverence involves body, speech, and mind together.",
      completeExplanation: "The question is therefore not merely “Did I bow?” but whether my actions, words, and thoughts are all participating in sincere and pure reverence.",
      connectionLabel: "Look at the sutra again",
      connectionText: "“With pure body, speech, and mind, I constantly practice reverence.”",
      rewardLabel: "First Practice Petal Acquired",
      rewardName: "Pure Body · Speech · Mind",
      next: "But how many Buddhas are there to honor?",
      back: "Back",
      changeLanguage: "Change language"
    },

    vi: {
      screenLabel: "Kinh văn nói thế nào?",
      screenTitle: "Bồ Tát Phổ Hiền đưa câu trả lời đi sâu thêm một tầng",
      source: "Phẩm Phổ Hiền Hạnh Nguyện",
      quote: "Thâm tâm tín giải, như đối trước mắt, đều dùng thân, khẩu, ý nghiệp thanh tịnh mà thường tu lễ kính.",
      sudhana: "Thiện Tài",
      sudhanaQuestion: "Thì ra lễ kính chân thật không chỉ là một động tác của thân. Vậy “thân, khẩu, ý” ở đây có nghĩa gì?",
      instruction: "Hãy mở thân, khẩu và ý để cùng Thiện Tài khám phá.",
      progress: "Đã hiểu",
      bodyTitle: "Thân",
      bodyShort: "Hành động của tôi",
      bodyExplanation: "“Thân” là những hành động thực tế của chúng ta. Khi lễ kính, hành động của thân phải cung kính, không khinh mạn hay qua loa.",
      bodyExample: "Những người vừa rồi bên ngoài cũng đều đang lễ Phật. Vì vậy, chỉ có động tác của thân vẫn chưa đủ để biểu hiện trọn vẹn sự lễ kính chân thật.",
      speechTitle: "Khẩu",
      speechShort: "Lời nói của tôi",
      speechExplanation: "“Khẩu” là lời chúng ta nói. Khẩu nghiệp thanh tịnh không dùng lời khinh thường, chế giễu hay làm tổn thương, mà nói với tâm cung kính.",
      speechExample: "Nếu một người lễ Phật nhưng sau đó lại dùng lời khinh mạn với người khác, sự cung kính ấy vẫn chưa thấm vào khẩu nghiệp.",
      mindTitle: "Ý",
      mindShort: "Tâm niệm của tôi",
      mindExplanation: "“Ý” là những niệm trong tâm. Kinh nói “thâm tâm tín giải, như đối trước mắt” — khi lễ kính, tâm cũng thật sự chuyên chú, tin hiểu và cung kính.",
      mindExample: "Đây chính là điểm then chốt của ngã mạn, cầu danh và tâm tán loạn vừa rồi: động tác bên ngoài tương tự, nhưng nội tâm hoàn toàn khác nhau.",
      exampleLabel: "Nhìn lại điều vừa thấy",
      understood: "Tôi hiểu rồi",
      completeLabel: "Thiện Tài đã hiểu",
      completeTitle: "Lễ kính chân thật cần có sự cung kính của cả thân, khẩu và ý.",
      completeExplanation: "Vì vậy, vấn đề không chỉ là “Tôi có lễ hay không?”, mà là khi lễ kính, hành động, lời nói và tâm niệm của tôi có thật sự thanh tịnh, chuyên nhất và cung kính hay không.",
      connectionLabel: "Xem lại kinh văn",
      connectionText: "“Đều dùng thân, khẩu, ý nghiệp thanh tịnh mà thường tu lễ kính.”",
      rewardLabel: "Nhận được cánh hoa Hạnh Nguyện đầu tiên",
      rewardName: "Thanh tịnh Thân · Khẩu · Ý",
      next: "Nhưng phải lễ kính bao nhiêu vị Phật?",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }

  };

  const buddhaExpansionUi = {
    zh: {
      label: "第二個探索",
      title: "先從眼前這一尊佛開始",
      instruction: "點擊眼前的佛，看看善財的尋找會把我們帶到哪裡。",
      countLabel: "目前看見",
      countValue: "1",
      countUnit: "尊佛",
      sudhana: "善財",
      sudhanaText: "眼前是一尊佛。可是普賢菩薩說的是「禮敬諸佛」……答案真的只有這一尊嗎？",
      discoveryLabel: "善財的發現",
      discovery: "這只是一個開始。再往外看，還有更多佛、更多佛剎……",
      next: "繼續往外尋找",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Second Exploration",
      title: "Begin with the Buddha before us",
      instruction: "Click the Buddha before you and see where Sudhana's search leads.",
      countLabel: "Now visible",
      countValue: "1",
      countUnit: "Buddha",
      sudhana: "Sudhana",
      sudhanaText: "One Buddha is before us. But Samantabhadra speaks of “honoring all Buddhas”... can the answer really be only this one?",
      discoveryLabel: "Sudhana's Discovery",
      discovery: "This is only the beginning. Look farther outward: there are more Buddhas, and more Buddha lands...",
      next: "Continue looking outward",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Khám phá thứ hai",
      title: "Hãy bắt đầu từ vị Phật trước mắt",
      instruction: "Hãy nhấp vào vị Phật trước mắt và xem hành trình tìm hiểu của Thiện Tài sẽ dẫn chúng ta đến đâu.",
      countLabel: "Hiện đang thấy",
      countValue: "1",
      countUnit: "vị Phật",
      sudhana: "Thiện Tài",
      sudhanaText: "Trước mắt là một vị Phật. Nhưng Bồ Tát Phổ Hiền nói “lễ kính chư Phật”... lẽ nào câu trả lời thật sự chỉ là một vị này?",
      discoveryLabel: "Khám phá của Thiện Tài",
      discovery: "Đây mới chỉ là khởi đầu. Nhìn rộng ra nữa, còn có nhiều vị Phật và nhiều cõi Phật hơn...",
      next: "Tiếp tục nhìn rộng ra",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const buddhaRealmsUi = {
    zh: {
      label: "第三個探索",
      title: "答案究竟有多大？",
      instruction: "一次一次向外展開，看看「諸佛」會把善財帶到哪裡。",
      countLabel: "正在展開",
      countUnit: "尊佛",
      stages: [
        {
          count: "1",
          button: "向外尋找",
          sudhana: "先從眼前這一尊佛開始。"
        },
        {
          count: "10",
          button: "再向外尋找",
          sudhana: "不只眼前這一尊。當視野展開，我看見更多佛。"
        },
        {
          count: "100",
          button: "繼續展開",
          sudhana: "再往外，數量還在增加。"
        },
        {
          count: "10,000",
          button: "看向更多佛剎",
          sudhana: "原來不只是更多佛，還有更多佛剎。"
        },
        {
          count: "十方三世",
          button: "再往外看",
          sudhana: "空間展向十方，時間遍及過去、現在、未來。"
        },
        {
          count: "∞",
          button: "看看經文怎麼說",
          sudhana: "我已經不能用普通的數目去想像了……"
        }
      ],
      sutraLabel: "經文揭示",
      source: "《普賢行願品》",
      quote: "\u76e1\u6cd5\u754c\u3001\u865b\u7a7a\u754c\uff0c\u5341\u65b9\u4e09\u4e16\u4e00\u5207\u4f5b\u524e\u6975\u5fae\u5875\u6578\u8af8\u4f5b\u4e16\u5c0a\u2026\u2026",
      realization: "原來普賢菩薩的禮敬，沒有一個「最後」。",
      rewardLabel: "獲得第二片行願花瓣",
      rewardName: "禮敬無盡",
      next: "可是，這份禮敬要持續多久？",
      back: "返回",
      changeLanguage: "更改語言"
    },

    en: {
      label: "Third Exploration",
      title: "How vast is the answer?",
      instruction: "Keep expanding outward and discover where “all Buddhas” leads Sudhana.",
      countLabel: "Expanding to",
      countUnit: "Buddhas",
      stages: [
        {
          count: "1",
          button: "Look farther outward",
          sudhana: "I begin with the one Buddha before me."
        },
        {
          count: "10",
          button: "Look farther still",
          sudhana: "Not only this one Buddha. As my view expands, I see more Buddhas."
        },
        {
          count: "100",
          button: "Keep expanding",
          sudhana: "Farther outward, the number keeps growing."
        },
        {
          count: "10,000",
          button: "Look toward more Buddha lands",
          sudhana: "It is not only more Buddhas; there are more Buddha lands as well."
        },
        {
          count: "Ten directions · three periods",
          button: "Look beyond this",
          sudhana: "Space opens through the ten directions, and time spans past, present, and future."
        },
        {
          count: "∞",
          button: "See what the sutra says",
          sudhana: "Ordinary numbers can no longer contain what I am seeing..."
        }
      ],
      sutraLabel: "The Sutra Reveals",
      source: "The Conduct and Vows of Samantabhadra",
      quote: "Throughout the Dharma Realm and the realm of empty space, in all Buddha lands of the ten directions and the three periods, there are Buddhas as numerous as the finest dust motes...",
      realization: "Samantabhadra's reverence has no final Buddha at which it stops.",
      rewardLabel: "Second Practice Petal Acquired",
      rewardName: "Reverence Without End",
      next: "But how long should this reverence continue?",
      back: "Back",
      changeLanguage: "Change language"
    },

    vi: {
      label: "Khám phá thứ ba",
      title: "Câu trả lời rộng lớn đến mức nào?",
      instruction: "Hãy tiếp tục mở rộng tầm nhìn để xem “chư Phật” sẽ đưa Thiện Tài đến đâu.",
      countLabel: "Đang mở rộng đến",
      countUnit: "vị Phật",
      stages: [
        {
          count: "1",
          button: "Nhìn rộng ra",
          sudhana: "Tôi bắt đầu từ vị Phật ngay trước mắt."
        },
        {
          count: "10",
          button: "Tiếp tục nhìn rộng",
          sudhana: "Không chỉ có vị Phật trước mắt. Khi tầm nhìn mở rộng, tôi thấy thêm nhiều vị Phật."
        },
        {
          count: "100",
          button: "Tiếp tục mở rộng",
          sudhana: "Càng nhìn xa, số lượng vẫn tiếp tục tăng."
        },
        {
          count: "10.000",
          button: "Nhìn đến nhiều cõi Phật hơn",
          sudhana: "Không chỉ có thêm nhiều vị Phật, mà còn có thêm nhiều cõi Phật."
        },
        {
          count: "Mười phương · ba đời",
          button: "Nhìn xa hơn nữa",
          sudhana: "Không gian trải khắp mười phương, thời gian bao trùm quá khứ, hiện tại và vị lai."
        },
        {
          count: "∞",
          button: "Xem kinh văn nói thế nào",
          sudhana: "Những con số thông thường đã không còn đủ để diễn tả điều tôi đang thấy..."
        }
      ],
      sutraLabel: "Kinh văn khai thị",
      source: "Phẩm Phổ Hiền Hạnh Nguyện",
      quote: "Tận pháp giới, hư không giới, trong tất cả cõi Phật khắp mười phương ba đời, có chư Phật Thế Tôn nhiều như số vi trần cực nhỏ...",
      realization: "Thì ra sự lễ kính của Bồ Tát Phổ Hiền không có một vị Phật “cuối cùng”.",
      rewardLabel: "Nhận được cánh hoa Hạnh Nguyện thứ hai",
      rewardName: "Lễ kính vô tận",
      next: "Nhưng sự lễ kính này phải tiếp tục bao lâu?",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const continuousReverenceUi = {
    zh: {
      label: "第三個發現",
      title: "這份禮敬，要持續多久？",
      sudhana: "善財",
      question: "如果要禮敬無盡的諸佛，那這份恭敬，是做一次就完成了嗎？",
      instruction: "和善財一起向時間的遠方走，看看普賢菩薩的行願會在哪裡停止。",
      stages: [
        { icon: "☀️", label: "今天", text: "今天，我可以恭敬地禮敬。" },
        { icon: "🌅", label: "明天", text: "到了明天，這份恭敬仍然繼續。" },
        { icon: "🌱", label: "一年後", text: "時間過去，行願沒有因為日子久了而停止。" },
        { icon: "🌳", label: "很多年後", text: "即使走過很長的歲月，仍然一次又一次地修習。" },
        { icon: "∞", label: "無有窮盡", text: "原來普賢菩薩說的，不是一段短暫的恭敬，而是念念相續。" }
      ],
      forward: ["走到明天", "再往前一年", "繼續走下去", "走向更久以後", "看看經文怎麼說"],
      sutraLabel: "經文揭示",
      source: "《普賢行願品》",
      quoteOne: "我此禮敬，無有窮盡。",
      quoteTwo: "念念相續，無有間斷，身語意業，無有疲厭。",
      discoveryLabel: "善財的發現",
      discovery: "禮敬不只要廣大到無盡的諸佛，也要在時間中不斷延續。每一念，都可以重新生起恭敬。",
      rewardLabel: "獲得第三片行願花瓣",
      rewardName: "念念相續",
      next: "把這份禮敬帶回生活",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Third Discovery",
      title: "How long should this reverence continue?",
      sudhana: "Sudhana",
      question: "If there are boundless Buddhas to honor, is this reverence something we practice only once?",
      instruction: "Travel forward through time with Sudhana and discover where Samantabhadra's practice comes to an end.",
      stages: [
        { icon: "☀️", label: "Today", text: "Today, I can practice reverence." },
        { icon: "🌅", label: "Tomorrow", text: "Tomorrow, this reverence continues." },
        { icon: "🌱", label: "One year later", text: "As time passes, the practice does not stop simply because many days have gone by." },
        { icon: "🌳", label: "Many years later", text: "Even after many years, the practice is renewed again and again." },
        { icon: "∞", label: "Without end", text: "Samantabhadra is describing more than a brief moment of reverence: it continues thought after thought." }
      ],
      forward: ["Go to tomorrow", "Move forward one year", "Keep going", "Travel farther into the future", "See what the sutra says"],
      sutraLabel: "The Sutra Reveals",
      source: "The Conduct and Vows of Samantabhadra",
      quoteOne: "This reverence of mine shall have no end.",
      quoteTwo: "Thought after thought it continues without interruption; in body, speech, and mind, there is no weariness.",
      discoveryLabel: "Sudhana's Discovery",
      discovery: "Reverence is not only vast enough to embrace boundless Buddhas; it also continues through time. With each thought, reverence can arise anew.",
      rewardLabel: "Third Practice Petal Acquired",
      rewardName: "Continuing Thought After Thought",
      next: "Bring this reverence into daily life",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Khám phá thứ ba",
      title: "Sự lễ kính này phải tiếp tục bao lâu?",
      sudhana: "Thiện Tài",
      question: "Nếu phải lễ kính vô lượng chư Phật, thì sự cung kính này có phải chỉ thực hành một lần là xong không?",
      instruction: "Hãy cùng Thiện Tài đi về phía trước trong dòng thời gian để xem hạnh nguyện của Bồ Tát Phổ Hiền dừng lại ở đâu.",
      stages: [
        { icon: "☀️", label: "Hôm nay", text: "Hôm nay, tôi có thể thực hành lễ kính." },
        { icon: "🌅", label: "Ngày mai", text: "Đến ngày mai, sự cung kính này vẫn tiếp tục." },
        { icon: "🌱", label: "Một năm sau", text: "Thời gian trôi qua, hạnh nguyện không dừng lại chỉ vì ngày tháng đã lâu." },
        { icon: "🌳", label: "Nhiều năm sau", text: "Dù đã trải qua nhiều năm, sự tu tập vẫn được tiếp nối hết lần này đến lần khác." },
        { icon: "∞", label: "Không cùng tận", text: "Bồ Tát Phổ Hiền không nói về một khoảnh khắc cung kính ngắn ngủi, mà là niệm niệm tương tục." }
      ],
      forward: ["Đi đến ngày mai", "Tiến thêm một năm", "Tiếp tục đi", "Đi xa hơn vào tương lai", "Xem kinh văn nói thế nào"],
      sutraLabel: "Kinh văn khai thị",
      source: "Phẩm Phổ Hiền Hạnh Nguyện",
      quoteOne: "Sự lễ kính này của tôi không có cùng tận.",
      quoteTwo: "Niệm niệm tương tục, không hề gián đoạn; thân, khẩu, ý nghiệp không hề mệt mỏi.",
      discoveryLabel: "Khám phá của Thiện Tài",
      discovery: "Lễ kính không chỉ rộng lớn đến vô lượng chư Phật, mà còn liên tục trong thời gian. Mỗi một niệm đều có thể làm khởi lên tâm cung kính.",
      rewardLabel: "Nhận được cánh hoa Hạnh Nguyện thứ ba",
      rewardName: "Niệm niệm tương tục",
      next: "Mang sự lễ kính này trở về đời sống",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const dailyReverenceUi = {
    zh: {
      label: "第四個探索・回到生活",
      bridgeLabel: "接下來的挑戰",
      title: "離開佛堂以後呢？",
      sudhana: "善財",
      sudhanaText: "佛前我知道要恭敬……可是離開佛堂以後呢？",
      bridge: "如果「念念相續」不是只在佛前才有，那麼日常生活中的每一次相遇，也是在練習我的身、語、意。",
      instruction: "跟善財回到現代生活。下一個挑戰，不是看你會不會拜佛，而是看恭敬能不能真正走進你的行動。",
      start: "進入生活挑戰",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Fourth Exploration · Back to Daily Life",
      bridgeLabel: "The Next Challenge",
      title: "What happens after leaving the Buddha hall?",
      sudhana: "Sudhana",
      sudhanaText: "Before the Buddha, I know I should be reverent... but what about after I leave the Buddha hall?",
      bridge: "If “continuing thought after thought” is not limited to moments before the Buddha, then every encounter in daily life becomes a chance to practice with body, speech, and mind.",
      instruction: "Return to modern life with Sudhana. The next challenge is not whether you know how to bow, but whether reverence can truly enter your actions.",
      start: "Enter the daily-life challenge",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Khám phá thứ tư · Trở về đời sống",
      bridgeLabel: "Thử thách tiếp theo",
      title: "Sau khi rời Phật đường thì sao?",
      sudhana: "Thiện Tài",
      sudhanaText: "Trước Phật, con biết phải cung kính... nhưng sau khi rời Phật đường thì sao?",
      bridge: "Nếu “niệm niệm tương tục” không chỉ có trước Phật, thì mỗi lần gặp gỡ trong đời sống hằng ngày cũng là cơ hội để thực tập bằng thân, khẩu và ý.",
      instruction: "Hãy cùng Thiện Tài trở về đời sống hiện đại. Thử thách tiếp theo không phải xem bạn có biết lễ Phật hay không, mà là xem sự cung kính có thật sự đi vào hành động của bạn hay không.",
      start: "Bước vào thử thách đời sống",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const dailyChoiceUi = {
    zh: {
      label: "生活挑戰・第一關",
      title: "趕時間的時候，我還看得見別人嗎？",
      situation: "你正趕著去下一個地方。前面的地板剛拖過，清潔人員還在整理濕漉漉的地面。",
      sudhana: "善財",
      sudhanaText: "我只是想快一點通過……可是，我的方便，會不會變成別人的麻煩？",
      instruction: "你會怎麼做？",
      resultLabel: "看看發生了什麼",
      rushTitle: "直接快步走過去",
      rushText: "我真的很趕時間，只走一下應該沒關係。",
      waitTitle: "停一下，繞開剛清潔的地方",
      waitText: "多花一點時間，避免踩髒別人剛整理好的地面。",
      rushResult: "你快步走過濕地，留下了一串泥濘腳印。清潔人員只好重新把那一段地板拖一次。",
      waitResult: "你停了一下，繞開濕地。你只是多花了一點時間，卻沒有讓別人重新做一次已經完成的工作。",
      resultLabel: "善財看見了什麼？",
      reflectionLabel: "善財的反思",
      rushReflection: "原來「我只是方便一下」並不只影響我自己。當我只看見自己的急，可能就看不見別人的辛苦。",
      waitReflection: "恭敬不一定是一個很大的動作。有時候，它只是願意在自己的方便之外，也看見別人的辛苦。",
      retry: "再選一次",
      continue: "繼續前進",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Daily-Life Challenge · 1",
      title: "When I am in a hurry, can I still notice others?",
      situation: "You are rushing to your next destination. The floor ahead has just been mopped, and a cleaner is still working around the wet area.",
      sudhana: "Sudhana",
      sudhanaText: "I only want to get through quickly... but could my convenience become extra trouble for someone else?",
      instruction: "What would you do?",
      resultLabel: "See What Happened",
      rushTitle: "Walk straight across quickly",
      rushText: "I am really in a hurry. Crossing just this once should be fine.",
      waitTitle: "Pause and go around the cleaned area",
      waitText: "Take a little more time so I do not dirty the floor someone has just cleaned.",
      rushResult: "You hurry across the wet floor and leave a trail of muddy footprints. The cleaner has to mop that section all over again.",
      waitResult: "You pause and go around the wet area. It costs you only a little time, while someone else does not have to redo work that was already finished.",
      resultLabel: "What did Sudhana notice?",
      reflectionLabel: "Sudhana's Reflection",
      rushReflection: "So “just making things convenient for myself” does not affect only me. When I see only my own hurry, I may stop seeing another person's effort.",
      waitReflection: "Reverence does not always require a grand gesture. Sometimes it begins by noticing another person's effort instead of thinking only about my own convenience.",
      retry: "Choose again",
      continue: "Continue",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Thử thách đời sống · 1",
      title: "Khi đang vội, tôi còn nhìn thấy người khác không?",
      situation: "Bạn đang vội đến nơi tiếp theo. Sàn phía trước vừa được lau, và nhân viên vệ sinh vẫn đang dọn khu vực còn ướt.",
      sudhana: "Thiện Tài",
      sudhanaText: "Mình chỉ muốn đi qua thật nhanh... nhưng sự tiện lợi của mình có trở thành phiền toái cho người khác không?",
      instruction: "Bạn sẽ làm gì?",
      resultLabel: "Xem điều gì đã xảy ra",
      rushTitle: "Đi nhanh thẳng qua",
      rushText: "Mình thật sự đang vội. Chỉ đi qua một lần chắc không sao.",
      waitTitle: "Dừng lại và đi vòng qua chỗ vừa lau",
      waitText: "Mất thêm một chút thời gian để không làm bẩn phần sàn người khác vừa dọn sạch.",
      rushResult: "Bạn bước nhanh qua sàn ướt và để lại một hàng dấu chân lấm bẩn. Nhân viên vệ sinh phải lau lại đoạn sàn ấy một lần nữa.",
      waitResult: "Bạn dừng lại và đi vòng qua chỗ ướt. Bạn chỉ mất thêm một chút thời gian, nhưng người khác không phải làm lại công việc đã hoàn thành.",
      resultLabel: "Thiện Tài đã nhận ra điều gì?",
      reflectionLabel: "Suy ngẫm của Thiện Tài",
      rushReflection: "Thì ra “chỉ tiện cho mình một chút” không chỉ ảnh hưởng đến riêng mình. Khi chỉ thấy sự vội vàng của bản thân, tôi có thể không còn thấy công sức của người khác.",
      waitReflection: "Lễ kính không nhất thiết phải là một hành động lớn. Đôi khi, nó bắt đầu từ việc nhìn thấy công sức của người khác thay vì chỉ nghĩ đến sự tiện lợi của mình.",
      retry: "Chọn lại",
      continue: "Tiếp tục",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const equalRespectUi = {
    zh: {
      label: "生活挑戰・第二關",
      title: "如果對方不能給我任何好處，我的態度會不會改變？",
      situation: "同一個地方，兩個人先後向你問同一個簡單的問題。一位看起來事業有成，另一位只是正在送貨的工作人員。",
      personOneTitle: "看起來很成功的人",
      personOneText: "衣著整齊、自信從容，看起來可能是重要人物。",
      personTwoTitle: "普通的送貨員",
      personTwoText: "手上拿著包裹，正在忙碌工作，看起來與你沒有任何利益關係。",
      sudhana: "善財",
      sudhanaText: "他們問的是同一件事。可是，如果一個人可能對我有幫助，另一個人完全不能給我好處，我說話的語氣會一樣嗎？",
      instruction: "你會怎麼回應？",
      favorTitle: "對重要人物特別熱情",
      favorText: "對看起來有用的人耐心回答；對送貨員只簡短敷衍。",
      equalTitle: "用同樣的尊重回應兩個人",
      equalText: "不因身分或對自己有沒有好處，而改變基本的語氣與態度。",
      favorResult: "你對第一個人微笑、耐心回答；輪到送貨員時，語氣卻明顯冷淡。問題完全一樣，改變的不是問題，而是你心裡對兩個人的衡量。",
      equalResult: "你用同樣平和、清楚的方式回答兩個人。你沒有假裝每個人都一樣，而是不讓「他能不能給我好處」決定最基本的尊重。",
      reflectionLabel: "善財的反思",
      favorReflection: "原來我有時不是在尊重一個人，而是在尊重他可能帶給我的好處。這時候，我的恭敬仍然被分別心牽著走。",
      equalReflection: "把禮敬帶回生活，不是把每個人當成完全相同，而是練習不因地位、外表或利益，輕易失去自己的恭敬心。",
      retry: "再選一次",
      continue: "繼續前進",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Daily-Life Challenge · 2",
      title: "If someone has nothing to offer me, does my attitude change?",
      situation: "In the same place, two people ask you the same simple question. One looks successful and influential; the other is simply a delivery worker doing a job.",
      personOneTitle: "Someone who looks successful",
      personOneText: "Well dressed and confident, this person seems important and potentially useful to know.",
      personTwoTitle: "An ordinary delivery worker",
      personTwoText: "Carrying parcels and busy with work, this person seems to have nothing to offer you personally.",
      sudhana: "Sudhana",
      sudhanaText: "They are asking exactly the same thing. But if one person might benefit me and the other cannot, would my tone of voice stay the same?",
      instruction: "How would you respond?",
      favorTitle: "Be especially warm to the important person",
      favorText: "Answer the successful-looking person patiently, but give the delivery worker only a brief, dismissive reply.",
      equalTitle: "Respond to both with the same basic respect",
      equalText: "Do not let status or personal benefit decide your basic tone and manner.",
      favorResult: "You smile and answer the first person patiently. When the delivery worker asks the same question, your voice becomes noticeably colder. The question did not change; what changed was how you measured the two people.",
      equalResult: "You answer both people in the same calm and clear manner. You do not pretend that everyone is identical; you simply refuse to let “What can this person do for me?” determine basic respect.",
      reflectionLabel: "Sudhana's Reflection",
      favorReflection: "Sometimes I may not be respecting the person at all; I may be respecting the benefit I imagine receiving from them. My reverence is still being pulled around by discrimination.",
      equalReflection: "Bringing reverence into daily life does not mean pretending everyone is identical. It means practicing so that status, appearance, or personal advantage does not easily take away my respectful mind.",
      retry: "Choose again",
      continue: "Continue",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Thử thách đời sống · 2",
      title: "Nếu người kia không thể đem lại lợi ích gì cho tôi, thái độ của tôi có thay đổi không?",
      situation: "Ở cùng một nơi, hai người lần lượt hỏi bạn cùng một câu hỏi đơn giản. Một người trông thành đạt và có địa vị; người kia chỉ là một nhân viên giao hàng đang làm việc.",
      personOneTitle: "Một người trông rất thành đạt",
      personOneText: "Ăn mặc chỉnh tề và tự tin, người này có vẻ quan trọng và có thể hữu ích để làm quen.",
      personTwoTitle: "Một nhân viên giao hàng bình thường",
      personTwoText: "Đang cầm các kiện hàng và bận rộn làm việc, người này dường như không thể đem lại lợi ích gì cho bạn.",
      sudhana: "Thiện Tài",
      sudhanaText: "Họ hỏi đúng cùng một việc. Nhưng nếu một người có thể giúp ích cho mình còn người kia thì không, giọng nói của mình có còn giống nhau không?",
      instruction: "Bạn sẽ trả lời thế nào?",
      favorTitle: "Đặc biệt nhiệt tình với người có vẻ quan trọng",
      favorText: "Kiên nhẫn với người trông thành đạt, nhưng chỉ trả lời qua loa với nhân viên giao hàng.",
      equalTitle: "Đáp lại cả hai với cùng sự tôn trọng căn bản",
      equalText: "Không để địa vị hay lợi ích đối với bản thân quyết định giọng nói và thái độ căn bản của mình.",
      favorResult: "Bạn mỉm cười và kiên nhẫn trả lời người thứ nhất. Khi nhân viên giao hàng hỏi cùng câu ấy, giọng của bạn lại lạnh nhạt rõ rệt. Câu hỏi không thay đổi; điều thay đổi là cách bạn cân đo hai con người.",
      equalResult: "Bạn trả lời cả hai bằng cùng một thái độ bình hòa và rõ ràng. Bạn không giả vờ rằng mọi người hoàn toàn giống nhau; bạn chỉ không để câu hỏi “Người này có lợi gì cho mình?” quyết định sự tôn trọng căn bản.",
      reflectionLabel: "Suy ngẫm của Thiện Tài",
      favorReflection: "Có khi tôi không thật sự tôn trọng con người ấy, mà chỉ tôn trọng lợi ích mà tôi nghĩ họ có thể đem lại. Khi đó, tâm cung kính của tôi vẫn bị sự phân biệt dẫn dắt.",
      equalReflection: "Đem sự lễ kính vào đời sống không có nghĩa là xem mọi người hoàn toàn giống nhau. Đó là luyện tập để địa vị, vẻ ngoài hay lợi ích cá nhân không dễ dàng làm mất đi tâm cung kính của mình.",
      retry: "Chọn lại",
      continue: "Tiếp tục",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const vowOneSynthesisUi = {
    zh: {
      label: "第一願・回望旅程",
      title: "善財把一路上的發現連起來了",
      instruction: "三片行願花瓣，回答了三個不同的問題。",
      petalOneQuestion: "用什麼心禮敬？",
      petalOneName: "清淨身・語・意",
      petalTwoQuestion: "要禮敬多少佛？",
      petalTwoName: "禮敬無盡",
      petalThreeQuestion: "這份禮敬要持續多久？",
      petalThreeName: "念念相續",
      sudhana: "善財",
      sudhanaLineOne: "我開始明白了。",
      sudhanaLineTwo: "禮敬不是只在佛前做一次恭敬的動作。",
      sudhanaLineThree: "我要學習讓身、語、意都清淨恭敬，而且把這份恭敬一直帶下去。",
      realizationLabel: "善財真正明白了",
      realization: "原來這一拜，要改變的是我自己。",
      next: "凝聚第一行願法印",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Vow 1 · Looking Back",
      title: "Sudhana connects what he has discovered",
      instruction: "The three Practice Petals answer three different questions.",
      petalOneQuestion: "With what kind of mind do I practice reverence?",
      petalOneName: "Pure Body · Speech · Mind",
      petalTwoQuestion: "How many Buddhas are there to honor?",
      petalTwoName: "Reverence Without End",
      petalThreeQuestion: "How long should this reverence continue?",
      petalThreeName: "Continuous Reverence",
      sudhana: "Sudhana",
      sudhanaLineOne: "I am beginning to understand.",
      sudhanaLineTwo: "Reverence is not merely a respectful action performed once before a Buddha.",
      sudhanaLineThree: "I must learn to make body, speech, and mind pure and reverent, and keep carrying this reverence forward.",
      realizationLabel: "Sudhana Truly Understands",
      realization: "So this bow is meant to transform me.",
      next: "Form the First Vow Seal",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Nguyện thứ nhất · Nhìn lại hành trình",
      title: "Thiện Tài đã nối kết những điều mình khám phá",
      instruction: "Ba cánh hoa Hạnh Nguyện trả lời ba câu hỏi khác nhau.",
      petalOneQuestion: "Dùng tâm như thế nào để lễ kính?",
      petalOneName: "Thanh tịnh Thân · Khẩu · Ý",
      petalTwoQuestion: "Phải lễ kính bao nhiêu vị Phật?",
      petalTwoName: "Lễ kính vô tận",
      petalThreeQuestion: "Sự lễ kính này phải tiếp tục bao lâu?",
      petalThreeName: "Niệm niệm tương tục",
      sudhana: "Thiện Tài",
      sudhanaLineOne: "Con bắt đầu hiểu rồi.",
      sudhanaLineTwo: "Lễ kính không chỉ là một lần làm động tác cung kính trước Phật.",
      sudhanaLineThree: "Con phải học để thân, khẩu và ý đều thanh tịnh, cung kính, rồi tiếp tục mang tâm cung kính ấy đi mãi.",
      realizationLabel: "Thiện Tài thật sự hiểu rồi",
      realization: "Thì ra một lạy này là để chuyển hóa chính mình.",
      next: "Kết thành Pháp Ấn của Nguyện thứ nhất",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const vowOneSealUi = {
    zh: {
      label: "第一願・行願完成",
      title: "善財凝聚了第一枚行願法印",
      rewardLabel: "獲得第一行願法印",
      rewardName: "禮敬諸佛",
      progressLabel: "行願法印",
      progressValue: "1 / 10",
      dailyLabel: "今日行願",
      dailyPractice: "下一次遇見一個「對你沒有任何好處」的人，看看自己的語氣和態度有沒有改變。",
      closing: "真正的禮敬，不只是一拜，而是讓恭敬心慢慢改變自己的身、語、意。",
      next: "繼續善財的旅程",
      back: "返回",
      changeLanguage: "更改語言"
    },
    en: {
      label: "Vow 1 · Practice Complete",
      title: "Sudhana has formed the first Vow Seal",
      rewardLabel: "First Vow Seal Acquired",
      rewardName: "Honoring All Buddhas",
      progressLabel: "Vow Seals",
      progressValue: "1 / 10",
      dailyLabel: "Today's Practice",
      dailyPractice: "The next time you meet someone who can offer you no personal benefit, notice whether your tone and attitude change.",
      closing: "True reverence is more than a single bow. It is a practice that gradually transforms our body, speech, and mind.",
      next: "Continue Sudhana's Journey",
      back: "Back",
      changeLanguage: "Change language"
    },
    vi: {
      label: "Nguyện thứ nhất · Hoàn thành Hạnh Nguyện",
      title: "Thiện Tài đã kết thành Pháp Ấn Hạnh Nguyện đầu tiên",
      rewardLabel: "Nhận được Pháp Ấn của Nguyện thứ nhất",
      rewardName: "Lễ kính chư Phật",
      progressLabel: "Pháp Ấn Hạnh Nguyện",
      progressValue: "1 / 10",
      dailyLabel: "Hạnh Nguyện hôm nay",
      dailyPractice: "Lần tới khi gặp một người không thể đem lại lợi ích gì cho bạn, hãy quan sát xem giọng nói và thái độ của mình có thay đổi hay không.",
      closing: "Lễ kính chân thật không chỉ là một lạy, mà là để tâm cung kính dần chuyển hóa thân, khẩu và ý của chính mình.",
      next: "Tiếp tục hành trình của Thiện Tài",
      back: "Quay lại",
      changeLanguage: "Đổi ngôn ngữ"
    }
  };

  const vowOneCrossroadsUi = {
  "zh": {
    "label": "第一願・禮敬諸佛",
    "title": "完成",
    "intro": "真正的禮敬，不只是低頭的一刻。\n是在每一個人面前，都學習放下我慢，生起恭敬。",
    "reflection": "「原來，禮敬諸佛，也是在學習怎樣看待眼前的每一個人。」",
    "restTitle": "歇一歇，聽聽這一願還能告訴我們什麼。",
    "masterVideo": "▶ 宣化上人講解",
    "masterSubtitle": "第一願・禮敬諸佛",
    "modernVideo": "▶《行願十日》",
    "modernSubtitle": "禮敬諸佛｜現代生活篇",
    "readingLabel": "📖 深入經藏",
    "commentary": "宣化上人《大方廣佛華嚴經淺釋》",
    "readingSubtitle": "〈入不思議解脫境界普賢行願品〉",
    "readingSupport": "想知道「禮敬諸佛」在經文中究竟怎麼說？",
    "readingCta": "閱讀原文 →",
    "vow02Button": "繼續旅程 →",
    "note": "你可以現在繼續，也可以先停下來深入探索。",
    "comingSoon": "第二願・稱讚如來將在下一階段開啟。",
    "back": "返回",
    "changeLanguage": "更改語言"
  },
  "en": {
    "label": "Vow 1 · Honoring All Buddhas",
    "title": "Complete",
    "intro": "True reverence is more than a moment of bowing.\nBefore every person, we learn to let go of pride and awaken respect.",
    "reflection": "“So honoring all Buddhas also means learning how to see each person before me.”",
    "restTitle": "Take a rest and listen to what else this vow can teach us.",
    "masterVideo": "▶ Venerable Master Hsuan Hua explains",
    "masterSubtitle": "Vow 1 · Honoring All Buddhas",
    "modernVideo": "▶ 10 Vows: Ancient Wisdom for Modern Life",
    "modernSubtitle": "Honoring All Buddhas | Modern Life",
    "readingLabel": "📖 Explore the Sutra",
    "commentary": "Avatamsaka Sutra — Chapter 39 Conclusion",
    "readingSubtitle": "The Conduct and Vows of Samantabhadra",
    "readingSupport": "How does the sutra itself explain “Honoring All Buddhas”?",
    "readingCta": "Read the original →",
    "vow02Button": "Continue Journey →",
    "note": "You can continue now, or pause to explore more deeply.",
    "comingSoon": "Vow 2 · Praising the Tathagatas will open in the next stage.",
    "back": "Back",
    "changeLanguage": "Change language"
  },
  "vi": {
    "label": "Nguyện thứ nhất · Lễ kính chư Phật",
    "title": "Hoàn thành",
    "intro": "Lễ kính chân thật không chỉ là khoảnh khắc cúi đầu.\nTrước mỗi người, ta đều học buông bỏ ngã mạn và khởi tâm cung kính.",
    "reflection": "“Thì ra, lễ kính chư Phật cũng là học cách nhìn mỗi người trước mắt mình.”",
    "restTitle": "Nghỉ một chút, lắng nghe xem nguyện này còn có thể dạy ta điều gì.",
    "masterVideo": "▶ Hòa thượng Tuyên Hóa giảng giải",
    "masterSubtitle": "Nguyện thứ nhất · Lễ kính chư Phật",
    "modernVideo": "▶ Mười Nguyện: Trí tuệ xưa trong đời sống hôm nay",
    "modernSubtitle": "Lễ kính chư Phật | Đời sống hiện đại",
    "readingLabel": "📖 Tìm hiểu sâu kinh tạng",
    "commentary": "Hòa thượng Tuyên Hóa · Chú giải Kinh Đại Phương Quảng Phật Hoa Nghiêm",
    "readingSubtitle": "Phẩm Hạnh Nguyện Phổ Hiền · Nhập cảnh giới giải thoát bất tư nghị",
    "readingSupport": "Muốn biết kinh văn thật sự nói thế nào về “Lễ kính chư Phật”?",
    "readingCta": "Đọc nguyên văn →",
    "vow02Button": "Tiếp tục hành trình →",
    "note": "Bạn có thể tiếp tục ngay, hoặc dừng lại để tìm hiểu sâu hơn.",
    "comingSoon": "Nguyện thứ hai · Xưng tán Như Lai sẽ được mở ở giai đoạn tiếp theo.",
    "back": "Quay lại",
    "changeLanguage": "Đổi ngôn ngữ"
  }
};

  const prototypeBUi = {
  "zh": {
    "instruction": "先看看他們的神情。你想先觀察誰？",
    "completeTitle": "「原來，同樣是『拜佛』，心可以完全不同！」",
    "person": "觀察第 {n} 位拜佛的人",
    "close": "收起想法",
    "busy": "正在觀察……",
    "prideTitle": "我慢",
    "fameTitle": "求名",
    "distractedTitle": "心不在場",
    "sincereTitle": "至誠"
  },
  "en": {
    "instruction": "Look at their expressions first. Whom would you like to observe?",
    "completeTitle": "“The same act of bowing can come from completely different minds!”",
    "person": "Observe worshipper {n}",
    "close": "Hide the thought",
    "busy": "Observing…",
    "prideTitle": "Pride",
    "fameTitle": "Seeking recognition",
    "distractedTitle": "Absent mind",
    "sincereTitle": "Sincerity"
  },
  "vi": {
    "instruction": "Trước tiên hãy nhìn nét mặt của họ. Bạn muốn quan sát ai trước?",
    "completeTitle": "“Cùng một hành động lễ Phật, nhưng tâm có thể hoàn toàn khác nhau!”",
    "person": "Quan sát người lễ Phật thứ {n}",
    "close": "Ẩn ý nghĩ",
    "busy": "Đang quan sát…",
    "prideTitle": "Ngã mạn",
    "fameTitle": "Cầu danh",
    "distractedTitle": "Tâm không hiện diện",
    "sincereTitle": "Chí thành"
  }
};

  window.PuxianVow01Content = {
    prototypeBUi,
    countlessBuddhasUi,
    challengeUi,
    karmaUi,
    buddhaExpansionUi,
    buddhaRealmsUi,
    continuousReverenceUi,
    dailyReverenceUi,
    dailyChoiceUi,
    equalRespectUi,
    vowOneSynthesisUi,
    vowOneSealUi,
    vowOneCrossroadsUi
  };
})();

// Checkpoint B uses the same language owner; Chinese is the source.
window.PuxianVow01Content.checkpointB = {
  "zh": {
    "labels": [
      "留意",
      "回應",
      "察看"
    ],
    "titles": [
      "回到日常途中",
      "眼前的兩顆橘子",
      "同一扇門"
    ],
    "back": "返回",
    "language": "切換語言",
    "near": "走近看看",
    "next": "繼續",
    "reflect": "再想一想",
    "finish": "從眼前的一個人開始。",
    "orange": "拾起橘子",
    "door": "扶住咖啡店的門",
    "reflection10": "原來，真正的尊重，也藏在我們怎樣對待眼前的人。",
    "reflection11": "同樣是一個人，為什麼我們有時候會因為他的身份，而改變自己的態度呢？",
    "bridge": [
      "我開始明白了。禮敬，不只是對我敬佩的人表示恭敬。",
      "如果我先分別誰重要、誰不重要，再決定怎樣對待他，我的禮敬就已經有了分別。",
      "可是，普賢菩薩說的是「禮敬諸佛」。這和我剛才遇見的這些人，又有什麼關係呢？"
    ],
    "dharma": [
      "普賢菩薩的願，比剛才這些小小的善行廣大得多。",
      "所禮敬的，是盡法界、虛空界，十方三世一切佛剎極微塵數諸佛世尊。"
    ],
    "final": "原來，禮敬諸佛，是一個廣大無盡的願；而我的修行，可以從不輕慢眼前任何一個人開始。",
    "alts": [
      "佛境與現代廣場柔和相接。",
      "現代廣場與咖啡店。",
      "老婦人的袋子滑落，三顆橘子散落。",
      "老婦人自己伸手拾起第三顆橘子。",
      "善財留意到第一顆橘子。",
      "善財拾起第一顆橘子。",
      "善財已拾起兩顆橘子；老婦人拿著她拾起的一顆。",
      "善財把兩顆橘子還給老婦人。",
      "一位專業人士走近咖啡店的門。",
      "善財扶住門，讓專業人士經過。",
      "一位送貨員帶著兩個包裹走近同一扇門。",
      "善財扶住同一扇門，讓送貨員經過。",
      "善財在咖啡店外思考。",
      "善財與廣場上來往的人們。"
    ]
  },
  "en": {
    "labels": [
      "Notice",
      "Respond",
      "Examine"
    ],
    "titles": [
      "Back in everyday life",
      "Two oranges before us",
      "The same door"
    ],
    "back": "Back",
    "language": "Change language",
    "near": "Take a closer look",
    "next": "Continue",
    "reflect": "Reflect further",
    "finish": "Begin with the person right in front of me.",
    "orange": "Pick up the orange",
    "door": "Hold the café door",
    "reflection10": "True respect can also be found in how we treat the person right in front of us.",
    "reflection11": "They are both people. Why do we sometimes change our attitude because of someone’s status?",
    "bridge": [
      "I am beginning to understand. Reverence is more than showing respect to people I admire.",
      "If I first distinguish who matters and who does not, then decide how to treat them, my reverence is already selective.",
      "Yet Samantabhadra speaks of “revering all Buddhas.” How does that relate to the people I just met?"
    ],
    "dharma": [
      "Samantabhadra’s vow is far greater than these small acts of kindness.",
      "Its objects of reverence are all Buddhas, World-Honored Ones, as numerous as the finest dust particles of all Buddha lands throughout the Dharma Realm and space, in the ten directions and the three periods of time."
    ],
    "final": "I see. Revering all Buddhas is a vast and limitless vow; my own practice can begin by not looking down on anyone before me.",
    "alts": [
      "A gentle transition from the Buddha realm to the modern plaza.",
      "A modern plaza and café.",
      "The elderly woman’s bag slips; exactly three oranges fall.",
      "The elderly woman reaches for the third orange herself.",
      "Sudhana notices the first orange.",
      "Sudhana picks up the first orange.",
      "Sudhana has collected two oranges; the woman holds the one she collected.",
      "Sudhana returns his two oranges to the woman.",
      "A professional approaches the café door.",
      "Sudhana holds the door for the professional.",
      "A delivery worker with two parcels approaches the same door.",
      "Sudhana holds the same door for the delivery worker.",
      "Sudhana reflects outside the café.",
      "Sudhana among the people in the plaza."
    ]
  },
  "vi": {
    "labels": [
      "Nhận thấy",
      "Đáp lại",
      "Quán xét"
    ],
    "titles": [
      "Trở về đời sống thường ngày",
      "Hai quả cam trước mắt",
      "Cùng một cánh cửa"
    ],
    "back": "Quay lại",
    "language": "Đổi ngôn ngữ",
    "near": "Đến gần xem",
    "next": "Tiếp tục",
    "reflect": "Suy ngẫm thêm",
    "finish": "Bắt đầu từ người ngay trước mắt mình.",
    "orange": "Nhặt quả cam",
    "door": "Giữ cửa quán cà phê",
    "reflection10": "Hóa ra, sự tôn trọng chân thật cũng thể hiện trong cách chúng ta đối xử với người ngay trước mắt.",
    "reflection11": "Đều là con người, vì sao đôi khi chúng ta lại thay đổi thái độ vì địa vị của họ?",
    "bridge": [
      "Tôi bắt đầu hiểu rồi. Lễ kính không chỉ là bày tỏ lòng kính trọng với những người mình ngưỡng mộ.",
      "Nếu trước tiên tôi phân biệt ai quan trọng, ai không quan trọng, rồi mới quyết định đối xử với họ thế nào, thì sự lễ kính của tôi đã có phân biệt.",
      "Nhưng Bồ Tát Phổ Hiền nói đến “lễ kính chư Phật”. Điều ấy có liên hệ gì với những người tôi vừa gặp?"
    ],
    "dharma": [
      "Hạnh nguyện của Bồ Tát Phổ Hiền rộng lớn hơn những việc thiện nhỏ vừa rồi rất nhiều.",
      "Đối tượng lễ kính là chư Phật Thế Tôn nhiều như số hạt bụi cực nhỏ trong tất cả cõi Phật khắp pháp giới, hư không giới, mười phương và ba đời."
    ],
    "final": "Hóa ra, lễ kính chư Phật là một hạnh nguyện rộng lớn vô tận; còn việc tu hành của tôi có thể bắt đầu từ việc không khinh thường bất kỳ ai trước mắt.",
    "alts": [
      "Cõi Phật nhẹ nhàng chuyển sang quảng trường hiện đại.",
      "Quảng trường hiện đại và quán cà phê.",
      "Túi của bà cụ tuột xuống; đúng ba quả cam rơi ra.",
      "Bà cụ tự với tay nhặt quả cam thứ ba.",
      "Thiện Tài nhận thấy quả cam thứ nhất.",
      "Thiện Tài nhặt quả cam thứ nhất.",
      "Thiện Tài đã nhặt hai quả cam; bà cụ cầm quả mình tự nhặt.",
      "Thiện Tài trả hai quả cam cho bà cụ.",
      "Một người làm nghề chuyên môn đến gần cửa quán.",
      "Thiện Tài giữ cửa cho người làm nghề chuyên môn.",
      "Một người giao hàng mang hai gói hàng đến gần cùng cánh cửa.",
      "Thiện Tài giữ cùng cánh cửa cho người giao hàng.",
      "Thiện Tài suy ngẫm bên ngoài quán.",
      "Thiện Tài cùng những người qua lại trên quảng trường."
    ]
  }
};

// Final environmental instructions; existing scene/reflection copy stays unchanged.
Object.assign(window.PuxianVow01Content.checkpointB.zh, {
  orangeHint: "點一下橙子，把它撿起來", doorHint: "點一下門，幫忙開門"
});
Object.assign(window.PuxianVow01Content.checkpointB.en, {
  orangeHint: "Tap the orange to pick it up", doorHint: "Tap the door to open it"
});
Object.assign(window.PuxianVow01Content.checkpointB.vi, {
  orangeHint: "Chạm vào quả cam để nhặt lên", doorHint: "Chạm vào cửa để mở cửa"
});

// Checkpoint C labels use the existing language owner; Dharma explanations unchanged.
window.PuxianVow01Content.rewardArc = {
  zh: { journey: "普賢十大行願", sealTitle: "第一願・禮敬諸佛", sealName: "行願法印", completed: "第一願已開啟", future: "未來行願" },
  en: { journey: "Samantabhadra’s Ten Great Vows", sealTitle: "First Vow · Reverence for All Buddhas", sealName: "Dharma Seal", completed: "The First Vow has opened", future: "Future vow" },
  vi: { journey: "Mười Đại Nguyện của Phổ Hiền", sealTitle: "Nguyện thứ nhất · Lễ kính chư Phật", sealName: "Pháp Ấn Hạnh Nguyện", completed: "Nguyện thứ nhất đã mở ra", future: "Hạnh nguyện tương lai" }
};
