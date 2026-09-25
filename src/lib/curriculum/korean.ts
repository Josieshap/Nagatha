import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "korean-1",
    title: "Hangul vowels",
    minutes: 16,
    objective: "Recognize and pronounce the basic Hangul vowel letters.",
    sections: [
      {
        heading: "Why Hangul is different",
        body: "Hangul is a phonetic alphabet invented in 1443, not a set of pictographs like Chinese characters. Each letter represents one sound, and letters combine into square syllable blocks. Learning the vowels first gives you a foundation to build syllables once you add consonants.",
        examples: ["ㅏ (a) — as in 'father'", "ㅓ (eo) — as in 'law'", "ㅗ (o) — as in 'go'"],
      },
      {
        heading: "The basic vowels",
        body: "There are ten basic vowel letters. ㅏ(a), ㅑ(ya), ㅓ(eo), ㅕ(yeo), ㅗ(o), ㅛ(yo), ㅜ(u), ㅠ(yu), ㅡ(eu), and ㅣ(i). Vowels with an extra horizontal or vertical line add a 'y' sound before the base vowel, so ㅑ is just ㅏ with a y-glide added.",
        examples: ["ㅜ (u) — as in 'moon'", "ㅡ (eu) — like the vowel sound in 'uh', lips unrounded", "ㅣ (i) — as in 'see'"],
      },
      {
        heading: "Vowels standing alone",
        body: "A vowel cannot stand alone as a written syllable in Hangul; it must be paired with a placeholder consonant ㅇ (silent when first in a block) to form a complete block, such as 아 (a) or 이 (i). This is why you will often see vowels written with ㅇ attached when learning them in isolation.",
        examples: ["아 (a) — silent ㅇ + ㅏ", "오 (o) — silent ㅇ + ㅗ", "이 (i) — silent ㅇ + ㅣ"],
      },
    ],
    exercises: [
      { question: "What is Hangul primarily?", choices: ["A set of pictographs", "A phonetic alphabet", "A syllabary borrowed from Chinese", "A tonal writing system"], answer: 1, explanation: "Hangul is a phonetic alphabet where each letter represents a single sound." },
      { question: "How is ㅓ (eo) pronounced?", choices: ["Like 'ee'", "Like 'oo'", "Like the vowel in 'law'", "Like 'ay'"], answer: 2, explanation: "ㅓ (eo) is pronounced similarly to the vowel sound in the English word 'law'." },
      { question: "What does the extra line on ㅑ compared to ㅏ indicate?", choices: ["A longer vowel", "A y-glide added before the vowel", "A silent letter", "A different consonant"], answer: 1, explanation: "The extra stroke adds a 'y' sound, turning ㅏ (a) into ㅑ (ya)." },
      { question: "Why is ㅇ added before a vowel like 아?", choices: ["It makes the vowel longer", "A syllable block needs a consonant placeholder", "It changes the vowel sound", "It marks the end of a sentence"], answer: 1, explanation: "A vowel cannot stand alone as a Hangul block, so a silent ㅇ fills the initial consonant position." },
      { question: "Which vowel is pronounced like 'oo' as in moon?", choices: ["ㅡ", "ㅜ", "ㅗ", "ㅓ"], answer: 1, explanation: "ㅜ (u) is pronounced like the 'oo' sound in 'moon'." },
      { question: "How many basic vowel letters are there in Hangul?", choices: ["5", "8", "10", "14"], answer: 2, explanation: "There are ten basic Hangul vowels: ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ." },
    ],
  },
  {
    id: "korean-2",
    title: "Hangul consonants and batchim",
    minutes: 18,
    objective: "Recognize basic Hangul consonants and understand final consonants (batchim).",
    sections: [
      {
        heading: "The basic consonants",
        body: "Hangul consonants include ㄱ(g/k), ㄴ(n), ㄷ(d/t), ㄹ(r/l), ㅁ(m), ㅂ(b/p), ㅅ(s), ㅇ(silent/ng), ㅈ(j), ㅊ(ch), ㅋ(k), ㅌ(t), ㅍ(p), and ㅎ(h). Many shapes hint at where in the mouth the sound is made; for example, ㄱ resembles the back of the tongue rising to the throat.",
        examples: ["가 (ga) — ㄱ + ㅏ", "나 (na) — ㄴ + ㅏ", "다 (da) — ㄷ + ㅏ"],
      },
      {
        heading: "Building syllable blocks",
        body: "A syllable block combines an initial consonant, a vowel, and optionally a final consonant, always in that order, stacked into a square shape. The initial consonant plus vowel is required; the final consonant, called batchim, is optional and changes the sound at the end of the syllable.",
        examples: ["사 (sa) = ㅅ + ㅏ, no batchim", "산 (san) = ㅅ + ㅏ + ㄴ batchim", "밥 (bap) = ㅂ + ㅏ + ㅂ batchim"],
      },
      {
        heading: "How batchim sounds",
        body: "Batchim consonants are pronounced with an unreleased, closed-mouth stop or nasal sound. For example, a final ㄱ sounds like an unreleased 'k' (as in stopping mid-word), final ㄴ is a clear 'n', and final ㅁ is a clear 'm'. Several different consonants can even share the same batchim sound in practice.",
        examples: ["책 (chaek) — book, ends in unreleased -k", "밥 (bap) — rice/meal, ends in unreleased -p", "산 (san) — mountain, ends in clear -n"],
      },
    ],
    exercises: [
      { question: "What is 'batchim' in a Hangul syllable?", choices: ["The initial consonant", "The vowel", "An optional final consonant", "A silent marker"], answer: 2, explanation: "Batchim refers to the optional final consonant that closes a syllable block." },
      { question: "How is a final ㄱ (batchim) typically pronounced?", choices: ["Like a released, aspirated k", "As an unreleased, stopped k sound", "Silently", "Like 'g' in 'go'"], answer: 1, explanation: "Final ㄱ is pronounced as an unreleased stop, similar to holding the 'k' sound without releasing air." },
      { question: "What does 산 (san) mean and what is its batchim?", choices: ["Rice; batchim ㅂ", "Mountain; batchim ㄴ", "Book; batchim ㄱ", "Water; no batchim"], answer: 1, explanation: "산 means mountain and ends with the batchim ㄴ, pronounced as a clear 'n'." },
      { question: "In what order are elements of a Hangul syllable block arranged?", choices: ["Vowel, consonant, batchim", "Consonant, vowel, optional batchim", "Batchim, consonant, vowel", "Random order"], answer: 1, explanation: "A syllable always starts with an initial consonant, followed by a vowel, and then an optional final consonant (batchim)." },
      { question: "Which consonant is represented by ㅁ?", choices: ["n", "m", "r/l", "s"], answer: 1, explanation: "ㅁ represents the 'm' sound, as in 마 (ma)." },
      { question: "What does 밥 (bap) mean?", choices: ["Book", "Mountain", "Rice/meal", "Water"], answer: 2, explanation: "밥 (bap) means rice or a meal, and ends with the batchim ㅂ." },
    ],
  },
  {
    id: "korean-3",
    title: "Polite greetings and 이에요/예요",
    minutes: 16,
    objective: "Use polite greetings and the copula 이에요/예요 to introduce yourself.",
    sections: [
      {
        heading: "Polite hello and thank you",
        body: "안녕하세요 (annyeonghaseyo) is the standard polite greeting, usable any time of day with people you don't know well. 감사합니다 (gamsahamnida) means thank you formally, while 고마워요 (gomawoyo) is slightly less formal but still polite. These phrases form the backbone of respectful daily interaction.",
        examples: ["안녕하세요! (annyeonghaseyo) — Hello!", "감사합니다. (gamsahamnida) — Thank you.", "안녕히 가세요. (annyeonghi gaseyo) — Goodbye (to someone leaving)."],
      },
      {
        heading: "이에요 and 예요",
        body: "이에요/예요 is the polite present-tense form of 'to be', used at the end of a sentence to say what something or someone is. Use 예요 after a word ending in a vowel, and 이에요 after a word ending in a consonant. Both mean the same thing; the choice just depends on pronunciation.",
        examples: ["저는 미나예요. (jeoneun Mina-yeyo) — I am Mina.", "이건 책이에요. (igeon chaek-ieyo) — This is a book.", "여기는 학교예요. (yeogineun hakgyo-yeyo) — This is a school."],
      },
      {
        heading: "Introducing yourself",
        body: "저는 means 'as for me/I', marking the topic of the sentence. Combine it with your name plus 이에요/예요 to introduce yourself politely. This basic pattern, 저는 [name]이에요/예요, is one of the very first full sentences most learners produce.",
        examples: ["저는 존이에요. (jeoneun Jon-ieyo) — I am John.", "저는 학생이에요. (jeoneun haksaeng-ieyo) — I am a student.", "만나서 반가워요. (mannaseo bangawoyo) — Nice to meet you."],
      },
    ],
    exercises: [
      { question: "Which phrase is a polite way to say hello?", choices: ["감사합니다", "안녕하세요", "미안해요", "괜찮아요"], answer: 1, explanation: "안녕하세요 (annyeonghaseyo) is the standard polite greeting used at any time of day." },
      { question: "After a word ending in a consonant, which form of the copula do you use?", choices: ["예요", "이에요", "이야", "예", "이"], answer: 1, explanation: "이에요 attaches after consonant-final words, while 예요 attaches after vowel-final words." },
      { question: "What does 저는 미나예요 mean?", choices: ["Thank you, Mina", "I am Mina", "Where is Mina?", "Mina is here"], answer: 1, explanation: "저는 marks the topic 'I', and 미나예요 means 'am Mina', so the sentence means 'I am Mina.'" },
      { question: "Which word means 'thank you' formally?", choices: ["안녕하세요", "감사합니다", "미안해요", "반가워요"], answer: 1, explanation: "감사합니다 (gamsahamnida) is the formal way to say thank you." },
      { question: "Complete: 이건 책___. (This is a book.)", choices: ["예요", "이에요", "이야", "예"], answer: 1, explanation: "책 (book) ends in a consonant (ㄱ batchim), so it takes 이에요." },
      { question: "What does 만나서 반가워요 express?", choices: ["Goodbye", "Nice to meet you", "I'm sorry", "See you later"], answer: 1, explanation: "만나서 반가워요 is a common polite phrase said when meeting someone for the first time." },
    ],
  },
  {
    id: "korean-4",
    title: "Particles 은/는 and 이/가",
    minutes: 17,
    objective: "Use the topic particles 은/는 and subject particles 이/가 correctly.",
    sections: [
      {
        heading: "Topic markers 은/는",
        body: "은/는 marks the topic of a sentence — what the sentence is about, often something already known or being contrasted. Use 는 after a vowel-final word and 은 after a consonant-final word. It roughly corresponds to 'as for X' in English, though English usually doesn't mark topics explicitly.",
        examples: ["저는 학생이에요. — As for me, I am a student.", "이 책은 재미있어요. — This book is interesting.", "오늘은 날씨가 좋아요. — Today, the weather is nice."],
      },
      {
        heading: "Subject markers 이/가",
        body: "이/가 marks the grammatical subject of a sentence, often introducing new or specific information rather than a general topic. Use 가 after a vowel-final word and 이 after a consonant-final word. Beginners often confuse 은/는 and 이/가; a rough guide is that 이/가 highlights 'what specifically', while 은/는 sets the general topic.",
        examples: ["고양이가 귀여워요. — The cat is cute.", "누가 왔어요? — Who came?", "동생이 학생이에요. — My younger sibling is a student."],
      },
      {
        heading: "Choosing between them",
        body: "When answering a question about 'who' or 'what' specifically did something, 이/가 is usually correct because it introduces new focused information. When simply stating a fact about something already established or being generally described, 은/는 works better. Both particles attach directly to the noun with no space.",
        examples: ["A: 누가 선생님이에요? B: 저 사람이 선생님이에요. — That person is the teacher.", "저는 한국어를 배워요. (topic: as for me)", "물이 차가워요. — The water is cold (new/specific info)."],
      },
    ],
    exercises: [
      { question: "Which particle follows a consonant-final noun to mark the topic?", choices: ["는", "은", "가", "이"], answer: 1, explanation: "은 attaches after consonant-final nouns, while 는 attaches after vowel-final nouns." },
      { question: "What does 이/가 typically mark?", choices: ["The object of the verb", "The grammatical subject, often new information", "The location", "A question word only"], answer: 1, explanation: "이/가 marks the subject, frequently highlighting new or specific information in the sentence." },
      { question: "Complete: 고양이___ 귀여워요. (The cat is cute.)", choices: ["은", "는", "가", "이"], answer: 2, explanation: "고양이 ends in a vowel (이), so it takes 가 as the subject marker." },
      { question: "Which particle would attach to '동생' (younger sibling, consonant-final) to mark it as subject?", choices: ["는", "가", "이", "은"], answer: 2, explanation: "동생 ends in a consonant, so the subject particle 이 attaches: 동생이." },
      { question: "What is the main function of 은/는?", choices: ["To mark the object", "To mark the topic of the sentence", "To indicate location", "To form a question"], answer: 1, explanation: "은/는 marks the topic — what the sentence is generally about." },
      { question: "Complete: 오늘___ 날씨가 좋아요. (Today, the weather is nice.)", choices: ["가", "이", "은", "를"], answer: 2, explanation: "오늘 (today) ends in a consonant, so it takes 은 to mark it as the topic." },
    ],
  },
  {
    id: "korean-5",
    title: "을/를 and present polite -아요/어요",
    minutes: 18,
    objective: "Mark direct objects with 을/를 and conjugate verbs in the present polite form.",
    sections: [
      {
        heading: "Object marker 을/를",
        body: "을/를 marks the direct object of a sentence, the thing receiving the action. Use 를 after a vowel-final word and 을 after a consonant-final word. This particle tells you clearly what the verb is acting upon, which is useful since Korean word order is more flexible than English.",
        examples: ["저는 커피를 마셔요. — I drink coffee.", "책을 읽어요. — I read a book.", "한국어를 배워요. — I learn Korean."],
      },
      {
        heading: "Present polite conjugation",
        body: "The -아요/어요 ending is the standard polite present tense used in everyday conversation. Drop the verb's -다 ending to get the stem; if the stem's last vowel is ㅏ or ㅗ, add -아요; otherwise, add -어요. Some verbs contract further, like 하다 verbs becoming 해요.",
        examples: ["가다 (to go) → 가요 — I/you/he go(es)", "먹다 (to eat) → 먹어요 — eat(s)", "공부하다 (to study) → 공부해요 — study/studies"],
      },
      {
        heading: "Putting object and verb together",
        body: "Korean sentences typically follow subject-object-verb order, so the object with 을/를 comes before the verb. This differs from English's subject-verb-object order, so it takes practice to place the verb last consistently.",
        examples: ["저는 밥을 먹어요. — I eat rice/a meal.", "친구가 음악을 들어요. — My friend listens to music.", "저는 한국어를 공부해요. — I study Korean."],
      },
    ],
    exercises: [
      { question: "Which particle marks the direct object after a vowel-final word?", choices: ["을", "를", "이", "은"], answer: 1, explanation: "를 attaches after vowel-final nouns to mark them as the direct object." },
      { question: "What is the -아요/어요 form of 먹다 (to eat)?", choices: ["먹아요", "먹어요", "먹해요", "먹요"], answer: 1, explanation: "먹다's stem 먹 ends in ㅓ, which is not ㅏ/ㅗ, so it takes -어요: 먹어요." },
      { question: "Complete: 저는 책___ 읽어요. (I read a book.)", choices: ["가", "이", "을", "는"], answer: 2, explanation: "책 (book) ends in a consonant, so it takes 을 as the object marker." },
      { question: "What is the typical word order in a Korean sentence?", choices: ["Subject-Verb-Object", "Verb-Subject-Object", "Subject-Object-Verb", "Object-Verb-Subject"], answer: 2, explanation: "Korean typically follows Subject-Object-Verb order, placing the verb at the end." },
      { question: "What is the polite present form of 하다 verbs like 공부하다?", choices: ["공부하아요", "공부해요", "공부하어요", "공부하요"], answer: 1, explanation: "하다 verbs irregularly contract to 해요 in the polite present tense." },
      { question: "Which sentence correctly uses 를 with 'coffee' (커피)?", choices: ["커피을 마셔요", "커피가 마셔요", "커피를 마셔요", "커피는 마셔요"], answer: 2, explanation: "커피 ends in a vowel, so it takes 를 as the object marker: 커피를 마셔요." },
    ],
  },
  {
    id: "korean-6",
    title: "Numbers and ordering with 주세요",
    minutes: 17,
    objective: "Use Korean numbers and the phrase 주세요 to order politely.",
    sections: [
      {
        heading: "Two number systems",
        body: "Korean has two number systems: Sino-Korean (from Chinese) used for money, phone numbers, and dates, and native Korean numbers used for counting objects, age, and hours. Sino-Korean: 일, 이, 삼, 사, 오 (1-5). Native Korean: 하나, 둘, 셋, 넷, 다섯 (1-5).",
        examples: ["일 (il) = 1 (Sino-Korean, e.g., for prices)", "하나 (hana) = 1 (Native, e.g., for counting items)", "삼 (sam) = 3, 셋 (set) = 3"],
      },
      {
        heading: "Counting items when ordering",
        body: "When ordering food, native Korean numbers combine with counters, and 하나/둘/셋/넷 shorten to 한/두/세/네 before a counter word like 잔 (cup) or 개 (general item). 잔 is used for drinks, so 'one coffee' becomes 커피 한 잔.",
        examples: ["커피 한 잔 — one cup of coffee", "물 두 잔 — two cups of water", "빵 세 개 — three pieces of bread"],
      },
      {
        heading: "Ordering with 주세요",
        body: "주세요 (juseyo) means 'please give me' and is added after the item (and quantity, if any) to make a polite request, commonly used in restaurants and shops. It's one of the most useful phrases for any traveler.",
        examples: ["커피 하나 주세요. — One coffee, please.", "물 좀 주세요. — Please give me some water.", "이거 주세요. — Please give me this (pointing)."],
      },
    ],
    exercises: [
      { question: "Which number system is used for counting objects and age?", choices: ["Sino-Korean", "Native Korean", "Both equally", "Neither"], answer: 1, explanation: "Native Korean numbers (하나, 둘, 셋...) are used for counting objects, age, and hours." },
      { question: "What does 주세요 mean?", choices: ["Thank you", "How much is it?", "Please give me", "I don't want it"], answer: 2, explanation: "주세요 (juseyo) is a polite request meaning 'please give me.'" },
      { question: "How do you order 'one coffee' politely?", choices: ["커피 하나 주세요", "커피 일 주세요", "하나 커피예요", "커피 주세요 하나"], answer: 0, explanation: "Item + native number + 주세요 is the standard ordering pattern: 커피 하나 주세요." },
      { question: "What does 하나 shorten to before a counter word?", choices: ["한", "일", "하", "나"], answer: 0, explanation: "하나 (one) shortens to 한 when placed directly before a counter word like 잔 or 개." },
      { question: "Which counter is typically used for drinks?", choices: ["개", "잔", "명", "권"], answer: 1, explanation: "잔 is the counter used specifically for cups or glasses of drinks." },
      { question: "Which number system would you use for a phone number?", choices: ["Native Korean", "Sino-Korean", "Either works equally", "Neither is used"], answer: 1, explanation: "Sino-Korean numbers (일, 이, 삼...) are used for phone numbers, money, and dates." },
    ],
  },
  {
    id: "korean-7",
    title: "Past tense -았어요/었어요",
    minutes: 18,
    objective: "Conjugate verbs and adjectives in the polite past tense.",
    sections: [
      {
        heading: "Forming the past tense",
        body: "The polite past tense follows the same vowel-harmony rule as the present tense: if the verb stem's last vowel is ㅏ or ㅗ, add -았어요; otherwise add -었어요. 하다 verbs become -했어요. This mirrors the -아요/어요 present tense pattern you already know, just with an extra ㅆ inserted before 어요.",
        examples: ["가다 (go) → 갔어요 — went", "먹다 (eat) → 먹었어요 — ate", "공부하다 (study) → 공부했어요 — studied"],
      },
      {
        heading: "Using it in sentences",
        body: "Attach the past tense ending to the end of the sentence, after any objects marked with 을/를 or topics marked with 은/는. Time expressions like 어제 (yesterday) or 지난주 (last week) often accompany past-tense sentences to clarify when the action happened.",
        examples: ["어제 영화를 봤어요. — I watched a movie yesterday.", "지난주에 친구를 만났어요. — I met a friend last week.", "저는 어제 집에 있었어요. — I was at home yesterday."],
      },
      {
        heading: "Past tense with adjectives",
        body: "Descriptive verbs (adjectives) also take -았어요/었어요 to describe a past state, following the same vowel rule. 좋다 (to be good) becomes 좋았어요 (was good), and 맛있다 (to be delicious) becomes 맛있었어요 (was delicious).",
        examples: ["날씨가 좋았어요. — The weather was good.", "음식이 맛있었어요. — The food was delicious.", "영화가 재미있었어요. — The movie was fun."],
      },
    ],
    exercises: [
      { question: "What is the past tense form of 가다 (to go)?", choices: ["가어요", "갔어요", "가았어요", "가했어요"], answer: 1, explanation: "가다's stem 가 ends in ㅏ, so it takes -았어요, contracting to 갔어요." },
      { question: "What is the past tense form of 먹다 (to eat)?", choices: ["먹았어요", "먹었어요", "먹해요", "먹였어요"], answer: 1, explanation: "먹다's stem 먹 does not end in ㅏ/ㅗ, so it takes -었어요: 먹었어요." },
      { question: "What is the past tense of 공부하다 (to study)?", choices: ["공부했어요", "공부하았어요", "공부어요", "공부었어요"], answer: 0, explanation: "하다 verbs irregularly become 했어요 in the past tense." },
      { question: "Which word means 'yesterday' and commonly pairs with past tense?", choices: ["내일", "지금", "어제", "오늘"], answer: 2, explanation: "어제 means 'yesterday' and is commonly used with past-tense sentences." },
      { question: "What does 맛있었어요 mean?", choices: ["It is delicious", "It was delicious", "It will be delicious", "It is not delicious"], answer: 1, explanation: "맛있었어요 is the past tense of 맛있다 (to be delicious), meaning 'was delicious.'" },
      { question: "Complete: 날씨가 ___. (The weather was good.)", choices: ["좋아요", "좋았어요", "좋어요", "좋할어요"], answer: 1, explanation: "좋다's stem 좋 ends in ㅗ, so the past tense is 좋았어요." },
    ],
  },
  {
    id: "korean-8",
    title: "Questions, negation with 안, and a short reading",
    minutes: 19,
    objective: "Ask simple questions, negate sentences with 안, and read a short Korean passage.",
    sections: [
      {
        heading: "Asking questions",
        body: "Korean questions in polite speech often use the same sentence structure as statements, simply changing intonation to rise at the end, or using question words like 뭐 (what), 누구 (who), 어디 (where), and 언제 (when). Question words replace the unknown information but keep the rest of the sentence the same.",
        examples: ["뭐 해요? — What are you doing?", "어디 가요? — Where are you going?", "이름이 뭐예요? — What is your name?"],
      },
      {
        heading: "Negating with 안",
        body: "안 is placed directly before a verb or adjective to negate it, functioning like 'not' or 'don't' in English. It is simpler than English negation since it doesn't require any auxiliary verb: just insert 안 before the verb stem's conjugated form.",
        examples: ["안 가요. — I'm not going.", "저는 커피를 안 마셔요. — I don't drink coffee.", "오늘은 안 바빠요. — I'm not busy today."],
      },
      {
        heading: "A short reading",
        body: "Read this short passage about Jimin's day, then check your comprehension: '지민 씨는 학생이에요. 지민 씨는 매일 아침에 학교에 가요. 어제는 학교에 안 갔어요. 왜냐하면 아팠어요. 오늘은 괜찮아서 학교에 가요.' This tells us Jimin is a student who goes to school every morning, but didn't go yesterday because they were sick, and is fine today.",
        examples: ["Jimin is a student who goes to school every morning.", "Jimin did not go to school yesterday because Jimin was sick.", "Today Jimin is fine, so Jimin is going to school."],
      },
    ],
    exercises: [
      { question: "Which question word means 'where'?", choices: ["뭐", "누구", "어디", "언제"], answer: 2, explanation: "어디 means 'where', as in 어디 가요? (Where are you going?)." },
      { question: "Where is 안 placed to negate a verb?", choices: ["After the verb", "At the end of the sentence", "Directly before the verb", "At the very start of the sentence"], answer: 2, explanation: "안 is placed directly before the conjugated verb or adjective to negate it." },
      { question: "According to the reading, why didn't Jimin go to school yesterday?", choices: ["Jimin was busy", "Jimin was sick", "It was a holiday", "Jimin overslept"], answer: 1, explanation: "The passage states '왜냐하면 아팠어요' — because Jimin was sick." },
      { question: "What does 이름이 뭐예요? mean?", choices: ["Where do you live?", "What is your name?", "How old are you?", "What time is it?"], answer: 1, explanation: "이름이 뭐예요? literally asks 'What is (your) name?' using the question word 뭐." },
      { question: "According to the reading, why is Jimin going to school today?", choices: ["Jimin has a test", "Jimin feels fine now", "Jimin's friend asked", "It is a special event"], answer: 1, explanation: "The text says '오늘은 괜찮아서 학교에 가요' — today Jimin is fine, so is going to school." },
      { question: "Which sentence correctly says 'I don't drink coffee'?", choices: ["저는 커피를 마셔요 안.", "저는 안 커피를 마셔요.", "저는 커피를 안 마셔요.", "안 저는 커피를 마셔요."], answer: 2, explanation: "안 is placed immediately before the verb 마셔요, after the object 커피를." },
    ],
  },
];
