import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "italian-1",
    title: "Ciao a Tutti: Taming Italian Sounds",
    minutes: 15,
    objective: "Greet people naturally and read Italian pronunciation rules correctly.",
    sections: [
      {
        heading: "Vowels Stay Pure",
        body: "Italian has seven vowel sounds represented by five letters, and unlike English, each vowel keeps a clear, consistent sound. 'A' sounds like 'ah', 'i' like 'ee', and 'u' like 'oo', while 'e' and 'o' can be open or closed depending on the word, a subtlety that comes with listening practice. Because spelling closely matches pronunciation, Italian words are usually easy to read aloud once you know the vowel sounds. This predictability is one reason Italian is considered approachable for beginners.",
        examples: ["casa (KAH-zah) — house", "vino (VEE-noh) — wine", "luna (LOO-nah) — moon"],
      },
      {
        heading: "Greetings for Every Occasion",
        body: "'Ciao' is the most flexible greeting, used informally for both 'hi' and 'bye' with friends and family, but it's too casual for strangers or formal settings. 'Buongiorno' (good morning/day) is used until mid-afternoon, while 'buonasera' (good evening) takes over afterward; 'buonanotte' (good night) is reserved for when someone is going to bed. In formal situations, 'salve' works as a neutral greeting at any time of day, bridging the gap between casual and formal. Choosing the right greeting shows awareness of Italian social register.",
        examples: ["Ciao, come stai? — Hi, how are you? (informal)", "Buongiorno, come sta? — Good morning, how are you? (formal)", "Buonasera a tutti. — Good evening everyone."],
      },
      {
        heading: "Tricky Consonant Combinations",
        body: "The letters 'c' and 'g' change sound depending on what follows them: before 'e' or 'i' they sound soft, like 'ch' and 'j' in English, but before 'a', 'o', or 'u' they sound hard, like 'k' and 'g' in 'go'. To keep a hard sound before 'e' or 'i', Italian inserts an 'h', as in 'spaghetti'. Double consonants are also pronounced longer and more forcefully than single ones, which actually changes the meaning of some words entirely. Listening carefully to native speakers is the best way to internalize these distinctions.",
        examples: ["cena (CHEH-nah) — dinner (soft c)", "casa (KAH-zah) — house (hard c)", "spaghetti (spah-GET-tee) — spaghetti (hard g via 'h')"],
      },
    ],
    exercises: [
      { question: "How is the Italian 'c' pronounced before 'e' or 'i'?", choices: ["Hard, like 'k'", "Soft, like 'ch'", "Silent", "Like 's'"], answer: 1, explanation: "Before 'e' or 'i', Italian 'c' softens to a 'ch' sound, as in 'cena' (dinner)." },
      { question: "Which greeting is appropriate only in informal settings?", choices: ["Buongiorno", "Salve", "Ciao", "Buonasera"], answer: 2, explanation: "'Ciao' is casual and reserved for friends and family, not strangers or formal contexts." },
      { question: "What does adding 'h' after 'g' or 'c' before 'e/i' accomplish?", choices: ["Makes the sound softer", "Keeps the sound hard", "Makes the vowel longer", "Has no effect"], answer: 1, explanation: "The 'h' preserves the hard 'k' or 'g' sound before 'e' or 'i', as in 'spaghetti'." },
      { question: "Which word would you use as a neutral greeting suitable at any time of day?", choices: ["Ciao", "Salve", "Buonanotte", "Arrivederci"], answer: 1, explanation: "'Salve' works as a polite, time-neutral greeting in both formal and semi-formal contexts." },
      { question: "How many core vowel letters does Italian have?", choices: ["4", "5", "6", "7"], answer: 1, explanation: "Italian uses five vowel letters (a, e, i, o, u), though 'e' and 'o' can have open or closed variants." },
      { question: "What effect does doubling a consonant have in Italian?", choices: ["No effect at all", "It's pronounced longer and can change meaning", "It becomes silent", "It only affects spelling"], answer: 1, explanation: "Double consonants are held longer in pronunciation and can distinguish word meaning, e.g. 'papa' vs 'pappa'." },
    ],
  },
  {
    id: "italian-2",
    title: "Essere e Avere: The Verbs You Cannot Avoid",
    minutes: 18,
    objective: "Correctly conjugate and use essere (to be) and avere (to have).",
    sections: [
      {
        heading: "Essere: To Be",
        body: "'Essere' is one of the most irregular and most important verbs in Italian, used for identity, nationality, characteristics, and location. Its present tense forms are sono, sei, è, siamo, siete, sono, and notice that 'io' and 'loro' share the identical form 'sono', so context and subject pronouns clarify meaning. 'Essere' is also used to form the passato prossimo of many verbs of movement, which you'll encounter later. Because it's so frequent, memorizing these six forms thoroughly now saves confusion in every future lesson.",
        examples: ["Sono italiano. — I am Italian.", "Siamo studenti. — We are students.", "Lei è simpatica. — She is nice."],
      },
      {
        heading: "Avere: To Have",
        body: "'Avere' means 'to have' and conjugates as ho, hai, ha, abbiamo, avete, hanno; notice the silent 'h' in several forms, which exists only to distinguish these words from others spelled the same without it, like 'ho' versus 'o' (or). Like Spanish 'tener', Italian uses 'avere' in fixed expressions where English uses 'to be', such as 'avere fame' (to be hungry) and 'avere ragione' (to be right). These expressions cannot be translated word for word, so they need to be memorized as complete phrases. 'Avere' is also the auxiliary verb for forming the past tense of most Italian verbs.",
        examples: ["Ho vent'anni. — I am twenty years old. (literally: I have twenty years)", "Hai fame? — Are you hungry?", "Hanno un cane. — They have a dog."],
      },
      {
        heading: "Choosing the Right Verb",
        body: "A helpful rule of thumb is that 'essere' answers 'what/who is something', while 'avere' answers 'what does someone have', including many bodily and emotional states expressed through possession in Italian. Mixing them up is one of the most common beginner errors, since English speakers instinctively want to say 'I am hungry' rather than 'I have hunger'. With consistent practice, choosing correctly becomes automatic rather than something you have to consciously calculate. Reading and listening to real Italian sentences is the fastest way to build this instinct.",
        examples: ["Ho freddo. — I am cold. (literally: I have cold)", "Sono stanco. — I am tired. (essere, a state described as being)", "Ha paura. — He/she is afraid. (literally: has fear)"],
      },
    ],
    exercises: [
      { question: "What is the 'noi' form of 'essere'?", choices: ["sono", "siamo", "siete", "sei"], answer: 1, explanation: "'Siamo' is the first-person plural form of 'essere', meaning 'we are'." },
      { question: "How do you say 'I am twenty years old' in Italian?", choices: ["Sono vent'anni.", "Ho vent'anni.", "Sto vent'anni.", "Faccio vent'anni."], answer: 1, explanation: "Italian expresses age with 'avere': ho vent'anni literally means 'I have twenty years'." },
      { question: "Why does 'ho' have a silent 'h'?", choices: ["To make it plural", "To distinguish it from 'o' (or)", "It's a typo tradition", "To show it's a question"], answer: 1, explanation: "The silent 'h' in 'ho' distinguishes it in writing from 'o', meaning 'or'." },
      { question: "Which verb is used in 'avere fame' (to be hungry)?", choices: ["Essere", "Avere", "Stare", "Fare"], answer: 1, explanation: "'Avere fame' literally means 'to have hunger' and uses 'avere', not 'essere'." },
      { question: "What is the correct form of 'avere' for 'loro' (they)?", choices: ["hanno", "hai", "ha", "abbiamo"], answer: 0, explanation: "'Hanno' is the third-person plural form of 'avere', used with 'loro'." },
      { question: "'Sono stanco' uses which verb, and why?", choices: ["Avere, because tiredness is possession", "Essere, describing a state of being", "Avere, to match English grammar", "Stare, for location"], answer: 1, explanation: "Italian uses 'essere' with 'stanco' to describe being tired, unlike hunger or cold which use 'avere'." },
    ],
  },
  {
    id: "italian-3",
    title: "Il, Lo, La: Articles for Every Occasion",
    minutes: 16,
    objective: "Identify noun gender and use the correct articles and plural forms.",
    sections: [
      {
        heading: "Masculine and Feminine Nouns",
        body: "Italian nouns are either masculine or feminine, and the ending is usually a reliable clue: '-o' typically signals masculine and '-a' typically signals feminine, while '-e' endings can be either and must be memorized individually. Because gender determines articles and adjective agreement, it's important to learn new nouns together with their article rather than in isolation. Some common exceptions exist, like 'la mano' (the hand), which ends in '-o' pattern territory but is actually feminine. Building this habit early avoids a lot of correction later.",
        examples: ["il libro — the book (masculine)", "la penna — the pen (feminine)", "la mano — the hand (feminine exception)"],
      },
      {
        heading: "The Many Faces of 'The'",
        body: "Italian has more definite articles than Spanish or French because the article also depends on the first letter of the following word, not just gender and number. Masculine singular uses 'il' before most consonants, 'lo' before 'z', 's+consonant', or 'gn', and 'l'' before a vowel. Feminine singular uses 'la' before a consonant and 'l'' before a vowel. Plural forms follow the same logic: 'i' and 'gli' for masculine plural, and 'le' for feminine plural, with 'gli' used in the same tricky consonant situations as 'lo'.",
        examples: ["lo studente / gli studenti — the student / the students", "l'amico / gli amici — the friend / the friends", "la chiave / le chiavi — the key / the keys"],
      },
      {
        heading: "Forming Plurals",
        body: "Unlike English, Italian plurals are formed by changing the final vowel rather than adding '-s'. Masculine nouns ending in '-o' typically change to '-i' in the plural, feminine nouns ending in '-a' change to '-e', and nouns of either gender ending in '-e' also change to '-i'. This vowel-change system takes some adjustment for English speakers used to adding letters rather than swapping them. Because the article must also match, learning the plural pattern alongside article agreement reinforces both at once.",
        examples: ["libro → libri — book → books", "penna → penne — pen → pens", "cane → cani — dog → dogs"],
      },
    ],
    exercises: [
      { question: "What is the plural of 'il libro'?", choices: ["i libri", "gli libri", "le libri", "il libri"], answer: 0, explanation: "Masculine nouns ending in '-o' become '-i' in the plural, and the article changes to 'i': i libri." },
      { question: "Which article is used before a masculine noun starting with 'z'?", choices: ["il", "lo", "la", "l'"], answer: 1, explanation: "'Lo' is used before masculine nouns starting with 'z', 's+consonant', or 'gn'." },
      { question: "What is the feminine plural article?", choices: ["gli", "i", "le", "lo"], answer: 2, explanation: "'Le' is used for all feminine plural nouns, regardless of the following letter." },
      { question: "How does 'penna' become plural?", choices: ["penne", "pennas", "penno", "penni"], answer: 0, explanation: "Feminine nouns ending in '-a' change to '-e' in the plural: penna → penne." },
      { question: "Which noun is a common exception to typical gender-ending patterns?", choices: ["il libro", "la penna", "la mano", "lo zaino"], answer: 2, explanation: "'La mano' looks like it should be masculine due to its '-o' ending pattern territory, but it is feminine." },
      { question: "What determines whether 'il' or 'lo' is used with a masculine noun?", choices: ["Random choice", "The first letter of the following word", "Whether it's plural", "The speaker's region only"], answer: 1, explanation: "Italian articles are chosen based on gender, number, and the initial sound of the following word." },
    ],
  },
  {
    id: "italian-4",
    title: "-ARE, -ERE, -IRE: Three Conjugation Families",
    minutes: 18,
    objective: "Conjugate regular -are, -ere, and -ire verbs in the present tense.",
    sections: [
      {
        heading: "Three Verb Groups",
        body: "Italian regular verbs fall into three groups based on their infinitive ending: -are, -ere, or -ire, similar to Spanish's three families. Each group has its own set of present-tense endings, but once learned, they apply consistently to every regular verb in that group. 'Parlare' (to speak), 'credere' (to believe), and 'dormire' (to sleep) represent the three patterns respectively. Recognizing the ending immediately tells you which conjugation pattern to apply.",
        examples: ["parlare — to speak (-are)", "credere — to believe (-ere)", "dormire — to sleep (-ire)"],
      },
      {
        heading: "Present Tense Endings",
        body: "For -are verbs, remove the ending and add -o, -i, -a, -iamo, -ate, -ano. For -ere verbs, add -o, -i, -e, -iamo, -ete, -ono. For -ire verbs, add -o, -i, -e, -iamo, -ite, -ono, though some -ire verbs like 'finire' insert '-isc-' before the ending in most singular and third-person plural forms. This '-isc-' pattern must be learned per verb since not all -ire verbs use it; 'dormire' does not, but 'capire' (to understand) does. Consistent practice with both patterns prevents confusing them later.",
        examples: ["Io parlo italiano. — I speak Italian.", "Lei crede in te. — She believes in you.", "Noi dormiamo bene. — We sleep well."],
      },
      {
        heading: "The '-isc-' Surprise",
        body: "Verbs like 'finire' (to finish) and 'capire' (to understand) add '-isc-' between the stem and ending in the 'io', 'tu', 'lui/lei', and 'loro' forms, but not in 'noi' and 'voi'. This means 'capisco' (I understand) but 'capiamo' (we understand), a shift that can trip up learners expecting total regularity. There's no simple rule to predict which -ire verbs behave this way, so each one must be learned individually through exposure. Fortunately, dictionaries and vocabulary lists usually mark this feature clearly.",
        examples: ["Capisco l'italiano. — I understand Italian.", "Finisco il lavoro alle sei. — I finish work at six.", "Noi finiamo insieme. — We finish together."],
      },
    ],
    exercises: [
      { question: "What is the 'io' form of 'parlare'?", choices: ["parlo", "parli", "parla", "parliamo"], answer: 0, explanation: "-are verbs form the 'io' present tense with '-o': parl + o = parlo." },
      { question: "Which ending set is used for -ere verbs?", choices: ["-o, -i, -a, -iamo, -ate, -ano", "-o, -i, -e, -iamo, -ete, -ono", "-o, -i, -e, -iamo, -ite, -ono", "-isco, -isci, -isce"], answer: 1, explanation: "-ere verbs use -o, -i, -e, -iamo, -ete, -ono in the present tense." },
      { question: "What is special about 'capire' in the present tense?", choices: ["It's completely irregular", "It inserts '-isc-' in most forms", "It has no 'io' form", "It only works in plural"], answer: 1, explanation: "'Capire' inserts '-isc-' before the ending in the io/tu/lui/loro forms: capisco, capisci, capisce, capiscono." },
      { question: "Does 'dormire' use the '-isc-' pattern?", choices: ["Yes, always", "No, it conjugates without -isc-", "Only in the plural", "Only in questions"], answer: 1, explanation: "'Dormire' is a regular -ire verb without the '-isc-' insertion: dormo, dormi, dorme..." },
      { question: "What is the 'noi' ending shared by all three verb groups?", choices: ["-iamo", "-ate", "-ete", "-ite"], answer: 0, explanation: "All three conjugation groups share the '-iamo' ending for 'noi' in the present tense." },
      { question: "Which sentence is correctly conjugated?", choices: ["Lei parla italiano.", "Lei parli italiano.", "Lei parlano italiano.", "Lei parlate italiano."], answer: 0, explanation: "Third person singular 'lei' uses the '-a' ending for -are verbs: parla." },
    ],
  },
  {
    id: "italian-5",
    title: "Domande e Negazioni: Asking and Refusing Politely",
    minutes: 15,
    objective: "Form questions and negative sentences in Italian.",
    sections: [
      {
        heading: "Questions Without Extra Words",
        body: "Like other Romance languages, Italian doesn't need a helper verb like 'do' to form a question; you can simply change your intonation, raising your pitch at the end of the sentence. Word order can also shift, often placing the subject after the verb in a question, though this is flexible and not mandatory. In writing, only a standard question mark is used at the end, unlike Spanish's inverted mark at the start. This makes reading Italian questions require picking up context from word order rather than punctuation cues.",
        examples: ["Parli italiano? — Do you speak Italian?", "Dove abiti? — Where do you live?", "Vieni con noi? — Are you coming with us?"],
      },
      {
        heading: "Question Words",
        body: "Common Italian question words include 'che cosa' or simply 'cosa' (what), 'chi' (who), 'dove' (where), 'quando' (when), 'come' (how), and 'perché' (why). Usefully, 'perché' means both 'why' and 'because', with context and sentence position clarifying the meaning, unlike Spanish which uses two distinct spellings. These words are typically placed at the start of the sentence, directly before the verb. Learning them as a set makes it much easier to ask basic questions confidently while traveling or studying.",
        examples: ["Perché studi l'italiano? — Why do you study Italian?", "Studio l'italiano perché mi piace. — I study Italian because I like it.", "Come stai? — How are you?"],
      },
      {
        heading: "Negation With 'Non'",
        body: "To make an Italian sentence negative, simply place 'non' directly before the conjugated verb, similar to Spanish 'no'. Like Spanish, Italian also uses double negatives grammatically, so words like 'niente' (nothing) or 'nessuno' (nobody) are paired with 'non' rather than replacing it. If the negative word comes after the verb, 'non' must still appear before the verb for the sentence to be grammatically correct. This structure feels unfamiliar to English speakers at first but becomes natural with repeated exposure.",
        examples: ["Non parlo francese. — I don't speak French.", "Non ho niente. — I don't have anything.", "Non conosco nessuno qui. — I don't know anyone here."],
      },
    ],
    exercises: [
      { question: "How does Italian typically form a yes/no question in speech?", choices: ["Adding 'do' before the verb", "Raising intonation at the end", "Reversing all word order", "Adding 'non' at the start"], answer: 1, explanation: "Italian questions are often formed simply by intonation, without needing a helper verb like English 'do'." },
      { question: "What does 'perché' mean?", choices: ["Only 'why'", "Only 'because'", "Both 'why' and 'because', depending on context", "'When'"], answer: 2, explanation: "Unlike Spanish, Italian uses the same word 'perché' for both 'why' and 'because'." },
      { question: "How do you say 'I don't have anything'?", choices: ["Ho niente.", "Non ho niente.", "Niente ho non.", "Non niente ho."], answer: 1, explanation: "Italian negation requires 'non' before the verb, even with words like 'niente' after it." },
      { question: "Which question word means 'how'?", choices: ["Dove", "Come", "Quando", "Chi"], answer: 1, explanation: "'Come' means 'how', as in 'Come stai?' (How are you?)." },
      { question: "Where is 'non' placed in a negative sentence?", choices: ["After the verb", "At the end of the sentence", "Directly before the conjugated verb", "It's optional"], answer: 2, explanation: "'Non' must be placed directly before the conjugated verb to negate a sentence." },
      { question: "What punctuation does Italian use to mark a written question?", choices: ["Inverted question mark at the start", "Only a question mark at the end", "Exclamation point", "No punctuation needed"], answer: 1, explanation: "Unlike Spanish, Italian only uses a standard question mark at the end of the sentence." },
    ],
  },
  {
    id: "italian-6",
    title: "Vorrei un Caffè: Ordering Without Embarrassing Yourself",
    minutes: 17,
    objective: "Use polite expressions to order food and shop in Italian.",
    sections: [
      {
        heading: "Politeness With 'Per Favore' and 'Grazie'",
        body: "'Per favore' (please) and 'grazie' (thank you) are essential in Italian daily life, and Italians tend to appreciate warmth and politeness in service interactions. When thanked, the typical response is 'prego' (you're welcome), which is also used to invite someone to go ahead, like holding a door open. Formality also matters: use 'lei' (formal you) with shopkeepers, waitstaff, and strangers rather than the informal 'tu', which is reserved for friends, family, and peers. Getting this distinction right avoids sounding overly familiar with someone you've just met.",
        examples: ["Un caffè, per favore. — A coffee, please.", "Grazie mille! — Thank you very much!", "Prego, si accomodi. — Please, have a seat / go ahead."],
      },
      {
        heading: "Ordering With 'Vorrei'",
        body: "'Vorrei' (I would like) is the conditional form of 'volere' (to want) and is the standard, polite way to order food or drinks in Italy, much more common than the blunter 'voglio' (I want). Using 'vorrei' shows courtesy and is expected in restaurants and cafés, even among locals. To ask what someone else wants, you can say 'Cosa vorrebbe?' in formal speech or 'Cosa vuoi?' informally. This distinction between polite conditional forms and direct present-tense forms mirrors similar softening strategies in English, like 'I would like' versus 'I want'.",
        examples: ["Vorrei un cappuccino, grazie. — I would like a cappuccino, thank you.", "Vorremmo il conto, per favore. — We would like the bill, please.", "Cosa vorrebbe ordinare? — What would you like to order?"],
      },
      {
        heading: "At the Market",
        body: "Shopping phrases often involve quantities like 'un etto di' (100 grams of) or 'un chilo di' (a kilo of), both commonly used at Italian markets and delis. To ask the price, use 'Quanto costa?' for one item or 'Quanto costano?' for multiple items, matching the verb to the number of things being priced, just as in Spanish. Italians often specify quality or type when shopping, such as asking for something 'fresco' (fresh) or 'di stagione' (in season). These small details reflect how much Italian food culture values freshness and specificity.",
        examples: ["Quanto costa questo formaggio? — How much does this cheese cost?", "Un chilo di mele, per favore. — A kilo of apples, please.", "Quanto costano le pere? — How much do the pears cost?"],
      },
    ],
    exercises: [
      { question: "What is the polite reply to 'grazie'?", choices: ["Per favore", "Prego", "Scusi", "Buonasera"], answer: 1, explanation: "'Prego' is the standard, versatile response to 'thank you' in Italian." },
      { question: "Which is the most polite way to order in a restaurant?", choices: ["Voglio un caffè.", "Vorrei un caffè.", "Ho un caffè.", "Sono un caffè."], answer: 1, explanation: "'Vorrei' (I would like) is the polite conditional form preferred for ordering, unlike the blunter 'voglio'." },
      { question: "What does 'un etto di' refer to?", choices: ["A kilo", "100 grams", "A liter", "A dozen"], answer: 1, explanation: "'Un etto' is a common Italian unit meaning 100 grams, frequently used when buying deli items." },
      { question: "When should you use 'lei' instead of 'tu'?", choices: ["Only with children", "With strangers, shopkeepers, and in formal contexts", "Only in writing", "Never in modern Italian"], answer: 1, explanation: "'Lei' is the formal 'you' used to show respect toward strangers and people in service roles." },
      { question: "How do you ask the price of multiple items?", choices: ["Quanto costa?", "Quanto costano?", "Quanti sono?", "Quanto vale?"], answer: 1, explanation: "'Costano' agrees with plural subjects, so it's used when asking about more than one item." },
      { question: "What is 'vorrei' derived from?", choices: ["Essere", "Avere", "Volere", "Potere"], answer: 2, explanation: "'Vorrei' is the conditional form of 'volere' (to want), used to soften requests politely." },
    ],
  },
  {
    id: "italian-7",
    title: "Ieri Ho Mangiato Troppo: The Passato Prossimo",
    minutes: 19,
    objective: "Form and use the passato prossimo to describe completed past actions.",
    sections: [
      {
        heading: "Two Pieces: Auxiliary Plus Past Participle",
        body: "The passato prossimo is Italian's most common past tense for completed actions, and it's built with two parts: an auxiliary verb (either 'avere' or 'essere') conjugated in the present tense, plus the past participle of the main verb. Most verbs use 'avere' as their auxiliary, but verbs of motion, state change, and reflexive verbs use 'essere' instead. Regular past participles are formed by removing the infinitive ending and adding -ato for -are verbs, -uto for -ere verbs, and -ito for -ire verbs. This two-part structure is similar to English 'have eaten' or 'has gone'.",
        examples: ["Ho mangiato una pizza. — I ate/have eaten a pizza.", "Ho creduto in te. — I believed in you.", "Ho dormito otto ore. — I slept eight hours."],
      },
      {
        heading: "When 'Essere' Takes Over",
        body: "Verbs of motion like 'andare' (to go), 'venire' (to come), and 'partire' (to leave), along with verbs describing a change of state like 'nascere' (to be born) and 'morire' (to die), use 'essere' as their auxiliary instead of 'avere'. Crucially, when 'essere' is the auxiliary, the past participle must agree in gender and number with the subject, adding '-o', '-a', '-i', or '-e' accordingly. This agreement rule doesn't apply when 'avere' is the auxiliary, which is one reason distinguishing the two auxiliaries matters so much. Reflexive verbs, like 'svegliarsi' (to wake oneself up), also always use 'essere'.",
        examples: ["Lei è andata al mercato. — She went to the market.", "Loro sono partiti ieri. — They left yesterday.", "Mi sono svegliato alle sette. — I woke up at seven."],
      },
      {
        heading: "Irregular Past Participles",
        body: "Many common verbs have irregular past participles that don't follow the -ato/-uto/-ito pattern and simply must be memorized. 'Fare' (to do/make) becomes 'fatto', 'dire' (to say) becomes 'detto', and 'prendere' (to take) becomes 'preso'. These irregular forms appear constantly in everyday conversation, so learning even a handful of the most common ones early will noticeably improve your ability to talk about the past. Flashcards or repeated exposure through reading are effective ways to lock these in.",
        examples: ["Ho fatto colazione. — I had breakfast.", "Ha detto la verità. — He/she told the truth.", "Abbiamo preso il treno. — We took the train."],
      },
    ],
    exercises: [
      { question: "What two parts make up the passato prossimo?", choices: ["Two past participles", "An auxiliary verb plus a past participle", "Present tense plus future tense", "Subject plus infinitive"], answer: 1, explanation: "The passato prossimo combines a present-tense auxiliary (avere/essere) with a past participle." },
      { question: "Which auxiliary does 'andare' use?", choices: ["Avere", "Essere", "Both equally", "Neither, it's irregular"], answer: 1, explanation: "Verbs of motion like 'andare' use 'essere' as their auxiliary in the passato prossimo." },
      { question: "Why does the participle change to 'andata' for a female subject?", choices: ["Random spelling variation", "Participles agree with the subject when using essere", "It's a typo tradition", "Only formal speech requires it"], answer: 1, explanation: "With 'essere' as the auxiliary, the past participle must agree in gender and number with the subject." },
      { question: "What is the past participle of 'fare'?", choices: ["farato", "fatto", "faruto", "fatoo"], answer: 1, explanation: "'Fare' has an irregular past participle: fatto, which must be memorized." },
      { question: "Which verb group forms its participle with '-uto'?", choices: ["-are verbs", "-ere verbs", "-ire verbs", "Reflexive verbs only"], answer: 1, explanation: "Regular -ere verbs form their past participle with '-uto', e.g. credere → creduto." },
      { question: "Do reflexive verbs use 'avere' or 'essere'?", choices: ["Avere", "Essere", "Either, interchangeably", "Neither"], answer: 1, explanation: "Reflexive verbs always take 'essere' as their auxiliary in the passato prossimo." },
    ],
  },
  {
    id: "italian-8",
    title: "Il Futuro Sarà Luminoso: Plans, Predictions, and a Reading",
    minutes: 20,
    objective: "Express future plans using the future tense and read a short passage.",
    sections: [
      {
        heading: "Forming the Future Tense",
        body: "Italian's simple future is formed by taking the infinitive, dropping the final 'e', and adding endings: -ò, -ai, -à, -emo, -ete, -anno, with all three verb groups using nearly the same set. For -are verbs specifically, the 'a' in the infinitive changes to 'e' before adding the endings, so 'parlare' becomes 'parler-' before the endings attach. This tense is used for predictions, promises, and plans, similar to English 'will'. Note the accent on the third-person singular ending '-à', which is essential for correct spelling and stress.",
        examples: ["Parlerò con lei domani. — I will speak with her tomorrow.", "Studierete di più. — You all will study more.", "Andranno in Italia. — They will go to Italy."],
      },
      {
        heading: "Irregular Future Stems",
        body: "Several common verbs have irregular stems in the future tense while keeping the same regular endings. 'Essere' becomes 'sar-' (sarò, sarai, sarà...), 'avere' becomes 'avr-', and 'andare' becomes 'andr-'. These irregular stems often involve dropping a vowel from the infinitive to keep pronunciation smooth, a pattern shared with similar irregularities in Spanish and French. Because these verbs are used so frequently, memorizing their future stems is a high-value investment for fluent-sounding speech.",
        examples: ["Sarò felice di vederti. — I will be happy to see you.", "Avremo tempo domani. — We will have time tomorrow.", "Andrò a Roma in estate. — I will go to Rome in the summer."],
      },
      {
        heading: "A Short Reading: I Piani di Marco",
        body: "Marco ha molti piani per il futuro. Il prossimo anno finirà l'università e cercherà un lavoro in una grande città. Dice che viaggerà molto prima di iniziare a lavorare, perché vuole vedere il mondo mentre è ancora giovane. Sarà difficile lasciare la sua famiglia, ma sa che sarà un'esperienza importante. This passage uses several future-tense verbs: 'finirà', 'cercherà', 'viaggerà', and 'sarà', all describing Marco's upcoming plans. Try picking out each future verb and its infinitive before reading the translation notes below.",
        examples: ["Finirà l'università. — He will finish university.", "Viaggerà molto. — He will travel a lot.", "Sarà un'esperienza importante. — It will be an important experience."],
      },
    ],
    exercises: [
      { question: "What is the future tense ending for 'io' across all verb groups?", choices: ["-ò", "-ai", "-à", "-emo"], answer: 0, explanation: "The first-person singular future ending is '-ò' for all three verb conjugation groups." },
      { question: "What is the irregular future stem of 'essere'?", choices: ["esser-", "sar-", "star-", "ess-"], answer: 1, explanation: "'Essere' has the irregular future stem 'sar-': sarò, sarai, sarà..." },
      { question: "In the reading, what does Marco plan to do before working?", choices: ["Get married", "Travel a lot", "Move abroad permanently", "Start a business"], answer: 1, explanation: "The text states Marco will travel a lot before starting to work, wanting to see the world while young." },
      { question: "What happens to '-are' verbs before adding future endings?", choices: ["Nothing changes", "The 'a' changes to 'e'", "The ending is removed entirely", "They become -ire verbs"], answer: 1, explanation: "-are verbs shift their vowel from 'a' to 'e' before attaching the future endings, e.g. parlare → parler-." },
      { question: "According to the reading, why will it be difficult for Marco?", choices: ["He dislikes traveling", "Leaving his family will be hard", "He cannot find a job", "He must learn a new language"], answer: 1, explanation: "The passage says it will be difficult for Marco to leave his family, even though the experience will be valuable." },
      { question: "Which verb form correctly completes: 'Domani (io) _____ a Roma'?", choices: ["andrò", "andare", "vado", "andato"], answer: 0, explanation: "'Andrò' is the correct first-person singular future form of 'andare', used with 'domani' (tomorrow)." },
    ],
  },
];
