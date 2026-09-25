import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "french-1",
    title: "Bonjour: Making Peace With Silent Letters",
    minutes: 15,
    objective: "Greet people naturally and understand key French pronunciation rules.",
    sections: [
      {
        heading: "Silent Letters Are the Rule, Not the Exception",
        body: "French is famous for pronouncing far fewer letters than it writes, especially at the end of words, where final consonants like 's', 't', and 'd' are usually silent. This can feel frustrating at first, but there's logic to it: French spelling preserved historical forms even as pronunciation simplified over centuries. A useful habit is to focus on listening and mimicking rather than reading letter by letter, since sounding out every letter will produce mispronunciations. Over time, patterns become predictable once you've heard enough examples.",
        examples: ["Paris (pa-REE) — the 's' is silent", "petit (puh-TEE) — small, the 't' is silent", "beaucoup (boh-KOO) — a lot, the 'p' is silent"],
      },
      {
        heading: "Greetings and Formality",
        body: "'Bonjour' is the all-purpose daytime greeting, appropriate in nearly any situation from casual to formal, and switches to 'bonsoir' in the evening. The informal 'salut' is reserved for friends and peers, similar to English 'hi', and should be avoided with strangers or in professional contexts. French social norms place strong importance on greetings; failing to say 'bonjour' when entering a shop, for instance, can come across as rude. Politeness in French is less about specific words and more about consistently acknowledging people.",
        examples: ["Bonjour, comment allez-vous ? — Hello, how are you? (formal)", "Salut, ça va ? — Hi, how's it going? (informal)", "Bonsoir, madame. — Good evening, ma'am."],
      },
      {
        heading: "Nasal Vowels: A New Sound Category",
        body: "French has nasal vowels that don't exist in English, where air passes through the nose as well as the mouth, changing the vowel's quality. These occur when a vowel is followed by 'n' or 'm' at the end of a syllable, as in 'bon' or 'temps'. Rather than pronouncing the 'n' or 'm' as a consonant, you let the vowel itself become nasalized while the 'n'/'m' stays mostly silent. This is one of the trickiest aspects of French pronunciation for English speakers and benefits enormously from listening practice and imitation.",
        examples: ["bon (bõ) — good (nasal)", "temps (tã) — time/weather (nasal)", "vin (vɛ̃) — wine (nasal)"],
      },
    ],
    exercises: [
      { question: "In French, what typically happens to final consonants like 's' or 't'?", choices: ["They're pronounced strongly", "They're usually silent", "They become vowels", "They're doubled"], answer: 1, explanation: "Final consonants in French are usually silent, as in 'Paris' or 'petit'." },
      { question: "Which greeting is appropriate only with friends?", choices: ["Bonjour", "Bonsoir", "Salut", "Madame"], answer: 2, explanation: "'Salut' is informal and used casually among friends and peers, not in formal settings." },
      { question: "What is a nasal vowel?", choices: ["A vowel pronounced with air through the nose", "A silent vowel", "A vowel that's always stressed", "A vowel followed by two consonants"], answer: 0, explanation: "Nasal vowels occur when air passes through the nose, changing the vowel's sound, as in 'bon' or 'temps'." },
      { question: "Why is greeting someone with 'bonjour' considered important in France?", choices: ["It's legally required", "Not greeting can seem rude", "It's only used in writing", "It replaces goodbye"], answer: 1, explanation: "French social etiquette places importance on greetings; skipping 'bonjour' can be seen as impolite." },
      { question: "How should you approach reading unfamiliar French words?", choices: ["Pronounce every letter", "Focus on listening and mimicking sounds", "Only read them silently", "Translate them first"], answer: 1, explanation: "Because many letters are silent, mimicking heard pronunciation is more reliable than sounding out every letter." },
      { question: "When does French switch from 'bonjour' to 'bonsoir'?", choices: ["Never", "In the evening", "Only on weekends", "When speaking to children"], answer: 1, explanation: "'Bonsoir' replaces 'bonjour' as the standard greeting in the evening." },
    ],
  },
  {
    id: "french-2",
    title: "Être et Avoir: The Verbs That Never Rest",
    minutes: 18,
    objective: "Correctly conjugate and use être (to be) and avoir (to have).",
    sections: [
      {
        heading: "Être: To Be",
        body: "'Être' is the most fundamental and most irregular verb in French, used for identity, nationality, and characteristics. Its present tense forms are je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont, none of which resemble the infinitive, so they simply must be memorized. 'Être' is also essential later as the auxiliary verb for certain verbs in the passé composé, particularly verbs of motion. Because it appears in nearly every conversation, mastering these six forms early is one of the best investments a beginner can make.",
        examples: ["Je suis étudiant. — I am a student.", "Nous sommes fatigués. — We are tired.", "Elle est française. — She is French."],
      },
      {
        heading: "Avoir: To Have",
        body: "'Avoir' means 'to have' and conjugates as j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont, another irregular verb that must be learned by heart. Like Spanish 'tener' and Italian 'avere', French uses 'avoir' in fixed expressions where English uses 'to be', such as 'avoir faim' (to be hungry) and 'avoir raison' (to be right). These expressions are idiomatic and can't be translated word for word, so they need dedicated memorization. 'Avoir' is also the most common auxiliary verb for forming the passé composé.",
        examples: ["J'ai vingt ans. — I am twenty years old.", "As-tu faim ? — Are you hungry?", "Ils ont raison. — They are right."],
      },
      {
        heading: "Liaison: When Words Connect",
        body: "French has a feature called liaison, where a normally silent final consonant is pronounced when the next word starts with a vowel, linking the two words smoothly. This happens often with 'être' and 'avoir' forms, such as 'vous êtes' (voo-ZET), where the 's' links to the vowel that follows. Liaison isn't used everywhere; it follows specific patterns based on grammatical context, and overusing it can sound unnatural. Recognizing common liaisons, especially with frequently used verbs, will make your spoken French sound noticeably smoother.",
        examples: ["vous êtes (voo-ZET) — you are", "ils ont (eel-ZOHN) — they have", "nous avons (noo-zah-VOHN) — we have"],
      },
    ],
    exercises: [
      { question: "What is the 'nous' form of 'être'?", choices: ["sommes", "êtes", "sont", "es"], answer: 0, explanation: "'Sommes' is the first-person plural present tense form of 'être': nous sommes." },
      { question: "How do you say 'I am twenty years old' in French?", choices: ["Je suis vingt ans.", "J'ai vingt ans.", "Je fais vingt ans.", "J'étais vingt ans."], answer: 1, explanation: "French expresses age with 'avoir': j'ai vingt ans, literally 'I have twenty years'." },
      { question: "What is liaison?", choices: ["A type of verb tense", "Pronouncing a normally silent consonant before a vowel", "A silent letter rule", "A form of negation"], answer: 1, explanation: "Liaison links a silent final consonant to a following vowel sound, as in 'vous êtes'." },
      { question: "Which expression uses 'avoir' idiomatically to mean 'to be right'?", choices: ["être raison", "avoir raison", "faire raison", "avoir vrai"], answer: 1, explanation: "'Avoir raison' is a fixed expression meaning 'to be right', literally 'to have reason'." },
      { question: "What is the correct 'ils' form of 'avoir'?", choices: ["ont", "avez", "avons", "as"], answer: 0, explanation: "'Ont' is the third-person plural form of 'avoir', used with 'ils' or 'elles'." },
      { question: "Why is 'être' especially important beyond basic identity statements?", choices: ["It has no other uses", "It's used as an auxiliary in the passé composé for some verbs", "It replaces 'avoir' entirely", "It's only used in questions"], answer: 1, explanation: "'Être' serves as the auxiliary verb for many verbs of motion in the passé composé, a key later grammar point." },
    ],
  },
  {
    id: "french-3",
    title: "Le, La, Les: Gender, Plurals, and Elision",
    minutes: 16,
    objective: "Identify noun gender and use correct articles and plural forms.",
    sections: [
      {
        heading: "Every Noun Has a Gender",
        body: "French nouns are either masculine or feminine, and unlike Spanish or Italian, the ending doesn't reliably predict gender, making memorization with the article essential from the start. Some patterns exist as loose guides, such as many nouns ending in '-tion' or '-ette' being feminine, but there are exceptions throughout the language. Because gender affects articles, adjectives, and pronouns, getting it right matters for building grammatically correct sentences. The best strategy is always learning a noun's gender at the same time you learn the word itself.",
        examples: ["le livre — the book (masculine)", "la table — the table (feminine)", "la nation — the nation (feminine, follows the -tion pattern)"],
      },
      {
        heading: "Definite Articles and Elision",
        body: "French definite articles are 'le' (masculine singular), 'la' (feminine singular), and 'les' (plural, both genders). When a noun starts with a vowel or a silent 'h', 'le' and 'la' both shorten to 'l'' in a process called elision, which avoids an awkward clash of vowel sounds. This is purely about pronunciation ease and applies very consistently. Indefinite articles work similarly to English 'a/an' and 'some': 'un' for masculine, 'une' for feminine, and 'des' for plural.",
        examples: ["l'ami / les amis — the friend / the friends", "l'école — the school", "un chien / une chienne — a male dog / a female dog"],
      },
      {
        heading: "Forming Plurals",
        body: "Most French nouns form their plural by adding '-s', but crucially, this final '-s' is silent in speech, meaning singular and plural nouns often sound identical when spoken alone. This is why the article ('le' vs 'les') often carries more information about number than the noun's pronunciation does. Nouns ending in '-eau' or '-eu' typically add '-x' instead of '-s', and nouns already ending in '-s', '-x', or '-z' don't change at all. Listening for the article, rather than the noun ending, is often the fastest way to catch whether something is singular or plural in spoken French.",
        examples: ["le chat / les chats — the cat / the cats (sounds identical)", "le bureau / les bureaux — the desk / the desks", "le prix / les prix — the price / the prices (unchanged)"],
      },
    ],
    exercises: [
      { question: "What happens to 'le' or 'la' before a vowel sound?", choices: ["Nothing changes", "They shorten to l' (elision)", "They become 'les'", "They're dropped entirely"], answer: 1, explanation: "Elision shortens 'le' and 'la' to 'l'' before a vowel or silent 'h' to avoid an awkward vowel clash." },
      { question: "How is the plural '-s' typically pronounced in French?", choices: ["Like an English 's'", "Silent", "Like 'z'", "Like 'sh'"], answer: 1, explanation: "The plural '-s' ending is silent in spoken French, so 'chat' and 'chats' sound the same." },
      { question: "What is the plural of 'le bureau'?", choices: ["les bureaus", "les bureaux", "les bureau", "la bureaux"], answer: 1, explanation: "Nouns ending in '-eau' form their plural with '-x' instead of '-s': bureau → bureaux." },
      { question: "Which article set is used for indefinite plural nouns?", choices: ["un", "une", "des", "les"], answer: 2, explanation: "'Des' is the indefinite plural article, used for 'some' with countable nouns." },
      { question: "Since spoken plurals often sound like singulars, what usually signals plurality?", choices: ["The verb tense", "The article, like 'les' vs 'le'", "Word order", "Stress on the last syllable"], answer: 1, explanation: "Because the plural '-s' is silent, the article often carries the key information about number." },
      { question: "What is the plural of 'le prix' (the price)?", choices: ["les prixs", "les prix", "les prices", "le prix"], answer: 1, explanation: "Nouns already ending in '-x' don't change in the plural: le prix → les prix." },
    ],
  },
  {
    id: "french-4",
    title: "-ER, -IR, -RE: The Verb Endings Trilogy",
    minutes: 18,
    objective: "Conjugate regular -er, -ir, and -re verbs in the present tense.",
    sections: [
      {
        heading: "Three Verb Families",
        body: "French regular verbs are grouped by their infinitive ending: -er, -ir, or -re, and each group follows its own conjugation pattern in the present tense. The -er group is by far the largest and includes most new verbs coined in modern French, such as 'télécharger' (to download). 'Parler' (to speak), 'finir' (to finish), and 'vendre' (to sell) represent the three regular patterns. Identifying which family a verb belongs to is the first step before conjugating it correctly.",
        examples: ["parler — to speak (-er)", "finir — to finish (-ir)", "vendre — to sell (-re)"],
      },
      {
        heading: "Present Tense Endings",
        body: "For -er verbs, remove '-er' and add -e, -es, -e, -ons, -ez, -ent; note that the first three singular forms and the third-person plural all sound identical despite different spellings, since the endings are silent. For -ir verbs, add -is, -is, -it, -issons, -issez, -issent. For -re verbs, add -s, -s, nothing (a bare stem) for the third-person singular, -ons, -ez, -ent. These written distinctions matter for spelling and formal writing even when they aren't always audible in casual speech.",
        examples: ["Je parle français. — I speak French.", "Tu finis tes devoirs. — You finish your homework.", "Il vend sa voiture. — He sells his car."],
      },
      {
        heading: "Spelling and Pronunciation Quirks",
        body: "Some -er verbs have minor spelling adjustments to preserve pronunciation: verbs ending in '-cer' change 'c' to 'ç' before endings starting with 'a' or 'o' (commencer → nous commençons), and verbs ending in '-ger' add an 'e' before such endings (manger → nous mangeons). These changes exist purely to keep the soft 's' or 'j' sound consistent, since 'c' and 'g' would otherwise harden before 'a' or 'o'. Recognizing this pattern helps you both spell and pronounce these common verbs correctly in the 'nous' form.",
        examples: ["Nous commençons à huit heures. — We start at eight o'clock.", "Nous mangeons ensemble. — We eat together.", "Elle voyage souvent. — She travels often."],
      },
    ],
    exercises: [
      { question: "What is the 'je' form of 'parler'?", choices: ["parle", "parles", "parlons", "parlent"], answer: 0, explanation: "Regular -er verbs form the 'je' present tense by adding '-e': parl + e = parle." },
      { question: "Which ending set is used for -ir verbs?", choices: ["-e, -es, -e, -ons, -ez, -ent", "-is, -is, -it, -issons, -issez, -issent", "-s, -s, -, -ons, -ez, -ent", "-ai, -as, -a, -ons, -ez, -ont"], answer: 1, explanation: "Regular -ir verbs like 'finir' use -is, -is, -it, -issons, -issez, -issent." },
      { question: "Why does 'commencer' become 'commençons' in the 'nous' form?", choices: ["Random spelling error", "To keep the soft 's' sound before 'o'", "Because it's irregular", "To match plural nouns"], answer: 1, explanation: "The cedilla on 'ç' preserves the soft 's' sound before 'o', which a plain 'c' would harden." },
      { question: "What is the correct 'il' form of 'vendre'?", choices: ["vend", "vends", "vendons", "vendent"], answer: 0, explanation: "-re verbs use a bare stem with no added letter for the third-person singular: il vend." },
      { question: "Which forms of a regular -er verb sound identical when spoken?", choices: ["Only nous and vous", "je, tu, il/elle, and ils/elles forms", "Only je and tu", "None of them"], answer: 1, explanation: "The -e, -es, -e, and -ent endings are all silent, making these forms sound the same despite different spellings." },
      { question: "Why does 'manger' add an 'e' before '-ons'?", choices: ["To make it plural", "To keep the soft 'j' sound before 'o'", "It's a typo tradition", "To shorten the word"], answer: 1, explanation: "Adding 'e' keeps the 'g' soft (like 'j') before 'o', preventing it from hardening: mangeons." },
    ],
  },
  {
    id: "french-5",
    title: "Questions et Négation: Asking Without Fear",
    minutes: 15,
    objective: "Form questions and negative sentences correctly in French.",
    sections: [
      {
        heading: "Three Ways to Ask a Question",
        body: "French offers three main ways to form a yes/no question, ranging from casual to formal. The simplest is keeping normal word order and just raising your intonation at the end, common in casual speech. A more formal option adds 'est-ce que' before the statement, which signals a question without needing to invert word order. The most formal method inverts the subject pronoun and verb, connected by a hyphen, such as 'Parlez-vous français ?'. Choosing among these depends on context, with inversion reserved for more formal or written French.",
        examples: ["Tu parles français ? — You speak French? (casual, intonation)", "Est-ce que tu parles français ? — Do you speak French? (neutral)", "Parlez-vous français ? — Do you speak French? (formal, inversion)"],
      },
      {
        heading: "Question Words",
        body: "Common French question words include 'que/qu'est-ce que' (what), 'qui' (who), 'où' (where), 'quand' (when), 'comment' (how), and 'pourquoi' (why). These typically appear at the beginning of the sentence, often paired with 'est-ce que' for a smoother, non-inverted structure, especially in speech. For example, 'Où est-ce que tu habites ?' is more common in conversation than the fully inverted 'Où habites-tu ?', though both are correct. Learning to recognize both structures helps with understanding native speakers across different registers.",
        examples: ["Où habites-tu ? — Where do you live?", "Pourquoi apprends-tu le français ? — Why are you learning French?", "Qu'est-ce que tu fais ? — What are you doing?"],
      },
      {
        heading: "Negation With 'Ne...Pas'",
        body: "French negation typically wraps around the conjugated verb using two parts: 'ne' before the verb and 'pas' after it, unlike English or Spanish's single negative word. In casual spoken French, the 'ne' is very often dropped entirely, leaving just 'pas', though this is considered informal and should still be written in full for school or formal contexts. Other negative expressions replace 'pas' with different words, such as 'ne...jamais' (never) or 'ne...rien' (nothing), keeping the same wrap-around structure. Recognizing this two-part pattern is essential since forgetting either half creates an incomplete or incorrect negation in writing.",
        examples: ["Je ne parle pas anglais. — I don't speak English.", "Il ne mange jamais de viande. — He never eats meat.", "Je ne sais rien. — I don't know anything."],
      },
    ],
    exercises: [
      { question: "Which structure is the most formal way to ask a question?", choices: ["Rising intonation only", "Est-ce que + statement", "Subject-verb inversion", "Adding 'pas' at the end"], answer: 2, explanation: "Subject-verb inversion, like 'Parlez-vous français ?', is the most formal question structure." },
      { question: "What are the two parts of standard French negation?", choices: ["ne...jamais", "ne...pas", "non...pas", "pas...rien"], answer: 1, explanation: "Standard negation wraps 'ne' before the verb and 'pas' after it: ne...pas." },
      { question: "What is often dropped in casual spoken French negation?", choices: ["Pas", "Ne", "The verb", "The subject"], answer: 1, explanation: "In informal spoken French, 'ne' is frequently dropped, leaving only 'pas', though this isn't standard for writing." },
      { question: "Which question word means 'why'?", choices: ["Comment", "Quand", "Pourquoi", "Où"], answer: 2, explanation: "'Pourquoi' means 'why' and is used to ask for a reason." },
      { question: "How would you say 'I never eat meat'?", choices: ["Je mange jamais de viande.", "Je ne mange pas jamais de viande.", "Je ne mange jamais de viande.", "Je jamais mange de viande."], answer: 2, explanation: "'Ne...jamais' replaces 'ne...pas' to express 'never', keeping the same wrap-around structure." },
      { question: "What does adding 'est-ce que' to a sentence do?", choices: ["Makes it negative", "Turns it into a question without inversion", "Makes it past tense", "Makes it plural"], answer: 1, explanation: "'Est-ce que' signals a question while keeping normal subject-verb word order, avoiding inversion." },
    ],
  },
  {
    id: "french-6",
    title: "Je Voudrais un Croissant: Ordering Like a Local",
    minutes: 17,
    objective: "Use polite expressions to order food and shop in French.",
    sections: [
      {
        heading: "Politeness With 'S'il Vous Plaît' and 'Merci'",
        body: "'S'il vous plaît' (please, formal) and 's'il te plaît' (please, informal) are essential phrases, and French social norms place high value on politeness in everyday transactions. When thanked, common responses include 'de rien' (you're welcome, casual) or the more formal 'je vous en prie'. Always pair a greeting like 'bonjour' with your request, since walking straight into an order without greeting first can come across as impolite in French culture. Small courtesies matter more in French interactions than many English speakers initially expect.",
        examples: ["Un café, s'il vous plaît. — A coffee, please.", "Merci beaucoup ! — Thank you very much!", "De rien. — You're welcome."],
      },
      {
        heading: "Ordering With 'Je Voudrais'",
        body: "'Je voudrais' (I would like) is the conditional form of 'vouloir' (to want) and is the standard polite phrase for ordering food, far preferred over the blunter 'je veux' (I want) in most everyday situations. This mirrors the softening pattern seen in Spanish 'me gustaría' and Italian 'vorrei'. To ask what someone else would like, you can say 'Vous voudriez... ?' formally. Using the conditional form here isn't just about grammar; it's a genuine marker of courtesy expected in cafés, bakeries, and restaurants.",
        examples: ["Je voudrais un croissant, s'il vous plaît. — I would like a croissant, please.", "Nous voudrions la carte. — We would like the menu.", "Voudriez-vous autre chose ? — Would you like anything else?"],
      },
      {
        heading: "At the Market",
        body: "Shopping phrases often use quantities like 'un kilo de' (a kilo of) or 'une livre de' (about half a kilo, historically 'a pound'). To ask a price, use 'Combien coûte...' for a single item or 'Combien coûtent...' for multiple items, with the verb agreeing in number just as in Spanish and Italian. At French markets, vendors often greet you first and ask what you'd like, so listening for 'Vous désirez ?' (What would you like?) is useful. These small interactions reflect the conversational, personal nature of traditional French market shopping.",
        examples: ["Combien coûte ce fromage ? — How much does this cheese cost?", "Un kilo de pommes, s'il vous plaît. — A kilo of apples, please.", "Combien coûtent les poires ? — How much do the pears cost?"],
      },
    ],
    exercises: [
      { question: "What is the informal way to say 'please'?", choices: ["S'il vous plaît", "S'il te plaît", "Merci beaucoup", "De rien"], answer: 1, explanation: "'S'il te plaît' is the informal version of 'please', used with friends and family." },
      { question: "Which phrase is the polite way to order food?", choices: ["Je veux un croissant.", "Je voudrais un croissant.", "J'ai un croissant.", "Je suis un croissant."], answer: 1, explanation: "'Je voudrais' is the conditional, polite form preferred for ordering, unlike the more direct 'je veux'." },
      { question: "How do you ask the price of multiple items?", choices: ["Combien coûte...?", "Combien coûtent...?", "Combien sont...?", "Quel est le prix...?"], answer: 1, explanation: "'Coûtent' agrees with plural subjects, used when asking about more than one item." },
      { question: "What might a market vendor say to greet a customer?", choices: ["Au revoir", "Vous désirez ?", "Ça va ?", "Pardon"], answer: 1, explanation: "'Vous désirez ?' means 'What would you like?' and is commonly used by vendors to open an interaction." },
      { question: "Why is it considered important to say 'bonjour' before ordering?", choices: ["It's legally required", "Skipping it can seem impolite", "It changes the price", "It's only for formal restaurants"], answer: 1, explanation: "French etiquette expects a greeting before making a request; skipping it can come across as rude." },
      { question: "'Je voudrais' is the conditional form of which verb?", choices: ["Avoir", "Être", "Vouloir", "Pouvoir"], answer: 2, explanation: "'Je voudrais' comes from 'vouloir' (to want), softened into the conditional mood for politeness." },
    ],
  },
  {
    id: "french-7",
    title: "Hier J'ai Trop Mangé: Facing the Passé Composé",
    minutes: 19,
    objective: "Form and use the passé composé to describe completed past actions.",
    sections: [
      {
        heading: "Auxiliary Plus Past Participle",
        body: "The passé composé is French's most common past tense for completed actions, formed with two parts: an auxiliary verb ('avoir' or 'être') in the present tense, plus the past participle of the main verb. Most verbs use 'avoir', but a specific, memorizable list of about seventeen verbs of motion and state change use 'être' instead, often remembered through the mnemonic acronym 'DR & MRS VANDERTRAMP'. Regular past participles are formed by removing the infinitive ending and adding '-é' for -er verbs, '-i' for -ir verbs, and '-u' for -re verbs. This structure closely parallels English 'have eaten' or 'has gone'.",
        examples: ["J'ai mangé une pizza. — I ate/have eaten a pizza.", "Tu as fini tes devoirs. — You finished your homework.", "Il a vendu sa voiture. — He sold his car."],
      },
      {
        heading: "When 'Être' Takes Over",
        body: "Verbs like 'aller' (to go), 'venir' (to come), 'partir' (to leave), 'naître' (to be born), and 'mourir' (to die) use 'être' as their auxiliary rather than 'avoir'. When 'être' is used, the past participle must agree in gender and number with the subject, adding '-e' for feminine, '-s' for plural, or both, much like Italian's agreement rule with 'essere'. This agreement doesn't apply when 'avoir' is the auxiliary, making the distinction between the two auxiliaries grammatically important, not just a vocabulary detail. Reflexive verbs, like 'se lever' (to get up), also always take 'être' and follow the same agreement pattern.",
        examples: ["Elle est allée au marché. — She went to the market.", "Ils sont partis hier. — They left yesterday.", "Je me suis levé tôt. — I got up early."],
      },
      {
        heading: "Irregular Past Participles",
        body: "Many frequently used verbs have irregular past participles that must be memorized individually rather than derived from a rule. 'Faire' (to do/make) becomes 'fait', 'être' becomes 'été', and 'prendre' (to take) becomes 'pris'. Because these verbs appear constantly in everyday speech, learning their irregular forms early has an outsized impact on your ability to narrate past events. Repetition through speaking and reading real sentences is far more effective than memorizing isolated lists.",
        examples: ["J'ai fait mes devoirs. — I did my homework.", "Ça a été difficile. — It was difficult.", "Nous avons pris le train. — We took the train."],
      },
    ],
    exercises: [
      { question: "What two parts make up the passé composé?", choices: ["Two infinitives", "An auxiliary verb plus a past participle", "Present tense plus future tense", "Subject plus adjective"], answer: 1, explanation: "The passé composé combines a present-tense auxiliary (avoir/être) with a past participle." },
      { question: "Which auxiliary does 'aller' use?", choices: ["Avoir", "Être", "Both equally", "Neither"], answer: 1, explanation: "Verbs of motion like 'aller' belong to the small group that uses 'être' as their auxiliary." },
      { question: "Why does the participle become 'allée' for a female subject?", choices: ["Random spelling choice", "Participles agree with the subject when using être", "It's a typo tradition", "Only used in questions"], answer: 1, explanation: "With 'être' as the auxiliary, the past participle must agree in gender and number with the subject." },
      { question: "What is the past participle of 'faire'?", choices: ["faisé", "fait", "faisu", "fais"], answer: 1, explanation: "'Faire' has an irregular past participle: fait, which must be memorized." },
      { question: "Which ending do regular -ir verbs use for their past participle?", choices: ["-é", "-i", "-u", "-ait"], answer: 1, explanation: "Regular -ir verbs form their past participle with '-i', e.g. finir → fini." },
      { question: "Do reflexive verbs use 'avoir' or 'être'?", choices: ["Avoir", "Être", "Either, interchangeably", "Neither"], answer: 1, explanation: "Reflexive verbs like 'se lever' always take 'être' as their auxiliary in the passé composé." },
    ],
  },
  {
    id: "french-8",
    title: "L'Avenir Sera Radieux: Future Plans and a Reading",
    minutes: 20,
    objective: "Express future plans using aller + infinitive and the future tense, and read a short passage.",
    sections: [
      {
        heading: "The Easy Future: Aller + Infinitive",
        body: "Just as in Spanish and Italian, French has a simple, common way to express near-future plans using 'aller' (to go) conjugated in the present, followed directly by an infinitive, exactly like English 'going to'. This is often called 'le futur proche' and is used constantly in everyday speech, arguably more than the true future tense. To build it, conjugate 'aller' (vais, vas, va, allons, allez, vont), then add the infinitive of the main verb unchanged. Because it reuses the present tense of a verb you already know, it's an efficient way to start talking about the future immediately.",
        examples: ["Je vais étudier ce soir. — I am going to study tonight.", "Nous allons voyager en France. — We are going to travel to France.", "Vas-tu appeler ta mère ? — Are you going to call your mother?"],
      },
      {
        heading: "The True Future Tense",
        body: "The simple future tense adds endings directly onto the infinitive (dropping the final 'e' for -re verbs) rather than removing the ending first: -ai, -as, -a, -ons, -ez, -ont. These endings closely resemble the present tense of 'avoir', which is not a coincidence, since the future tense historically developed from a combination of the infinitive plus 'avoir'. Some common verbs have irregular stems, like 'être' → 'ser-', 'avoir' → 'aur-', and 'faire' → 'fer-', but the endings themselves remain completely regular. The true future is often used in writing, predictions, and more formal or emphatic speech.",
        examples: ["J'étudierai demain. — I will study tomorrow.", "Nous aurons une réunion lundi. — We will have a meeting on Monday.", "Elle fera le dîner. — She will make dinner."],
      },
      {
        heading: "A Short Reading: Les Projets de Claire",
        body: "Claire a beaucoup de projets pour l'année prochaine. D'abord, elle va terminer ses études de français, parce qu'elle veut travailler dans un autre pays. Ensuite, elle voyagera au Sénégal pour rendre visite à sa famille et pratiquer la langue avec des locuteurs natifs. Elle pense que le français lui ouvrira beaucoup de portes dans sa carrière. This reading combines both future forms: the near future 'va terminer' and the simple future 'voyagera' and 'ouvrira'. Try identifying each verb's tense and infinitive before checking the translations below.",
        examples: ["Claire a beaucoup de projets. — Claire has many plans.", "Elle va terminer ses études. — She is going to finish her studies.", "Elle voyagera au Sénégal. — She will travel to Senegal."],
      },
    ],
    exercises: [
      { question: "How do you say 'I am going to study' using the near future?", choices: ["J'étudierai", "Je vais étudier", "J'étudie", "J'étudiais"], answer: 1, explanation: "The near future uses 'aller + infinitive': je vais étudier." },
      { question: "What is the correct simple future ending for 'nous'?", choices: ["-ons", "-ez", "-ont", "-ai"], answer: 0, explanation: "The simple future uses '-ons' for 'nous' regardless of verb type: parlerons, finirons, vendrons." },
      { question: "What is the irregular future stem of 'être'?", choices: ["êtr-", "ser-", "êtes-", "et-"], answer: 1, explanation: "'Être' has an irregular future stem 'ser-': serai, seras, sera..." },
      { question: "In the reading, what does 'voyagera' tell us about Claire?", choices: ["She traveled in the past", "She travels habitually", "She will travel in the future", "She is currently traveling"], answer: 2, explanation: "'Voyagera' is the simple future form of 'voyager', indicating a future action." },
      { question: "Why does Claire want to travel to Senegal according to the reading?", choices: ["To find a job immediately", "To visit family and practice French", "To study English", "To retire"], answer: 1, explanation: "The text states she will travel to visit her family and practice the language with native speakers." },
      { question: "Which future form is more common in casual spoken French?", choices: ["The simple future (-ai, -as...)", "The 'aller + infinitive' structure", "Both are equally rare", "Neither is used in speech"], answer: 1, explanation: "'Aller + infinitive' (futur proche) is used far more often in everyday conversation than the simple future tense." },
    ],
  },
];
