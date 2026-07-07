import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
  });
//   console.log(interaction.output_text);
  return interaction.output_text
}

// main();

export default main; 