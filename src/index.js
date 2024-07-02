const config = require("../config");
const express = require("express");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

app.post("/data", async (req, res) => {
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

    res.json({ message: messageContent });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with OpenAI");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
