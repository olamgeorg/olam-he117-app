import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // SECTION A: ADOLESCENT HEALTH & SEXUALITY
  {
    id: "a1",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Etymology & Period",
    questionText: "The word 'adolescent' is coined from which Latin verb and what is its literal meaning?",
    options: [
      "Adolere; meaning 'to be young and active'",
      "Adolescere; meaning 'to grow into maturity'",
      "Adolescare; meaning 'to experience physical puberty'",
      "Maturare; meaning 'to achieve biological adulthood'"
    ],
    correctIndex: 1,
    explanation: "According to the tutorial, the word adolescent is coined from the Latin verb 'adolescere', which means 'to grow into maturity'."
  },
  {
    id: "a2",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Adolescent Characteristics",
    questionText: "Which of the following is specified in HEE117 as a key characteristic of an adolescent?",
    options: [
      "A severe decline in curiosity about sexuality",
      "A physiological period of complete emotional stability",
      "Idealism where the adolescent desires a better world to live",
      "Preference for risk avoidance and structured routine"
    ],
    correctIndex: 2,
    explanation: "Under the 'Characteristics of Adolescent' list, HEE117 lists 'Idealism where in the adolescent desire a better world to live' along with risk taking and physical body changes."
  },
  {
    id: "a3",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Puberty & Hormones",
    questionText: "At the beginning of adolescence, puberty sets in via increased levels of hormones. Which two sex hormones are responsible for gradually changing the adolescent's body structures?",
    options: [
      "Testosterone and Progesterone",
      "Adrenaline and Cortisol",
      "Oestrogen and Androgen",
      "Androgen and Prolactin"
    ],
    correctIndex: 2,
    explanation: "The tutorial notes that the sex hormones 'oestrogen and androgen' gradually change the adolescent's body structures when puberty sets in."
  },
  {
    id: "a4",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Gendered Health Challenges",
    questionText: "Under the health challenges of adolescents, which of the following is specifically categorized as a health challenge unique to FEMALES?",
    options: [
      "Masturbation",
      "Impotence",
      "Drug misuse",
      "Teenage pregnancy and Abortion sexual assault"
    ],
    correctIndex: 3,
    explanation: "In HEE117, FEMALE health challenges are listed as teenage pregnancy, abortion sexual assault, STIs, prostitution, experimentation with illicit drugs, and alcoholism. Masturbation and Impotence are specifically listed under MALE challenges."
  },
  {
    id: "a5",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Definition of Sexuality",
    questionText: "According to the HEE117 syllabus, how is 'Sexuality' defined?",
    options: [
      "The biological classification of male or female at birth",
      "The total expression of who we are as human beings",
      "The physical act of sexual reproduction between mature adults",
      "A societal concept that starts only at the onset of puberty"
    ],
    correctIndex: 1,
    explanation: "The text defines Sexuality as 'The total expression of who we are as human beings. It encompasses the psychological development, values, mental attitudes, physical appearance, beliefs, emotions, likes, dislikes and all the ways in which we have been socialized. It involves our entire self - concept which begins at birth through life time.'"
  },
  {
    id: "a6",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Premarital Sex Social Implications",
    questionText: "Which of the following is considered a SOCIAL implication of premarital sex affecting BOTH parents and the child?",
    options: [
      "Anaemia and bodily deformity",
      "Oyo State IPV syndemic reactions",
      "Anxiety disorder, conduct abuse, financial challenges, and school dropout",
      "Volatile organic compound exposure"
    ],
    correctIndex: 2,
    explanation: "Under implications of premarital sex, SOCIAL implications to both parents and child include anxiety disorder, substance abuse, conduct abuse, financial challenges, school dropout, and emotional disturbance due to family neglect."
  },
  {
    id: "a7",
    section: "Section A: Adolescent Health & Sexuality",
    category: "Premarital Sex Medical Implications",
    questionText: "Which neonatal/morbidities are highlighted in HEE117 as medical implications of premarital sex?",
    options: [
      "Psychosis and temporary hearing sensitivity",
      "Blindness, deafness, and mental retardation",
      "Pulmonary embolisms and severe scoliosis",
      "Anxiety and memory retention loss"
    ],
    correctIndex: 1,
    explanation: "Under MEDICAL IMPLICATIONS, neonatal morbidity is explicitly listed to include '(blindness, deafness, mental retardation).'"
  },

  // SECTION B: SEXUALLY TRANSMITTED INFECTIONS (STIs)
  {
    id: "b1",
    section: "Section B: STIs & Pathogen Classification",
    category: "At-Risk Demographics",
    questionText: "Who are classified as the high-risk age demographics for STIs in HEE117?",
    options: [
      "Males aged 15-24yrs and Females aged 18-34yrs",
      "Males aged 18-34yrs and Females aged 16-24yrs",
      "Males aged 16-24yrs and Females aged 18-34yrs",
      "Both Males and Females under 18yrs of age only"
    ],
    correctIndex: 1,
    explanation: "Under AT RISK PERSONS, the tutorial marks 'Male aged 18 - 34yrs' and 'Female aged 16 - 24yrs'."
  },
  {
    id: "b2",
    section: "Section B: STIs & Pathogen Classification",
    category: "Pathogen Types",
    questionText: "Match the STI pathogens to their correct classes according to the HEE117 text:",
    options: [
      "Bacteria: HIV/AIDS; Virus: Gonorrhoea; Fungi: Trichomoniasis",
      "Bacteria: Gonorrhoea; Virus: HIV/AIDS; Fungi: Candidiasis; Protozoa: Trichomoniasis",
      "Bacteria: Candidiasis; Virus: Trichomoniasis; Fungi: Gonorrhoea",
      "Bacteria: Trichomoniasis; Protozoa: HIV/AIDS; Fungi: Candidiasis"
    ],
    correctIndex: 1,
    explanation: "The table of PATHOGENS lists: Bacteria e.g. Gonorrhoea, Viruses e.g. HIV/AIDS, Fungi e.g. Candidiasis, and Protozoa e.g. Trichomoniasis."
  },
  {
    id: "b3",
    section: "Section B: STIs & Pathogen Classification",
    category: "Gonorrhoea Causative Agent",
    questionText: "What is the causative agent and a major complication of untreated Gonorrhoea?",
    options: [
      "A flagellated protozoan; leading to severe nephritis",
      "Gonococcus bacterium called Neisseria Gonorrhoea; leading to sterility",
      "Candidiasis spores; leading to chronic urethritis",
      "Human Immunodeficiency Virus; leading to complete immune degradation"
    ],
    correctIndex: 1,
    explanation: "HEE117 states the causative agent of Gonorrhoea is 'Gonococcus bacterium called Neisseria Gonorrhoea'. Under complications, it notes: 'Untreated cases can lead to sterility'."
  },
  {
    id: "b4",
    section: "Section B: STIs & Pathogen Classification",
    category: "Gonorrhoea Symptoms",
    questionText: "Which of the following is NOT listed of the signs and symptoms of Gonorrhoea in HEE117?",
    options: [
      "Burning sensation or pain during urination",
      "Milky or yellowish discharge",
      "Swelling in the groin and blood spotting in discharge",
      "Increased frequency of urination and pain/swelling in the scrotum"
    ],
    correctIndex: 2,
    explanation: "Under 'Gonorrhoea - Signs & Symptoms', HEE117 lists burning sensation, milky/yellowish discharge, increased frequency of urination, and scrotal pain. 'Unpleasant smelling discharge, blood spotting and swelling in the groin' are symptoms of Trichomoniasis."
  },
  {
    id: "b5",
    section: "Section B: STIs & Pathogen Classification",
    category: "Trichomoniasis Cause",
    questionText: "What pathogen class causes Trichomoniasis and what is its common manifestation?",
    options: [
      "Protozoa; a common cause of vaginal infections with unpleasant smelling discharge",
      "Virus; a common dry itch on external genital tissue",
      "Fungus; a thick yellow crust spreading to the groin",
      "Bacteria; painful scrotal ulcers accompanied by fever"
    ],
    correctIndex: 0,
    explanation: "Trichomoniasis is caused by Protozoa. Symptoms include an unpleasant smelling discharge, itching in and around the vagina, blood spotting, urinating with pain, and swelling in the groin."
  },
  {
    id: "b6",
    section: "Section B: STIs & Pathogen Classification",
    category: "HIV Risk Signs",
    questionText: "Identify the signs and symptoms of HIV/AIDS specifically enumerated on page 6 of the first lecture tutorial:",
    options: [
      "Urination more than usual, blood spotting, swelling in the groin",
      "Severe testicular pain and thick golden discharge lasting 3 days",
      "Weight loss, persistent fever > 1 month, diarrhoea > 1 month, severe fatigue, constant cough, itchy skin rashes",
      "Intense local burning sensation radiating up the abdomen"
    ],
    correctIndex: 2,
    explanation: "Under HIV/AIDS Signs & Symptoms on page 6, HEE117 explicitly lists: weight loss, persistent fever more than one month, diarrhoea longer than one month, persistent severe fatigue, constant cough, swollen glands, itchy skin rashes, and mouth ulcers."
  },
  {
    id: "b7",
    section: "Section B: STIs & Pathogen Classification",
    category: "General STI Prevention",
    questionText: "Which of the following describes the general measures for prevention of STIs advocated in HEE117?",
    options: [
      "Avoid all urination immediately after sexual intercourse to maintain internal pressure",
      "Cleanse only the external abdominal wall with dry tissues",
      "Avoid multiple sex partners, clean genital area immediately after sex, urinate immediately after sex, treat both partners",
      "Rely entirely on periodic retro-active antibiotics without tracing contacts"
    ],
    correctIndex: 2,
    explanation: "The tutorial lists: Avoid multiple sex partners, Clean the genital area immediately after sex, Urinate immediately after sexual activities, and treat all suspected victims along with their partners."
  },

  // SECTION C: STRESS AND COPING MECHANISMS
  {
    id: "c1",
    section: "Section C: Stress & Coping Mechanisms",
    category: "Definition of Stress",
    questionText: "According to HEE117, how is 'Stress' defined?",
    options: [
      "A condition of purely physical fatigue caused by excessive manual labor",
      "Any stimulus that disturbs the biological or psychological equilibrium of an organism",
      "The automatic increase of red blood cells in response to metabolic altitude shifts",
      "A mental disorder characterized by persistent chemical imbalance in the brain"
    ],
    correctIndex: 1,
    explanation: "In HEE117 under 'STRESS', stress is defined as 'any stimulus that disturbs the biological or psychological equilibrium of an organism. It is used to describe many reactions to the demands of modern and complex lifestyles. Usually, stress connotes a negative reaction.'"
  },
  {
    id: "c2",
    section: "Section C: Stress & Coping Mechanisms",
    category: "Stress Symptoms",
    questionText: "Which set of symptoms represents the 'Signs and Symptoms of Stress' outlined on page 7?",
    options: [
      "Cough, mouth ulcers, and skin rashes",
      "Frequent sneezing, muscle tremors, and extreme hydration",
      "Loss of appetite, loss of sleep, forgetfulness, frequent urination, eating frequently, and restlessness",
      "Persistent low blood pressure and visual blind spots in sunlight"
    ],
    correctIndex: 2,
    explanation: "The tutorial lists 'Signs and Symptoms of Stress': Loss of appetite, Loss of sleep, Forgetfulness, Frequent urination, Eating frequently, Irritable and or restless etc."
  },
  {
    id: "c3",
    section: "Section C: Stress & Coping Mechanisms",
    category: "Stress Sources",
    questionText: "Differentiate between Individual and Environmental stress sources according to the tutorial:",
    options: [
      "Individual stress stems from heavy manual work; Environmental stress comes from atmospheric humidity",
      "Individual stress arises from natural disasters; Environmental stress represents single cellular pathogens",
      "Individual stress arises from internal conflicts, perceptions, and values; Environmental stress comes from the family, employer, or pollution",
      "They are identical and cannot be separated scholastically in the curriculum"
    ],
    correctIndex: 2,
    explanation: "In HEE117, Individual stress arises from 'individual interpretation... internal conflicts, perception of life, expectations and values.' Environmental stress 'may come from the family, employer, religious organization or environmental pollution.'"
  },
  {
    id: "c4",
    section: "Section C: Stress & Coping Mechanisms",
    category: "Stress Coping",
    questionText: "What is the primary premise of Coping with Stress according to the HEE117 lecture?",
    options: [
      "Stress is 100% avoidable if individuals isolate themselves from modern tech",
      "Stress must be suppressed using immediate psychiatric pharmacology",
      "There is no way we can avoid stress totally; we must learn how to cope and manage it by taking things in stride",
      "Analyse stress entirely without communicating it to others to prevent social stigma"
    ],
    correctIndex: 2,
    explanation: "The 'Coping with Stress' section states: 'There is no way we can avoid stress totally. It is therefore necessary to learn how to cope with or manage stress.' Ways include taking things in stride (relax), physical activity, good nutrition, and talking it out with a trusted individual."
  },

  // SECTION D: DOMESTIC & URBAN VIOLENCE (GPI)
  {
    id: "d1",
    section: "Section D: Domestic & Urban Violence",
    category: "Prevalence Statistics",
    questionText: "According to the 2018 WHO analysis on behalf of the UN Interagency Working Group, what is the global prevalence of violence against women?",
    options: [
      "Nearly 1 in 10, or 10% of women worldwide",
      "Nearly 1 in 5, or 20% of women worldwide",
      "Nearly 1 in 3, or 30% of women worldwide",
      "Nearly 1 in 2, or 50% of women worldwide"
    ],
    correctIndex: 2,
    explanation: "Under 'Prevalence / Statistics about Domestic Violence', the 2018 WHO analysis found that worldwide, nearly 1 in 3, or 30%, of women have been subjected to physical and/or sexual violence."
  },
  {
    id: "d2",
    section: "Section D: Domestic & Urban Violence",
    category: "Demographics Risk",
    questionText: "According to Foster (1999) and the Integrated Regional Network (IRIN), which country has the highest statistics of gender-based violence (GBV) in the world?",
    options: [
      "New Zealand",
      "South Africa",
      "Nigeria",
      "South Sudan"
    ],
    correctIndex: 1,
    explanation: "The text states: 'South Africa is said to have the highest statistics of gender-based violence in the world, including rape and domestic violence (Foster 1999; The Integrated Regional Network [IRIN], Johannesburg).'"
  },
  {
    id: "d3",
    section: "Section D: Domestic & Urban Violence",
    category: "Developed Country Stats",
    questionText: "Which country has the highest rate of reported intimate partner violence (IPV) in the DEVELOPED world?",
    options: [
      "South Africa",
      "Colombia",
      "New Zealand",
      "United Kingdom"
    ],
    correctIndex: 2,
    explanation: "The tutorial notes: 'New Zealand has the highest rate of reported intimate partner violence in the developed world.'"
  },
  {
    id: "d4",
    section: "Section D: Domestic & Urban Violence",
    category: "Nigeria IPV Stats",
    questionText: "What are the estimated Intimate Partner Violence (IPV) prevalence ranges in Nigeria and which form had the highest recorded percentage in Oyo State (Ajibola et al., 2017)?",
    options: [
      "Psychological: 5-10%; Physical: 12-14%; highest is Physical in Oyo State (40.5%)",
      "Psychological: 31% to 61%; Sexual: 20% to 31%; Physical: 7% to 31%; highest is Psychological IPV in Oyo State (67.2%)",
      "Psychological: 70%; Sexual: 5%; Physical: 25%; highest is Sexual IPV in Lagos State (75%)",
      "All forms have equal ranges of 10% to 15%; Oyo State is omitted from HEE117"
    ],
    correctIndex: 1,
    explanation: "The tutorial estimates: Psychological: 31% to 61%, Sexual: 20% to 31%, Physical: 7% to 31%. It highlights that 'Psychological IPV had the highest prevalence of 67.2% - Oyo State (Ajibola et al., 2017)'."
  },
  {
    id: "d5",
    section: "Section D: Domestic & Urban Violence",
    category: "Urban Violence Statistics",
    questionText: "According to the National Crime Victimization Survey (NCVS) statistics for urban areas from 2020 to 2021, urban violent crime rose by what percentage?",
    options: [
      "An increase of 5% (from 10.0 to 12.5 per 1,000)",
      "An increase of 15% (from 15.0 to 17.5 per 1,000)",
      "An increase of 29% (from 19.0 to 24.5 victimizations per 1,000)",
      "An increase of 50% (from 20.0 to 30.0 per 1,000)"
    ],
    correctIndex: 2,
    explanation: "Under 'Prevalence / Statistics about Urban Violence', HEE117 states: 'violent crime in urban areas rose to 29 percent from 2020 to 2021, from 19.0 to 24.5 victimizations per 1,000 persons aged 12 or older.'"
  },
  {
    id: "d6",
    section: "Section D: Domestic & Urban Violence",
    category: "Least Peaceful Countries",
    questionText: "Based on the 2022 Global Peace Index (GPI) rankings list for worst countries in Africa, Nigeria ranks as the ______ worst, and worldwide, ranks ______ among the least peaceful countries.",
    options: [
      "1st; 5th",
      "8th; 17th",
      "5th; 1st",
      "10th; 20th"
    ],
    correctIndex: 1,
    explanation: "Page 6 of the second PDF states: 'Nigeria is considered to be a country with a high level of crime, ranking 17th among the least peaceful countries in the world. GPI Nigeria is one of the dangerous/hardest countries to live in Africa. Africa Rating: ... 8. Nigeria'."
  },
  {
    id: "d7",
    section: "Section D: Domestic & Urban Violence",
    category: "Peace Pillars",
    questionText: "Which of the following is NOT one of the eight primary peaceful pillars underpinning the Global Peace Index (GPI) rankings?",
    options: [
      "Stable business environment and Capable government",
      "Acceptance of human rights and Free-flowing information",
      "Highly militarized security force for immediate intervention",
      "Sound international relations, Lower corruption, and Fair distribution of resources"
    ],
    correctIndex: 2,
    explanation: "The eight pillars listed on page 7 of Module Three are: Stable business environment, Capable government, Acceptance of human rights, Free-flowing information, Sound international relations with neighboring states, Lower corruption levels, Higher levels of human capital, and Fair distribution of national resources. 'Highly militarized security force' is not a peace pillar."
  },
  {
    id: "d8",
    section: "Section D: Domestic & Urban Violence",
    category: "Nigeria Violence Causes",
    questionText: "What are the six major causes of urban violence in Nigeria explicitly highlighted in the HEE117 curriculum?",
    options: [
      "Flooding, Psychoactive drugs, Low birth weight, Poverty, Impotence, Prostitution",
      "Religion, Ethnicity, Stressful public policy, Student unrest, Cultism, Extra-judicial activities",
      "Poor nutrition, Air pollution, Acid rain, X-ray radiation, Land clearing, DDT",
      "Unwanted pregnancy, School dropout, Infant mortality, Smog, Ozone depletion, Sterility"
    ],
    correctIndex: 1,
    explanation: "The six causes specifically numbered on page 7 under 'Causes of Urban Violence in Nigeria' are: i. Religion, ii. Ethnicity, iii. Stressful public policy, iv. Student unrest, v. Cultism, and vi. Extra-judicial activities."
  },
  {
    id: "d9",
    section: "Section D: Domestic & Urban Violence",
    category: "Global Homicides",
    questionText: "Regarding global homicides, which Latin American countries present high-level homicide rates ABOVE 30 per 100,000 inhabitants?",
    options: [
      "Brazil and Venezuela",
      "Colombia and El Salvador",
      "Mexico and Brazil",
      "Argentina and Peru"
    ],
    correctIndex: 1,
    explanation: "Page 8 of the second PDF states: 'In Latin America, Colombia and El Salvador present the highest rates of homicides, above 30/100,000 inhabitants, while Brazil, Mexico and Venezuela present rates between 20 and 30/100,000 inhabitants.'"
  },

  // SECTION E: FLOODING, PSYCHOACTIVE SUBSTANCES & ENVIRONMENTAL POLLUTION
  {
    id: "e1",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Global Deaths Rate",
    questionText: "In 2019, pollution was responsible for an estimated how many deaths, representing what percentage of all global deaths?",
    options: [
      "1 million deaths; 2% of all deaths globally",
      "5 million deaths; 8% of all deaths globally",
      "9 million deaths; 16% of all deaths globally",
      "15 million deaths; 25% of all deaths globally"
    ],
    correctIndex: 2,
    explanation: "Page 8 of the first PDF states: 'pollution was responsible for an estimated 9 million deaths (16% of all deaths globally) (Global Burden of Diseases), (GBD) 2019.'"
  },
  {
    id: "e2",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Smog Composition",
    questionText: "What is Smog and what is its principal active ground-level chemical pollutant?",
    options: [
      "Smoke plus fog; principally Volatile Organic Compounds (VOCs)",
      "Dust plus cloud; principally Sulphur Dioxide (SO2)",
      "Smoke plus fog (cloud); principally ground-level Ozone (O3)",
      "Carbon monoxide plus lead; principally Nitrous Oxide (N2O)"
    ],
    correctIndex: 2,
    explanation: "The tutorial explains: 'Often, people refer to air pollution as smog. Smog is smoke plus fog (cloud) it is a mixture of pollutants, principally ground-level ozone produced by chemical reactions in the air.'"
  },
  {
    id: "e3",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Ozone Gas",
    questionText: "What characterizes the Ozone (O3) molecule, and where is ground-level ozone typically found?",
    options: [
      "A liquid form of nitrogen with three hydrogen atoms; found in ocean trenches",
      "A gas of molecular form of oxygen consisting of three oxygen atoms with a sharp smell; found near ground level as a major component of photochemical smog",
      "A solid crystalline sulfur particle; found in volcanic ash and dust",
      "A heavy lead compound; found exclusively near vehicular exhausts"
    ],
    correctIndex: 1,
    explanation: "Ozone (O3) is a gas containing three oxygen atoms, has a sharp smell associated with electrical sparks, and is the main component of photochemical smog found near ground level."
  },
  {
    id: "e4",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Agricultural Contamination",
    questionText: "Which agricultural chemicals are highlighted as potential public water supply pollutants that cause immense damage to human and aquatic life?",
    options: [
      "Oestrogen and Androgen",
      "Caffeine, Nicotine, and Amphetamines",
      "DDT and Lead",
      "Barbiturates and Benzodiazepines"
    ],
    correctIndex: 2,
    explanation: "The text explains: 'Chemicals like DDT, lead may find their ways into water for drinking, fish ponds which will do a lot of havoc to human, aquatic life.'"
  },
  {
    id: "e5",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Occupational Exposure",
    questionText: "What is the recommended maximum standard for Carbon Monoxide (CO) in occupational settings?",
    options: [
      "10ppm",
      "50ppm",
      "100ppm",
      "500ppm"
    ],
    correctIndex: 1,
    explanation: "The tutorial notes: 'Recommended standard for carbon monoxide in occupational settings is maximum of 50ppm.'"
  },
  {
    id: "e6",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Radiation Threats",
    questionText: "Under occupational hazard guidelines, which group is strictly prohibited from being exposed to medical diagnostic X-rays?",
    options: [
      "Active motor drivers",
      "Agricultural farmers",
      "Pregnant women",
      "Industrial factory operators"
    ],
    correctIndex: 2,
    explanation: "Under occupational hazard mitigation measures, page 10 advises: 'Unless, it is absolutely necessary, pregnant women should not be exposed to X-ray' to avoid birth defects."
  },
  {
    id: "e7",
    section: "Section E: Flooding, Substances & Pollution",
    category: "Substance Classification",
    questionText: "Match the following psychoactive substance categories with their correct examples from page 11 of the tutorial:",
    options: [
      "Stimulants: alcohol; Depressants: caffeine; Hallucinogens: LSD",
      "Stimulants: caffeine, nicotine, amphetamines; Depressants: alcohol, benzodiazepines (Xanax, Valium), barbiturates; Hallucinogens: LSD, psilocybin, ketamine, MDMA",
      "Stimulants: MDMA; Depressants: nicotine; Hallucinogens: Xanax",
      "Stimulants: Valium; Depressants: coffee; Hallucinogens: tobacco"
    ],
    correctIndex: 1,
    explanation: "The tutorial classifies: 1) Stimulants (CNS activators: caffeine, nicotine, amphetamines); 2) Depressants (CNS relaxers: alcohol, benzodiazepines, barbiturates); and 3) Hallucinogens (LSD, psilocybin, ketamine, MDMA)."
  }
];
