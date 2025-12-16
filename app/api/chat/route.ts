import { convertToModelMessages, streamText } from 'ai';
import { createGoogleGenerativeAI, } from '@ai-sdk/google';
import { sourceMapsEnabled } from 'process';
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY ,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  generateId: () => crypto.randomUUID(),
});
const lessons = {
  math: {
    9: {
      furtherOnSets: ["Sets and Elements","Set Description","The Notion of Sets","Operations on Sets","Application"],
      theNumberSystem: ["Revision on Natural Numbers and Integers" ,"Irrational Numbers", "Real Numbers","Application"],
      solvingEquations: ["Revision on Linear Equation in OneVariable" ,"Systems of Linear Equations in Two Variables", "Solving Non-linear Equations","Applications of Equations"],
      solvingInequalities: ["Revision on Linear Inequalities in OneVariable" ,"Systems of Linear Inequalities in Two Variables", "Inequalities Involving Absolute Value","Quadratic Inequalities","Applications of Inequalities"],
      introductionToTrigonometry: ["Revision on Right-angled Triangles" ,"Trigonometric Ratios"],
      regularPolygons: ["Sum of Interior Angles of a Convex Polygon" ,"Sum of Exterior Angles of a Convex Polygon", "Measures of Each Interior Angle and Exterior Angle of a Regular Polygon","Properties of Regular Polygons"],
      congurencyAndSimilarity: ["Revision on Congruency of Triangles" ,"Definition of Similar Figures", "Theorems on Similar Plane Figures","Ratio of Perimeters of Similar Plane Figures","Ratio of Areas of Similar Plane Figures","Construction of Similar Plane Figure","Applications of Similarities"],
      vectorsInTwoDimentions: ["Vector and Scalar Quantities" ,"Representation of a Vector", "Vectors Operations","Position Vector","Applications of Vectors in Two Dimensions"],
      statisticsAndProbability: ["Statistical Data" ,"Probability"],
    },
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  english: {
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  physics: {
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  biology: {
    9: {
      introductionToBiology: ["Definition of Biology","Why do we study Biology?","The Scientific Method","Tools of a Biologist","The Light Microscope","General Laboratory Safety Rules"],
      characteristicsAndClassificarionOfOrganisms: ["Characteristics of living things","Taxonomy of living things","Relevance of classification","Linnaean system of nomenclature","Common Ethiopian animals and plants","The five-kingdom system of classification","Renowned Taxonomists in Ethiopia"],
      cells: ["Cell theory","Cell structure and function","Types of cells","Animal and plant cells","Observing cells under a microscope","The cell and its environment","Levels of Biological Organization"],
      reproduction: ["Introduction to reproduction","Asexual reproduction","Types of asexual reproduction","Sexual reproduction in Humans","Primary and secondary sexual characteristics","Male reproductive structures","Female reproductive structures","The Menstrual cycle","Fertilization and pregnancy","Methods of birth control","Sexually transmitted infections (STIs): Transmission and prevention"],
      humanHealthAndnutritionAndDisease: ["What is food?","Nutrition","Nutrients","Balanced diets","Deficiency diseases","Malnutrition","Substance abuse","Infectious and noninfectious diseases","Renowned Nutritionists in Ethiopia"],
      Ecology: ["Ecology","Ecological relationships"],
    },
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  ict: {
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  economics: {
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  citizenship:{
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  chemistry: {
    9: {
      chemistryAndItsImportance: ["Definition and Scope of Chemistry","Relationship between Chemistry and Other Natural Sciences","The Role Chemistry Plays in Production and in the Society","Some Common Chemical Industries in Ethiopia"],
      measurementsAndScientificMethods: ["Measurements and Units in Chemistry","Chemistry as Experimental Science"],
      structureOfTheAtom: ["Historical Development of the Atomic Theories of Matter","Fundamental Laws of Chemical Reactions","Atomic Theory","Discoveries of Fundamental Subatomic Particles and the Atomic Nucleus","Composition of an Atom and the Isotopes"],
      PeriodicClassificationOfElements: ["Historical Development of Periodic Classification of the Elements","Mendleev\'s Classification of the Elements","The Modern Periodic Table","The Major Trends in the Periodic Table"],
      chemicalBonding: ["Chemical Bonding","Ionic Bonding","Covalent Bonding","Metallic Bonding"],
    },
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  geography:{
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
  history: {
    9: {unit: []},
    10: {unit: []},
    11: {unit: []},
    12: {unit: []},
  },
}
export async function POST(req: Request) {
  const { messages } = await req.json();
console.log("messages:", messages);
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a helpful assistant. All math MUST be formatted using LaTeX inside double dollar signs $$...$$ for block equations or $...$ for inline equations.Never output plain text math.if you are unsure about an answer, please state that you are unsure rather than fabricating an answer.you answer questions based on the following lessons: ${JSON.stringify(lessons)} when answering questions, provide step-by-step explanations and examples to aid understanding.the data provided is for Ethiopian high school students from grade 9 to grade 12.`,
    prompt: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}