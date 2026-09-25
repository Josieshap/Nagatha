import type { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "english-1",
    title: "Complete Sentences and Fragments",
    minutes: 15,
    objective: "Identify complete sentences and recognize and fix sentence fragments.",
    sections: [
      {
        heading: "What makes a sentence complete",
        body: "A complete sentence must have a subject, a verb, and express a complete thought. The subject tells who or what the sentence is about, and the verb tells what the subject does or is. If any of these three parts is missing, the group of words is a fragment rather than a full sentence. Reading a sentence aloud and asking 'does this make sense on its own?' is a good way to test whether it is complete.",
        examples: [
          "Complete sentence: 'The dog barked loudly.' (subject: dog, verb: barked, complete thought)",
          "Fragment: 'Barked loudly.' (no subject, so the thought is incomplete)"
        ]
      },
      {
        heading: "Common types of fragments",
        body: "Fragments often occur when a dependent clause is punctuated as if it were a full sentence, or when a subject or verb is left out. Words like 'because,' 'although,' and 'when' begin dependent clauses that cannot stand alone, even though they contain a subject and verb. Phrases without any verb at all, such as descriptions or lists, are also fragments.",
        examples: [
          "Fragment: 'Because it was raining.' (dependent clause with no main clause attached)",
          "Fragment: 'A tall man with a red hat.' (no verb)"
        ]
      },
      {
        heading: "Fixing fragments",
        body: "A fragment can be fixed by adding the missing subject or verb, or by connecting it to a nearby complete sentence. Combining a dependent clause with an independent clause turns the fragment into a complete sentence. Checking that every sentence you write has both a subject and a verb helps prevent fragments.",
        examples: [
          "Fixed: 'Because it was raining, we stayed inside.' (dependent clause joined to an independent clause)",
          "Fixed: 'A tall man with a red hat walked by.' (verb added)"
        ]
      }
    ],
    exercises: [
      {
        question: "Identify which of the following is a complete sentence.",
        choices: ["Running through the park.", "The children played in the yard.", "Because she was tired.", "Under the old bridge."],
        answer: 1,
        explanation: "'The children played in the yard' has a subject (children) and a verb (played) and expresses a complete thought."
      },
      {
        question: "Identify which of the following is a sentence fragment.",
        choices: ["The chef prepared dinner.", "After the movie ended, we went home.", "Since the store was closed.", "She sang beautifully."],
        answer: 2,
        explanation: "'Since the store was closed' is a dependent clause with no main clause attached, so it cannot stand alone."
      },
      {
        question: "Identify the best way to fix the fragment 'Although the game was canceled.'",
        choices: ["Although the game was canceled, the players still practiced.", "Although the game, was canceled.", "The game was canceled although.", "Although canceled the game was."],
        answer: 0,
        explanation: "Adding an independent clause after the dependent clause completes the thought and fixes the fragment."
      },
      {
        question: "Identify which of the following is missing a verb and is therefore a fragment.",
        choices: ["The old house on the hill.", "The old house on the hill collapsed.", "The house collapsed quickly.", "It collapsed."],
        answer: 0,
        explanation: "'The old house on the hill' has a subject but no verb, so it does not express a complete thought."
      },
      {
        question: "Identify which of the following is a complete sentence.",
        choices: ["When the bell rang.", "Rang the bell loudly.", "The bell rang loudly.", "Loudly ringing bell."],
        answer: 2,
        explanation: "'The bell rang loudly' has a subject (bell), a verb (rang), and expresses a complete thought."
      },
      {
        question: "Identify the sentence that correctly fixes the fragment 'Walking to school every morning.'",
        choices: ["Walking to school, every morning.", "She walks to school every morning.", "Every morning walking to school.", "To school walking every morning."],
        answer: 1,
        explanation: "Adding a subject (she) and a proper verb form (walks) turns the fragment into a complete sentence."
      }
    ]
  },
  {
    id: "english-2",
    title: "Subject-Verb Agreement",
    minutes: 16,
    objective: "Match verbs correctly to singular and plural subjects, including tricky cases.",
    sections: [
      {
        heading: "The basic rule",
        body: "A singular subject needs a singular verb, and a plural subject needs a plural verb. Most singular verbs in present tense end in -s, such as 'runs' or 'plays,' while plural verbs do not, such as 'run' or 'play.' Identifying the true subject of the sentence is the first step to choosing the correct verb form.",
        examples: [
          "'The cat runs fast.' (singular subject, singular verb)",
          "'The cats run fast.' (plural subject, plural verb)"
        ]
      },
      {
        heading: "Tricky subjects",
        body: "Phrases that come between the subject and the verb, such as prepositional phrases, do not change the verb's form — the verb must still agree with the actual subject, not a word in the phrase. Words like 'each,' 'everyone,' and 'nobody' are singular and take singular verbs even though they may seem to refer to more than one person. Compound subjects joined by 'and' are usually plural, but subjects joined by 'or' agree with the closer subject.",
        examples: [
          "'The box of toys is on the shelf.' (subject is 'box,' not 'toys,' so the verb is singular)",
          "'Each of the students has a book.' ('each' is singular, so the verb is singular)"
        ]
      },
      {
        heading: "Agreement with collective and irregular nouns",
        body: "Collective nouns like 'team' or 'family' are usually treated as singular because they refer to a single unit. Irregular plural nouns, such as 'children' or 'people,' take plural verbs even though they do not end in -s. Always check what the subject truly refers to before choosing the verb form.",
        examples: [
          "'The team wins every game.' (team is treated as one unit, so the verb is singular)",
          "'The children play outside.' (children is plural, so the verb is plural)"
        ]
      }
    ],
    exercises: [
      {
        question: "Choose the verb that correctly completes the sentence: 'The group of students ___ working on the project.'",
        choices: ["is", "are", "were", "have"],
        answer: 0,
        explanation: "The subject is 'group,' which is singular, so it takes the singular verb 'is.'"
      },
      {
        question: "Choose the verb that correctly completes the sentence: 'Each of the boxes ___ heavy.'",
        choices: ["are", "is", "were", "have been"],
        answer: 1,
        explanation: "'Each' is a singular subject, even though it refers to 'boxes,' so it takes the singular verb 'is.'"
      },
      {
        question: "Choose the verb that correctly completes the sentence: 'The dogs in the yard ___ loudly.'",
        choices: ["barks", "bark", "is barking", "barking"],
        answer: 1,
        explanation: "The subject is 'dogs,' which is plural, so it takes the plural verb 'bark.'"
      },
      {
        question: "Choose the verb that correctly completes the sentence: 'Nobody in the class ___ the answer.'",
        choices: ["know", "knows", "knowing", "have known"],
        answer: 1,
        explanation: "'Nobody' is a singular subject, so it takes the singular verb 'knows.'"
      },
      {
        question: "Choose the verb that correctly completes the sentence: 'The children on the bus ___ excited about the trip.'",
        choices: ["is", "was", "are", "has been"],
        answer: 2,
        explanation: "'Children' is an irregular plural noun, so it takes the plural verb 'are.'"
      },
      {
        question: "Choose the verb that correctly completes the sentence: 'The basket of apples ___ on the counter.'",
        choices: ["sit", "sits", "sitting", "have sat"],
        answer: 1,
        explanation: "The subject is 'basket,' not 'apples,' and 'basket' is singular, so it takes the singular verb 'sits.'"
      }
    ]
  },
  {
    id: "english-3",
    title: "Verb Tenses",
    minutes: 17,
    objective: "Identify and correctly use past, present, and future verb tenses, including consistent tense within a passage.",
    sections: [
      {
        heading: "Present, past, and future",
        body: "Present tense describes actions happening now or habitually, such as 'she walks.' Past tense describes actions that already happened, such as 'she walked.' Future tense describes actions that have not happened yet, such as 'she will walk.' Regular verbs form the past tense by adding -ed, while irregular verbs change form entirely, such as 'go' becoming 'went.'",
        examples: [
          "Present: 'He plays soccer every Saturday.'",
          "Past: 'He played soccer last Saturday.'",
          "Future: 'He will play soccer next Saturday.'"
        ]
      },
      {
        heading: "Irregular verbs",
        body: "Many common verbs do not follow the regular -ed pattern in the past tense and must be memorized, such as 'go/went,' 'eat/ate,' and 'see/saw.' Using the wrong form of an irregular verb is a common grammar mistake, so it helps to review a list of irregular verbs and their past tense forms. The perfect tenses use a form of 'have' plus a past participle, such as 'has gone' or 'had eaten.'",
        examples: [
          "Incorrect: 'She has went to the store.' Correct: 'She has gone to the store.'",
          "Incorrect: 'They eated dinner already.' Correct: 'They ate dinner already.'"
        ]
      },
      {
        heading: "Keeping tense consistent",
        body: "Within a single sentence or paragraph, verb tense should generally stay consistent unless the timing of events truly changes. Shifting tense unnecessarily, such as switching from past to present in the middle of a story, confuses the reader about when events happened. When editing writing, check each verb to make sure it matches the timeline the rest of the passage establishes.",
        examples: [
          "Inconsistent: 'She walked into the room and sees her friend.' Consistent: 'She walked into the room and saw her friend.'"
        ]
      }
    ],
    exercises: [
      {
        question: "Choose the sentence that correctly uses the past tense.",
        choices: ["Yesterday, she goes to the market.", "Yesterday, she went to the market.", "Yesterday, she will go to the market.", "Yesterday, she is going to the market."],
        answer: 1,
        explanation: "'Yesterday' signals a past event, and 'went' is the correct past tense form of 'go.'"
      },
      {
        question: "Choose the sentence with the correct past participle form.",
        choices: ["She has eaten breakfast already.", "She has ate breakfast already.", "She has eat breakfast already.", "She has eating breakfast already."],
        answer: 0,
        explanation: "The correct past participle of 'eat' used with 'has' is 'eaten,' not 'ate' or other forms."
      },
      {
        question: "Choose the sentence that maintains consistent verb tense.",
        choices: ["He opened the door and sees a surprise.", "He opens the door and saw a surprise.", "He opened the door and saw a surprise.", "He opening the door and saw a surprise."],
        answer: 2,
        explanation: "Both verbs, 'opened' and 'saw,' are in the past tense, keeping the sentence consistent."
      },
      {
        question: "Choose the sentence that correctly expresses a future action.",
        choices: ["Tomorrow, we visited the museum.", "Tomorrow, we will visit the museum.", "Tomorrow, we visit the museum yesterday.", "Tomorrow, we are visited the museum."],
        answer: 1,
        explanation: "'Tomorrow' signals a future event, and 'will visit' is the correct future tense construction."
      },
      {
        question: "Choose the sentence that correctly uses the irregular past tense of 'see.'",
        choices: ["She seed the movie last night.", "She saw the movie last night.", "She sees the movie last night.", "She seen the movie last night."],
        answer: 1,
        explanation: "The correct irregular past tense of 'see' is 'saw,' not 'seed' or 'seen' used alone without a helping verb."
      },
      {
        question: "Choose the sentence that correctly fixes the tense error in 'They was walking to the store when it start raining.'",
        choices: ["They were walking to the store when it started raining.", "They was walking to the store when it starting raining.", "They are walking to the store when it started raining.", "They were walk to the store when it start raining."],
        answer: 0,
        explanation: "'Were' correctly agrees with the plural subject 'they,' and 'started' matches the past tense of the sentence."
      }
    ]
  },
  {
    id: "english-4",
    title: "Commas",
    minutes: 16,
    objective: "Use commas correctly in lists, compound sentences, introductory phrases, and with coordinating conjunctions.",
    sections: [
      {
        heading: "Commas in lists",
        body: "When listing three or more items in a sentence, place a comma after each item except the last one, which is followed by 'and' or 'or.' This is sometimes called the serial comma or Oxford comma when it appears before the final conjunction. Consistent use of commas in lists helps readers clearly separate each item.",
        examples: [
          "'I bought apples, bananas, and oranges.'",
          "'She likes hiking, swimming, and biking.'"
        ]
      },
      {
        heading: "Commas with introductory phrases and compound sentences",
        body: "A comma should follow an introductory word or phrase that comes before the main clause of a sentence, such as 'After the game,' or 'However,.' When joining two independent clauses with a coordinating conjunction like 'and,' 'but,' or 'so,' place a comma before the conjunction. This comma signals to the reader that a complete new thought is being added.",
        examples: [
          "'After the game, we went out for pizza.' (introductory phrase followed by a comma)",
          "'I wanted to go to the park, but it started raining.' (comma before the conjunction joining two independent clauses)"
        ]
      },
      {
        heading: "Avoiding comma mistakes",
        body: "A common mistake is placing a comma between two independent clauses without a conjunction, which creates a comma splice; use a period, semicolon, or conjunction instead. Another mistake is adding unnecessary commas that interrupt the natural flow of a short, simple sentence. When in doubt, read the sentence aloud and add a comma only where a natural pause supports the meaning.",
        examples: [
          "Comma splice (incorrect): 'I finished my homework, I went to bed.' Corrected: 'I finished my homework, so I went to bed.'"
        ]
      }
    ],
    exercises: [
      {
        question: "Choose the sentence that uses commas correctly in a list.",
        choices: ["I need milk eggs, and bread.", "I need milk, eggs, and bread.", "I need milk, eggs and, bread.", "I need milk eggs and bread,."],
        answer: 1,
        explanation: "Each item in the list is separated by a comma, including one before the final conjunction 'and.'"
      },
      {
        question: "Choose the sentence that correctly punctuates the introductory phrase.",
        choices: ["Before the storm arrived we packed our bags.", "Before the storm arrived, we packed our bags.", "Before, the storm arrived we packed our bags.", "Before the storm, arrived we packed our bags."],
        answer: 1,
        explanation: "A comma should follow the introductory phrase 'Before the storm arrived' since it comes before the main clause."
      },
      {
        question: "Choose the sentence that correctly joins two independent clauses.",
        choices: ["I wanted to leave early but my friend was late.", "I wanted to leave early, but my friend was late.", "I wanted to leave early, but, my friend was late.", "I wanted to leave, early but my friend was late."],
        answer: 1,
        explanation: "A comma is placed before the coordinating conjunction 'but' when it joins two independent clauses."
      },
      {
        question: "Identify which sentence contains a comma splice.",
        choices: ["It was cold outside, so I wore a coat.", "It was cold outside, I wore a coat.", "It was cold outside, and I wore a coat.", "Because it was cold outside, I wore a coat."],
        answer: 1,
        explanation: "This sentence joins two independent clauses with only a comma and no conjunction, which is a comma splice."
      },
      {
        question: "Choose the sentence that correctly fixes the comma splice 'The movie ended, everyone clapped.'",
        choices: ["The movie ended everyone clapped.", "The movie ended, so everyone clapped.", "The movie ended, everyone, clapped.", "The movie, ended everyone clapped."],
        answer: 1,
        explanation: "Adding the conjunction 'so' after the comma correctly joins the two independent clauses."
      },
      {
        question: "Choose the sentence that uses commas correctly.",
        choices: ["My favorite subjects are math, science, and art.", "My favorite subjects, are math science and art.", "My favorite subjects are math science, and, art.", "My, favorite subjects are math, science and art."],
        answer: 0,
        explanation: "The list items 'math,' 'science,' and 'art' are properly separated by commas, including before the final conjunction."
      }
    ]
  },
  {
    id: "english-5",
    title: "Commonly Confused Words",
    minutes: 15,
    objective: "Correctly distinguish and use their/there/they're, its/it's, and affect/effect.",
    sections: [
      {
        heading: "Their, there, and they're",
        body: "'Their' is a possessive pronoun showing ownership, as in 'their house.' 'There' refers to a place or is used to introduce a sentence, as in 'the book is over there' or 'there are five apples.' 'They're' is a contraction of 'they are,' as in 'they're going to the park.' Substituting 'they are' into the sentence is a quick way to check if 'they're' is the correct choice.",
        examples: [
          "'Their car is parked outside.' (shows possession)",
          "'The keys are over there.' (refers to a place)",
          "'They're planning a trip next week.' (short for 'they are')"
        ]
      },
      {
        heading: "Its and it's",
        body: "'Its' is a possessive pronoun meaning belonging to it, as in 'the dog wagged its tail.' 'It's' is a contraction of 'it is' or 'it has,' as in 'it's raining today.' A helpful trick is to replace the word with 'it is' — if the sentence still makes sense, use 'it's'; if not, use 'its.'",
        examples: [
          "'The company updated its policy.' (possessive, no apostrophe)",
          "'It's been a long day.' (short for 'it has')"
        ]
      },
      {
        heading: "Affect and effect",
        body: "'Affect' is usually a verb meaning to influence something, as in 'the weather can affect your mood.' 'Effect' is usually a noun meaning the result of something, as in 'the effect of the storm was significant.' A helpful trick is that 'affect' is an action (both start with 'a'), while 'effect' is often the end result you can point to.",
        examples: [
          "'Lack of sleep can affect concentration.' (verb, describes an influence)",
          "'The effect of the new law was immediate.' (noun, describes a result)"
        ]
      }
    ],
    exercises: [
      {
        question: "Choose the word that correctly completes the sentence: '___ going to be late if we do not leave now.'",
        choices: ["Their", "There", "They're", "Theyre"],
        answer: 2,
        explanation: "'They're' is short for 'they are,' which fits the sentence: 'They are going to be late.'"
      },
      {
        question: "Choose the word that correctly completes the sentence: 'The students left ___ backpacks on the bus.'",
        choices: ["there", "they're", "their", "theirs is"],
        answer: 2,
        explanation: "'Their' shows possession here, indicating the backpacks belong to the students."
      },
      {
        question: "Choose the word that correctly completes the sentence: '___ a new restaurant opening downtown.'",
        choices: ["Their", "They're", "There's", "Theirs"],
        answer: 2,
        explanation: "'There's' (short for 'there is') correctly introduces the sentence about a new restaurant existing."
      },
      {
        question: "Choose the word that correctly completes the sentence: 'The cat licked ___ paw after eating.'",
        choices: ["it's", "its", "its'", "it is"],
        answer: 1,
        explanation: "'Its' is the possessive form here, showing the paw belongs to the cat, with no apostrophe."
      },
      {
        question: "Choose the word that correctly completes the sentence: '___ almost time for the movie to start.'",
        choices: ["Its", "It's", "Its'", "Their"],
        answer: 1,
        explanation: "'It's' is short for 'it is,' which fits the sentence: 'It is almost time.'"
      },
      {
        question: "Choose the word that correctly completes the sentence: 'The new policy will ___ every employee in the office.'",
        choices: ["effect", "affect", "effects", "affects"],
        answer: 1,
        explanation: "'Affect' is the verb meaning to influence, which is needed here since the sentence describes an action on employees."
      }
    ]
  },
  {
    id: "english-6",
    title: "Paragraph Structure: Claim, Evidence, Explanation",
    minutes: 18,
    objective: "Build well-organized paragraphs using a clear claim, supporting evidence, and an explanation connecting them.",
    sections: [
      {
        heading: "Starting with a claim",
        body: "A strong paragraph usually begins with a claim, which is a clear statement of the main point the paragraph will support. The claim should be specific enough to be proven or explained, rather than a vague or overly broad statement. Readers should be able to tell exactly what the paragraph is going to be about after reading the claim.",
        examples: [
          "Vague claim: 'Exercise is good.' Specific claim: 'Regular exercise improves both physical health and mental focus.'"
        ]
      },
      {
        heading: "Supporting with evidence",
        body: "After stating the claim, a paragraph should provide evidence, such as facts, examples, statistics, or quotations, that supports the claim. Evidence gives the reader a reason to believe the claim is true rather than just an opinion. Strong paragraphs often include specific, concrete details rather than generalizations.",
        examples: [
          "Claim: 'Reading regularly builds vocabulary.' Evidence: 'Studies show that students who read for 20 minutes a day encounter thousands more words per year than those who do not.'"
        ]
      },
      {
        heading: "Explaining the connection",
        body: "The explanation ties the evidence back to the claim, showing the reader exactly how or why the evidence proves the point. Without this step, a reader might not understand why the evidence matters. A complete paragraph moves clearly from claim, to evidence, to explanation, so each part builds logically on the one before it.",
        examples: [
          "Claim: 'Recycling reduces waste in landfills.' Evidence: 'A city that started a recycling program reduced landfill waste by 30 percent in one year.' Explanation: 'This shows that when people separate recyclable materials, significantly less trash ends up buried in landfills.'"
        ]
      }
    ],
    exercises: [
      {
        question: "Identify which sentence best functions as a claim to open a paragraph.",
        choices: ["For example, many students struggle with sleep.", "This shows that sleep affects grades.", "Getting enough sleep improves students' academic performance.", "Studies were conducted on sleep."],
        answer: 2,
        explanation: "This sentence makes a clear, specific main point that the rest of the paragraph could support, which is the role of a claim."
      },
      {
        question: "Identify which sentence best functions as evidence for the claim 'Regular exercise improves mental focus.'",
        choices: ["Exercise is important for everyone.", "A study found that students who exercised before class scored higher on concentration tests.", "This proves that exercise helps the brain.", "People should exercise more often."],
        answer: 1,
        explanation: "This sentence provides a specific, concrete fact (a study and its result) that supports the claim, which is the role of evidence."
      },
      {
        question: "Identify which sentence best functions as an explanation connecting evidence to a claim about recycling reducing waste.", 
        choices: ["A town recycled 500 tons of material last year.", "Recycling programs exist in many towns.", "This shows that when materials are recycled instead of thrown away, less waste accumulates in landfills.", "Waste is a problem in many communities."],
        answer: 2,
        explanation: "This sentence explains how the evidence connects to and supports the claim, which is the role of an explanation."
      },
      {
        question: "Identify the paragraph part that is missing from this example: 'Claim: Studying in short sessions improves memory. Evidence: A study found students who studied in 20-minute sessions remembered 15 percent more material a week later.'",
        choices: ["A second claim", "An explanation connecting the evidence to the claim", "A different topic", "A conclusion sentence about an unrelated subject"],
        answer: 1,
        explanation: "The paragraph has a claim and evidence but lacks an explanation showing why the evidence proves the claim."
      },
      {
        question: "Identify which claim is specific enough to build a paragraph around.",
        choices: ["Cities are big.", "Public transportation reduces traffic congestion in large cities.", "Traffic exists.", "Some cities have buses."],
        answer: 1,
        explanation: "This claim makes a specific, arguable point about a cause-and-effect relationship, which gives the paragraph a clear focus."
      },
      {
        question: "Identify which sentence correctly explains why the evidence 'Test scores rose 10 percent after the tutoring program began' supports the claim 'Tutoring programs improve academic performance.'",
        choices: ["Tutoring programs are common in schools.", "This shows that students who received tutoring performed measurably better, supporting the idea that tutoring improves academic outcomes.", "Test scores are important.", "Many schools have programs."],
        answer: 1,
        explanation: "This sentence directly ties the specific evidence (the 10 percent rise) back to the claim about tutoring improving performance."
      }
    ]
  },
  {
    id: "english-7",
    title: "Vocabulary from Context",
    minutes: 15,
    objective: "Use surrounding sentence context to determine the meaning of unfamiliar words.",
    sections: [
      {
        heading: "Using context clues",
        body: "When you encounter an unfamiliar word, the surrounding sentence often provides clues about its meaning, such as a definition, example, or restatement nearby. Look for other words in the sentence that describe, contrast with, or give examples of the unfamiliar word. Context clues let you make a reasonable guess about a word's meaning without needing a dictionary.",
        examples: [
          "'The ancient artifact was so fragile that it crumbled at the slightest touch.' (fragile likely means easily broken, based on 'crumbled at the slightest touch')"
        ]
      },
      {
        heading: "Types of context clues",
        body: "A synonym clue restates the unfamiliar word using a similar, more familiar word nearby. A contrast clue uses words like 'but' or 'however' to show the unfamiliar word means the opposite of something else in the sentence. An example clue lists specific examples that reveal what a general unfamiliar term means.",
        examples: [
          "Synonym clue: 'She was jubilant, absolutely thrilled about the news.' (jubilant means thrilled or very happy)",
          "Contrast clue: 'Unlike his gregarious brother, Tom was quiet and avoided crowds.' (gregarious means sociable, the opposite of quiet)"
        ]
      },
      {
        heading: "Checking your guess",
        body: "After guessing a word's meaning from context, substitute your guess back into the sentence to see if it still makes sense. If the sentence's meaning stays logical and consistent, your guess is likely correct. This strategy is especially useful during reading tests when a dictionary is not available.",
        examples: [
          "'The lecture was so tedious that several students fell asleep.' Substituting 'boring' for 'tedious' still makes sense, confirming the guess."
        ]
      }
    ],
    exercises: [
      {
        question: "Read the sentence: 'The desert was so arid that no plants could survive there.' Determine what 'arid' most likely means.",
        choices: ["Cold", "Dry", "Rocky", "Crowded"],
        answer: 1,
        explanation: "The phrase 'no plants could survive there' suggests a lack of water, so 'arid' most likely means dry."
      },
      {
        question: "Read the sentence: 'Unlike her boisterous classmates, Mia sat quietly in the corner reading her book.' Determine what 'boisterous' most likely means.",
        choices: ["Loud and energetic", "Shy and quiet", "Tired and bored", "Intelligent and focused"],
        answer: 0,
        explanation: "The word 'unlike' contrasts Mia's quiet behavior with her classmates, so 'boisterous' likely means loud and energetic, the opposite of quiet."
      },
      {
        question: "Read the sentence: 'The chef was known for her culinary skill, especially her ability to bake delicious pastries and roast meats perfectly.' Determine what 'culinary' most likely means.",
        choices: ["Related to cooking", "Related to painting", "Related to music", "Related to writing"],
        answer: 0,
        explanation: "The examples of baking pastries and roasting meats show that 'culinary' relates to cooking."
      },
      {
        question: "Read the sentence: 'The old bridge was so precarious that engineers feared it might collapse at any moment.' Determine what 'precarious' most likely means.",
        choices: ["Sturdy and safe", "Unstable and unsafe", "Newly built", "Beautifully designed"],
        answer: 1,
        explanation: "The fear that the bridge 'might collapse at any moment' shows that 'precarious' means unstable and unsafe."
      },
      {
        question: "Read the sentence: 'He was so meticulous with his work that he checked every detail twice before submitting it.' Determine what 'meticulous' most likely means.",
        choices: ["Careless", "Careful and detail-oriented", "Fast and rushed", "Confident and loud"],
        answer: 1,
        explanation: "Checking every detail twice shows extreme care, so 'meticulous' means careful and detail-oriented."
      },
      {
        question: "Read the sentence: 'The critic's review was scathing, tearing apart every part of the film and calling it a complete failure.' Determine what 'scathing' most likely means.",
        choices: ["Harshly critical", "Warmly positive", "Mildly interested", "Confusing and vague"],
        answer: 0,
        explanation: "Tearing apart the film and calling it a failure shows extreme criticism, so 'scathing' means harshly critical."
      }
    ]
  },
  {
    id: "english-8",
    title: "Reading for Main Idea",
    minutes: 18,
    objective: "Identify the main idea of a short passage and distinguish it from supporting details.",
    sections: [
      {
        heading: "What is a main idea",
        body: "The main idea is the central point a passage is trying to communicate, the message that all the other sentences support. It is broader than any single detail but more specific than the general topic of the passage. Identifying the main idea helps a reader understand the overall purpose of what they just read.",
        examples: [
          "Topic: bees. Main idea: 'Bees play a crucial role in pollinating the plants that produce much of the world's food.'"
        ]
      },
      {
        heading: "Finding the main idea in a passage",
        body: "The main idea is often, but not always, stated directly in the first or last sentence of a paragraph. To find it, ask what point the details in the passage are all working together to support. Supporting details, such as facts, examples, and explanations, exist to prove or explain the main idea, rather than standing as the main point themselves.",
        examples: [
          "Passage: 'Rainforests cover only a small percentage of Earth's land, yet they contain over half of the world's plant and animal species. They also help regulate the planet's climate by absorbing carbon dioxide.' Main idea: rainforests are extremely important to biodiversity and climate, even though they cover a small area."
        ]
      },
      {
        heading: "Distinguishing main idea from details",
        body: "A detail is a specific piece of information, such as a statistic or single example, that supports the broader main idea. If you removed a detail from the passage, the main idea would usually still make sense, but if you removed the main idea, the details would seem disconnected. Practicing with short passages helps train the skill of separating the overall message from the smaller supporting facts.",
        examples: [
          "Passage: 'Many students find that studying in short, focused sessions helps them remember information better than one long session. One study found a 15 percent improvement.' Main idea: short, focused study sessions improve memory. Detail: the specific 15 percent statistic."
        ]
      }
    ],
    exercises: [
      {
        question: "Read the passage: 'Volunteering benefits both the community and the volunteer. Local food banks rely on volunteers to sort and distribute meals to families in need. At the same time, studies show that people who volunteer regularly report higher levels of personal happiness.' Determine the main idea of the passage.",
        choices: ["Food banks need more volunteers.", "Volunteering benefits both the community and the volunteer.", "Studies about happiness are common.", "Families need food assistance."],
        answer: 1,
        explanation: "The first sentence states the main idea directly, and the rest of the passage provides supporting details about how it benefits both groups."
      },
      {
        question: "Read the passage: 'Sharks have existed for over 400 million years, making them older than dinosaurs. Their skeletons are made of cartilage rather than bone, which makes them lighter and more flexible. Many species can detect the faint electrical signals of other animals in the water.' Determine the main idea of the passage.",
        choices: ["Sharks are dangerous animals.", "Sharks have several unique and ancient biological features.", "Dinosaurs are older than most people think.", "Cartilage is stronger than bone."],
        answer: 1,
        explanation: "The passage describes multiple unique features of sharks (age, cartilage skeleton, electrical sensing), all supporting the broader idea that sharks have unique, ancient biological features."
      },
      {
        question: "Read the passage: 'Electric cars produce zero tailpipe emissions, which helps reduce air pollution in cities. They also tend to have lower maintenance costs because they have fewer moving parts than gasoline engines. As battery technology improves, electric cars are becoming more affordable for average consumers.' Determine the main idea of the passage.",
        choices: ["Electric cars have several advantages over gasoline cars.", "Gasoline engines have many moving parts.", "Battery technology is expensive.", "Air pollution is a serious problem."],
        answer: 0,
        explanation: "The passage lists multiple benefits of electric cars (emissions, maintenance, affordability), all supporting the main idea that electric cars have several advantages."
      },
      {
        question: "Read the passage: 'Studies show that people who write down their goals are more likely to achieve them than those who only think about their goals. Writing goals down forces a person to clarify exactly what they want. It also creates a physical reminder that can be reviewed regularly.' Determine which sentence from the passage is a supporting detail rather than the main idea.",
        choices: ["People who write down their goals are more likely to achieve them.", "Writing goals down forces a person to clarify exactly what they want.", "Goals are important in life.", "Achievement requires effort."],
        answer: 1,
        explanation: "This sentence gives a specific reason supporting the main idea, making it a detail rather than the central point of the passage."
      },
      {
        question: "Read the passage: 'Honey never spoils if it is stored properly, because its low moisture content and natural acidity prevent bacteria from growing. Archaeologists have even found jars of edible honey in ancient Egyptian tombs thousands of years old.' Determine the main idea of the passage.",
        choices: ["Ancient Egyptians loved honey.", "Archaeology reveals many secrets about ancient life.", "Honey can remain edible for an extremely long time due to its natural properties.", "Bacteria cannot grow in any food."],
        answer: 2,
        explanation: "The passage explains why honey does not spoil and gives an example, both supporting the main idea that honey can last an extremely long time."
      },
      {
        question: "Read the passage: 'Regular sleep is essential for memory consolidation, the process by which the brain stores new information. During deep sleep stages, the brain strengthens connections between neurons that were formed during the day. Without enough sleep, people often struggle to recall information they learned recently.' Determine the main idea of the passage.",
        choices: ["Neurons form new connections every day.", "Sleep plays an essential role in helping the brain store and retain memories.", "People who sleep poorly are unintelligent.", "Deep sleep is the only stage of sleep that matters."],
        answer: 1,
        explanation: "The passage explains the connection between sleep and memory in multiple ways, all supporting the central idea that sleep is essential for memory storage."
      }
    ]
  }
];
