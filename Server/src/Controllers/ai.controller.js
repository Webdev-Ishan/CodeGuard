const ai = require("../Services/ai.service.js");

module.exports.getResponse = async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  try {
    const response = await ai(prompt);
    res.send(response);
  } catch (error) {
    console.error("Error in getResponse:", error.message);
    res.status(500).send("An error occurred while processing the request");
  }
};
