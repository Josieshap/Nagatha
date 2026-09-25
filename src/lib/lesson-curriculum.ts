export const SUBJECT_IDS = ["spanish", "italian", "french", "german", "korean", "math", "english"] as const;
export type SubjectId = (typeof SUBJECT_IDS)[number];

export type Exercise = {
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  objective: string;
  sections: Array<{ heading: string; body: string; examples: string[] }>;
  exercises: Exercise[];
};

export type Subject = {
  id: SubjectId;
  name: string;
  greeting: string;
  description: string;
  lessons: Lesson[];
};

const languageLesson = (id: string, title: string, objective: string, sections: Lesson["sections"], exercises: Exercise[]): Lesson => ({
  id, title, minutes: 15, objective, sections, exercises,
});

export const SUBJECTS: Subject[] = [
  {
    id: "spanish", name: "Spanish", greeting: "Vamos.", description: "Build useful conversation, grammar, reading, and writing skills.",
    lessons: [
      languageLesson("spanish-1", "Greetings that sound human", "Greet someone and introduce yourself naturally.", [
        { heading: "Core phrases", body: "Hola works any time. Buenos días is used in the morning, buenas tardes later in the day, and buenas noches at night. Say Me llamo… for your name and Mucho gusto when meeting someone.", examples: ["Hola, me llamo Ana.", "Buenos días. Mucho gusto."] },
        { heading: "A tiny conversation", body: "¿Cómo te llamas? asks someone’s name informally. ¿Cómo estás? asks how they are. Estoy bien means I am well.", examples: ["—¿Cómo te llamas? —Me llamo Luis.", "—¿Cómo estás? —Estoy bien, gracias."] },
      ], [
        { question: "Which phrase means “My name is Marta”?", choices: ["Soy bien Marta", "Me llamo Marta", "Cómo Marta"], answer: 1, explanation: "Me llamo literally means ‘I call myself’ and is the usual introduction." },
        { question: "What greeting fits the morning?", choices: ["Buenas noches", "Buenas tardes", "Buenos días"], answer: 2, explanation: "Buenos días is the standard morning greeting." },
      ]),
      languageLesson("spanish-2", "The verbs you cannot avoid", "Use ser, estar, and tener in simple statements.", [
        { heading: "Ser and estar", body: "Use ser for identity and lasting descriptions; estar for location and temporary states.", examples: ["Soy estudiante. — I am a student.", "Estoy cansada. — I am tired."] },
        { heading: "Tener", body: "Tener means to have. Spanish also uses it for age and common conditions.", examples: ["Tengo treinta años.", "Tengo hambre. — I am hungry."] },
      ], [
        { question: "Complete: Yo ___ en casa. (I am at home.)", choices: ["soy", "estoy", "tengo"], answer: 1, explanation: "Location takes estar: estoy en casa." },
        { question: "How do you say “I am hungry”?", choices: ["Soy hambre", "Estoy hambre", "Tengo hambre"], answer: 2, explanation: "Spanish expresses hunger with tener: tengo hambre." },
      ]),
      languageLesson("spanish-3", "Ordering without pointing", "Order food and ask politely for what you need.", [
        { heading: "Making a request", body: "Quisiera… is a polite ‘I would like.’ Add por favor. Para mí… is another natural way to order.", examples: ["Quisiera un café, por favor.", "Para mí, la ensalada."] },
        { heading: "Useful questions", body: "Ask ¿Qué recomienda? for a recommendation and ¿Cuánto cuesta? for the price.", examples: ["¿Qué recomienda?", "La cuenta, por favor."] },
      ], [
        { question: "Which is the polite way to order coffee?", choices: ["Tengo café", "Quisiera un café, por favor", "Soy café"], answer: 1, explanation: "Quisiera… por favor is polite and natural." },
        { question: "How do you ask for the bill?", choices: ["La cuenta, por favor", "¿Cómo estás?", "Mucho gusto"], answer: 0, explanation: "La cuenta means the bill or check." },
      ]),
    ],
  },
  {
    id: "italian", name: "Italian", greeting: "Andiamo.", description: "Learn practical Italian through everyday exchanges.",
    lessons: [
      languageLesson("italian-1", "Hello, properly", "Greet people and introduce yourself.", [{ heading: "Greetings", body: "Ciao is informal. Buongiorno is a polite daytime greeting; buonasera is used in the evening. Mi chiamo… introduces your name.", examples: ["Buongiorno, mi chiamo Sofia.", "Piacere! — Nice to meet you!"] }], [
        { question: "Which greeting is polite during the day?", choices: ["Buongiorno", "Ciao ciao", "Grazie"], answer: 0, explanation: "Buongiorno is the standard polite daytime greeting." },
        { question: "“My name is Luca” is…", choices: ["Sono nome Luca", "Mi chiamo Luca", "Ho Luca"], answer: 1, explanation: "Mi chiamo… is the natural introduction." },
      ]),
      languageLesson("italian-2", "Essere and avere", "Describe who you are and what you have.", [{ heading: "Two essential verbs", body: "Essere means to be; avere means to have. Italian often drops the subject pronoun because the verb ending carries it.", examples: ["Sono stanca. — I am tired.", "Ho fame. — I am hungry."] }], [
        { question: "Complete: ___ americano. (I am American.)", choices: ["Ho", "Sono", "Hai"], answer: 1, explanation: "Sono is the first-person form of essere." },
        { question: "How do you say “I am hungry”?", choices: ["Sono fame", "Ho fame", "È fame"], answer: 1, explanation: "Italian uses avere for hunger: ho fame." },
      ]),
      languageLesson("italian-3", "At the café", "Order food and drink courteously.", [{ heading: "Ordering", body: "Vorrei means ‘I would like.’ Per favore adds courtesy. Ask Quanto costa? for the price.", examples: ["Vorrei un cappuccino, per favore.", "Il conto, per favore."] }], [
        { question: "Which phrase asks for the bill?", choices: ["Il conto, per favore", "Mi chiamo", "Buonasera"], answer: 0, explanation: "Il conto is the bill." },
        { question: "Vorrei means…", choices: ["I would like", "I already paid", "Where is"], answer: 0, explanation: "Vorrei is a polite conditional form used for requests." },
      ]),
    ],
  },
  {
    id: "french", name: "French", greeting: "On y va.", description: "Grow confident in conversation, grammar, and comprehension.",
    lessons: [
      languageLesson("french-1", "Bonjour, not bonjourrr", "Greet and introduce yourself.", [{ heading: "Greetings", body: "Bonjour is polite and works most of the day. Bonsoir is for evening. Je m’appelle… gives your name; enchanté or enchantée means pleased to meet you.", examples: ["Bonjour, je m’appelle Camille.", "Bonsoir. Enchantée."] }], [
        { question: "How do you say “My name is Paul”?", choices: ["Je suis nom Paul", "Je m’appelle Paul", "J’ai Paul"], answer: 1, explanation: "Je m’appelle… is the standard introduction." },
        { question: "Which greeting fits the evening?", choices: ["Bonsoir", "Merci", "Salut matin"], answer: 0, explanation: "Bonsoir is used in the evening." },
      ]),
      languageLesson("french-2", "Être and avoir", "Use the two essential French verbs.", [{ heading: "Being and having", body: "Être means to be and avoir means to have. French uses avoir for age and several physical states.", examples: ["Je suis prête. — I am ready.", "J’ai vingt ans. — I am twenty."] }], [
        { question: "Complete: Je ___ fatigué. (I am tired.)", choices: ["ai", "suis", "as"], answer: 1, explanation: "Je suis is ‘I am.’" },
        { question: "How is age expressed?", choices: ["Je suis vingt ans", "J’ai vingt ans", "Je vais vingt ans"], answer: 1, explanation: "French uses avoir: literally, ‘I have twenty years.’" },
      ]),
      languageLesson("french-3", "Ordering with dignity", "Order at a café and ask for the bill.", [{ heading: "Useful requests", body: "Je voudrais… means ‘I would like.’ Use s’il vous plaît in formal or unfamiliar settings.", examples: ["Je voudrais un café, s’il vous plaît.", "L’addition, s’il vous plaît."] }], [
        { question: "Which phrase politely orders tea?", choices: ["Je suis un thé", "Je voudrais un thé", "J’ai thé"], answer: 1, explanation: "Je voudrais is the polite request form." },
        { question: "L’addition means…", choices: ["the menu", "the bill", "the table"], answer: 1, explanation: "Ask for l’addition when you are ready to pay." },
      ]),
    ],
  },
  {
    id: "german", name: "German", greeting: "Los geht’s.", description: "Master useful German structure without drowning in grammar tables.",
    lessons: [
      languageLesson("german-1", "Hallo and introductions", "Greet people and introduce yourself.", [{ heading: "First contact", body: "Hallo is neutral. Guten Morgen, guten Tag, and guten Abend follow the time of day. Ich heiße… gives your name.", examples: ["Guten Tag. Ich heiße Nina.", "Wie heißt du? — What is your name?"] }], [
        { question: "How do you say “My name is Max”?", choices: ["Ich habe Max", "Ich heiße Max", "Ich bin Name Max"], answer: 1, explanation: "Ich heiße… is the usual introduction." },
        { question: "Which greeting means good evening?", choices: ["Guten Morgen", "Guten Abend", "Gute Nachtmittag"], answer: 1, explanation: "Guten Abend is good evening." },
      ]),
      languageLesson("german-2", "The verb takes position two", "Build clear main-clause sentences.", [{ heading: "Word order", body: "In a normal statement, the conjugated verb sits in the second position. A time phrase can come first, but the verb still comes second.", examples: ["Ich lerne heute Deutsch.", "Heute lerne ich Deutsch."] }], [
        { question: "Which sentence has correct word order?", choices: ["Heute ich lerne Deutsch", "Heute lerne ich Deutsch", "Heute Deutsch ich lerne"], answer: 1, explanation: "Heute fills position one, so lerne must be second." },
        { question: "In a main statement, the conjugated verb is usually…", choices: ["first", "second", "last"], answer: 1, explanation: "German main clauses follow the verb-second rule." },
      ]),
      languageLesson("german-3", "Food, please", "Order politely and handle a café exchange.", [{ heading: "Ordering", body: "Ich hätte gern… means ‘I would like.’ Bitte adds courtesy. Die Rechnung is the bill.", examples: ["Ich hätte gern einen Kaffee, bitte.", "Die Rechnung, bitte."] }], [
        { question: "Which phrase politely orders coffee?", choices: ["Ich bin Kaffee", "Ich hätte gern einen Kaffee", "Kaffee heißt ich"], answer: 1, explanation: "Ich hätte gern… is a standard polite request." },
        { question: "Die Rechnung means…", choices: ["the bill", "the chair", "the waiter"], answer: 0, explanation: "Ask for die Rechnung when ready to pay." },
      ]),
    ],
  },
  {
    id: "korean", name: "Korean", greeting: "시작해요.", description: "Read Hangul and build respectful everyday Korean.",
    lessons: [
      languageLesson("korean-1", "Hangul has a system", "Recognize how Hangul syllable blocks work.", [{ heading: "Syllable blocks", body: "Hangul letters combine into square syllable blocks. 한 is ㅎ(h) + ㅏ(a) + ㄴ(n). Read the block left-to-right and top-to-bottom according to its shape.", examples: ["한 = han", "글 = geul", "한국 = Hanguk (Korea)"] }], [
        { question: "Which letters form 한?", choices: ["ㅎ + ㅏ + ㄴ", "ㄱ + ㅜ + ㄹ", "ㅁ + ㅣ"], answer: 0, explanation: "ㅎ gives h, ㅏ gives a, and ㄴ closes with n." },
        { question: "Hangul letters are grouped into…", choices: ["long strings", "syllable blocks", "numbers"], answer: 1, explanation: "Each square-looking block represents a syllable." },
      ]),
      languageLesson("korean-2", "Hello with respect", "Use basic polite greetings and introductions.", [{ heading: "Polite basics", body: "안녕하세요 (annyeonghaseyo) is a polite hello. 저는 …예요/이에요 means ‘I am…’. Use 예요 after a vowel and 이에요 after a consonant.", examples: ["안녕하세요.", "저는 미나예요. — I am Mina."] }], [
        { question: "Which phrase is a polite hello?", choices: ["감사합니다", "안녕하세요", "괜찮아요"], answer: 1, explanation: "안녕하세요 is the standard polite greeting." },
        { question: "저는 미나예요 means…", choices: ["Thank you, Mina", "I am Mina", "Where is Mina?"], answer: 1, explanation: "저는 marks ‘as for me,’ followed by the name and polite copula." },
      ]),
      languageLesson("korean-3", "Ordering politely", "Make a simple request in a café.", [{ heading: "주세요", body: "주세요 (juseyo) means ‘please give me.’ Put the item before it. Add 하나 for one.", examples: ["커피 하나 주세요. — One coffee, please.", "물 주세요. — Water, please."] }], [
        { question: "How do you ask for water?", choices: ["물 주세요", "물 안녕하세요", "물 예요"], answer: 0, explanation: "Item + 주세요 makes a polite request." },
        { question: "하나 means…", choices: ["please", "one", "coffee"], answer: 1, explanation: "하나 is the native Korean word for one." },
      ]),
    ],
  },
  {
    id: "math", name: "Math", greeting: "Show your work.", description: "Understand the method, practice it, and stop fearing the symbols.",
    lessons: [
      { id: "math-1", title: "Fractions without drama", minutes: 18, objective: "Add and simplify fractions.", sections: [
        { heading: "Common denominators", body: "To add fractions, rewrite them with the same denominator. Multiply numerator and denominator by the same number, then add only the numerators.", examples: ["1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2", "3/4 + 1/8 = 6/8 + 1/8 = 7/8"] },
      ], exercises: [
        { question: "What is 1/4 + 1/2?", choices: ["2/6", "3/4", "1/8"], answer: 1, explanation: "Rewrite 1/2 as 2/4, then 1/4 + 2/4 = 3/4." },
        { question: "Simplify 6/8.", choices: ["3/4", "2/3", "4/6"], answer: 0, explanation: "Divide numerator and denominator by 2." },
      ] },
      { id: "math-2", title: "Solve for x", minutes: 18, objective: "Solve one-step and two-step equations.", sections: [
        { heading: "Keep the balance", body: "An equation is balanced. Do the same operation to both sides, undoing addition or subtraction before multiplication or division.", examples: ["x + 5 = 12 → x = 7", "3x + 2 = 14 → 3x = 12 → x = 4"] },
      ], exercises: [
        { question: "Solve: x − 7 = 9", choices: ["2", "16", "63"], answer: 1, explanation: "Add 7 to both sides: x = 16." },
        { question: "Solve: 2x + 3 = 11", choices: ["4", "7", "5.5"], answer: 0, explanation: "Subtract 3 to get 2x = 8, then divide by 2." },
      ] },
      { id: "math-3", title: "Percentages in real life", minutes: 15, objective: "Calculate discounts, tips, and percentage change.", sections: [
        { heading: "Percent means per hundred", body: "Convert a percent to a decimal by dividing by 100, then multiply. A 20% discount on $50 is 0.20 × 50 = $10.", examples: ["15% of 80 = 0.15 × 80 = 12", "$50 after 20% off = $50 − $10 = $40"] },
      ], exercises: [
        { question: "What is 25% of 60?", choices: ["10", "15", "25"], answer: 1, explanation: "0.25 × 60 = 15." },
        { question: "A $40 item is 10% off. New price?", choices: ["$36", "$30", "$44"], answer: 0, explanation: "10% of 40 is 4; subtract it from 40." },
      ] },
    ],
  },
  {
    id: "english", name: "English", greeting: "Words. In order.", description: "Strengthen grammar, vocabulary, reading, and clear writing.",
    lessons: [
      languageLesson("english-1", "Build a clean sentence", "Identify subjects, verbs, and complete thoughts.", [{ heading: "The core", body: "A complete sentence needs a subject and a finite verb, and it must express a complete thought. Fragments leave the reader waiting.", examples: ["The dog barked.", "Because the dog barked. — fragment"] }], [
        { question: "Which is a complete sentence?", choices: ["After the meeting.", "The meeting ended early.", "Because it was late."], answer: 1, explanation: "It has a subject, verb, and complete thought." },
        { question: "The subject in “Maria writes daily” is…", choices: ["Maria", "writes", "daily"], answer: 0, explanation: "Maria performs the action." },
      ]),
      languageLesson("english-2", "Commas that earn their keep", "Use commas in lists and after introductions.", [{ heading: "Two reliable uses", body: "Use commas between items in a series and after an introductory word, phrase, or clause.", examples: ["We bought bread, milk, and apples.", "After dinner, we walked home."] }], [
        { question: "Which sentence is punctuated correctly?", choices: ["After lunch we left.", "After lunch, we left.", "After, lunch we left."], answer: 1, explanation: "A comma follows the introductory phrase ‘After lunch.’" },
        { question: "Which list is clear?", choices: ["red blue and green", "red, blue, and green", "red blue, and green"], answer: 1, explanation: "Commas separate each item in the series." },
      ]),
      languageLesson("english-3", "Write with evidence", "Build a focused paragraph that supports one point.", [{ heading: "Point, evidence, explanation", body: "Start with a clear claim. Add specific evidence, then explain how that evidence supports the claim. End by linking back to the point.", examples: ["Claim: The policy saved time. Evidence: Processing fell from five days to two. Explanation: The simpler form removed three approvals."] }], [
        { question: "What should follow a claim?", choices: ["An unrelated fact", "Specific evidence", "A new topic"], answer: 1, explanation: "Evidence makes the claim credible and testable." },
        { question: "What does explanation do?", choices: ["Connects evidence to the claim", "Repeats the title", "Adds random detail"], answer: 0, explanation: "Explanation tells the reader why the evidence matters." },
      ]),
    ],
  },
];

export const getSubject = (id: string) => SUBJECTS.find((subject) => subject.id === id);
export const getLesson = (subjectId: string, lessonId: string) => getSubject(subjectId)?.lessons.find((lesson) => lesson.id === lessonId);
