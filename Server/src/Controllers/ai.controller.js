const ai = require("../Services/ai.service.js");

module.exports.getResponse = async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  const response = await ai(prompt);

  res.send(response);
};
