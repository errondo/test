import { convertToModelMessages, streamText } from 'ai';
import { createGoogleGenerativeAI, } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  generateId: () => crypto.randomUUID(),
});
const lessons = {
  math: {
    9: {
      furtherOnSets: ["Sets and Elements", "Set Description", "The Notion of Sets", "Operations on Sets", "Application"],
      theNumberSystem: ["Revision on Natural Numbers and Integers", "Irrational Numbers", "Real Numbers", "Application"],
      solvingEquations: ["Revision on Linear Equation in OneVariable", "Systems of Linear Equations in Two Variables", "Solving Non-linear Equations", "Applications of Equations"],
      solvingInequalities: ["Revision on Linear Inequalities in OneVariable", "Systems of Linear Inequalities in Two Variables", "Inequalities Involving Absolute Value", "Quadratic Inequalities", "Applications of Inequalities"],
      introductionToTrigonometry: ["Revision on Right-angled Triangles", "Trigonometric Ratios"],
      regularPolygons: ["Sum of Interior Angles of a Convex Polygon", "Sum of Exterior Angles of a Convex Polygon", "Measures of Each Interior Angle and Exterior Angle of a Regular Polygon", "Properties of Regular Polygons"],
      congurencyAndSimilarity: ["Revision on Congruency of Triangles", "Definition of Similar Figures", "Theorems on Similar Plane Figures", "Ratio of Perimeters of Similar Plane Figures", "Ratio of Areas of Similar Plane Figures", "Construction of Similar Plane Figure", "Applications of Similarities"],
      vectorsInTwoDimentions: ["Vector and Scalar Quantities", "Representation of a Vector", "Vectors Operations", "Position Vector", "Applications of Vectors in Two Dimensions"],
      statisticsAndProbability: ["Statistical Data", "Probability"],
    },
    10: {
      relationsAndFunctions: [
        "Relations",
        "Functions",
        "Applications of Relations and Functions"
      ],

      polynomialFunctions: [
        "Definition of Polynomial Function",
        "Operations on Polynomial Functions",
        "Theorem on Polynomial Functions",
        "Zeros of Polynomial Functions",
        "Graphs of Polynomial Functions",
        "Applications"
      ],

      exponentialAndLogarithmicFunctions: [
        "Exponents and Logarithms",
        "The Exponential Functions and Their Graphs",
        "The Logarithmic Functions and Their Graphs",
        "Solving Exponential and Logarithmic Equations",
        "Relation between Exponential and Logarithmic Functions",
        "Applications"
      ],

      trigonometricFunctions: [
        "Radian Measure of Angle",
        "Basic Trigonometric Functions",
        "Trigonometric Identities and Equations",
        "Applications"
      ],

      circles: [
        "Symmetrical Properties of Circles",
        "Angle Properties of Circles",
        "Arc Length, Perimeters and Areas of Segments and Sectors",
        "Theorems on Angles and Arcs Determined by Lines Intersecting Inside, On and Outside a Circle"
      ],

      solidFigures: [
        "Revision of Cylinders and Prisms",
        "Pyramids, Cones and Spheres",
        "Frustum of Pyramids and Cones",
        "Surface Areas and Volumes of Composed Solids",
        "Applications"
      ],

      coordinateGeometry: [
        "Distance Between Two Points",
        "Division of a Line Segment",
        "Equation of a Line",
        "Slopes of Parallel and Perpendicular Lines",
        "Equation of a Circle",
        "Applications"
      ]
    },
    11: {
      unit: []
    },
    12: {
      unit: []
    },
  },
  physics: {
    9: {
      physicsAndHumanSociety: [
        "Definition and Nature of Physics",
        "Branches of Physics",
        "Related Fields to Physics",
        "Historical Issues and Contributors"
      ],

      physicalQuantities: [
        "Scales, Standards and Units (Prefixes)",
        "Measurement and Safety",
        "Classification of Physical Quantities",
        "Unit Conversion"
      ],

      motionInAStraightLine: [
        "Position, Distance and Displacement",
        "Average Speed and Instantaneous Speed",
        "Average Velocity and Instantaneous Velocity",
        "Acceleration",
        "Uniform Motion",
        "Graphical Representation of Motion"
      ],

      forceWorkEnergyAndPower: [
        "The Concept of Force",
        "Newton's Laws of Motion",
        "Forces of Friction",
        "The Concept of Work",
        "Kinetic and Potential Energies",
        "Power"
      ],

      simpleMachines: [
        "Simple Machines and Their Purposes",
        "Simple Machines at Home",
        "Simple Machines at the Workplace",
        "Classification of Simple Machines",
        "Mechanical Advantage, Velocity Ratio and Efficiency of Simple Machines",
        "Designing Simple Machines"
      ],

      mechanicalOscillationAndSoundWave: [
        "Common Characteristics of Waves",
        "String, Pendulum and Spring",
        "Propagation of Waves and Energy Transmission",
        "Sound Waves",
        "Superposition of Waves",
        "Characteristics of Sound Waves"
      ],

      temperatureAndThermometry: [
        "Temperature and Our Life",
        "Extreme Temperature Safety",
        "Temperature Change and Its Effects",
        "Measuring Temperature with Different Thermometric Scales",
        "Types of Thermometers and Their Use",
        "Conversion Between Temperature Scales",
        "Thermal Expansion of Materials"
      ]
    },
    10: {
      vectorQuantities: [
        "Scalars and Vectors",
        "Vector Representations",
        "Vector Addition and Subtraction",
        "Graphical Method of Vector Addition",
        "Vector Resolution"
      ],

      uniformlyAcceleratedMotion: [
        "Position and Displacement",
        "Average Velocity and Instantaneous Velocity",
        "Acceleration",
        "Equations of Motion with Constant Acceleration",
        "Graphical Representation of Uniformly Accelerated Motion",
        "Relative Velocity in One Dimension"
      ],

      elasticityAndStaticEquilibriumOfRigidBody: [
        "Elasticity and Plasticity",
        "Density and Specific Gravity",
        "Stress and Strain",
        "Young Modulus",
        "Static Equilibrium",
        "First Condition of Equilibrium",
        "Second Condition of Equilibrium"
      ],

      staticAndCurrentElectricity: [
        "Charges in Nature",
        "Methods of Charging a Body",
        "The Electroscope",
        "Electrical Discharge",
        "Coulomb's Law of Electrostatics",
        "The Electric Field",
        "Electric Circuits",
        "Current, Voltage and Ohm's Law",
        "Combination of Resistors in a Circuit",
        "Voltmeter and Ammeter Connection in a Circuit",
        "Electrical Safety in General and Local Context",
        "Electric Projects"
      ],

      magnetism: [
        "Magnet",
        "Magnetic Field",
        "The Earth's Magnetic Field and the Compass",
        "Magnetic Field of a Current-Carrying Conductor",
        "Magnetic Force on a Moving Charge in a Uniform Magnetic Field",
        "Magnetic Force on a Current-Carrying Wire",
        "Magnetic Force Between Two Parallel Current-Carrying Wires",
        "Applications of Magnetism"
      ],

      electromagneticWavesAndGeometricalOptics: [
        "Electromagnetic Waves",
        "Electromagnetic Spectrum",
        "Light as a Wave",
        "Laws of Reflection and Refraction",
        "Mirrors and Lenses",
        "Human Eye and Optical Instruments",
        "Primary Colors of Light and Human Vision",
        "Color Addition of Light",
        "Color Subtraction of Light Using Filters"
      ]
    },
    11: { 
      unit: [] 
    },
    12: {
      applicationOfPhysics: [
        "Physics and other sciences",
        "Physics and engineering",
        "Medical physics",
        "Physics and defense technology",
        "Physics in communication"
      ],
      twoDimensionalMotion: [
        "Projectile motion",
        "Rotational Motion",
        "Rotational Dynamics",
        "Planetary motion and Kepler's laws",
        "Newton's law of universal Gravitation"
      ],
      fluidMechanics: [
        "Fluid Statics",
        "Pressure in fluids at rest",
        "Archimedes' principle",
        "Fluid flow",
        "Safety and high pressure"
      ],
      electromagnetism: [
        "Magnets and Magnetic field",
        "Magnetic field lines",
        "Current and Magnetism",
        "Electromagnetic Induction",
        "Faraday's Law of electromagnetic Induction",
        "Transformers",
        "Application and safety"
      ],
      basicsOfElectronics: [
        "Semiconductors",
        "Diodes and their Functions",
        "Rectification",
        "Transistors and their application",
        "Integrated Circuits",
        "Logic gates and logic circuits",
        "Application of electronics"
      ]
    },
  },
  biology: {
    9: {
      introductionToBiology: ["Definition of Biology", "Why do we study Biology?", "The Scientific Method", "Tools of a Biologist", "The Light Microscope", "General Laboratory Safety Rules"],
      characteristicsAndClassificarionOfOrganisms: ["Characteristics of living things", "Taxonomy of living things", "Relevance of classification", "Linnaean system of nomenclature", "Common Ethiopian animals and plants", "The five-kingdom system of classification", "Renowned Taxonomists in Ethiopia"],
      cells: ["Cell theory", "Cell structure and function", "Types of cells", "Animal and plant cells", "Observing cells under a microscope", "The cell and its environment", "Levels of Biological Organization"],
      reproduction: ["Introduction to reproduction", "Asexual reproduction", "Types of asexual reproduction", "Sexual reproduction in Humans", "Primary and secondary sexual characteristics", "Male reproductive structures", "Female reproductive structures", "The Menstrual cycle", "Fertilization and pregnancy", "Methods of birth control", "Sexually transmitted infections (STIs): Transmission and prevention"],
      humanHealthAndnutritionAndDisease: ["What is food?", "Nutrition", "Nutrients", "Balanced diets", "Deficiency diseases", "Malnutrition", "Substance abuse", "Infectious and noninfectious diseases", "Renowned Nutritionists in Ethiopia"],
      Ecology: ["Ecology", "Ecological relationships"],
    },
    10: {
      biologyAndTechnology: [
        "Learning from nature",
        "Biology and technology",
        "The benefits of biology to technology",
        "Uses of technology in biology",
        "Impacts of biology and technology on society and the natural world",
        "Impacts of biology on the society and the natural world",
        "Impacts of technology on the society and the natural world",
        "Ethical issues in biology",
        "Ethical treatment of plants and animals during biological studies"
      ],
      animals: [
        "Characteristics of animals",
        "Invertebrates and Vertebrates",
        "Invertebrate Animals",
        "Vertebrate Animals",
        "Reproduction in Animals",
        "Asexual reproduction in animals",
        "Sexual reproduction in animals",
        "Reproduction in insects (complete and incomplete metamorphosis)",
        "Reproduction in Frog",
        "Reproduction in Crocodiles",
        "Reproduction in Birds",
        "Reproduction in rat",
        "The economic importance of animals (insects)",
        "Beneficial aspects of insects",
        "Harmful aspects of insects",
        "Animal Behavior",
        "Types of Animal Behavior",
        "Patterns of Behavior",
        "Homeostasis in animals",
        "Thermoregulation",
        "Osmoregulation",
        "Blood Sugar Regulation",
        "Control of homeostasis",
        "Renowned zoologists in Ethiopia"
      ],
      enzymes: [
        "What are enzymes?",
        "Properties and functions of enzymes",
        "General properties of an enzyme",
        "The function of enzymes",
        "Protein structures",
        "Enzyme substrate models",
        "Enzyme-substrate binding models",
        "Enzymatic transition state",
        "Enzyme regulation",
        "Types of enzymes",
        "Enzyme structural classification",
        "Basic classification of enzymes",
        "Factors affecting enzyme action",
        "Description on factors affecting enzymatic actions",
        "Enzyme kinetics",
        "Application of enzymes in industries and their benefits",
        "Uses of enzyme application",
        "Malting in Ethiopian tradition",
        "Steps of modern malting",
        "Why is malting for?",
        "Traditional malting for local alcohol production",
        "Renowned Biochemists in Ethiopia"
      ],
      genetics: [
        "The genetic materials",
        "The structure and function of DNA and RNA",
        "The Structure and function of DNA",
        "DNA replication",
        "The structure and function of RNA",
        "The process of cell division",
        "Cell Division",
        "Protein synthesis",
        "Mendelian inheritance",
        "Mendelian crosses",
        "Monohybrid cross",
        "Dihybrid Cross",
        "Test Crosses",
        "Sex determination",
        "Non-Mendelian inheritance",
        "Co-dominance, Incomplete dominance and Multiple alleles",
        "Rh factor inheritance in humans and its medical importance",
        "Sex-linked inheritance in humans",
        "Environmental effects on phenotype",
        "Human pedigree analysis and its importance",
        "Genetic disorders",
        "Genetic testing and counseling",
        "Gene therapy",
        "Breeding",
        "Indigenous knowledge of Ethiopian farmers",
        "Bioinformatics introduction"
      ],
      humanBodySystems: [
        "Human Musculoskeletal Systems",
        "Types of muscles",
        "Mechanism of actions of skeletal muscles",
        "The human axial and appendicular skeletons",
        "Joints",
        "The reproductive system",
        "Human reproductive system (Male and Female)",
        "Gametogenesis",
        "Positive and negative feedbacks to control the menstrual cycle",
        "Fertilization and pregnancy",
        "Mechanism of action of contraceptives",
        "Causes of infertility in humans",
        "The major sexually transmitted infections (STIs) in Ethiopia",
        "Epidemiology of STIs in Ethiopia",
        "Harmful traditional practices",
        "Family planning",
        "Risks related to the lack of family planning",
        "Family planning actions",
        "Family planning services",
        "Effects of alcohol use, chewing Khat, cannabis and other drug uses on STIs transmission and unwanted pregnancy",
        "The effects of alcohol uses",
        "Effects of chewing Khat",
        "Effects of drug uses"
      ],
      populationAndNaturalResources: [
        "Population size, density and dispersal",
        "Exponential and logistic growth in populations",
        "Demographic structure",
        "Population regulation",
        "Natural resources",
        "Renewable",
        "Non-renewable",
        "Conservation of natural resources in Ethiopia",
        "Impact of traffic accident on wild and domestic animals",
        "Impact of human activities on the environment",
        "Climate change",
        "Global warming",
        "Ozone layer depletion",
        "Acid rain",
        "Loss of Biodiversity",
        "Toxic bioaccumulation",
        "Resource depletion",
        "Indigenous conservation practices in Ethiopia"
      ]
    },
    11: {
      biologyAndTechnology: [
        "Learning from nature",
        "Biology and technology",
        "The benefits of biology to technology",
        "Uses of technology in biology",
        "Impacts of biology and technology on society and the natural world",
        "Impacts of biology on the society and the natural world",
        "Impacts of technology on the society and the natural world",
        "Ethical issues in biology",
        "Ethical treatment of plants and animals during biological studies"
      ],
      animals: [
        "Characteristics of animals",
        "Invertebrates and Vertebrates",
        "Invertebrate Animals",
        "Vertebrate Animals",
        "Reproduction in Animals",
        "Asexual reproduction in animals",
        "Sexual reproduction in animals",
        "Reproduction in insects (complete and incomplete metamorphosis)",
        "Reproduction in Frog",
        "Reproduction in Crocodiles",
        "Reproduction in Birds",
        "Reproduction in rat",
        "The economic importance of animals (insects)",
        "Beneficial aspects of insects",
        "Harmful aspects of insects",
        "Animal Behavior",
        "Types of Animal Behavior",
        "Patterns of Behavior",
        "Homeostasis in animals",
        "Thermoregulation",
        "Osmoregulation",
        "Blood Sugar Regulation",
        "Control of homeostasis",
        "Renowned zoologists in Ethiopia"
      ],
      enzymes: [
        "What are enzymes?",
        "Properties and functions of enzymes",
        "General properties of an enzyme",
        "The function of enzymes",
        "Protein structures",
        "Enzyme substrate models",
        "Enzyme-substrate binding models",
        "Enzymatic transition state",
        "Enzyme regulation",
        "Types of enzymes",
        "Enzyme structural classification",
        "Basic classification of enzymes",
        "Factors affecting enzyme action",
        "Description on factors affecting enzymatic actions",
        "Enzyme kinetics",
        "Application of enzymes in industries and their benefits",
        "Uses of enzyme application",
        "Malting in Ethiopian tradition",
        "Steps of modern malting",
        "Why is malting for?",
        "Traditional malting for local alcohol production",
        "Renowned Biochemists in Ethiopia"
      ],
      genetics: [
        "The genetic materials",
        "The structure and function of DNA and RNA",
        "The Structure and function of DNA",
        "DNA replication",
        "The structure and function of RNA",
        "The process of cell division",
        "Cell Division",
        "Protein synthesis",
        "Mendelian inheritance",
        "Mendelian crosses",
        "Monohybrid cross",
        "Dihybrid Cross",
        "Test Crosses",
        "Sex determination",
        "Non-Mendelian inheritance",
        "Co-dominance, Incomplete dominance and Multiple alleles",
        "Rh factor inheritance in humans and its medical importance",
        "Sex-linked inheritance in humans",
        "Environmental effects on phenotype",
        "Human pedigree analysis and its importance",
        "Genetic disorders",
        "Genetic testing and counseling",
        "Gene therapy",
        "Breeding",
        "Indigenous knowledge of Ethiopian farmers",
        "Bioinformatics introduction"
      ],
      humanBodySystems: [
        "Human Musculoskeletal Systems",
        "Types of muscles",
        "Mechanism of actions of skeletal muscles",
        "The human axial and appendicular skeletons",
        "Joints",
        "The reproductive system",
        "Human reproductive system (Male and Female)",
        "Gametogenesis",
        "Positive and negative feedbacks to control the menstrual cycle",
        "Fertilization and pregnancy",
        "Mechanism of action of contraceptives",
        "Causes of infertility in humans",
        "The major sexually transmitted infections (STIs) in Ethiopia",
        "Epidemiology of STIs in Ethiopia",
        "Harmful traditional practices",
        "Family planning",
        "Risks related to the lack of family planning",
        "Family planning actions",
        "Family planning services",
        "Effects of alcohol use, chewing Khat, cannabis and other drug uses on STIs transmission and unwanted pregnancy",
        "The effects of alcohol uses",
        "Effects of chewing Khat",
        "Effects of drug uses"
      ],
      populationAndNaturalResources: [
        "Population size, density and dispersal",
        "Exponential and logistic growth in populations",
        "Demographic structure",
        "Population regulation",
        "Natural resources",
        "Renewable",
        "Non-renewable",
        "Conservation of natural resources in Ethiopia",
        "Impact of traffic accident on wild and domestic animals",
        "Impact of human activities on the environment",
        "Climate change",
        "Global warming",
        "Ozone layer depletion",
        "Acid rain",
        "Loss of Biodiversity",
        "Toxic bioaccumulation",
        "Resource depletion",
        "Indigenous conservation practices in Ethiopia"
      ]
    },
    12: { 
      unit: [] 
    },
  },
  ict: {
    9: {
      organizationOfFiles: [
        "Basics of Files and Folders",
        "Managing Files and Folders",
        "Computer Drives"
      ],

      computerNetwork: [
        "Definition of Network",
        "Fundamental Elements of Network",
        "Types of Networks",
        "Advantages and Disadvantages of Network"
      ],

      applicationSoftware: [
        "Using Application Software",
        "Word Processing",
        "Manipulating Data in Spreadsheet",
        "Creating Presentation"
      ],

      imageProcessingAndMultimedia: [
        "Image",
        "Multimedia Production Planning Strategies",
        "Using Image Processing Software"
      ],

      informationAndComputerSecurity: [
        "Definition of Security",
        "Principles of Computer Security",
        "Computer Security Threats",
        "Potential Losses Due to Security Attacks",
        "How to Secure Yourself and Your Computer Systems"
      ],

      fundamentalsOfProgramming: [
        "Defining a Problem and Computational Problem",
        "Steps in Problem Solving",
        "Working with Flowcharts and Block Programming",
        "Problem Solving Approaches"
      ]
    },
    10: {
      organizationOfFiles: [
        "File Management",
        "Storage Drives",
        "File Name Extension",
        "File Directory Structure",
        "File Conversion",
        "File Importing and Exporting",
        "Saving and Opening Files",
        "File Backup and Recovery",
        "File Compression",
        "Deleting a File",
        "Restoring Deleted File"
      ],

      computerNetwork: [
        "Network Media (Transmission Media)",
        "Telecommunications Network",
        "Mobile Communications",
        "Cellular Networks",
        "Satellite Networks",
        "Internet Protocol"
      ],

      applicationSoftware: [
        "Word Processing",
        "Spreadsheet",
        "PowerPoint Presentation"
      ],

      imageProcessingAndMultimedia: [
        "Basics of Multimedia",
        "Multimedia File Formats",
        "Multimedia Production",
        "Multimedia Authoring and Authoring Tools",
        "Multimedia Editing"
      ],

      informationAndComputerSecurity: [
        "Information and Computer Security",
        "Impact of Information and Computer Security on Society",
        "Privacy and Security",
        "Computer Security Threats",
        "Threat Prevention Strategies",
        "Cyber Security"
      ],

      fundamentalsOfProgramming: [
        "Basics of Algorithm",
        "Definition of Algorithm",
        "Characteristics of Algorithm",
        "Algorithm Representation",
        "Integrated Development Environment (IDE)"
      ]
    },
    11: {
      informationSystemsAndItsApplications: [
        "Data, Information, Knowledge, and Wisdom",
        "Introduction to Information Systems",
        "Applications of Information Systems",
        "IT for Entrepreneurship"
      ],
      emergingTechnologies: [
        "Artificial Intelligence",
        "Augmented Reality and Virtual Reality",
        "Data Science"
      ],
      databaseManagement: [
        "Data Management Approaches",
        "Data Model",
        "Creating Relational Database in Microsoft Access"
      ],
      webDevelopment: [
        "World Wide Web",
        "Website Design",
        "HTML Basics",
        "HTML Links",
        "HTML Tables",
        "HTML Lists"
      ],
      hardwareTroubleshootingAndPreventiveMaintenance: [
        "Hardware Troubleshooting",
        "Basics of Preventive Maintenance"
      ],
      fundamentalsOfProgramming: [
        "Types of Programming Languages",
        "Basics of Python",
        "Variables and Data Types",
        "Statements and Expressions",
        "Writing a Simple Program"
      ]
    },
    12: {
      informationSystemsAndApplications: [
        "Ethical, Legal, Social, Environmental and Health Issues in the Use of Information Systems",
        "Ethical and Legal Issues in Information Systems",
        "Social Issues in Information Systems",
        "Environmental Issues caused by Information Systems",
        "Health Issues caused by Information Systems",
        "Intellectual Property",
        "Digital Identity Management",
        "Collaboration Through Digital Technologies",
        "Components of Digital Collaboration",
        "Engaging in Citizenship through Digital Technologies"
      ],
      emergingTechnologies: [
        "Introduction to Big Data",
        "Characteristics of Big Data",
        "Benefits of Big Data",
        "Application of Big Data",
        "Challenges of Big Data",
        "Cloud Computing",
        "Introduction to Cloud Computing",
        "Benefits of Cloud Computing",
        "Limitations of Cloud Computing",
        "Types of Cloud Computing",
        "Cloud Computing Services",
        "Fog Computing",
        "Internet of Things (IoT)",
        "Major Advantages of IoT",
        "How Does IoT Work?",
        "Application of Internet of Things"
      ],
      databaseManagementSystem: [
        "Overview of Relational Database Management System",
        "Database Manipulation Using SQL",
        "Using SQL in Microsoft Access",
        "Data Definition Language (DDL)",
        "Data Manipulation Language",
        "Data Query Language – SELECT Command"
      ],
      webAuthoring: [
        "Introduction to XML",
        "Elements of XML Documents",
        "Creating XML Documents",
        "HTML vs. XML",
        "Advantages and Disadvantages of XML",
        "Publishing Website"
      ],
      maintenanceAndTroubleshooting: [
        "Install and Uninstall Software",
        "Installing Software",
        "Uninstalling Software",
        "Software Troubleshooting",
        "Tools to Speed Up Computer System",
        "Disk Defragmenter",
        "Disk Cleanup",
        "Windows Update",
        "System Restore",
        "Network Troubleshooting",
        "Basic Network Problems",
        "Basic Network Troubleshooting Steps",
        "Network Troubleshooting Tools",
        "Command-Line Tools",
        "Network Maintenance Tools"
      ],
      fundamentalsOfProgramming: [
        "Program Flow Controls and Syntax in Python",
        "Conditionals Program Flow Controls",
        "Loops or Iteration Program Flow Controls",
        "Comments in Python",
        "Python Interpreter",
        "Testing and Debugging Programs"
      ]
    },
  },
  economics: {
    9: {
      introducingEconomics: [
        "Meaning of Economics",
        "Branches of Economics",
        "Methods and Approaches of Studying Economics",
        "Decision Making Units"
      ],

      basicEconomicProblemsAndEconomicSystems: [
        "Basic Economic Problems: Scarcity, Choice and Opportunity Cost",
        "Central Problems of Economies",
        "Economic Systems"
      ],

      economicResourcesAndMarkets: [
        "Types of Resources and Factor Payments",
        "Renewable and Non-renewable Resources",
        "Types of Markets",
        "Circular Flow of Economic Activities",
        "Land as an Economic Resource in Ethiopia"
      ],

      introductionToDemandAndSupply: [
        "Concept of Demand",
        "Concept of Supply",
        "Market Equilibrium"
      ],

      introductionToProductionAndCost: [
        "Definition of Production, Inputs and Outputs",
        "Periods of Production",
        "Cost of Production"
      ],

      introductionToMoney: [
        "Definition of Money",
        "Evolution of Money",
        "Functions of Money",
        "Demand and Supply of Money",
        "Money and Electronic Money (E-money)"
      ],

      introductionToMacroeconomics: [
        "Definition of Macroeconomic Variables",
        "Macroeconomic Goals",
        "Macroeconomic Problems"
      ],

      basicEntrepreneurship: [
        "Definition of Enterprise, Entrepreneur and Entrepreneurship",
        "Creativity and Innovation in Solving Local Problems",
        "Entrepreneurial Attitudes, Behaviour and Mind-set",
        "Windows of Entrepreneurial Opportunities",
        "Entrepreneurial Success, Teamwork and Diversity",
        "Finance and Promotion of Entrepreneurship"
      ]
    },
    10: {
      theoryOfConsumerBehaviour: [
        "The Concept of Utility",
        "The Cardinal Utility Theory",
        "The Consumer Maximization Problem",
        "Introduction to the Ordinal Utility Theory"
      ],

      theoriesOfDemandAndSupply: [
        "Theory of Demand",
        "Theory of Supply",
        "Market Equilibrium",
        "Elasticities of Demand and Supply"
      ],

      theoriesOfProductionAndCost: [
        "Theory of Production",
        "Theory of Cost"
      ],

      marketStructure: [
        "Perfectly Competitive Markets",
        "Pure Monopoly Market",
        "Monopolistically Competitive Market",
        "Oligopoly Market"
      ],

      bankingAndFinance: [
        "Introduction to Financial Intermediaries",
        "Introduction to Financial Markets",
        "Introduction to Financial Institutions",
        "Historical Development of Banks in Ethiopia",
        "Micro-finance Institutions",
        "Electronic Banking (E-banking)",
        "Indigenous Financial Institutions"
      ],

      economicGrowth: [
        "Review of Macroeconomic Variables",
        "Definition and Measurement of Economic Growth",
        "Sources of Economic Growth",
        "Weaknesses of Using GDP and GDP Per Capita",
        "The Business Cycle and Its Phases"
      ],

      theEthiopianEconomy: [
        "Components of Gross Domestic Product (GDP)",
        "Real GDP versus Nominal GDP",
        "The Agricultural Sector in the Ethiopian Economy",
        "The Industrial Sector in the Ethiopian Economy",
        "The Service Sector in the Ethiopian Economy",
        "Agriculture versus Industrial Development"
      ],

      businessStartupsAndInnovation: [
        "Innovation",
        "Business Startups",
        "Types of Business Organizations",
        "Business Feasibility Analysis"
      ]
    },
    11: {
      theoryOfConsumerBehaviorAndDemand: [
        "Review of the Cardinal Utility Approach",
        "The Ordinal Utility Theory and Preferences",
        "Indifference Curve, Set and Map",
        "Properties of Indifference Curves",
        "The Marginal Rate of Substitution (MRS)",
        "Marginal Utility and MRS",
        "Special Types of Indifference Curves",
        "The Budget Line or the Price line",
        "Slope of the Budget Line",
        "Factors Affecting the Budget Line",
        "Effects of Changes in Income",
        "Effects of Changes in Price of the Commodities",
        "Optimum of the Consumer",
        "Effects of Changes in Income and Prices on Consumer’s Equilibrium",
        "Price Consumption Curve and Deriving the Demand Curve",
        "Unit Summary",
        "Review Questions"
      ],
      marketStructureAndTheDecisionOfFirms: [
        "Review of Market Structures",
        "Perfect Competition Market",
        "Demand, Revenue and Cost Curves",
        "The Short-Run Equilibrium of Firm",
        "Short Run Supply Curve of a Firm",
        "Long run-equilibrium of Firm",
        "Pure Monopoly Market",
        "Demand, Revenue and Cost under Monopoly",
        "Short-run equilibrium under Monopoly",
        "Price Discrimination under Monopoly",
        "Monopolistic Competition Market",
        "Product Differentiations and the Demand Curve",
        "Costs under Monopolistic Competition",
        "Short-run Equilibrium under Monopolistic Competition",
        "The Concept of Industry and Product Group",
        "Oligopoly Market",
        "Collusive Oligopoly",
        "Non-collusive Oligopoly",
        "Unit Summary",
        "Review Questions"
      ],
      nationalIncomeAccounting: [
        "Nature of National Income Account and Its importance",
        "The Concept of Gross Domestic Product (GDP) and Gross National Product(GNP)",
        "The Concept of Gross Domestic Product (GDP)",
        "The concept of Gross National Product (GNP)",
        "Approaches of Measuring National Income (GDP/GNP)",
        "The Expenditure Approach",
        "The Income Approach",
        "Product or Value-added Approach",
        "Circular Flow of Income and the GDP",
        "Problems with GDP Measurement",
        "The GDP Deflator and the Consumer Price Index",
        "Nominal and Real GDP values",
        "The GDP Deflator and other Measures of General Price",
        "Other Measures of National Income Account",
        "GDP and Income Distribution",
        "Unit Summary",
        "Review Questions"
      ],
      consumptionSavingAndInvestment: [
        "Consumption",
        "Average Propensity to Consume (APC)",
        "Marginal Propensity to Consume (MPC)",
        "Determinants of Consumption Expenditure",
        "Saving",
        "Average Propensity to Save (APS)",
        "Marginal Propensity to Save",
        "Determinants of Saving",
        "The Relationship between Saving and Consumption",
        "Investment",
        "Investment Types",
        "Determinants of Investment",
        "Role of Investment in Economic Growth",
        "Unit Summary",
        "Review Questions"
      ],
      tradeAndFinance: [
        "Overview of Domestic Trade",
        "Basis of International Trade",
        "Basic Theories of International Trade",
        "The Mercantilists’ View on Trade",
        "The Classical Trade Theories",
        "Balance of Payment Components",
        "The Current Account (CA)",
        "The Capital Account (KA)",
        "Trade Policies and Strategies",
        "Exchange Rate Determinations",
        "Nominal and Real Exchange Rate",
        "Fixed Exchange Rate Systems",
        "Floating Exchange Rate Systems",
        "Regional Integration and Globalization Practices in the Ethiopian Context",
        "Advantages and Disadvantages of Economic Integration",
        "Globalization Practices in Ethiopian Context",
        "Unit Summary",
        "Review Questions"
      ],
      economicDevelopment: [
        "Economic Growth and Economic Development",
        "Measures of Productivity",
        "Human Development Index (HDI)",
        "Ethiopia’s HDI Value and Rank",
        "Evaluation of HDI and its Relevance to Developing Countries",
        "Capability Approach",
        "Sustainable Development",
        "Millennium Development Goals (2000-2015)",
        "The Sustainable Development Goals (2015-2030)",
        "Unit Summary",
        "Review Questions"
      ],
      mainSectorsSectorialPoliciesAndStrategiesOfEthiopia: [
        "Overview of Agricultural Policies and Strategies",
        "Uni-modal Agricultural Strategy",
        "Bi-Modal Agricultural Strategy",
        "Overview of Agricultural Policies and Strategies of Ethiopia",
        "Specific Policies and Strategies of the Agricultural Sector",
        "Problems of the Agricultural Sector",
        "Specific Policies and Strategies of the Industrial Sector",
        "The Imperial Regime (pre-1974)",
        "The Derg Regime (1974-91)",
        "The Post-1991 Regime",
        "Problems of the Industrial Sector Post 1991",
        "Possible Remedies for the problems of Industrial Sector",
        "The Service Sector Policies and Strategies in Ethiopia",
        "Education Sector Policies and Strategies",
        "The Health Sector Policies and Strategies",
        "The Transport Sector",
        "The Tourism Sector",
        "Unit Summary"
      ]
    },
    12: {
      fundamentalConceptsOfMacroeconomics: [
        "Definition and Focus Areas of Macroeconomics Revisited",
        "Definition of Macroeconomics",
        "The Focus Areas of Macroeconomics",
        "Key Challenges in Macroeconomics",
        "Economic Growth",
        "Inflation",
        "Unemployment",
        "Business Cycle",
        "Balance of Trade",
        "The Schools of Thought in Macroeconomic Analysis",
        "Evolution and Recent Developments",
        "The Classical and Neoclassical",
        "Keynesian",
        "Monetarist",
        "New Classical",
        "New Keynesian"
      ],
      aggregateDemandAndAggregateSupplyAnalysis: [
        "Aggregate Demand",
        "Concept of Aggregate Demand",
        "The Aggregate Demand Curve",
        "Shifts in the Aggregate Demand Curve",
        "Aggregate Supply",
        "Concept of Aggregate Supply",
        "The Upward Sloping Aggregate Supply Curve: The Short Run (SRAS)",
        "The Vertical Aggregate Supply Curve: The Long Run (LRAS)",
        "Equilibrium of Aggregate Demand and Aggregate Supply",
        "Shocks to Aggregate Demand",
        "Shocks to Aggregate Supply"
      ],
      marketFailureAndConsumerProtection: [
        "Market Failure",
        "Common Types of Market Failures",
        "Solutions to Market Failures",
        "Public Goods",
        "Externalities",
        "Asymmetric Information",
        "Consumer Protection"
      ],
      macroeconomicPolicyInstruments: [
        "Definition and Types of Macroeconomic Policies",
        "Fiscal Policy",
        "Tools of Fiscal Policy",
        "Types of Fiscal Policy",
        "Monetary Policy",
        "Tools of Monetary Policy",
        "Types of Monetary Policies",
        "Income Policy and Wage",
        "Foreign Exchange Policies"
      ],
      taxTheoryAndPractice: [
        "Taxes: Definition, Principles, Objectives and Classifications",
        "Definition and Terminologies in Taxation",
        "Objectives of Taxation",
        "Principles of Taxation",
        "Characteristics of a Good Tax System",
        "Classification of Taxes",
        "Major Categories and Sources of Taxes",
        "Approaches to Tax Equity",
        "The Benefits Approach",
        "The Ability-to-pay Approach",
        "Tax System and Structure in Ethiopia",
        "Types of Tax and Tax Accounting in Ethiopia",
        "Problems Associated with Taxation in Ethiopia"
      ],
      povertyAndInequality: [
        "Concept of Poverty and Its Measurement",
        "Poverty",
        "Types of Poverty",
        "Measuring Poverty",
        "Sen’s Approach to Poverty and Wellbeing",
        "Concept of Inequality and its Measurements",
        "Global and Regional Poverty",
        "Women and Poverty",
        "Overview of Poverty and Inequalities in Ethiopia",
        "Role of Indigenous Knowledge in Reducing Poverty"
      ],
      macroeconomicReformsInEthiopia: [
        "National Development Objectives and Strategies- Historical Review",
        "National Development Plan during the Imperial Period (1950-74)",
        "National Development Plan under the Socialist Period (1974-1991)",
        "National Development Plan under FDRE",
        "National Development Plan after a Reform (2021-2030)",
        "Overview of Home-grown Economic Reforms in Ethiopia",
        "Macroeconomic Reforms",
        "Fiscal Decentralization",
        "Disadvantages and Advantages of Decentralized System"
      ],
      economyEnvironmentAndClimateChange: [
        "Economy and the Environment",
        "Rural Development and Environment",
        "Urban Development and Environment",
        "Population, Resources and the Environment",
        "Global Warming and Climate Change",
        "Global Warming",
        "Climate Change",
        "Scope of the Problem and the Causes of Climate Change",
        "Indicators of Climate Change",
        "Impacts of Climate Change",
        "Vulnerability to Climate Change",
        "Means to Address Climate Change Challenges",
        "Green Economy and Green Growth",
        "Overview of Environment and Climate Change in Ethiopia"
      ]
    },
  },
  citizenship: {
    9: {
      ethicalValues: [
        "The Meaning of Ethics",
        "Major Ethical Values",
        "The Importance of Ethical Values of Citizens",
        "Aspects of Applied Ethics"
      ],

      cultureOfUsingDigitalTechnology: [
        "The Concept of Digital Technology",
        "Culture and Digital Technology",
        "The Purpose of Digital Technology",
        "Codes of Conduct for Using Digital Technology",
        "Effective Communication Through Digital Media",
        "Challenges of Using Digital Media"
      ],

      constitutionAndConstitutionalism: [
        "Understanding Constitution",
        "Understanding Constitutionalism",
        "Constitutional Experiences of Ethiopia"
      ],

      understandingIndigenousKnowledge: [
        "The Concept of Indigenous Knowledge",
        "The Role of Indigenous Knowledge in Producing Responsible Citizens",
        "The Role of Indigenous Social Institutions in Solving Community Problems"
      ],

      multiculturalismInEthiopia: [
        "Understanding Culture",
        "The Concept of Multiculturalism",
        "Pillars of Multicultural Societies",
        "Major Forms of Diversity Demonstrating Multiculturalism"
      ],

      nationalUnityThroughDiversity: [
        "Unity in Diversity",
        "Elements of Diversity",
        "Accommodation of Diversity",
        "The Importance of Diversity Management in Ethiopia"
      ],

      problemSolvingSkills: [
        "Meaning of Problem-Solving Skills",
        "The Importance of Problem-Solving Skills",
        "Characteristics of a Good Problem Solver",
        "Ways to Improve One's Problem-Solving Skills"
      ],

      ethiopiasForeignRelationsInEastAfrica: [
        "The Concepts of Foreign Relations",
        "Instruments of Foreign Policy",
        "The Roles of Foreign Policy"
      ]
    },
    10: {
      democracyAndDemocratization: [
        "The Concept of Democracy and Democratization",
        "Definitions and Actors of the Democratization Process",
        "Institutionalizing Democracy",
        "The Role of Democracy for Social Transformation",
        "Democratic Values",
        "Aspects of Democracy"
      ],

      citizensInTheDigitalTechnologyAge: [
        "Implications of Digital Technology on Citizens",
        "The Ethics of Using Digital Technology",
        "Opportunities of Digital Technology for Young Citizens",
        "Impacts of Unethical Use of Digital Technology on Young Citizens"
      ],

      understandingGoodGovernance: [
        "The Concept of Good Governance",
        "Elements of Good Governance",
        "The Role of Good Governance",
        "Challenges for Good Governance",
        "Impacts of Lack of Good Governance",
        "Understanding and Fighting Corruption"
      ],

      peaceAndIndigenousConflictResolutionMechanisms: [
        "The Concepts of Peace",
        "Impacts of Absence of Peace",
        "The Notion of Peace Building",
        "Indigenous Conflict Resolution Mechanisms",
        "Roles of Indigenous Social Institutions in Ensuring Sustainable Peace"
      ],

      federalismInEthiopia: [
        "The Meaning of Federalism",
        "Types of Federalism",
        "Key Features of Federalism",
        "Advantages and Disadvantages of Federalism",
        "Roles of Federalism in Accommodating Diversity in Ethiopia"
      ],

      humanRights: [
        "The Concept of Human Rights",
        "Citizens and State Obligations in Realizing Human Rights"
      ],

      patriotism: [
        "The Meaning of Patriotism",
        "Types of Patriotism",
        "The Bases of Patriotism",
        "The Importance of Patriotism",
        "Duties Expected of Patriots"
      ],

      globalizationAndGlobalIssues: [
        "The Meaning of Globalization",
        "Advantages and Disadvantages of Globalization",
        "Fighting the Negative Impact of Globalization",
        "Major Global Issues"
      ]
    },
    11: {
      buildingADemocraticSystem: [
        "Basic Principles of the Ethiopian Constitution",
        "Human and Democratic Rights and the Ethiopian Constitution",
        "Citizens' Obligations/Duties",
        "Features of a Democratic System",
        "Federalism",
        "Ethiopia and International Relations"
      ],
      ruleOfLaw: [
        "Rule of Law and Constitution",
        "The Necessity of the Rule of Law",
        "Limited and Unlimited Governments",
        "The Rule of Law and Combating Corruption"
      ],
      equality: [
        "The Importance of Equality among the Nations, Nationalities and Peoples of Ethiopia",
        "The Individual and the Public Interest",
        "Gender Issues and Socially Discriminated Groups",
        "The Tendency to Negate Unity in Diversity"
      ],
      justice: [
        "Fairness",
        "Analysis of Equitability",
        "Components of the Justice System",
        "The Workings of the Court",
        "Fairness in Taxation"
      ],
      patriotism: [
        "The Bases of Patriotism",
        "Responsibilities Required from Patriotic Citizens",
        "Issues of Development",
        "Voluntarism on a National Basis"
      ],
      responsibility: [
        "Citizens’ Obligations in Society",
        "Responsibility for the Consequences of one’s own Actions",
        "Responsibility in Respecting Moral and Legal Obligations in Society",
        "Responsibility for Protecting the Environment",
        "Responsibility to Overcome Wastage of Public Property",
        "Responsible Behaviour against HIV/AIDS"
      ],
      industriousness: [
        "Respect for Work",
        "Ethical Work Conduct",
        "Hard Work and Development",
        "Policies and Strategies for Development"
      ],
      selfReliance: [
        "Attributes of Self-reliance",
        "Dependency and its Consequences",
        "Self-reliance and Decision-making"
      ],
      saving: [
        "The Need for New Thinking in Saving",
        "Ways of Improving the Habit of Saving",
        "Traditional and Modern Institutions of Saving in Ethiopia",
        "Saving as an Instrument of Investment and Development"
      ],
      activeCommunityParticipation: [
        "Civic Participation",
        "Monitoring and Influencing Actions of Government Bodies"
      ],
      thePursuitOfWisdom: [
        "The Significance of Knowledge",
        "Knowledge and Data",
        "Reading for more Knowledge",
        "Truth versus Myth"
      ]
    },
    12: {
      buildingADemocraticSystem: [
        "The Necessity of a Democratic System",
        "Authority and Power",
        "Constitutional Rights versus Constitutional Obligations",
        "State Power Distribution in Ethiopia",
        "Ethiopian Foreign Relations"
      ],
      ruleOfLaw: [
        "Constitution and Other Laws",
        "Rule of Law and Management of Conflict",
        "Rule of Law and Governments",
        "Rule of Law and the Fight against Corruption"
      ],
      equality: [
        "The History of the Ethiopian Peoples' Struggle against Oppression",
        "Conflict of Interests",
        "Equality and the Notion of Affirmative Action",
        "Unity in Diversity"
      ],
      justice: [
        "Equity of Benefits and Burdens",
        "Justice and the Judiciary",
        "Crime and Justice",
        "Justice in Taxation"
      ],
      patriotism: [
        "The Quality of a Patriot",
        "Ethiopian History in an International Perspective",
        "The Duties of a Patriot Citizen",
        "Concern for the International Community"
      ],
      responsibility: [
        "Shouldering and Executing Responsibility",
        "Costs of Fulfilling Responsibility on Individuals",
        "Fulfilling Promises to Promote Understanding in the International Arena",
        "Co-operation among Nations for Mutual Benefits",
        "The Severity of HIV/AIDS as a Global Pandemic"
      ],
      industriousness: [
        "Work as Human Necessity",
        "Factors Determining the World of Work",
        "Work in an International Perspective"
      ],
      selfReliance: [
        "Self-Reliance",
        "Dependency",
        "Self-reliance and Morally Sound Decision-making Capacity"
      ],
      saving: [
        "Methods of Saving",
        "Regulating the National Economy on Realistic International Principles",
        "Types of Economy",
        "Money and Capital"
      ],
      activeCommunityParticipation: [
        "Effective Leadership for Active Participation",
        "Civic Participation"
      ],
      pursuitOfWisdom: [
        "Knowledge",
        "Information as a Source of Knowledge",
        "Developing Reading Habits"
      ]
    },
  },
  chemistry: {
    9: {
      chemistryAndItsImportance: ["Definition and Scope of Chemistry", "Relationship between Chemistry and Other Natural Sciences", "The Role Chemistry Plays in Production and in the Society", "Some Common Chemical Industries in Ethiopia"],
      measurementsAndScientificMethods: ["Measurements and Units in Chemistry", "Chemistry as Experimental Science"],
      structureOfTheAtom: ["Historical Development of the Atomic Theories of Matter", "Fundamental Laws of Chemical Reactions", "Atomic Theory", "Discoveries of Fundamental Subatomic Particles and the Atomic Nucleus", "Composition of an Atom and the Isotopes"],
      PeriodicClassificationOfElements: ["Historical Development of Periodic Classification of the Elements", "Mendleev\'s Classification of the Elements", "The Modern Periodic Table", "The Major Trends in the Periodic Table"],
      chemicalBonding: ["Chemical Bonding", "Ionic Bonding", "Covalent Bonding", "Metallic Bonding"],
    },
    10: {
      chemicalReactionsAndStoichiometry: [
        "Introduction to Chemical Reactions",
        "Chemical Equations",
        "Types of Chemical Reactions",
        "Oxidation and Reduction Reactions",
        "Molecular and Formula Masses",
        "The Mole Concept and Chemical Formulas",
        "Stoichiometry"
      ],

      solutions: [
        "Heterogeneous and Homogeneous Mixtures",
        "The Solution Process",
        "Solubility as an Equilibrium Process",
        "Ways of Expressing Concentration of Solutions",
        "Preparation of Solutions",
        "Solution Stoichiometry",
        "Describing Reactions in Solution"
      ],

      importantInorganicCompounds: [
        "Introduction to Inorganic Compounds",
        "Oxides",
        "Acids",
        "Bases",
        "Salts"
      ],

      energyChangesAndElectrochemistry: [
        "Introduction to Energy Changes",
        "Energy Changes in Electrochemistry",
        "Electrochemical Cells",
        "Electrolysis"
      ],

      metalsAndNonmetals: [
        "Introduction to Metals and Nonmetals",
        "General Properties of Metals",
        "Production of Some Metals",
        "Production of Important Nonmetals"
      ],

      hydrocarbonsAndTheirNaturalSources: [
        "Introduction to Hydrocarbons",
        "Saturated Hydrocarbons: Alkanes",
        "Unsaturated Hydrocarbons: Alkenes",
        "Unsaturated Hydrocarbons: Alkynes",
        "Aromatic Hydrocarbons: Benzene",
        "Natural Sources of Hydrocarbons"
      ]
    },
    11: {
      atomicStructureAndPeriodicProperties: [
        "Introduction",
        "Dalton's Atomic Theory and the Modern Atomic Theory",
        "Postulates of Dalton's Atomic Theory",
        "Postulates of Modern Atomic Theory",
        "Early Experiments to Characterize the Atom",
        "The Discovery of the Electron",
        "Radioactivity and the Discovery of the Nucleus",
        "Discovery of the Neutron",
        "Make-up of the Nucleus",
        "Subatomic Particles",
        "Atomic Mass and Isotopes",
        "Electromagnetic Radiation and Atomic Spectra",
        "Electromagnetic Radiation",
        "The Quantum Theory and Photon",
        "Atomic Spectra",
        "The Bohr Model of the Hydrogen Atom",
        "Limitations of the Bohr Model",
        "The Wave-Particle Duality of Matter and Energy",
        "The Quantum Mechanical Model of the Atom",
        "The Heisenberg's Principle",
        "Quantum Numbers",
        "Shapes of Atomic Orbitals",
        "Electronic Configurations and Orbital Diagrams",
        "Ground State Electronic Configuration of the Elements",
        "Electronic Configurations and the Periodic Table of the Elements",
        "The Modern Periodic Table",
        "Classification of the Elements",
        "Periodic Properties",
        "Advantages of Periodic Classification of the Elements"
      ],
      chemicalBonding: [
        "Introduction",
        "The Octet Rule",
        "Types of Chemical Bonding",
        "Ionic Bonds",
        "Lewis Electron-Dot Symbols",
        "Formation of Ionic Bonds",
        "Exceptions to the Octet Rule in Ionic Compounds",
        "Properties of Ionic Compounds",
        "Covalent Bonds and Molecular Geometry",
        "Molecular Geometry",
        "Intermolecular Forces in Covalent Compounds",
        "Metallic Bonding",
        "Formation of Metallic Bonding",
        "Electron-Sea Model",
        "Properties of Metals and Bonding",
        "Chemical Bonding Theories",
        "Valence Bond (VB) Theory",
        "Molecular Orbital Theory (MOT)",
        "Types of Crystal"
      ],
      physicalStatesOfMatter: [
        "Introduction",
        "Kinetic Theory and Properties of Matter",
        "The Kinetic Theory of Matter",
        "Properties of Matter",
        "The Gaseous State",
        "The Kinetic Molecular Theory of Gases",
        "The Gas Laws",
        "The Liquid State",
        "Energy Changes in Liquids",
        "The Solid State"
      ],
      chemicalKinetics: [
        "Introduction",
        "The Rate of a Reaction",
        "Factors Affecting the Rate of a Chemical Reaction"
      ],
      chemicalEquilibrium: [
        "Introduction",
        "Chemical Equilibrium",
        "Reversible and Irreversible Reactions",
        "Attainment and Characteristics of Chemical Equilibria",
        "Conditions for Attainment of Chemical Equilibria",
        "Equilibrium Expression and Equilibrium Constant",
        "Applications of Equilibrium Constant",
        "Changing Equilibrium Conditions: Le-Chatelier’s Principle",
        "Equilibrium and Industry"
      ],
      oxygenContainingOrganicCompounds: [
        "Introduction",
        "Alcohols and Ethers",
        "Classification of Alcohols",
        "Nomenclature of Alcohols",
        "Physical Properties of Alcohols",
        "Preparation of Alcohols",
        "Chemical Properties of Alcohols",
        "Structure and Nomenclature of Ethers",
        "Physical Properties of Ethers",
        "Preparation of Ethers",
        "Reactions of Ethers",
        "Aldehydes and Ketones",
        "Nomenclature",
        "Physical Properties of Aldehydes and Ketones",
        "Carboxylic Acids",
        "Structure and Nomenclature of Carboxylic Acids",
        "Physical Properties of Carboxylic Acids",
        "Chemical Properties of Carboxylic Acids",
        "Preparation of Carboxylic Acids",
        "Fatty Acids",
        "Uses of Carboxylic Acids",
        "Esters",
        "Sources of Esters",
        "Nomenclature",
        "Physical Properties",
        "Chemical Properties",
        "Preparation of Esters",
        "Uses of Esters",
        "Fats and Oils",
        "Source of Fats and Oils",
        "Structure of Fats and Oils",
        "Physical Properties of Fats and Oils",
        "Hardening of Oils",
        "Rancidity"
      ]
    },
    12: {
      acidBaseEquilibria: [
        "Acid-Base Concepts",
        "Arrhenius Concept of Acids and Bases",
        "Brønsted-Lowry Concept of Acids and Bases",
        "Lewis Concept of Acids and Bases",
        "Ionic Equilibria of Weak Acids and Bases",
        "Ionization of Water",
        "Measures of the Strength of Acids and Bases in Aqueous Solution",
        "Common Ion Effect and Buffer Solution",
        "The Common Ion Effect",
        "Buffer Solutions",
        "Hydrolysis of Salts",
        "Hydrolysis of Salts of Strong Acids and Strong Bases",
        "Hydrolysis of Salts of Weak Acids and Strong Bases",
        "Hydrolysis of Salts of Strong Acids and Weak Bases",
        "Hydrolysis of Salts of Weak Acids and Weak Bases",
        "Acid-Base Indicators and Titrations",
        "Acid-Base Indicators",
        "Equivalents of Acids and Bases",
        "Acid-Base Titrations"
      ],
      electrochemistry: [
        "Oxidation-Reduction Reactions",
        "Oxidation",
        "Reduction",
        "Balancing Oxidation-Reduction (Redox) Reactions",
        "Electrolysis of Aqueous Solutions",
        "Electrolytic Cells",
        "Preferential Discharge",
        "Electrolysis of Some Selected Aqueous Solutions",
        "Quantitative Aspects of Electrolysis",
        "Faraday's First Law of Electrolysis",
        "Faraday's Second Law of Electrolysis",
        "Industrial Application of Electrolysis",
        "Voltaic Cells"
      ],
      industrialChemistry: [
        "Introduction",
        "Natural Resources and Industry",
        "Natural Resources (Raw Materials)",
        "Industry",
        "Manufacturing of Valuable Products/Chemicals",
        "Ammonia (NH3)",
        "Nitric Acid",
        "Nitrogen-Based Fertilizers",
        "Sulphuric Acid",
        "Some Common Pesticides and Herbicides",
        "Sodium Carbonate",
        "Sodium Hydroxide (NaOH)",
        "Some Manufacturing Industries in Ethiopia",
        "Glass Manufacturing",
        "Manufacturing of Ceramics",
        "Cement",
        "Sugar Manufacturing",
        "Paper and Pulp",
        "Tannery",
        "Food Processing and Preservation",
        "Manufacturing of Ethanol",
        "Soap and Detergent"
      ],
      polymers: [
        "Introduction to Polymers",
        "Polymerization Reactions",
        "Classification of Polymers"
      ],
      environmentalChemistry: [
        "Introduction",
        "Components of the Environment",
        "Natural Cycles in the Environment",
        "Concepts Related to Environmental Chemistry",
        "Environmental Pollution",
        "Air Pollution",
        "Water Pollution",
        "Land Pollution",
        "Global Warming and Climate Change",
        "Chemistry of Greenhouse Gasses and Their Effects on Climate Change",
        "Green Chemistry and Cleaner Production",
        "Principle of Green Chemistry",
        "Cleaner Production in Chemistry"
      ]
    },
  },
  geography: {
    9: { 
      unit: [] 
    },
    10: {
      landformsOfAfrica: [
        "Overview of the World's Major Landforms",
        "Location and Related Features of Africa",
        "Major Landforms of Africa",
        "Unit Summary",
        "Review Questions"
      ],
      climateOfAfrica: [
        "Overview of World Climatic Regions and Types",
        "Climate Types and Zones of Africa",
        "Benefits of Climate for Life of People of Africa",
        "Climate Change and its Challenges to Africa's Development Vision",
        "Unit Summary",
        "Review Questions"
      ],
      naturalResourceBaseOfAfrica: [
        "Overview of Major Natural Resources of the World",
        "Major Drainage and Water Resources in Africa",
        "Main Types of Soils and Mineral Resources in Africa",
        "Major Vegetation and Wildlife of Africa",
        "Unit Summary",
        "Review Questions"
      ],
      populationOfAfrica: [
        "Overview of World Population Growth and Size",
        "Africa's Major Demographic Trends",
        "Population Structure",
        "Distribution and Density of Africa's Population",
        "Urban and Rural Settlement Patterns in Africa",
        "Unit Summary",
        "Review Questions"
      ],
      majorEconomicAndCulturalActivitiesOfAfrica: [
        "Overview of Employment Structure in the World",
        "Major Economic Activities in Africa",
        "Possible Solutions to the Problem of Unemployment",
        "Africa's Agenda 2063 and Its Implications",
        "Africa's Agenda 2063 Vis-À-Vis Sustainable Development Goals (SDGs)",
        "Linguistic and Religious Diversity in Africa",
        "Unit Summary",
        "Review Questions"
      ],
      humanNaturalEnvironmentInteractions: [
        "Overview of Global Population Change",
        "Human-environment Relationship",
        "Indigenous Knowledge in Conservation of Natural Resources in Africa",
        "Unit Summary",
        "Review Questions"
      ],
      geographicIssuesAndPublicConcernsInAfrica: [
        "Unplanned Urbanization",
        "Migration – Factors and Impacts on Africa",
        "Coastal Pollution in Africa",
        "Unit Summary",
        "Review Questions"
      ],
      geospatialInformationAndDataProcessing: [
        "Basic Concepts of Geospatial Information",
        "Sources and Tools of Geographic Data",
        "Geographic Data Representations",
        "Advances in Mapmaking and the Birth of Geographic Information System",
        "Making and Interpretation of Graphs, Charts and Diagrams",
        "Unit Summary"
      ]
    },
    11: {
      formationOfTheContinents: [
        "Formation of the continents and oceans",
        "Geological timescale",
        "Distribution of the continents and oceans",
        "Changing position of the continents and oceans"
      ],
      climateClassificationAndClimateRegionsOfOurWorld: [
        "Criteria for climate classification",
        "Köppen's climate classification",
        "World climatic regions",
        "Factors influencing the world climatic regions",
        "Local/indigenous climate classification of Ethiopia"
      ],
      naturalResourcesAndConflictsOverResources: [
        "The functions and management of land",
        "Resources under pressure",
        "Land resource depletion and degradation",
        "Transboundary rivers",
        "Regional cooperation for sustainable use of transboundary rivers",
        "Potential and actual use of water in Ethiopia, Sudan and Egypt",
        "Conflicts over resources"
      ],
      globalPopulationDynamicsAndChallenges: [
        "The growth of world population",
        "Factors responsible for accelerated population growth",
        "International migrations",
        "Population policies"
      ],
      geographyAndEconomicDevelopment: [
        "Effects of geographic location on development",
        "Climate extremes and poverty",
        "Disadvantages of landlocked countries",
        "Intraregional trade in Africa"
      ],
      majorGlobalEnvironmentalChanges: [
        "Persistent environmental problems",
        "Poverty-environment nexus",
        "Environmental degradation and sustainable development"
      ],
      geographicIssuesAndPublicConcerns: [
        "Population related concerns of our contemporary world",
        "Land degradation and desertification",
        "Recurrent drought and famine",
        "Deforestation",
        "Worldwide Digital Divide"
      ],
      geoSpatialInformationAndDataProcessing: [
        "Representations of relief features on topographic maps",
        "Basic concepts of Geographical Information System (GIS)",
        "Arcmap and main tools"
      ]
    },
    12: {
      majorGeologicalProcessesAssociatedWithPlateTectonics: [
        "Continental Drift Theory",
        "Plate Tectonics Theory",
        "Plate Movements and Plate Boundaries",
        "Major Geological Processes"
      ],
      climateChange: [
        "Basic Concepts of Climate Change",
        "Trends in Global Climate Change",
        "Natural and Human Induced Climate Change",
        "Consequences of Climate Change",
        "Adaptation and Mitigation Strategies to Climate Change",
        "International Conventions and Agreements on Climate",
        "Pillars of Climate Resilient Green Economy of Ethiopia"
      ],
      issuesInSustainableDevelopmentIManagementOfConflictOverResources: [
        "The Concept of Sustainable Development",
        "Resource Use Policies and Related Conflicts",
        "Governance of Natural Resources",
        "Indigenous Conflict Resolution Practices"
      ],
      issuesInSustainableDevelopmentIIPopulationPoliciesProgramsAndTheEnvironment: [
        "Theories on Population Growth and Development",
        "Population Policies",
        "Measures Taken to Curb Growth of Population",
        "Relationship Between Population & Socio-economic Development",
        "Relationship Between Population and Environmental Health"
      ],
      issuesInSustainableDevelopmentIIIChallengesOfEconomicDevelopment: [
        "Multiple Faces of Poverty and Implication to Development",
        "Advantages and Disadvantages of Globalization",
        "Growing Imbalance between Regions and Countries",
        "Corruption",
        "Global Health Crises"
      ],
      issuesInSustainableDevelopmentIVSolutionsToEnvironmentalAndSustainabilityProblems: [
        "Environmental Problems",
        "Sustainability Challenge",
        "Environmental Education",
        "Environmental Movements",
        "Environmentally Friendly Indigenous Practices"
      ],
      contemporaryGlobalGeographicIssuesAndPublicConcerns: [
        "Climate Change",
        "Desertification",
        "Drought",
        "Famine"
      ],
      geographicalEnquiryAndMapMaking: [
        "Fundamentals of Research in Geography",
        "GIS Data and Map Making Using GIS"
      ]
    },
  },
  history: {
    9: {
      theDisciplineOfHistoryAndHumanEvolution: [
        "Meaning of Prehistory and History",
        "The Discipline of History",
        "The Importance of History",
        "Historiography and Historical Interpretations",
        "Sources of History",
        "Dating in History",
        "The Evolution of Human Beings",
        "Theories of Human Evolution",
        "Africa and Human Evolution",
        "The Stone Age",
        "The Emergence of States"
      ],

      ancientWorldCivilizationsUpTo500AD: [
        "Ancient Civilizations of Africa",
        "Ancient Egypt",
        "Nubia",
        "Civilizations in Asia",
        "Mesopotamia",
        "Persia",
        "India",
        "China",
        "Ancient Civilization of Latin America",
        "Maya",
        "Inca",
        "Aztecs",
        "Civilizations in Europe",
        "Ancient Greek Civilization",
        "Ancient Roman Civilization",
        "Rise and Spread of Christianity"
      ],

      peoplesAndStatesInEthiopiaAndTheHornToEndOf13thCentury: [
        "Languages, Religions and Peoples of Ethiopia and the Horn",
        "Language Families",
        "Major Religions of Ethiopia",
        "Settlement Patterns of Peoples of Ethiopia",
        "Pre-Aksumite States and Their Geographical Setting",
        "Aksumite Kingdom",
        "Zagwe Dynasty",
        "The Sultanate of Shewa"
      ],

      middleAgesAndEarlyModernWorld500To1750s: [
        "The Middle Ages in Europe",
        "Dark Age",
        "Feudal Society",
        "Byzantine Empire",
        "The Middle Ages in Asia",
        "The Rise and Expansion of Islam",
        "The Expansion of the Ottoman Empire",
        "Dynastic Cycle in China",
        "Development of Early Capitalism",
        "The Age of Explorations and Discoveries",
        "The Renaissance",
        "The Reformation",
        "Industrial Revolution"
      ],

      peoplesAndStatesOfAfricaTo1500: [
        "Languages and Peoples of Africa",
        "States in North Africa",
        "Spread of Islam and Its Impact in West Africa",
        "States in Western Africa",
        "Equatorial, Central and Eastern Africa",
        "Southern Africa",
        "Africa's Intra and Inter-continental Relations",
        "Trans-Saharan Trade",
        "Early Contacts with the Outside World"
      ],

      africaAndTheOutsideWorld1500To1880s: [
        "Contact with the Outside World",
        "Slavery",
        "The Legitimate Trade",
        "White Settlement in South Africa",
        "European Explorers and Missionaries"
      ],

      statesPrincipalitiesAndPopulationMovementsInEthiopia13thToMid16thCentury: [
        "The Solomonic Dynasty and the Christian Kingdom",
        "The Muslim Principalities",
        "Relations Between the Christian Kingdom and the Sultanate of Adal",
        "Political and Socio-economic Conditions of Southern and Central States",
        "Population Movements, Expansion and Integration in Ethiopia",
        "Gadaa System of the Oromo",
        "Moggasa and Guddifacha",
        "Egalitarian System of Governance"
      ],

      politicalSocialAndEconomicProcessesInEthiopiaMid16thToMid19thCentury: [
        "Peoples and States of Eastern, Central, Southern and Western Regions",
        "Southern States",
        "Western States",
        "Eastern States: Harar, Afar and Somali",
        "Gondarine Period",
        "Zemene-Mesafint",
        "The Yejju Dynasty",
        "The Kingdom of Shewa"
      ],

      ageOfRevolutions1750sTo1815: [
        "Industrial Capitalism in Europe",
        "Political, Economic and Social Effects of the Industrial Revolution",
        "French Revolution",
        "Napoleonic Era",
        "American War of Independence",
        "Congress of Vienna"
      ]
    },
    10: {
      developmentOfCapitalismAndNationalism1815To1914: [
        "Features of Capitalism",
        "Features of Nationalism and Formation of Nation States",
        "Unification of Italy",
        "Unification of Germany",
        "The American Civil War",
        "Nationalism and the Eastern Question"
      ],

      africaAndTheColonialExperience1880sTo1960s: [
        "General Background to Colonialism",
        "Motives of European Colonialism",
        "Scramble for Africa and the Berlin Conference",
        "Colonial Policies and Administration",
        "Company Rule",
        "Direct Rule and Assimilation",
        "Indirect Rule",
        "Settler Rule",
        "Early African Resistance Movements Against Colonialism",
        "Resistance in West Africa",
        "Resistance in East Africa",
        "Resistance in South Africa",
        "Resistance in North Africa",
        "Political Impacts of Colonial Rule",
        "Economic Impacts of Colonial Rule",
        "Social Impacts of Colonial Rule"
      ],

      socialEconomicAndPoliticalDevelopmentsInEthiopiaMid19thCenturyTo1941: [
        "Long Distance Trade in the Nineteenth Century",
        "Trade Routes and Market Centers",
        "Role of Cottage Industries",
        "Making of the Modern Ethiopian State",
        "External Aggressions and National Sovereignty",
        "Power Struggles Among Ruling Elites",
        "Fascist Italian Aggression and Patriotic Resistance"
      ],

      societyAndPoliticsInTheAgeOfWorldWars1914To1945: [
        "The First World War: Causes and Consequences",
        "The Russian Revolution of 1917",
        "The League of Nations",
        "The Worldwide Economic Crisis",
        "Rise of Fascism Nazism and Militarism",
        "The Second World War"
      ],

      globalAndRegionalDevelopmentsSince1945: [
        "Formation and Role of the United Nations",
        "Rise of Superpowers and the Cold War",
        "Cold War Situations in Asia",
        "Non-Aligned Movement",
        "Arab Israeli Conflict",
        "Collapse of the Soviet Union"
      ],

      ethiopiaInternalDevelopmentsAndExternalInfluences1941To1991: [
        "Post Liberation Administrative Reforms",
        "External Influences on Ethiopia",
        "The 1955 Constitution",
        "Agriculture Land Tenure and Tenancy",
        "Trade Industry and Social Services",
        "Early Opposition Movements",
        "Peasant Revolts",
        "The Coup of 1960",
        "The Ethiopian Student Movement",
        "The Ethiopian Revolution",
        "Rise of the Derg",
        "Socio Economic and Political Reforms of the Derg",
        "Ethio Somalia War of 1977",
        "The Eritrean Question and Armed Struggle",
        "Fall of the Derg"
      ],

      africaSince1960: [
        "Rise of Independent African States",
        "National Liberation Movements in Africa",
        "Apartheid in South Africa",
        "Pan Africanism and the OAU",
        "Successes and Failures of the OAU",
        "Struggle for Economic Independence",
        "Major Contemporary Issues in Africa"
      ],

      post1991DevelopmentsInEthiopia: [
        "Transitional Government of Ethiopia",
        "The 1991 Transitional Charter",
        "The 1995 Constitution and FDRE",
        "Hydro Political History of the Nile Basin",
        "Development Issues and Democratization Challenges"
      ],

      indigenousKnowledgeAndHeritagesOfEthiopia: [
        "Meaning of Indigenous Knowledge",
        "Role of Indigenous Knowledge in Development",
        "Characteristics of Indigenous Knowledge",
        "Unique Indigenous Knowledge Systems in Ethiopia",
        "Meaning and Values of Ethiopian Heritages",
        "Types of Heritages"
      ]
    },
    11: {
      historyHistoriographyAndHumanEvolution: [
        "History and Historiography",
        "Origin of Human Beings",
        "Emergence of State"
      ],
      majorSpotsOfAncientWorldCivilizationsUpTo500AD: [
        "Ancient Civilizations of Africa",
        "Civilizations in Asia",
        "Civilizations in Europe",
        "Civilizations in Latin America",
        "The Rise and Spread of Christianity"
      ],
      peoplesStatesAndHistoricalProcessesInEthiopiaAndTheHornToEndOf13thCentury: [
        "Languages, Religions and Peoples of Ethiopia and the Horn",
        "Pre-Aksumite States and their Geographical Setting",
        "The Aksumite Kingdom",
        "The Sultanate of Shewa",
        "Zagwe Dynasty",
        "The Kingdom of Damot",
        "The Bete-Israel (Ethiopian Jews)"
      ],
      theMiddleAgesAndEarlyModernWorldC500AD1789: [
        "The European Middle Ages",
        "Main Features of the Middle Ages",
        "The Middle Ages in Asia",
        "Development of Early Capitalism: 1500-1789",
        "The Age of Exploration and Inception of Globalization",
        "The Renaissance",
        "The Reformation",
        "The Scientific Revolution and the Enlightenment"
      ],
      peoplesAndStatesOfAfricaTo1500: [
        "Ancient and Medieval African States",
        "North Africa",
        "Spread of Islam to North Africa",
        "States in West Africa",
        "Central and Eastern Africa",
        "Southern Africa",
        "Relationships and Exchanges among Different Regions of Africa"
      ],
      africaAndTheOutsideWorld15001880s: [
        "Medieval African States",
        "Contacts with the Outside World",
        "Slavery and Slave Trade in Africa",
        "The Legitimate Trade",
        "The White Settlement in South Africa",
        "European Explorers and Missionaries: 1770-1870"
      ],
      statesPrincipalitiesPopulationMovementsAndInteractionsInEthiopia: [
        "The Christian Highland Kingdom under the Restored Solomonic Dynasty",
        "The Expansion of Islam and the Emergence of Muslim Sultanates",
        "Political and Socio-Economic Conditions of the Southern and Central States in Ethiopia",
        "Relationship between the Christian Highland Kingdom and the Muslim Sultanate of Adal",
        "Population Movements in the Ethiopian Region"
      ],
      politicalSocialAndEconomicProcessesInEthiopiaMid16thToMid19thCentury: [
        "Peoples and States of Southern, Western and Eastern Ethiopia",
        "Instability Versus Consolidation in the Christian Kingdom, 1559-1855"
      ],
      theAgeOfRevolutions1789To1815: [
        "The Industrial Revolution and its Political, Economic and Social Effects on Europe",
        "The American War of Independence",
        "The French Revolution",
        "The Period of Napoleon Bonaparte"
      ]
    },
    12: {
      developmentOfCapitalismAndNationalism: [
        "Development of Capitalism",
        "The Industrial Revolution",
        "Nationalism",
        "Unification of Italy",
        "Unification of Germany",
        "The American Civil War",
        "The Eastern Question"
      ],
      africaAndColonialExperience: [
        "The Era of 'Legitimate Trade' and Colonial Empires",
        "African Resistance against Colonial Expansion",
        "Colonial Administration and the Colonial States"
      ],
      socialEconomicPoliticalDevelopmentsInEthiopia: [
        "Long Distance Trade and Peoples’ Interaction in Ethiopia in the 19th Century",
        "Power Rivalry and Consolidating Central Government, 1855-1913",
        "Territorial Expansion and the Incorporation of Kingdoms",
        "External Relations, Challenges and Threats",
        "The Victory of Adwa",
        "Religious Reforms",
        "Power Struggle among Ruling Elites, 1906-1935"
      ],
      societyAndPoliticsWorldWars: [
        "World War I and Its Settlement",
        "The Russian Revolution of 1917",
        "Interwar Period: Capitalist Economy, Fascism and Nazism",
        "World War II"
      ],
      globalAndRegionalDevelopmentsSince1945: [
        "The Aftermath and Consequences of WW II",
        "The United Nations Organization (the UN)",
        "The Post-War Global Socio-Economic Recovery and Developments",
        "The Cold War Realities",
        "Situations in Asia during the Cold War",
        "The Middle East",
        "The Dissolution of the Communist Bloc and the Aftermath"
      ],
      ethiopiaInternalExternal1941to1991: [
        "The Restoration of the Imperial Rule and External Influences",
        "Socio-economic Conditions and Social Organizations",
        "Consolidation of Autocracy and Oppositions to the Monarchy",
        "The 1974 Revolution: The Downfall of the Emperor and the Rise of the Derg",
        "Socio-economic and Political Reforms of the Military Regime",
        "The Decline and Downfall of the Derg Regime: Internal and External Threats"
      ],
      post1991DevelopmentsInEthiopia: [
        "The Transitional Government of Ethiopia",
        "Ethiopia after the 1995 Constitution",
        "Socio-Economic Issues",
        "The Role of Ethiopia in Peace Keeping (Liberia, Rwanda, Sudan and Somalia)"
      ],
      africaSince1960s: [
        "The Road to Independence and the Rise of Independent States in Africa",
        "Politics in Independent African States",
        "Economy and Society in Independent Africa",
        "The Cold War and Africa",
        "Pan-Africanism, from Organization of African Unity to African Union"
      ],
      indigenousKnowledgeAndHeritages: [
        "Indigenous Knowledge: Definition and Unique Characteristic Features",
        "Indigenous knowledge and Development"
      ]
    },
  },
}
export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("messages:", messages);
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a helpful assistant. you dont like giving long responses so you try your best to make them concise and you ask for nesseccary information when they are not provided instead of giving long responses.you use proper mark up not make text look confusing to the reader. All math MUST be formatted using LaTeX inside double dollar signs $$...$$ for block equations or $...$ for inline equations.Never output plain text math.if you are unsure about an answer, please state that you are unsure rather than fabricating an answer.you answer questions based on the following lessons: ${JSON.stringify(lessons)} when answering questions, provide step-by-step explanations and examples to aid understanding.the data provided is for Ethiopian high school students from grade 9 to grade 12.`,
    prompt: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}