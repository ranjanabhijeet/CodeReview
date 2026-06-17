const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService(code);

    res.send(response);

  } catch (error) {
    console.error("AI Error:", error);

    if (error.status === 429) {
      return res.status(429).send(
        "Gemini API quota exceeded. Please check your API key and billing."
      );
    }

    res.status(500).send("Internal Server Error");
  }
};
