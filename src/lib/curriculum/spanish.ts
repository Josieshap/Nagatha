import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "spanish-1",
    title: "Hola: Wrestling Your Mouth Into Spanish Shape",
    minutes: 15,
    objective: "Greet people naturally and pronounce Spanish vowels and letters correctly.",
    sections: [
      {
        heading: "Vowels Are Always the Same",
        body: "Spanish has five vowel sounds and they never change, unlike English where 'a' can sound five different ways. This makes Spanish pronunciation far more predictable once you memorize the five sounds. 'A' sounds like 'ah', 'e' like 'eh', 'i' like 'ee', 'o' like 'oh', and 'u' like 'oo'. Because vowels are consistent, you can usually read a Spanish word aloud correctly the first time you see it.",
        examples: ["casa (KAH-sah) — house", "mesa (MEH-sah) — table", "libro (LEE-broh) — book"],
      },
      {
        heading: "Greetings for Every Time of Day",
        body: "Spanish greetings change depending on the time of day, similar to English 'good morning' versus 'good evening'. 'Buenos días' is used until roughly midday, 'buenas tardes' covers the afternoon into early evening, and 'buenas noches' works for both 'good evening' and 'good night'. Note that 'días' is plural and masculine while 'tardes' and 'noches' are plural and feminine, which is why the ending changes from 'buenos' to 'buenas'. Informally, 'hola' works at any hour, much like 'hi' in English.",
        examples: ["Buenos días, ¿cómo está? — Good morning, how are you?", "Buenas noches — Good evening / Good night", "Hola, ¿qué tal? — Hi, how's it going?"],
      },
      {
        heading: "The Silent H and the Rolled R",
        body: "The letter 'h' in Spanish is always silent, so 'hola' is pronounced 'OH-lah', not 'HOH-lah'. The letter 'j' instead makes a harsh 'h' sound like clearing your throat gently, as in 'jamón'. A single 'r' between vowels is a light tap of the tongue, but a double 'rr' or an initial 'r' is a rolled, trilled sound that takes practice for most English speakers. Don't worry if you can't roll your r's perfectly at first; native speakers will still understand you.",
        examples: ["hola (OH-lah) — hello", "jamón (hah-MOHN) — ham", "perro (PEH-rroh) — dog"],
      },
    ],
    exercises: [
      { question: "How is the Spanish letter 'h' pronounced?", choices: ["Like English 'h'", "Silent", "Like 'j'", "Like 'ch'"], answer: 1, explanation: "The letter 'h' is always silent in Spanish, so 'hola' starts with a vowel sound." },
      { question: "Which greeting is appropriate at 8 PM?", choices: ["Buenos días", "Buenas tardes", "Buenas noches", "Buen día"], answer: 2, explanation: "'Buenas noches' covers evening and night, roughly after dark." },
      { question: "What sound does the Spanish vowel 'i' make?", choices: ["Like 'eye'", "Like 'eh'", "Like 'ee'", "Like 'ih' in 'sit'"], answer: 2, explanation: "Spanish 'i' is always pronounced like the English 'ee' in 'see'." },
      { question: "Why is it 'buenos días' but 'buenas noches'?", choices: ["It's random", "'Días' is masculine, 'noches' is feminine", "'Noches' is singular", "'Buenos' is only for men"], answer: 1, explanation: "The adjective 'bueno/a' must agree in gender with the noun; 'día' is masculine, 'noche' is feminine." },
      { question: "Which word contains the trilled 'rr' sound?", choices: ["pero", "caro", "perro", "cara"], answer: 2, explanation: "Double 'rr' is always a strong rolled trill, unlike the single tapped 'r' in 'pero' or 'caro'." },
      { question: "'Hola, ¿qué tal?' is closest in meaning to:", choices: ["Goodbye, see you later", "Hi, how's it going?", "Please and thank you", "Good night, sleep well"], answer: 1, explanation: "'¿Qué tal?' is an informal way of asking how someone is doing, like 'how's it going?'." },
    ],
  },
  {
    id: "spanish-2",
    title: "Ser, Estar, Tener: Three Verbs, Infinite Headaches",
    minutes: 18,
    objective: "Correctly use ser, estar, and tener for identity, state, and possession.",
    sections: [
      {
        heading: "Ser vs. Estar: Two Ways to Say 'To Be'",
        body: "Spanish famously has two verbs for 'to be': 'ser' and 'estar', and choosing the wrong one is a classic beginner mistake. 'Ser' describes lasting, defining characteristics like nationality, profession, or personality, while 'estar' describes temporary states, locations, and conditions. A useful trick is to ask whether the quality could plausibly change by tomorrow; if yes, lean toward 'estar'. Both are irregular, so their forms must simply be memorized rather than derived from a pattern.",
        examples: ["Soy médico. — I am a doctor. (ser, profession)", "Estoy cansado. — I am tired. (estar, temporary state)", "El café está frío. — The coffee is cold. (estar, condition)"],
      },
      {
        heading: "Tener: To Have, and Also to Be... Sometimes",
        body: "'Tener' means 'to have' and is used for possession just like in English, but Spanish also uses 'tener' in fixed expressions where English uses 'to be'. For example, 'to be hungry' is literally 'to have hunger' in Spanish, and 'to be right' is 'to have reason'. This is not something you can guess logically; these expressions must be learned as set phrases. 'Tener' is irregular in the present tense, changing its stem in most forms except 'nosotros' and 'vosotros'.",
        examples: ["Tengo un perro. — I have a dog.", "Tengo hambre. — I am hungry. (literally: I have hunger)", "Tienes razón. — You are right. (literally: you have reason)"],
      },
      {
        heading: "Conjugating in the Present Tense",
        body: "All three verbs are irregular, meaning their forms don't follow the regular -ar/-er/-ir patterns. 'Ser' conjugates as soy, eres, es, somos, sois, son. 'Estar' conjugates as estoy, estás, está, estamos, estáis, están, and note the accent marks that show where stress falls. 'Tener' conjugates as tengo, tienes, tiene, tenemos, tenéis, tienen. Repetition and use in context are the fastest way to internalize these three essential verbs.",
        examples: ["Nosotros somos amigos. — We are friends.", "Ellos están en casa. — They are at home.", "Ella tiene veinte años. — She is twenty years old."],
      },
    ],
    exercises: [
      { question: "Which verb would you use for 'I am a teacher'?", choices: ["Estar", "Tener", "Ser", "Haber"], answer: 2, explanation: "Profession is a lasting characteristic, so it takes 'ser': Soy profesor." },
      { question: "'Estoy cansado' uses 'estar' because tiredness is:", choices: ["A profession", "A nationality", "A temporary state", "A permanent trait"], answer: 2, explanation: "'Estar' is used for temporary conditions like being tired, sick, or in a mood." },
      { question: "How do you say 'I am hungry' in Spanish?", choices: ["Soy hambre", "Estoy hambre", "Tengo hambre", "Tengo hambriento"], answer: 2, explanation: "Spanish uses 'tener hambre' (literally 'to have hunger') to express being hungry." },
      { question: "What is the correct 'nosotros' form of 'tener'?", choices: ["tenemos", "tenéis", "tienen", "tengo"], answer: 0, explanation: "'Tener' in the 'nosotros' form is 'tenemos', one of the few forms that doesn't change its stem." },
      { question: "Which sentence correctly uses 'estar' for location?", choices: ["Soy en la casa.", "Estoy en la casa.", "Tengo en la casa.", "Soy la casa."], answer: 1, explanation: "Location is always expressed with 'estar', regardless of whether it is permanent or temporary." },
      { question: "'Tienes razón' means:", choices: ["You have a reason to leave", "You are right", "You have a razor", "You are reasonable-looking"], answer: 1, explanation: "'Tener razón' is a fixed expression meaning 'to be right', not a literal translation." },
    ],
  },
  {
    id: "spanish-3",
    title: "El, La, Los, Las: The Gender Reveal Party Never Ends",
    minutes: 16,
    objective: "Identify noun gender and correctly form articles and plurals.",
    sections: [
      {
        heading: "Every Noun Has a Gender",
        body: "In Spanish, every noun is either masculine or feminine, even objects with no biological sex, like 'table' or 'book'. As a general rule, nouns ending in '-o' are usually masculine and nouns ending in '-a' are usually feminine, but there are important exceptions like 'el día' (the day, masculine) and 'la mano' (the hand, feminine). Because gender isn't always predictable, it's best to learn each noun together with its article from the start. This habit will save you from constant guesswork later.",
        examples: ["el libro — the book (masculine)", "la mesa — the table (feminine)", "el día — the day (masculine, exception)"],
      },
      {
        heading: "Definite and Indefinite Articles",
        body: "Spanish has four definite articles meaning 'the': 'el' and 'los' for masculine singular and plural, 'la' and 'las' for feminine singular and plural. Indefinite articles meaning 'a/an' or 'some' follow the same pattern: 'un', 'unos' for masculine, and 'una', 'unas' for feminine. The article must always agree with the noun in both gender and number, so changing a noun from singular to plural also changes its article. This agreement system applies to adjectives too, which is why Spanish sentences have so much matching.",
        examples: ["un gato / unos gatos — a cat / some cats", "una casa / unas casas — a house / some houses", "el niño / los niños — the boy / the boys"],
      },
      {
        heading: "Forming Plurals",
        body: "To make a noun plural, add '-s' if it ends in a vowel, and add '-es' if it ends in a consonant. Words ending in '-z' change the 'z' to 'c' before adding '-es', a spelling adjustment rather than a pronunciation change. Plural formation is fairly mechanical, but remember that the article and any adjectives must also switch to their plural forms to match. Mastering this agreement early makes longer sentences much easier to build correctly.",
        examples: ["coche → coches — car → cars", "profesor → profesores — teacher → teachers", "luz → luces — light → lights"],
      },
    ],
    exercises: [
      { question: "What is the plural of 'el libro'?", choices: ["los libro", "los libros", "las libros", "el libros"], answer: 1, explanation: "Masculine plural nouns take 'los', and nouns ending in a vowel add '-s': los libros." },
      { question: "Which noun is a common exception to the '-a equals feminine' rule?", choices: ["la mesa", "la casa", "el día", "la silla"], answer: 2, explanation: "'El día' ends in '-a' but is masculine, an important memorized exception." },
      { question: "What is the correct indefinite article for 'casa' (house)?", choices: ["un", "unos", "una", "el"], answer: 2, explanation: "'Casa' is feminine singular, so it takes 'una'." },
      { question: "How do you pluralize 'luz' (light)?", choices: ["luzes", "luces", "luzs", "lues"], answer: 1, explanation: "Words ending in '-z' change to '-c' before adding '-es': luz → luces." },
      { question: "Which article set means 'the' for feminine plural nouns?", choices: ["los", "las", "unos", "unas"], answer: 1, explanation: "'Las' is the definite article used with feminine plural nouns." },
      { question: "Why must articles agree with nouns in Spanish?", choices: ["They don't need to", "Because of gender and number agreement rules", "Only for formal writing", "Only plural nouns need articles"], answer: 1, explanation: "Spanish requires articles and adjectives to match the noun's gender and number consistently." },
    ],
  },
  {
    id: "spanish-4",
    title: "-AR, -ER, -IR: The Verb Endings That Run the Show",
    minutes: 18,
    objective: "Conjugate regular -ar, -er, and -ir verbs in the present tense.",
    sections: [
      {
        heading: "Three Verb Families",
        body: "Every Spanish verb belongs to one of three families based on its infinitive ending: -ar, -er, or -ir. Regular verbs in each family follow a predictable pattern, so once you learn one verb's conjugation, you can apply it to hundreds of others. The infinitive is the 'to' form, like 'hablar' (to speak), 'comer' (to eat), or 'vivir' (to live). Recognizing the family is the first step to conjugating any regular verb correctly.",
        examples: ["hablar — to speak (-ar)", "comer — to eat (-er)", "vivir — to live (-ir)"],
      },
      {
        heading: "Present Tense Endings",
        body: "To conjugate, remove the infinitive ending and add the appropriate set of endings for the subject. For -ar verbs: -o, -as, -a, -amos, -áis, -an. For -er verbs: -o, -es, -e, -emos, -éis, -en. For -ir verbs the endings are nearly identical to -er verbs except in 'nosotros' and 'vosotros': -o, -es, -e, -imos, -ís, -en. Notice that the 'yo' form always ends in '-o' across all three families, which is a helpful shortcut to remember.",
        examples: ["Yo hablo español. — I speak Spanish.", "Tú comes mucho. — You eat a lot.", "Nosotros vivimos aquí. — We live here."],
      },
      {
        heading: "Why This Matters for Everything Else",
        body: "Regular conjugation patterns are the foundation for nearly all Spanish grammar you'll learn next, including irregular verbs, which usually only break the pattern in specific forms rather than all of them. Practicing these endings until they're automatic will make future tenses, like the past and future, much easier since many of them build on the same subject markers. Try conjugating aloud, since hearing the endings helps cement them faster than silent reading alone.",
        examples: ["Ella estudia todos los días. — She studies every day.", "Ellos escriben cartas. — They write letters.", "Vosotros bebéis agua. — You all drink water."],
      },
    ],
    exercises: [
      { question: "What is the 'yo' form of 'hablar'?", choices: ["hablo", "hablas", "habla", "hablamos"], answer: 0, explanation: "Regular -ar verbs form the 'yo' present tense by adding '-o' to the stem: habl + o = hablo." },
      { question: "Which ending set belongs to -er verbs?", choices: ["-o, -as, -a, -amos, -áis, -an", "-o, -es, -e, -emos, -éis, -en", "-o, -es, -e, -imos, -ís, -en", "-o, -as, -e, -imos, -áis, -en"], answer: 1, explanation: "-er verbs use -o, -es, -e, -emos, -éis, -en in the present tense." },
      { question: "How do -ir verbs differ from -er verbs in the present tense?", choices: ["They never differ", "Only in 'nosotros' and 'vosotros'", "Only in 'yo'", "Every ending is different"], answer: 1, explanation: "-ir verbs match -er endings except for 'nosotros' (-imos) and 'vosotros' (-ís)." },
      { question: "What is the correct conjugation of 'vivir' for 'nosotros'?", choices: ["vivimos", "vivemos", "vivamos", "viven"], answer: 0, explanation: "The -ir 'nosotros' ending is '-imos': viv + imos = vivimos." },
      { question: "Which sentence is correctly conjugated?", choices: ["Ella comes pizza.", "Ella come pizza.", "Ella comen pizza.", "Ella comer pizza."], answer: 1, explanation: "Third person singular 'ella' takes the '-e' ending for -er verbs: come." },
      { question: "What do all regular verbs have in common in the 'yo' form?", choices: ["They end in -o", "They end in -as", "They end in -e", "They never conjugate"], answer: 0, explanation: "Across -ar, -er, and -ir verbs, the 'yo' form consistently ends in '-o'." },
    ],
  },
  {
    id: "spanish-5",
    title: "¿Preguntas? No, No Quiero: Questions and Negation",
    minutes: 15,
    objective: "Form yes/no and information questions and negate sentences correctly.",
    sections: [
      {
        heading: "Upside-Down Punctuation, Right-Side-Up Logic",
        body: "Spanish questions are marked with an inverted question mark '¿' at the start and a regular one '?' at the end, which helps readers know a question is coming before they finish the sentence. Unlike English, Spanish doesn't require a helper verb like 'do' or 'does' to form a question; you can simply raise your intonation or rearrange word order. A statement and a question can even use identical words, distinguished only by punctuation in writing and tone in speech. This makes question formation in Spanish structurally simpler than in English.",
        examples: ["¿Hablas español? — Do you speak Spanish?", "Hablas español. — You speak Spanish.", "¿Vive aquí? — Does he/she live here?"],
      },
      {
        heading: "Question Words",
        body: "Spanish question words all carry accent marks to distinguish them from similar-looking non-question words: 'qué' (what), 'quién' (who), 'dónde' (where), 'cuándo' (when), 'cómo' (how), and 'por qué' (why). These words typically go at the beginning of the sentence, followed by the verb. Note that 'por qué' (why, two words with an accent) is different from 'porque' (because, one word, no accent), a common spelling mix-up even among learners who know the meaning perfectly well.",
        examples: ["¿Dónde vives? — Where do you live?", "¿Por qué estudias español? — Why are you studying Spanish?", "Estudio español porque me gusta. — I study Spanish because I like it."],
      },
      {
        heading: "Making a Sentence Negative",
        body: "To negate a Spanish sentence, simply place 'no' directly before the conjugated verb; there is no separate helper verb needed like English 'don't' or 'doesn't'. Unlike standard English, Spanish allows and even expects double negatives, so words like 'nada' (nothing) or 'nadie' (nobody) pair naturally with 'no' rather than canceling it out. This is a fundamental grammatical feature, not sloppy speech, so don't try to avoid double negatives the way you might in English. Getting comfortable with this pattern early prevents confusion later.",
        examples: ["No hablo francés. — I don't speak French.", "No tengo nada. — I don't have anything. (literally: I have nothing)", "No conozco a nadie aquí. — I don't know anyone here."],
      },
    ],
    exercises: [
      { question: "What punctuation mark starts a Spanish question in writing?", choices: ["!", "¿", "¡", "?"], answer: 1, explanation: "Spanish uses an inverted question mark '¿' at the beginning of a written question." },
      { question: "How do you say 'I don't speak French'?", choices: ["Hablo no francés.", "No hablo francés.", "No francés hablo.", "Hablo francés no."], answer: 1, explanation: "Negation in Spanish is formed by placing 'no' directly before the conjugated verb." },
      { question: "What is the difference between 'por qué' and 'porque'?", choices: ["No difference", "'Por qué' means why, 'porque' means because", "'Porque' is only for questions", "'Por qué' is informal"], answer: 1, explanation: "'Por qué' (two words, accented) asks 'why'; 'porque' (one word) answers with 'because'." },
      { question: "Is 'No tengo nada' a grammatical error?", choices: ["Yes, it's a double negative error", "No, Spanish requires double negatives in this structure", "Yes, only 'nada' should be used", "No, but it's rare"], answer: 1, explanation: "Spanish grammar requires 'no' with words like 'nada' and 'nadie'; this is standard, not an error." },
      { question: "Which question word would you use to ask 'where'?", choices: ["Cuándo", "Cómo", "Dónde", "Quién"], answer: 2, explanation: "'Dónde' means 'where' and is used to ask about location." },
      { question: "Does Spanish need a helper verb like 'do' to form questions?", choices: ["Yes, always", "No, intonation or word order is enough", "Only for negative questions", "Only in formal Spanish"], answer: 1, explanation: "Spanish doesn't use a 'do' equivalent; questions are formed with intonation, word order, or question words." },
    ],
  },
  {
    id: "spanish-6",
    title: "¿Me Puede Traer...? Ordering Food Without Panicking",
    minutes: 17,
    objective: "Use polite expressions to order food and shop in Spanish.",
    sections: [
      {
        heading: "Politeness Starts With 'Por Favor' and 'Gracias'",
        body: "'Por favor' (please) and 'gracias' (thank you) are essential in any interaction, and Spanish speakers use them generously, often more than English speakers might expect. When responding to thanks, 'de nada' (you're welcome, literally 'of nothing') is the standard reply. Politeness in Spanish also involves using formal 'usted' instead of informal 'tú' with strangers, waitstaff, or shopkeepers, especially in many Latin American countries and in Spain when addressing elders. Using formal forms shows respect and is rarely seen as excessive.",
        examples: ["Por favor, ¿me trae la cuenta? — Please, could you bring me the bill?", "Gracias por su ayuda. — Thank you for your help.", "De nada. — You're welcome."],
      },
      {
        heading: "Ordering With 'Querer' and 'Poder'",
        body: "The verb 'querer' (to want) is commonly used to order food, but it's softened with 'me gustaría' (I would like) in more polite or formal contexts, similar to the difference between 'I want' and 'I would like' in English. 'Poder' (to be able to) is used to make polite requests, as in '¿Puede traerme...?' (Could you bring me...?). Both verbs are stem-changing, meaning their middle vowel shifts in most forms: 'quiero, quieres, quiere' and 'puedo, puedes, puede'. This vowel shift is a common feature across many frequently used Spanish verbs.",
        examples: ["Quiero un café, por favor. — I want a coffee, please.", "Me gustaría la sopa. — I would like the soup.", "¿Puede traerme la carta? — Could you bring me the menu?"],
      },
      {
        heading: "At the Market: Quantities and Prices",
        body: "When shopping, you'll often need numbers and units like 'un kilo de' (a kilo of) or 'medio kilo de' (half a kilo of). Asking the price uses '¿Cuánto cuesta?' for a single item or '¿Cuánto cuestan?' for multiple items, since the verb must agree in number with what's being priced. Currency and prices are usually stated with 'euros' or the local currency name following the number. Learning these small phrases makes real-world shopping interactions dramatically smoother.",
        examples: ["¿Cuánto cuesta esto? — How much does this cost?", "Un kilo de manzanas, por favor. — A kilo of apples, please.", "¿Cuánto cuestan los tomates? — How much do the tomatoes cost?"],
      },
    ],
    exercises: [
      { question: "How do you politely reply to 'gracias'?", choices: ["Por favor", "De nada", "Lo siento", "Buenas noches"], answer: 1, explanation: "'De nada' is the standard response to 'thank you', equivalent to 'you're welcome'." },
      { question: "Which phrase is a more polite way to say 'I want the soup'?", choices: ["Quiero la sopa", "Me gustaría la sopa", "Tengo la sopa", "Soy la sopa"], answer: 1, explanation: "'Me gustaría' softens the request, similar to 'I would like' versus 'I want' in English." },
      { question: "What does '¿Cuánto cuesta?' ask?", choices: ["Where is it?", "How much does it cost?", "What is it made of?", "When does it open?"], answer: 1, explanation: "'¿Cuánto cuesta?' is used to ask the price of a single item." },
      { question: "Why does 'cuesta' become 'cuestan' with tomatoes?", choices: ["Random variation", "The verb must agree with plural subjects", "It's more formal", "It's a typo pattern"], answer: 1, explanation: "The verb 'costar' must agree in number with the noun it refers to: singular 'cuesta', plural 'cuestan'." },
      { question: "Which verb is used to make a polite request like 'Could you bring me...'?", choices: ["Querer", "Tener", "Poder", "Ser"], answer: 2, explanation: "'Poder' (to be able to) is used in polite requests: '¿Puede traerme...?'." },
      { question: "What does 'un kilo de manzanas' mean?", choices: ["A kilo of oranges", "A kilo of apples", "Half a kilo of apples", "A basket of apples"], answer: 1, explanation: "'Manzanas' means apples, and 'un kilo de' means 'a kilo of'." },
    ],
  },
  {
    id: "spanish-7",
    title: "Ayer Comí Demasiado: Surviving the Past Tense",
    minutes: 19,
    objective: "Form and use the pretérito to describe completed past actions.",
    sections: [
      {
        heading: "The Pretérito Describes Finished Actions",
        body: "The pretérito (preterite) tense is used for actions that were completed at a specific point in the past, such as 'I ate' or 'she arrived'. This differs from the imperfect tense, which describes ongoing or habitual past actions; the pretérito treats the event as a single, finished occurrence. Regular -ar verbs take endings -é, -aste, -ó, -amos, -asteis, -aron, while -er and -ir verbs share the endings -í, -iste, -ió, -imos, -isteis, -ieron. Note the accent marks on the 'yo' and 'él/ella' forms, which are crucial for correct pronunciation and spelling.",
        examples: ["Ayer comí pizza. — Yesterday I ate pizza.", "Ella llegó tarde. — She arrived late.", "Nosotros hablamos con el profesor. — We spoke with the teacher."],
      },
      {
        heading: "Common Irregular Preterites",
        body: "Several high-frequency verbs are irregular in the pretérito and must be memorized separately, including 'ser' and 'ir', which share the exact same forms: fui, fuiste, fue, fuimos, fuisteis, fueron. Context tells you whether 'fui' means 'I was' (ser) or 'I went' (ir). Other common irregulars include 'tener' (tuve), 'hacer' (hice), and 'estar' (estuve), which all use a different set of irregular endings without accent marks. These irregular verbs appear so frequently in conversation that memorizing them early pays off quickly.",
        examples: ["Fui al cine ayer. — I went to the movies yesterday.", "Fue un buen día. — It was a good day.", "Tuve que trabajar. — I had to work."],
      },
      {
        heading: "Spelling Changes in Certain -Ar Verbs",
        body: "Some -ar verbs change their spelling only in the 'yo' form of the pretérito to preserve their original consonant sound. Verbs ending in '-car' change 'c' to 'qu' (buscar → busqué), verbs ending in '-gar' change 'g' to 'gu' (llegar → llegué), and verbs ending in '-zar' change 'z' to 'c' (empezar → empecé). These changes are purely about spelling and pronunciation consistency, not about meaning. Recognizing this pattern helps you avoid awkward mispronunciations like a hard 'g' sound where a soft one is needed.",
        examples: ["Busqué mi llave. — I looked for my key.", "Llegué temprano. — I arrived early.", "Empecé la tarea. — I started the homework."],
      },
    ],
    exercises: [
      { question: "What tense would you use for 'I ate pizza yesterday'?", choices: ["Present", "Imperfect", "Pretérito", "Future"], answer: 2, explanation: "The pretérito is used for completed actions at a specific past moment, like eating pizza yesterday." },
      { question: "What is the 'yo' pretérito form of 'ir' (to go)?", choices: ["voy", "iba", "fui", "iré"], answer: 2, explanation: "'Ir' is irregular in the pretérito, sharing forms with 'ser': fui, fuiste, fue..." },
      { question: "Why does 'buscar' become 'busqué' in the 'yo' form?", choices: ["Random exception", "To preserve the hard 'c' sound before 'é'", "Because it's a reflexive verb", "It doesn't actually change"], answer: 1, explanation: "'-car' verbs change 'c' to 'qu' before 'é' to keep the hard 'k' sound." },
      { question: "What is the correct pretérito ending for 'hablar' with 'nosotros'?", choices: ["hablamos", "hablábamos", "hablaron", "hablaste"], answer: 0, explanation: "For -ar verbs, the 'nosotros' pretérito form is identical to the present tense: hablamos." },
      { question: "Which sentence uses 'ser' or 'ir' correctly in the pretérito?", choices: ["Fui médico por diez años.", "Fui al mercado ayer.", "Both A and B are correct, context determines meaning", "Neither is correct"], answer: 2, explanation: "'Fui' can mean 'I was' (ser) or 'I went' (ir); context clarifies which verb is meant." },
      { question: "What ending does 'comer' take for 'ella' in the pretérito?", choices: ["-ió → comió", "-ó → comó", "-ía → comía", "-e → come"], answer: 0, explanation: "-er verbs take '-ió' for third person singular in the pretérito: comió." },
    ],
  },
  {
    id: "spanish-8",
    title: "Mañana Será Otro Día: Talking About the Future",
    minutes: 20,
    objective: "Express future plans using ir + a + infinitive and the future tense, and read a short passage.",
    sections: [
      {
        heading: "The Easy Future: Ir + A + Infinitive",
        body: "The most common way to talk about future plans in everyday Spanish is the structure 'ir + a + infinitive', directly parallel to English 'going to' plus a verb. This is often called the 'informal future' because it's used constantly in casual speech, even more than the true future tense. To build it, conjugate 'ir' in the present tense, add 'a', then attach the infinitive of the main verb unchanged. This structure is easier to master early since it reuses the present tense conjugation of 'ir' you likely already know.",
        examples: ["Voy a estudiar esta noche. — I am going to study tonight.", "Vamos a viajar a España. — We are going to travel to Spain.", "¿Vas a llamar a tu madre? — Are you going to call your mother?"],
      },
      {
        heading: "The True Future Tense",
        body: "The simple future tense adds endings directly to the full infinitive rather than removing the ending first, which makes it unusually easy to form: -é, -ás, -á, -emos, -éis, -án. Unlike English, Spanish doesn't need a separate word like 'will'; the ending itself carries that meaning. Some common verbs have irregular stems in the future, like 'tener' → 'tendr-', 'hacer' → 'har-', and 'decir' → 'dir-', but the endings themselves stay regular. The true future is often used for predictions, promises, or more formal writing.",
        examples: ["Estudiaré mañana. — I will study tomorrow.", "Tendremos una reunión el lunes. — We will have a meeting on Monday.", "Ella hará la cena. — She will make dinner."],
      },
      {
        heading: "A Short Reading: Los Planes de Ana",
        body: "Ana tiene muchos planes para el próximo año. Primero, va a terminar sus estudios de español, porque quiere trabajar en otro país. Después, viajará a México para visitar a su familia y practicar el idioma con hablantes nativos. Ella cree que el español le abrirá muchas puertas en su carrera. This short reading combines both future forms you've just learned: the informal 'va a terminar' and 'viajará' from the simple future 'viajar'. Try identifying each verb's tense before checking the translation below.",
        examples: ["Ana tiene muchos planes. — Ana has many plans.", "Va a terminar sus estudios. — She is going to finish her studies.", "Viajará a México. — She will travel to Mexico."],
      },
    ],
    exercises: [
      { question: "How do you say 'I am going to study' using the informal future?", choices: ["Estudiaré", "Voy a estudiar", "Estudio", "Estudiaba"], answer: 1, explanation: "The informal future uses 'ir + a + infinitive': voy a estudiar." },
      { question: "What is the correct simple future ending for 'nosotros'?", choices: ["-emos", "-amos", "-imos", "-áis"], answer: 0, explanation: "The simple future uses -emos for 'nosotros' regardless of verb type: hablaremos, comeremos, viviremos." },
      { question: "What is the irregular future stem of 'tener'?", choices: ["tener-", "tendr-", "tenr-", "ten-"], answer: 1, explanation: "'Tener' has an irregular future stem 'tendr-': tendré, tendrás, tendrá..." },
      { question: "In the reading, what does 'viajará' tell us about Ana?", choices: ["She traveled in the past", "She travels habitually", "She will travel in the future", "She is currently traveling"], answer: 2, explanation: "'Viajará' is the simple future form of 'viajar', indicating a future action." },
      { question: "Why does Ana want to travel to Mexico according to the reading?", choices: ["To find a job immediately", "To visit family and practice Spanish", "To study English", "To retire"], answer: 1, explanation: "The text states she will travel to visit her family and practice the language with native speakers." },
      { question: "Which future form is more common in casual spoken Spanish?", choices: ["The simple future (-é, -ás...)", "The 'ir + a + infinitive' structure", "Both are equally rare", "Neither is used in speech"], answer: 1, explanation: "'Ir + a + infinitive' is used far more often in everyday conversation than the simple future tense." },
    ],
  },
];
