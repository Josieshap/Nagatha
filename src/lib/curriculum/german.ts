import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "german-1",
    title: "Greetings and pronunciation",
    minutes: 16,
    objective: "Greet people naturally and pronounce German letters correctly.",
    sections: [
      {
        heading: "Saying hello",
        body: "Hallo is the all-purpose, informal greeting you can use with friends. Guten Morgen, guten Tag, and guten Abend are time-specific and slightly more formal, used with strangers or in shops. Tschüss is a casual goodbye, while auf Wiedersehen is more formal. Choosing the right greeting depends on the time of day and how well you know the person.",
        examples: ["Hallo! Wie geht's? — Hi! How's it going?", "Guten Tag, Frau Schmidt. — Good day, Mrs. Schmidt.", "Tschüss! Bis morgen! — Bye! See you tomorrow!"],
      },
      {
        heading: "Sounds that trip up beginners",
        body: "The letter ü is pronounced with rounded lips saying 'ee', ö is like 'ur' with rounded lips, and ä sounds like the 'e' in 'bed'. The combination 'ch' after a, o, u sounds like a soft rasp in the throat (as in Bach), but after e or i it is softer, closer to 'hyu'. The letter w is pronounced like an English v, and v is pronounced like an English f.",
        examples: ["schön — pronounced roughly 'shurn' (beautiful)", "ich — pronounced 'ish' (I)", "Wasser — pronounced 'VAH-ser' (water)"],
      },
      {
        heading: "Introducing yourself",
        body: "Ich heiße… means 'my name is…', literally 'I am called…'. To ask someone's name informally, say Wie heißt du?, and formally Wie heißen Sie?. Woher kommst du? asks where you're from, answered with Ich komme aus…",
        examples: ["Ich heiße Laura. — My name is Laura.", "Woher kommst du? — Ich komme aus Kanada.", "Wie heißen Sie? — What is your name? (formal)"],
      },
    ],
    exercises: [
      { question: "Which greeting is appropriate in the evening?", choices: ["Guten Morgen", "Guten Tag", "Guten Abend", "Guten Nacht"], answer: 2, explanation: "Guten Abend means 'good evening' and is used as people arrive in the evening; guten Nacht is only for saying goodnight before sleep." },
      { question: "How is the German 'w' pronounced?", choices: ["Like English w", "Like English v", "Like English f", "Silent"], answer: 1, explanation: "German w corresponds to the English v sound, as in Wasser (VAH-ser)." },
      { question: "What does 'Ich heiße Tom' mean?", choices: ["I come from Tom", "My name is Tom", "I like Tom", "I am with Tom"], answer: 1, explanation: "heißen means 'to be called', so Ich heiße Tom literally means 'I am called Tom.'" },
      { question: "Which word means 'beautiful' and contains the ö sound?", choices: ["schon", "schön", "schnee", "sehen"], answer: 1, explanation: "schön uses ö, pronounced with rounded lips similar to 'ur'." },
      { question: "How do you ask someone's name informally?", choices: ["Wie heißen Sie?", "Woher kommst du?", "Wie heißt du?", "Wie geht's dir?"], answer: 2, explanation: "Wie heißt du? uses the informal 'du' form to ask for someone's name." },
      { question: "The 'ch' in 'ich' sounds most like which of these?", choices: ["A hard k", "A soft 'hy' hiss", "An English ch as in chair", "Silent"], answer: 1, explanation: "After e or i, ch is a soft palatal sound, roughly like 'hy' with air, as in 'ish'." },
    ],
  },
  {
    id: "german-2",
    title: "Sein and haben: to be and to have",
    minutes: 17,
    objective: "Conjugate and use sein and haben in simple present-tense statements.",
    sections: [
      {
        heading: "Sein — to be",
        body: "Sein is one of the most irregular but essential German verbs. Its forms are: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Use it for identity, description, and states, just like 'to be' in English.",
        examples: ["Ich bin müde. — I am tired.", "Du bist nett. — You are nice.", "Wir sind Freunde. — We are friends."],
      },
      {
        heading: "Haben — to have",
        body: "Haben conjugates as: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. German uses haben for possession, but also for expressions English would phrase with 'to be', such as having hunger or fear.",
        examples: ["Ich habe einen Hund. — I have a dog.", "Sie hat Hunger. — She is hungry (literally: has hunger).", "Wir haben Zeit. — We have time."],
      },
      {
        heading: "Choosing the right verb",
        body: "A quick test: if you're describing what something IS, use sein; if you're describing what someone HAS or a physical/emotional state expressed with a noun (Hunger, Angst, Glück), use haben. Both verbs are also essential building blocks for other tenses you will learn later.",
        examples: ["Er ist Lehrer. — He is a teacher.", "Er hat Angst. — He is afraid (has fear).", "Ich bin zwanzig Jahre alt, und ich habe einen Bruder."],
      },
    ],
    exercises: [
      { question: "Complete: Du ___ sehr freundlich. (You are very friendly.)", choices: ["bist", "bin", "hast", "ist"], answer: 0, explanation: "The second-person singular form of sein is bist." },
      { question: "How do you say 'I have a sister'?", choices: ["Ich bin eine Schwester", "Ich habe eine Schwester", "Ich hast eine Schwester", "Ich sind eine Schwester"], answer: 1, explanation: "habe is the first-person form of haben, used for possession." },
      { question: "Which sentence means 'They are hungry'?", choices: ["Sie sind Hunger", "Sie haben Hunger", "Sie ist Hunger", "Sie hat Hunger"], answer: 1, explanation: "German expresses hunger with haben; sie haben is the plural/formal form." },
      { question: "What is the correct form of sein for 'wir'?", choices: ["seid", "sind", "bist", "ist"], answer: 1, explanation: "wir sind means 'we are'." },
      { question: "Complete: Er ___ Student. (He is a student.)", choices: ["hat", "ist", "habe", "bin"], answer: 1, explanation: "Identity/profession statements use sein: er ist Student." },
      { question: "Which verb form matches 'ihr'?", choices: ["ihr habt", "ihr hat", "ihr haben", "ihr habe"], answer: 0, explanation: "The second-person plural informal form of haben is habt." },
    ],
  },
  {
    id: "german-3",
    title: "Articles and gender",
    minutes: 18,
    objective: "Recognize der, die, das and use them correctly with nouns.",
    sections: [
      {
        heading: "Three genders",
        body: "Every German noun has a grammatical gender: masculine (der), feminine (die), or neuter (das). Gender is not always logical — das Mädchen (the girl) is neuter — so it is best memorized together with each new noun rather than guessed. Plural nouns always use die, regardless of the original gender.",
        examples: ["der Mann — the man (masculine)", "die Frau — the woman (feminine)", "das Kind — the child (neuter)"],
      },
      {
        heading: "Patterns that help",
        body: "While gender must often be memorized, some patterns help: nouns ending in -e are frequently feminine (die Blume), nouns ending in -chen or -lein are always neuter (das Mädchen), and words for male people/animals are usually masculine. These patterns are helpful hints, not absolute rules.",
        examples: ["die Lampe — the lamp", "das Brötchen — the bread roll", "der Vater — the father"],
      },
      {
        heading: "Indefinite articles",
        body: "The indefinite article 'a/an' also changes by gender: ein for masculine and neuter, eine for feminine. There is no plural indefinite article, similar to English dropping 'a' before plural nouns.",
        examples: ["ein Mann — a man", "eine Frau — a woman", "ein Kind — a child"],
      },
    ],
    exercises: [
      { question: "Which article goes with 'Buch' (book, neuter)?", choices: ["der", "die", "das", "den"], answer: 2, explanation: "Neuter nouns take the article das, as in das Buch." },
      { question: "What is the definite article for plural nouns?", choices: ["der", "die", "das", "dem"], answer: 1, explanation: "All plural nouns in the nominative case use die, regardless of original gender." },
      { question: "Which ending is almost always neuter?", choices: ["-e", "-in", "-chen", "-ung"], answer: 2, explanation: "The diminutive endings -chen and -lein are always neuter, as in das Mädchen." },
      { question: "Complete: ___ Frau ist nett. (The woman is nice.)", choices: ["Der", "Die", "Das", "Den"], answer: 1, explanation: "Frau is feminine, so it takes die." },
      { question: "How do you say 'a child' (indefinite)?", choices: ["ein Kind", "eine Kind", "der Kind", "einen Kind"], answer: 0, explanation: "Kind is neuter, and neuter nouns use ein for 'a/an' in the nominative case." },
      { question: "Which noun is masculine?", choices: ["Lampe", "Mann", "Mädchen", "Buch"], answer: 1, explanation: "Mann (man) is masculine, taking the article der." },
    ],
  },
  {
    id: "german-4",
    title: "Present tense and verb-second word order",
    minutes: 18,
    objective: "Conjugate regular verbs in the present tense and place them correctly in sentences.",
    sections: [
      {
        heading: "Regular verb endings",
        body: "Most German verbs follow a regular pattern in the present tense: remove -en from the infinitive and add endings based on the subject. For lernen (to learn): ich lerne, du lernst, er/sie/es lernt, wir lernen, ihr lernt, sie/Sie lernen. Learning this pattern lets you conjugate hundreds of verbs immediately.",
        examples: ["ich spiele — I play", "du spielst — you play", "wir spielen — we play"],
      },
      {
        heading: "The verb-second rule",
        body: "In a German main clause, the conjugated verb must occupy the second position, no matter what comes first. If a time expression, adverb, or object starts the sentence, the subject moves after the verb to keep the verb in position two. This is different from English, which keeps the subject-verb order fixed.",
        examples: ["Ich lerne heute Deutsch. — I am learning German today.", "Heute lerne ich Deutsch. — Today I am learning German.", "Am Wochenende spielen wir Fußball."],
      },
      {
        heading: "Practicing the flip",
        body: "Try starting sentences with different elements to practice the rule: with the subject first, with a time word first, or with a place. Whatever leads the sentence, the verb stays glued to second position, and the subject simply shifts to third position when it's not first.",
        examples: ["Morgen arbeite ich nicht.", "In Berlin wohnt meine Schwester.", "Manchmal kocht er Abendessen."],
      },
    ],
    exercises: [
      { question: "Which sentence has correct word order?", choices: ["Heute ich spiele Tennis.", "Heute spiele ich Tennis.", "Heute Tennis ich spiele.", "Ich heute spiele Tennis."], answer: 1, explanation: "Since heute starts the sentence, the verb spiele must stay in second position, pushing ich to third." },
      { question: "What is the correct ending for 'du' with the verb 'machen'?", choices: ["mache", "machst", "macht", "machen"], answer: 1, explanation: "The second-person singular ending is -st: du machst." },
      { question: "In a German main clause, where does the conjugated verb go?", choices: ["First position always", "Second position", "Last position always", "It can go anywhere"], answer: 1, explanation: "German main clauses follow the verb-second (V2) rule regardless of what element starts the sentence." },
      { question: "Complete: Wir ___ jeden Tag Deutsch. (We learn German every day.)", choices: ["lernst", "lernt", "lernen", "lerne"], answer: 2, explanation: "The wir-form ending is -en: wir lernen." },
      { question: "Which sentence correctly starts with a time expression?", choices: ["Am Montag ich arbeite.", "Am Montag arbeite ich.", "Ich am Montag arbeite.", "Arbeite am Montag ich."], answer: 1, explanation: "The time phrase 'Am Montag' takes position one, so the verb arbeite must follow immediately in position two." },
      { question: "What is the ich-form of 'wohnen' (to live)?", choices: ["wohnst", "wohnt", "wohne", "wohnen"], answer: 2, explanation: "The first-person singular ending is -e: ich wohne." },
    ],
  },
  {
    id: "german-5",
    title: "Questions, nicht, and kein",
    minutes: 16,
    objective: "Form yes/no and wh-questions, and negate sentences correctly.",
    sections: [
      {
        heading: "Yes/no questions",
        body: "To form a yes/no question in German, simply move the conjugated verb to the very first position, before the subject. There is no helper word like English 'do'. The rest of the sentence stays in the same order.",
        examples: ["Spielst du Tennis? — Do you play tennis?", "Kommt sie heute? — Is she coming today?", "Hast du Zeit? — Do you have time?"],
      },
      {
        heading: "W-questions",
        body: "Question words like was (what), wer (who), wo (where), wann (when), and warum (why) start the sentence, and the verb still comes second, immediately after the question word — the verb-second rule again.",
        examples: ["Was machst du? — What are you doing?", "Wo wohnst du? — Where do you live?", "Warum lernst du Deutsch?"],
      },
      {
        heading: "Nicht vs. kein",
        body: "Use nicht to negate verbs, adjectives, or specific known nouns (nicht usually goes near the end of the clause or right before what it negates). Use kein to negate a noun that would otherwise take ein or no article at all, functioning like 'not a' or 'no'.",
        examples: ["Ich spiele nicht Tennis. — I don't play tennis.", "Ich habe keinen Hund. — I don't have a dog.", "Das ist nicht mein Buch. — That isn't my book."],
      },
    ],
    exercises: [
      { question: "How do you form a yes/no question in German?", choices: ["Add 'do' before the subject", "Move the verb to first position", "Add a question word at the end", "Change the subject to a pronoun"], answer: 1, explanation: "German questions front the conjugated verb without needing a helper word like 'do'." },
      { question: "Which word negates a noun that takes no article?", choices: ["nicht", "kein", "nein", "nichts"], answer: 1, explanation: "kein negates indefinite or unmarked nouns, like keinen Hund (no dog)." },
      { question: "Complete: ___ du Kaffee? (Do you drink coffee?)", choices: ["Trinkst", "Du trinkst", "Trinken", "Trinkt"], answer: 0, explanation: "Yes/no questions put the conjugated verb, trinkst, first." },
      { question: "Which question word means 'where'?", choices: ["wann", "warum", "wo", "wer"], answer: 2, explanation: "wo means 'where'; wann means 'when' and warum means 'why'." },
      { question: "How do you say 'That is not my car'?", choices: ["Das ist kein mein Auto.", "Das ist nicht mein Auto.", "Das nicht ist mein Auto.", "Das kein ist mein Auto."], answer: 1, explanation: "nicht negates the specific, already-defined noun 'mein Auto', not an indefinite one." },
      { question: "Complete: Ich habe ___ Zeit. (I have no time.)", choices: ["nicht", "kein", "keine", "nein"], answer: 2, explanation: "Zeit is feminine, so the negating article is keine." },
    ],
  },
  {
    id: "german-6",
    title: "Accusative case and ordering food",
    minutes: 18,
    objective: "Use the accusative case with direct objects and order food politely.",
    sections: [
      {
        heading: "What the accusative case does",
        body: "The accusative case marks the direct object of a sentence — the thing directly receiving the action. In German, only the masculine article changes in the accusative: der becomes den, and ein becomes einen. Feminine, neuter, and plural articles stay the same as in the nominative.",
        examples: ["Ich sehe den Mann. — I see the man.", "Ich sehe die Frau. — I see the woman.", "Ich habe einen Hund. — I have a dog."],
      },
      {
        heading: "Ordering food",
        body: "When ordering, you're naming the direct object of what you'd like, so the accusative applies. Ich hätte gern… or Ich möchte… both mean 'I would like…' and are the polite way to order. Add bitte for extra courtesy.",
        examples: ["Ich hätte gern einen Kaffee, bitte. — I would like a coffee, please.", "Ich möchte die Suppe. — I would like the soup.", "Können wir die Rechnung haben? — Can we have the bill?"],
      },
      {
        heading: "Putting it together",
        body: "Practice combining verbs that take a direct object with the correct accusative article. Common verbs like haben, sehen, brauchen, and möchten all take accusative objects. Remember: only masculine singular changes, so watch closely for der/ein nouns.",
        examples: ["Ich brauche einen Löffel. — I need a spoon.", "Er bestellt den Salat. — He orders the salad.", "Wir möchten das Wasser, bitte."],
      },
    ],
    exercises: [
      { question: "Which article changes in the accusative case?", choices: ["Feminine only", "Neuter only", "Masculine only", "All genders equally"], answer: 2, explanation: "Only the masculine article changes: der becomes den, and ein becomes einen." },
      { question: "How do you politely order a coffee?", choices: ["Ich bin ein Kaffee.", "Ich hätte gern einen Kaffee.", "Ich habe der Kaffee.", "Kaffee ich möchte."], answer: 1, explanation: "Ich hätte gern einen Kaffee uses the polite request form with the correct accusative article." },
      { question: "Complete: Ich sehe ___ Mann. (I see the man.)", choices: ["der", "die", "den", "das"], answer: 2, explanation: "Mann is masculine, and as a direct object it takes the accusative article den." },
      { question: "What does 'die Rechnung' mean?", choices: ["The waiter", "The menu", "The bill", "The table"], answer: 2, explanation: "Ask for die Rechnung when you are ready to pay." },
      { question: "Which sentence uses the accusative correctly?", choices: ["Ich habe eine Hund.", "Ich habe einen Hund.", "Ich habe der Hund.", "Ich habe ein Hund für."], answer: 1, explanation: "Hund is masculine, so 'a dog' as a direct object is einen Hund." },
      { question: "Which verb typically takes a direct object in the accusative?", choices: ["sein", "brauchen", "helfen", "danken"], answer: 1, explanation: "brauchen (to need) takes a direct object in the accusative case, such as ich brauche einen Löffel." },
    ],
  },
  {
    id: "german-7",
    title: "The Perfekt (past tense)",
    minutes: 19,
    objective: "Form and use the Perfekt tense to talk about past events in conversation.",
    sections: [
      {
        heading: "Building the Perfekt",
        body: "German conversational past uses the Perfekt tense, built from a helper verb (haben or sein) conjugated in the present, plus a past participle sent to the end of the sentence. Most verbs use haben; verbs of motion or change of state (like gehen, fahren, kommen) use sein instead.",
        examples: ["Ich habe gegessen. — I have eaten / I ate.", "Er ist gegangen. — He went.", "Wir haben Deutsch gelernt. — We learned German."],
      },
      {
        heading: "Forming the past participle",
        body: "Regular (weak) verbs form the participle with ge- + stem + -t, like machen → gemacht. Irregular (strong) verbs often change their stem vowel and end in -en, like sehen → gesehen or fahren → gefahren, and must be memorized individually.",
        examples: ["spielen → gespielt (played)", "trinken → getrunken (drunk)", "fahren → gefahren (driven/gone by vehicle)"],
      },
      {
        heading: "Word order with Perfekt",
        body: "The helper verb (haben/sein) still occupies the second position of the sentence, following the verb-second rule, while the past participle is pushed all the way to the end. This creates a 'sentence bracket' or Satzklammer that surrounds everything else.",
        examples: ["Ich habe gestern einen Film gesehen. — I watched a movie yesterday.", "Sie ist letzte Woche nach Berlin gefahren.", "Habt ihr das Buch gelesen?"],
      },
    ],
    exercises: [
      { question: "Which two verbs are used as helpers in the Perfekt tense?", choices: ["sein and werden", "haben and sein", "haben and werden", "sein and können"], answer: 1, explanation: "The Perfekt is formed with either haben or sein plus a past participle." },
      { question: "Which type of verb usually takes sein as its helper?", choices: ["Verbs of motion", "Verbs of thinking", "Modal verbs", "Reflexive verbs only"], answer: 0, explanation: "Verbs expressing motion or a change of state, like gehen and fahren, use sein." },
      { question: "What is the past participle of 'machen'?", choices: ["gemacht", "machen", "gemachen", "machte"], answer: 0, explanation: "Regular verbs form the participle as ge- + stem + -t: gemacht." },
      { question: "Where does the past participle go in a Perfekt sentence?", choices: ["Right after the subject", "In second position", "At the end of the clause", "Before the helper verb"], answer: 2, explanation: "The past participle is pushed to the very end of the clause, forming a bracket with the helper verb." },
      { question: "Complete: Ich ___ gestern nach Hause gegangen. (I went home yesterday.)", choices: ["habe", "bin", "hat", "ist"], answer: 1, explanation: "gehen is a motion verb, so it takes sein as its helper: ich bin gegangen." },
      { question: "What is the past participle of 'trinken'?", choices: ["getrinkt", "trinkte", "getrunken", "getrinken"], answer: 2, explanation: "trinken is a strong verb with an irregular participle: getrunken." },
    ],
  },
  {
    id: "german-8",
    title: "Future plans and a short reading",
    minutes: 20,
    objective: "Talk about future plans and read a short German passage for comprehension.",
    sections: [
      {
        heading: "Talking about the future",
        body: "German often uses the present tense with a future time expression to talk about plans, similar to English 'I'm leaving tomorrow.' For more emphasis or distant plans, use werden (will) plus the infinitive at the end of the sentence: ich werde… + infinitive.",
        examples: ["Ich fliege nächste Woche nach Spanien. — I'm flying to Spain next week.", "Ich werde einen neuen Job suchen. — I will look for a new job.", "Wir werden bald ankommen. — We will arrive soon."],
      },
      {
        heading: "Useful planning phrases",
        body: "Phrases like vielleicht (maybe), ich plane… (I plan…), and ich habe vor, … zu… (I intend to…) let you express plans with different levels of certainty. These fit naturally into everyday conversation about weekends, trips, and goals.",
        examples: ["Vielleicht besuche ich meine Familie. — Maybe I'll visit my family.", "Ich habe vor, nach Berlin zu ziehen. — I intend to move to Berlin.", "Was hast du am Wochenende vor?"],
      },
      {
        heading: "A short reading",
        body: "Read the following short passage about Lena's weekend plans, then check comprehension: 'Lena wohnt in München. Am Samstag wird sie mit ihren Freunden ins Kino gehen. Danach werden sie zusammen essen. Am Sonntag plant sie, ein Buch zu lesen und früh ins Bett zu gehen, weil sie am Montag wieder arbeiten muss.'",
        examples: ["Lena lives in Munich.", "On Saturday, she and her friends will go to the movies and eat together afterward.", "On Sunday, she plans to read a book and go to bed early because she has to work Monday."],
      },
    ],
    exercises: [
      { question: "Which verb is used to form the future tense with an infinitive at the end?", choices: ["haben", "sein", "werden", "möchten"], answer: 2, explanation: "werden + infinitive is the standard way to build the future tense, e.g., ich werde reisen." },
      { question: "According to the reading, where does Lena live?", choices: ["Berlin", "München", "Hamburg", "Köln"], answer: 1, explanation: "The passage states 'Lena wohnt in München' — Lena lives in Munich." },
      { question: "What does Lena plan to do on Saturday?", choices: ["Work", "Read a book", "Go to the cinema with friends", "Travel to Berlin"], answer: 2, explanation: "The text says she will go to the cinema (ins Kino gehen) with her friends on Saturday." },
      { question: "Why does Lena want to go to bed early on Sunday?", choices: ["She is sick", "She has to work Monday", "She is traveling", "She has a party"], answer: 1, explanation: "The passage explains she goes to bed early 'weil sie am Montag wieder arbeiten muss' — because she has to work again Monday." },
      { question: "Which sentence correctly expresses a near-future plan using the present tense?", choices: ["Ich fliege nächste Woche nach Spanien.", "Ich fliegen nächste Woche.", "Ich werde fliege nächste Woche.", "Nächste Woche ich fliege."], answer: 0, explanation: "German commonly uses the present tense with a future time word to express planned near-future actions." },
      { question: "What does 'ich habe vor, zu ziehen' mean?", choices: ["I already moved", "I intend to move", "I am moving right now", "I never want to move"], answer: 1, explanation: "vorhaben means 'to intend/plan', so ich habe vor, zu ziehen means 'I intend to move.'" },
    ],
  },
];
