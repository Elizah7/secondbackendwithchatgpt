const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const cors = require("cors")
require("dotenv").config();
const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())

app.post("/output/:data", async (req, res) => {
  const user_input = req.params.data
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const messages = [];
  messages.push({ role: "user", content: `write a poem about ${user_input}` });
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const completion_text = completion.data.choices[0].message.content;
    res.send({ msg: "here is the data", data: completion_text })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});



app.listen(process.env.PORT, () => {
  console.log(`runing on port ${process.env.PORT}`)
})