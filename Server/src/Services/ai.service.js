const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function getcontent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

module.exports = getcontent