const { OpenAI } = require("openai");
const config = require("../../config");

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

const handleIngridientsRequest = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).send("Ingredients list is required in the body.");
  }

  const prompt = `Explain each component from this list in terms of "bad/good for health": ${ingredients}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3500,
    });

    const messageContent = response.choices[0].message.content;
    console.log("message:", messageContent);

    res.json({ message: messageContent });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with OpenAI");
  }
};

module.exports = { handleIngridientsRequest };
