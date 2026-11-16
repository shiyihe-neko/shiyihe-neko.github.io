const projects = [
{
  "id": "qualivision",
  "showFacts": false,
  "number": "01",
  "short": "QualiVision",
  "category": "HUMAN–AI INTERACTION",
  "color": "blue",
  "title": "Traceable analysis. AI-supported reflection.",
  "question": "How can an integrated workspace combine timeline-linked evidence, traceable coding relationships, visualization, and AI assistance to support reflection and insight exploration in qualitative video analysis?",
  "summary": "Designing an integrated video-analysis workspace that links evidence, codes, and notes on a shared timeline, makes evolving coding relationships traceable and visually comparable, and supports reflection and insight exploration with AI.",
  "methods": [
    "Research through design",
    "System prototyping",
    "Qualitative analysis",
    "Traceability",
    "AI-supported reflection"
  ],
  "stat": "Early prototype · In development",
  "venue": "VL/HCC 2026 GC",
  "time": "4 min",
  "intro": "I designed QualiVision to address fragmented qualitative video-analysis workflows by connecting video evidence, transcripts, codes, and analytic notes on a shared timeline. The design aims to make coding relationships and their evolution traceable and visually comparable. The project explores how visualization and AI can support researchers in revisiting evidence, reflecting on interpretations, and developing insights. QualiVision is currently an early prototype, with further features still in development.",
  "role": "As the sole author, I lead the project from problem framing and review of existing tools to interaction design, prototype implementation, and evaluation planning. I also use the prototype in my own video-based research analysis to identify workflow needs.",
  "team": "Shiyi He",
  "sections": [
    {
      "id": "question",
      "label": "Research questions",
      "title": "Connect the workflow. Follow the analysis. Explore AI support.",
      "body": "Qualitative video analysis is often fragmented across tools, while codes, relationships, and interpretations continue to evolve. QualiVision brings workflow integration, traceability, visual comparison, and AI-assisted reflection into three connected research questions:",
      "cards": [
        [
          "RQ1 · Workflow integration",
          "How can video evidence, transcripts, codes, and analytic notes be connected within a coherent analysis workflow?"
        ],
        [
          "RQ2 · Traceability and visual comparison",
          "How can researchers trace evolving coding relationships and compare coding patterns across moments, coding streams, and stages of analysis?"
        ],
        [
          "RQ3 · AI-assisted reflection",
          "How can visualization and AI support researchers in reflecting on interpretations and exploring insights grounded in the evidence?"
        ]
      ]
    },
    {
      "id": "evidence",
      "label": "Prototype & design goals",
      "title": "An early prototype, still in development.",
      "body": "The early prototype supports video playback, transcript editing, multiple coding streams, undo and redo, and preliminary visual summaries and reports. I use it in my own video-based analyses. Further development focuses on the following contribution and design goals.",
      "designContribution": {
        "label": "Core design contribution",
        "title": "Spreadsheets as the data-management backend.",
        "body": "The design keeps annotation data in sync between the interface and a spreadsheet backend. Annotations added or edited in the interface will update the sheets, and edits made in the sheets will appear back in the interface.",
        "rationale": "This will let researchers organize their annotation data and carry out their own analyses in the sheets, while keeping their changes in sync with the interface."
      },
      "cards": [
        [
          "Connect video annotations with the sheets",
          "Keep codes and notes linked to video moments on the timeline, with annotation edits syncing both ways between the interface and the sheets."
        ],
        [
          "Trace and compare changes in coding",
          "Show how codes and their relationships change over time, and let researchers compare earlier and later coding."
        ],
        [
          "Explore reflection with visualization and AI",
          "Explore how visualizations and AI can help researchers reflect on interpretations and discover possible connections in the evidence."
        ]
      ],
      "figure": {
        "src": "assets/qualivision/system-architecture.png",
        "width": 2034,
        "height": 602,
        "alt": "QualiVision system architecture: external video URLs feed the video analysis workspace; a Google Apps Script bridge connects annotations with spreadsheet storage; the Visual/AI dashboard presents summaries and prompts; an export module provides analysis data and summaries. The figure includes screenshots of the early workspace and dashboard.",
        "caption": "System architecture and early prototype views.",
        "sourceLabel": "Figure 1 · QualiVision paper",
        "sourceUrl": "https://arxiv.org/html/2608.13594v1"
      }
    },
    {
      "id": "next",
      "label": "Next steps",
      "title": "Continue developing QualiVision.",
      "body": "The next stage will add two-way annotation sync between the interface and the sheets, views for tracing and comparing coding changes, and visual and AI support for reflection and insight exploration."
    },
    {
      "id": "evaluation",
      "label": "Evaluation plan",
      "title": "From structured tasks to researchers’ own projects.",
      "body": "I plan to begin with Comparative Structured Observation (CSO), comparing QualiVision with a conventional multi-tool workflow using tasks we provide. This phase will focus on usability and user experience, combining task performance, observations, and participant feedback to understand how well the tool supports qualitative video analysis.",
      "extra": "To examine ecological validity, I then plan to invite researchers to use QualiVision in their own projects over a longer period. This will help me understand how it fits their existing practices and supports analysis as their questions, codes, and interpretations evolve in real use."
    }
  ],
  "links": [
    [
      "Read the paper",
      "https://arxiv.org/abs/2608.13594"
    ]
  ],
  "sourceNote": "Based on Towards Scaling Qualitative Analysis of Video Data, project design notes, and my UXR résumé. Prototype capabilities and proposed extensions are distinguished in the text. The interaction below is a conceptual reconstruction with a fictional example, not participant evidence."
},
  {
    id: 'wrangling', number: '02', short: 'Wrangling tools', category: 'HUMAN–AI INTERACTION', color: 'sage',
    title: 'Same data, different tools, different ways of thinking.',
    question: 'How do interfaces shape the way people clean data?',
    summary: 'Looking beyond task completion to understand how people plan, explore, and verify their work across four tool paradigms.',
    methods: ['Mixed methods', 'Think-aloud', 'Remote study', 'Crowdwork study'],
    stat: '40 freelancers', venue: 'VL/HCC 2026', time: '4 min',
    takeaway: 'Tool choice shapes strategies, but does not guarantee better outcomes.',
    intro: 'Data cleaning is more than a sequence of corrections. People must decide what looks wrong, what to change, and whether to trust the result. I studied these decisions across ChatGPT, Jupyter, Excel, and OpenRefine.',
    role: 'As first author, I owned the research end to end: study design, recruitment, reVISit implementation and remote deployment, data collection, mixed-methods analysis, synthesis, and writing.',
    team: 'Shiyi He, El Kindi Rezig, Paul Rosen, Andrew M. McNutt',
    sections: [
  {
    "id": "approach",
    "label": "Study design",
    "title": "Follow each cleaning task from action to outcome.",
    "body": "I compared how participants approached the same two cleaning tasks using different tools. I used <a class=\"study-platform-link\" href=\"https://revisit.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">reVISit</a>, an open-source platform for running online user studies, to deploy the study remotely and collect screen and think-aloud recordings, cleaned datasets, and workload and usability questionnaires.",
    "widget": "wrangling-study",
    "extra": "I used the Technical Dimensions of Programming Systems framework to examine how interface characteristics related to participants’ cleaning strategies."
  },
  {
    "id": "evidence",
    "label": "Key findings",
    "title": "Different interface trade-offs, no consistent advantage in output quality.",
    "body": "Output comparisons showed no consistent advantage for one tool. Solutions were more similar in the constrained task and more varied in the open-ended task. The qualitative analysis identified seven design trade-offs; the four themes below are selected highlights.",
    "widget": "wrangling",
    "cards": [
      [
        "Visibility vs. Abstraction",
        "Visible data made local issues easier to notice and encouraged opportunistic corrections. Abstraction-centered workflows supported systematic, compositional transformations, while requiring more cognitive and procedural effort."
      ],
      [
        "Predictability vs. Simplicity",
        "Natural-language interfaces made complex requests easier to express, but introduced ambiguity about the resulting actions. Explicit specifications offered more control and predictability, with additional procedural effort and opportunities for errors."
      ],
      [
        "Big vs. Small Steps",
        "One-shot automation simplified multi-step transformations but obscured intermediate states and downstream effects. Smaller steps gave users more opportunities to inspect results, adjust individual operations, and recover incrementally from errors."
      ],
      [
        "Entangled Integration vs. Fragmented Splits",
        "Separating data, transformations, and outputs made their roles clearer, but increased navigation and fragmented the workflow. Bringing them together supported continuous work while risking confusion between operations and results."
      ]
    ]
  },
  {
    "id": "implications",
    "label": "Design implications",
    "title": "Make transformations visible and verifiable.",
    "body": "The findings informed three design directions for helping people carry a cleaning decision through to a result they can inspect:",
    "cards": [
      [
        "Guide the next step",
        "Help users connect a task goal with an appropriate cleaning action."
      ],
      [
        "Expose transformations",
        "Show what a transformation changes so users can inspect its effects."
      ],
      [
        "Combine complementary interaction styles",
        "Explore notebooks with AI assistance, or combine spreadsheet-style data views with the programmable transformations of notebooks. These combinations could bring complementary strengths into one cleaning workflow."
      ]
    ]
  }
],
    links:[['Read the paper','https://arxiv.org/abs/2607.26198'],['Explore the reVISit study','https://wrangler-tdops-study.netlify.app/a-notebook']],
    sourceNote:'Publication details and methods: the linked paper. Recommendation summary: my October 2026 UXR résumé. First authorship and end-to-end research ownership confirmed by Shiyi He. Illustrations on this page are explanatory reconstructions.'
  },
  {
    id:'dsf', number:'03', short:'Data formats', category:'DEVELOPER EXPERIENCE', color:'peach',
    title:'Are “human-friendly” data formats easier to use?',
    question:'What makes a data format usable in practice?',
    summary:'Combining usability evaluation with practitioner interviews to understand how data formats shape the way people read, edit, and write data.',
    methods:['Usability evaluation','Practitioner interviews','Mixed methods','Crowdwork study'],
    stat:'215 crowd workers + 9 practitioners', venue:'VL/HCC 2026', time:'4 min',
    takeaway:'Usability extends beyond syntax to the tools, practices, and communities around a format.',
    intro:'JSON, YAML, XML, and their peers represent similar information in different ways. Developers have strong preferences, but preference alone does not explain how easily someone can read, edit, or maintain a file.',
    role:'As first author, I owned the research end to end: study design, recruitment, reVISit implementation and remote deployment, the 215-participant usability study, nine practitioner interviews, analysis, synthesis, and writing.',
    team:'Shiyi He, Zach Cutler, Andrew M. McNutt',
    sections:[
  {
    "id": "approach",
    "label": "Study design",
    "title": "Compare notation, then look beyond it.",
    "body": "I paired a controlled usability study with practitioner interviews to understand both how people perform with different formats and what makes those formats workable in everyday development.",
    "widget": [
      "dsf",
      "dsf-study"
    ],
    "extra": "I deployed the task study through <a class=\"study-platform-link\" href=\"https://revisit.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">reVISit</a>, an open-source platform for running online user studies. All conditions used the same Ace editor with syntax highlighting and basic indentation; linting and automatic formatting were disabled to focus the comparison on notation."
  },
  {
    "id": "evidence",
    "label": "Key findings",
    "title": "Limited performance differences. Rich differences in practice.",
    "body": "The experiment did not identify a format that consistently performed best. Bringing those results together with the interviews helped explain why usability involves more than how a file looks. These four highlights connect the task results with the three interview themes.",
    "cards": [
      [
        "No format was consistently best",
        "In the task study, TOML, YAML, and HJSON outperformed XML when adding fields. These advantages did not extend across reading, authoring, or the easiest and hardest modifications. Task difficulty mattered more consistently than format."
      ],
      [
        "Readability preferences differed",
        "In interviews, some practitioners preferred indentation; others found explicit braces clearer. These preferences help explain competing views of “human-friendly” syntax, without establishing a universally easier notation."
      ],
      [
        "Conventions shaped format choices",
        "Practitioners often followed team practices, language ecosystems, or legacy requirements. Familiar examples, documentation, and compatibility made an established format practical to keep using."
      ],
      [
        "Tools changed the effort of editing",
        "Practitioners described using formatters, linters, and generated files to manage syntax. Their experiences pointed to early error detection and reliable editor support as important parts of usability."
      ]
    ]
  },
  {
    "id": "implications",
    "label": "Design implications",
    "title": "Design for the whole format ecosystem.",
    "body": "Usability comes from how syntax, tools, documentation, and shared practices work together. This shifts the design focus toward the support that makes formats manageable in everyday work.",
    "cards": [
      [
        "Prioritize tooling over new syntax variants",
        "Invest in linters, formatters, and IDE integration that help people work with existing formats. Strengthening this support may yield greater usability gains than introducing another syntactic variant."
      ],
      [
        "Support conventions, onboarding, and migration",
        "Format adoption depends on community practices, documentation, and familiar workflows. Shared tools and clear migration paths can support adoption while accounting for existing dependencies and the effort of switching."
      ],
      [
        "Consider human factors in usability evaluation",
        "Evaluate format usability in specific tasks and user contexts, considering differences in experience, language, and cultural background."
      ]
    ]
  }
],
    links:[['Read the paper','https://arxiv.org/abs/2607.26211']],
    sourceNote:'Based on the DSF manuscript, presentation notes, and my UXR résumé. First authorship and end-to-end research ownership confirmed by Shiyi He. The linked publication provides the full research context. Code examples below are newly created illustrations, not experimental stimuli.'
  },
{
  "id": "bibwrangler",
  "number": "04",
  "short": "BibWrangler",
  "category": "INTERFACE & SYSTEM DESIGN",
  "color": "lavender",
  "title": "Cleaning references is also a question of trust.",
  "question": "Where does bibliography assistance fit into real writing workflows?",
  "summary": "Designing and building a bibliography-cleaning system, then evaluating its interface and workflow fit through a remote lab study and a two-week take-home study.",
  "methods": [
    "Workflow comparison",
    "Remote lab study",
    "Interviews",
    "Take-home study"
  ],
  "stat": "21 experts · Remote lab study + 2-week take-home study",
  "venue": "Research project",
  "time": "4 min",
  "takeaway": "Useful automation needs a place in the workflow—and a way to inspect its changes.",
  "intro": "A bibliography can look finished while still containing duplicate records, missing metadata, or inconsistent formatting. BibWrangler approaches this work as data wrangling. The research asks how people notice issues, decide what matters, and assess suggested repairs.",
  "role": "As first author, I led the interface design, system development, and end-to-end research: study design, recruitment, the moderated remote lab study, the two-week take-home study, interview and survey coding, thematic synthesis, and writing.",
  "team": "Shiyi He, El Kindi Rezig, Paul Rosen, Andrew McNutt",
  "sections": [
    {
      "id": "approach",
      "label": "Study design",
      "title": "From a structured task to everyday use.",
      "body": "The first phase was a moderated remote study: participants completed bibliography-cleaning tasks with BibWrangler and their usual workflows while thinking aloud, followed by an interview about their decisions and experience. In the second phase, they used BibWrangler in their own projects for two weeks and completed a take-home questionnaire.",
      "widget": "bib-study"
    },
    {
      "id": "evidence",
      "label": "Key findings",
      "title": "Useful support needed to fit researchers’ workflows, reflect their context, and keep them in control of repairs.",
      "body": "Researchers brought different workflows and quality standards to bibliography cleaning. BibWrangler helped them notice problems they had missed. They still needed to decide which issues were worth fixing and check whether the repairs were correct.",
      "cards": [
        [
          "Workflow fit depended on the writing stage",
          "Researchers used BibWrangler as a checkpoint before submission, during incremental editing, or when merging bibliography files. It needed to fit around established writing and reference-management practices."
        ],
        [
          "Quality standards depended on context",
          "What counted as an issue depended on entry type, venue conventions, and project needs. Researchers wanted validation and repair guidance that recognized those differences, such as suggesting appropriate fields or standard venue abbreviations."
        ],
        [
          "More visible issues created prioritization work",
          "An overview exposed problems that familiar workflows could miss. More warnings also required researchers to decide what deserved attention and could interrupt the task they were trying to finish."
        ],
        [
          "Automation shifted effort toward verification",
          "Bulk repairs made larger cleaning tasks manageable, while researchers still wanted to inspect consequential changes. Confidence depended on understanding what changed and being able to review it."
        ]
      ]
    },
    {
      "id": "implications",
      "label": "Design opportunities",
      "title": "Help people review, prioritize, and return to writing.",
      "body": "The themes point toward giving researchers more control over what gets fixed and how repairs fit into their existing work.",
      "cards": [
        [
          "Make changes easy to review",
          "Show before-and-after edits, mark recently changed entries, and let people revisit bulk repairs."
        ],
        [
          "Provide contextual checks and guidance",
          "Use entry type, venue conventions, and project requirements to guide validation and repair suggestions. Explain why a field is flagged and show an appropriate value or format."
        ],
        [
          "Let researchers set the priorities",
          "Let researchers sort, filter, or defer issues according to what matters for the current project and writing stage."
        ],
        [
          "Reduce handoffs during writing",
          "Connect bibliography checking with the writing and reference-management environments researchers already use."
        ]
      ]
    }
  ],
  "links": [
    [
      "Try BibWrangler",
      "https://bib-wrangler.netlify.app/"
    ]
  ],
  "sourceNote": "Based on the research protocol and thematic coding. First authorship and end-to-end research ownership confirmed by Shiyi He. Participant records, transcripts, and private source links are intentionally omitted from the portfolio."
},
{
  "id": "palette",
  "number": "05",
  "short": "Color palette tools",
  "category": "ACCESSIBILITY & DESIGN BEHAVIOR",
  "color": "yellow",
  "title": "The tool changes what a designer notices.",
  "question": "How does palette assistance shape design attention?",
  "summary": "Exploring the relationship between design aids, accessibility constraints, and creative judgment across four palette tools.",
  "methods": [
    "Think-aloud",
    "Comparative evaluation",
    "Remote study"
  ],
  "stat": "40 designers",
  "venue": "IEEE VIS Poster 2026",
  "time": "3 min",
  "takeaway": "Early observations suggest that palette tools shape both the colors people produce and the constraints they attend to.",
  "intro": "Color palette design involves competing priorities. This exploratory study examined how different forms of assistance shape both the resulting palettes and the reasoning behind them.",
  "role": "As first author, I owned the research end to end: tool comparison, task and study design, reVISit implementation and deployment, recruitment, data collection, qualitative and quantitative analysis, synthesis, and writing.",
  "team": "Shiyi He, Andrew McNutt",
  "sections": [
    {
      "id": "approach",
      "label": "Study design",
      "title": "Compare reasoning alongside palette outcomes.",
      "body": "I recruited 40 self-identified designers through Prolific. Each used one assigned tool across accessibility, thematic, and freestyle tasks while thinking aloud.",
      "widget": "palette-study",
      "extra": "I deployed the online study through <a class=\"study-platform-link\" href=\"https://revisit.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">reVISit</a>, a platform for running online user studies, capturing screen recordings, think-aloud audio, task time, and final palettes."
    },
    {
      "id": "evidence",
      "label": "Preliminary observations",
      "title": "Early patterns in palette outcomes and design attention.",
      "body": "The study suggested that accessibility support could influence both palette outcomes and what designers paid attention to, even when accessibility was not the main task goal.",
      "figure": {
        "title": "Study results",
        "src": "assets/palette/study-results.svg",
        "width": 2464,
        "height": 612,
        "alt": "Results across the four tools and task conditions, showing foreground-background contrast, pairwise color distance, completion time, and the proportion of thinking devoted to accessibility.",
        "caption": "Palette metrics, task time, and accessibility-related reasoning across conditions.",
        "sourceLabel": "Figure 1 · Color palette tools paper",
        "sourceUrl": "https://arxiv.org/html/2608.19148v1"
      },
      "cards": [
        [
          "Differences were more apparent in accessibility tasks",
          "Color Buddy palettes showed stronger foreground-background contrast; QualPal palettes showed greater inter-color distinguishability. Participants using these tools also completed accessibility tasks more quickly than those using ColorExplorer in this exploratory study."
        ],
        [
          "Tools appeared to shape both outcomes and attention",
          "Even when accessibility was not required, QualPal’s generated palettes favored color distinguishability, while Color Buddy’s contrast warnings drew participants’ attention to accessibility during thematic and freestyle tasks. These patterns suggest that tools can influence design through both built-in functionality and the considerations they bring into focus."
        ],
        [
          "Visible checks could constrain exploration",
          "Some participants found repeated warnings frustrating or questioned suggested colors. Making a constraint actionable could also pull attention away from other design goals."
        ]
      ]
    }
  ],
  "links": [
    [
      "Read the paper",
      "https://arxiv.org/abs/2608.19148"
    ],
    [
      "Explore the reVISit study",
      "https://shiyihe-neko.github.io/reVISit_study/color-buddy/"
    ]
  ],
  "sourceNote": "Research summary: Trade-offs in Data Color Palette Design Tools. Coding vocabulary: project coding schema. First authorship and end-to-end research ownership confirmed by Shiyi He."
},
{
  "id": "charles",
  "number": "06",
  "short": "ChARLES",
  "category": "DATABASE SYSTEMS",
  "color": "sand",
  "title": "From database changes to semantic summaries.",
  "question": "How can changes between database snapshots be summarized accurately and concisely?",
  "summary": "Implementing a database system that discovers, ranks, and visualizes semantic summaries of changes between relational data snapshots.",
  "methods": [
    "K-means clustering",
    "Linear regression",
    "Semantic summarization",
    "Interactive visualization"
  ],
  "stat": "Database system demonstration",
  "venue": "SIGMOD 2025 Demo",
  "time": "4 min",
  "takeaway": "ChARLES discovers and ranks conditional transformations that summarize how groups of records changed.",
  "intro": "ChARLES compares two snapshots of a relational database to discover semantic summaries of numerical value changes. We implemented data partitioning, linear transformation discovery, and summary ranking, with a graphical interface for configuring the search and inspecting results.",
  "role": "As first author, I developed the explanation-exploration interface, including attribute recommendations, adjustable explanation complexity, and data-coverage views. My work connected model-generated summaries to an interactive workflow for inspecting and comparing explanations.",
  "team": "Shiyi He, Alexandra Meliou, Anna Fariha",
  "sections": [
    {
      "id": "approach",
      "label": "Algorithm & implementation",
      "title": "Discover partitions, infer transformations, and rank summaries.",
      "body": "Given two snapshots with the same schema and records, the engine explains changes to a numerical attribute through the following pipeline.",
      "widget": "charles-algorithm"
    },
    {
      "id": "evidence",
      "label": "Interface & features",
      "title": "Configure the search and inspect the results.",
      "body": "The interface connects the setup assistant with the discovery engine, ranked summaries, and partition visualizations.",
      "figure": {
        "title": "Interface walkthrough",
        "src": "assets/charles/paper-interface.png",
        "width": 2608,
        "height": 1298,
        "alt": "Annotated ChARLES interface: upload two datasets, choose the changed attribute, adjust attribute counts and the accuracy-interpretability balance, review recommended attributes, request ranked summaries, and inspect data partitions in a detailed visualization.",
        "caption": "",
        "sourceLabel": "Figure 4 · ChARLES paper",
        "sourceUrl": "https://arxiv.org/html/2409.18386v1"
      },
      "cards": [
        [
          "Attribute selection and search bounds",
          "Select the target attribute, review suggested attributes, and set c and t to limit the attributes used in conditions and transformations."
        ],
        [
          "Summary ranking and score controls",
          "Adjust α to balance accuracy and interpretability. Review the overall score and its two components for each ranked summary."
        ],
        [
          "Partition inspection",
          "Open a summary to inspect its data partitions, coverage, and corresponding transformation rules."
        ]
      ]
    },
    {
      "id": "functionality",
      "label": "Example output",
      "title": "Connect a group of records with its change rule.",
      "body": "A summary consists of conditional transformations. Each condition identifies a data partition; its transformation describes how the values changed. In this bonus example, the condition selects employees with a PhD and the rule describes their bonus increase.",
      "widget": "charles-output",
      "extra": "Several conditional transformations form a summary covering different record groups. The system ranks alternative summaries and lets users inspect their accuracy, interpretability, and data coverage."
    }
  ],
  "links": [
    [
      "Read the paper",
      "https://arxiv.org/abs/2409.18386"
    ]
  ],
  "sourceNote": "Based on the SIGMOD 2025 demonstration paper, interface design notes, and my UXR résumé. The explanations in the interactive example are synthetic and illustrate granularity rather than reproducing model output or empirical results.",
  "factLabel": "SYSTEM",
  "questionLabel": "PROBLEM"
}
];

