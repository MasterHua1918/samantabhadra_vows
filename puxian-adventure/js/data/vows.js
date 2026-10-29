/* =========================================================
   善財童子 × 普賢十願 Adventure Game
   vows.js

   Dharma / story data
   Chinese is the master source language.
   ========================================================= */

(() => {
  "use strict";

  const vows = [

    /* =====================================================
       第一願・禮敬諸佛
       ===================================================== */

    {
      id: 1,

      slug: "honor-all-buddhas",

      title: {
        zh: "禮敬諸佛",
        en: "To Honor and Respect All Buddhas",
        vi: "Lễ kính chư Phật"
      },

      shortTitle: {
        zh: "第一願・禮敬諸佛",
        en: "Vow 1 · To Honor and Respect All Buddhas",
        vi: "Nguyện thứ nhất · Lễ kính chư Phật"
      },


      /* ---------- Opening ---------- */

      opening: {

        hook: {
          zh: "善財的第一個任務，會比「拜佛」更難嗎？",
          en: "Will Sudhana's first mission be harder than simply “bowing to the Buddha”?",
          vi: "Nhiệm vụ đầu tiên của Thiện Tài có khó hơn việc chỉ “lễ Phật” không?"
        },

        button: {
          zh: "開始旅程",
          en: "Begin the Journey",
          vi: "Bắt đầu hành trình"
        }

      },


      /* ---------- Introduction ---------- */

      intro: {

        sutra: {
          zh: "一者、禮敬諸佛。",
          en: "First: To honor and respect all Buddhas.",
          vi: "Thứ nhất: Lễ kính chư Phật."
        },

        sudhana: {
          zh: "禮敬諸佛……是不是只要見到佛，就恭恭敬敬地拜呢？",

          en: "To honor and respect all Buddhas… does that simply mean bowing respectfully whenever I see a Buddha?",

          vi: "Lễ kính chư Phật… có phải chỉ cần gặp Phật thì cung kính đảnh lễ là đủ không?"
        },

        continueButton: {
          zh: "🔍 和善財一起尋找答案",
          en: "🔍 Search for the answer with Sudhana",
          vi: "🔍 Cùng Thiện Tài đi tìm câu trả lời"
        }

      },


      /* =====================================================
         Challenge 1
         四個人都在拜佛
         ===================================================== */

      challenge1: {

        title: {
          zh: "他們都在拜佛。你看得出有什麼不同嗎？",

          en: "They are all bowing to the Buddha. Can you see what is different?",

          vi: "Họ đều đang lễ Phật. Bạn có nhận ra điểm khác nhau không?"
        },

        instruction: {
          zh: "點擊每一個人，看看他們拜佛時，心裡正在發生什麼。",

          en: "Tap each person and discover what is happening in their mind as they bow.",

          vi: "Hãy chọn từng người để xem trong lúc lễ Phật, tâm họ đang nghĩ gì."
        },


        /* ---------- Person 1 ---------- */

        people: [

          {
            id: "pride",

            type: "我慢禮",

            thought: {
              zh: "他拜得沒有我好。",
              en: "He doesn't bow as well as I do.",
              vi: "Người ấy lễ không tốt bằng mình."
            },

            sudhana: {
              zh: "身體低下去了，心卻把自己抬得很高……",

              en: "The body has bowed down, but the mind has raised itself very high…",

              vi: "Thân đã cúi xuống, nhưng trong tâm lại nâng mình lên thật cao…"
            },

            discovery: {
              zh: "恭敬 ≠ 比較自己比別人好",

              en: "Reverence is not comparing yourself with others.",

              vi: "Cung kính không phải là so sánh mình hơn người khác."
            }

          },


          /* ---------- Person 2 ---------- */

          {
            id: "recognition",

            type: "求名禮",

            thought: {
              zh: "有人在看嗎？我要拜得更虔誠一點。",

              en: "Is anyone watching? I should look more devout.",

              vi: "Có ai đang nhìn không? Mình phải lễ thành kính hơn một chút."
            },

            sudhana: {
              zh: "他想得到的，好像不是恭敬，而是別人的讚歎。",

              en: "What he seems to want is not reverence, but other people's praise.",

              vi: "Điều người ấy muốn dường như không phải là lòng cung kính, mà là lời khen của người khác."
            },

            discovery: {
              zh: "恭敬 ≠ 做給別人看",

              en: "Reverence is not something performed for others to see.",

              vi: "Cung kính không phải là làm để người khác nhìn thấy."
            }

          },


          /* ---------- Person 3 ---------- */

          {
            id: "distracted",

            type: "身心不一",

            thoughts: {

              zh: [
                "午餐吃什麼？",
                "手機是不是有新訊息？",
                "剛才那件事真讓人生氣……",
                "等一下還有好多工作。"
              ],

              en: [
                "What should I eat for lunch?",
                "Did I get a new message?",
                "I'm still angry about what happened earlier…",
                "I still have so much work to do."
              ],

              vi: [
                "Trưa nay ăn gì nhỉ?",
                "Điện thoại có tin nhắn mới không?",
                "Chuyện lúc nãy vẫn làm mình tức quá…",
                "Lát nữa còn rất nhiều việc phải làm."
              ]

            },

            sudhana: {
              zh: "原來人還在這裡，心已經跑了這麼遠！",

              en: "The person is still here, but the mind has already wandered so far away!",

              vi: "Người vẫn còn ở đây, nhưng tâm đã chạy đi xa đến thế!"
            },

            discovery: {
              zh: "恭敬需要「心也在場」",

              en: "True reverence requires the mind to be present too.",

              vi: "Cung kính chân thật cần cả tâm cũng hiện diện."
            }

          },


          /* ---------- Person 4 ---------- */

          {
            id: "sincere",

            type: "至誠禮",

            thought: {
              zh: "專一其心，如對目前。",
              en: "Single-minded and sincere, as though the Buddha were directly before me.",
              vi: "Nhất tâm chí thành, như Đức Phật đang hiện diện ngay trước mặt."
            },

            sudhana: {
              zh: "他的身在拜，心也在拜。",

              en: "His body is bowing, and his mind is bowing too.",

              vi: "Thân đang lễ, và tâm cũng đang lễ."
            },

            discovery: {
              zh: "身與心一起恭敬",

              en: "Body and mind are reverent together.",

              vi: "Thân và tâm cùng cung kính."
            }

          }

        ]

      },


      /* =====================================================
         Sutra connection
         ===================================================== */

      sutraTeaching: {

        text: {
          zh: "深心信解，如對目前，悉以清淨身語意業，常修禮敬。",

          en: "With deep faith and understanding, as if they were present before one, one constantly practices reverence with pure body, speech, and mind.",

          vi: "Với lòng tin hiểu sâu xa, như chư Phật đang hiện diện trước mặt, thường dùng thân, khẩu, ý thanh tịnh mà tu hạnh lễ kính."
        },

        body: {
          zh: "身",
          en: "Body",
          vi: "Thân"
        },

        speech: {
          zh: "語",
          en: "Speech",
          vi: "Khẩu"
        },

        mind: {
          zh: "意",
          en: "Mind",
          vi: "Ý"
        }

      },


      /* =====================================================
         Three Dharma discoveries
         ===================================================== */

      discoveries: [

        {
          id: "body-speech-mind",

          title: {
            zh: "清淨身・語・意",
            en: "Purify Body, Speech, and Mind",
            vi: "Thanh tịnh thân・khẩu・ý"
          }
        },

        {
          id: "boundless-reverence",

          title: {
            zh: "禮敬盡虛空、遍法界",
            en: "Reverence Throughout the Dharma Realm",
            vi: "Lễ kính tận hư không, khắp pháp giới"
          }
        },

        {
          id: "continuous-practice",

          title: {
            zh: "念念相續",
            en: "Continue Thought After Thought",
            vi: "Niệm niệm tương tục"
          }
        }

      ],


      /* =====================================================
         Dharma Seal
         ===================================================== */

      reward: {

        id: "seal-01",

        name: {
          zh: "第一行願法印・禮敬諸佛",
          en: "First Vow Seal · Honoring All Buddhas",
          vi: "Pháp ấn Hạnh Nguyện thứ nhất · Lễ kính chư Phật"
        }

      },


      /* =====================================================
         今日行願
         Modern-life application, not the full doctrinal
         definition of 禮敬諸佛.
         ===================================================== */

      dailyPractice: {

        title: {
          zh: "今日行願",
          en: "Today's Practice",
          vi: "Hạnh nguyện hôm nay"
        },

        text: {

          zh: "下一次遇見一個「對你沒有任何好處」的人，看看自己的語氣和態度有沒有改變。",

          en: "The next time you meet someone who can offer you no advantage, notice whether your tone or attitude changes.",

          vi: "Lần tới khi gặp một người không thể mang lại lợi ích gì cho bạn, hãy quan sát xem giọng nói và thái độ của mình có thay đổi không."

        }

      },


      /* =====================================================
         Resources
         ===================================================== */

      resources: {

        modernChineseVideo: {

          label:
            "《行願十日》EP01｜連對你沒用的人，你也一樣客氣嗎？",

          url:
            "https://youtu.be/x7QNTmRwQ0I"

        },

        modernEnglishVideo: {

          label:
            "10 Vows EP01 | Do You Respect People Who Can't Do Anything for You?",

          url:
            "https://youtu.be/SMB1T1Ix0QY"

        },

        masterHsuanHuaVideo: {

          label:
            "宣化上人講解｜禮敬諸佛",

          url:
            "https://youtu.be/1M6A6vaZi2U"

        },

        drbaCommentary: {

          label:
            "宣化上人《大方廣佛華嚴經淺釋》",

          url:
            "https://www.drbachinese.org/online_reading/sutra_explanation/Universal_Worthy/Universal_Worthy.htm"

        }

      }

    },


    /* =====================================================
       Vows 2–10
       Registered now; detailed content will be added later.
       ===================================================== */

    {
      id: 2,

      slug: "praise-tathagatas",

      title: {
        zh: "稱讚如來",
        en: "To Praise the Tathagatas",
        vi: "Xưng tán Như Lai"
      }
    },

    {
      id: 3,

      slug: "make-vast-offerings",

      title: {
        zh: "廣修供養",
        en: "To Make Vast Offerings",
        vi: "Quảng tu cúng dường"
      }
    },

    {
      id: 4,

      slug: "repent-karmic-obstructions",

      title: {
        zh: "懺悔業障",
        en: "To Repent of Karmic Obstructions",
        vi: "Sám hối nghiệp chướng"
      }
    },

    {
      id: 5,

      slug: "rejoice-in-merit",

      title: {
        zh: "隨喜功德",
        en: "To Rejoice in Merit and Virtue",
        vi: "Tùy hỷ công đức"
      }
    },

    {
      id: 6,

      slug: "request-dharma-wheel",

      title: {
        zh: "請轉法輪",
        en: "To Request the Turning of the Dharma Wheel",
        vi: "Thỉnh chuyển pháp luân"
      }
    },

    {
      id: 7,

      slug: "request-buddhas-remain",

      title: {
        zh: "請佛住世",
        en: "To Request the Buddhas to Remain in the World",
        vi: "Thỉnh Phật trụ thế"
      }
    },

    {
      id: 8,

      slug: "follow-buddhas-learning",

      title: {
        zh: "常隨佛學",
        en: "To Always Follow the Buddhas in Study",
        vi: "Thường tùy Phật học"
      }
    },

    {
      id: 9,

      slug: "accord-with-beings",

      title: {
        zh: "恆順眾生",
        en: "To Constantly Accord with Living Beings",
        vi: "Hằng thuận chúng sinh"
      }
    },

    {
      id: 10,

      slug: "dedicate-all-merit",

      title: {
        zh: "普皆迴向",
        en: "To Universally Dedicate All Merit",
        vi: "Phổ giai hồi hướng"
      }
    }

  ];


  /* =========================================================
     Helper functions
     ========================================================= */

  function normaliseLanguage(lang) {

    if (!lang) {
      return "zh";
    }

    const value =
      String(lang).toLowerCase();

    if (value.startsWith("en")) {
      return "en";
    }

    if (value.startsWith("vi")) {
      return "vi";
    }

    return "zh";
  }


  function localised(
    value,
    lang = "zh"
  ) {

    if (
      typeof value === "string"
    ) {
      return value;
    }

    if (
      !value ||
      typeof value !== "object"
    ) {
      return "";
    }

    const selectedLanguage =
      normaliseLanguage(lang);

    return (
      value[selectedLanguage] ||
      value.zh ||
      ""
    );
  }


  function getVow(id) {

    const number =
      Number(id);

    return (
      vows.find(
        (vow) =>
          vow.id === number
      ) || null
    );
  }


  function getVowBySlug(slug) {

    return (
      vows.find(
        (vow) =>
          vow.slug === slug
      ) || null
    );
  }


  function getVowTitle(
    id,
    lang = "zh"
  ) {

    const vow =
      getVow(id);

    if (!vow) {
      return "";
    }

    return localised(
      vow.title,
      lang
    );
  }


  function getProgress(
    completedVows = []
  ) {

    const uniqueCompleted =
      [
        ...new Set(
          completedVows
            .map(Number)
            .filter(
              (id) =>
                Number.isInteger(id) &&
                id >= 1 &&
                id <= 10
            )
        )
      ];

    return {

      completed:
        uniqueCompleted.length,

      total:
        vows.length,

      percentage:
        Math.round(
          (
            uniqueCompleted.length /
            vows.length
          ) * 100
        )

    };
  }


  /* =========================================================
     Public API
     ========================================================= */

  window.PuxianVows = {

    all:
      vows,

    getVow,

    getVowBySlug,

    getVowTitle,

    localised,

    getProgress

  };

})();