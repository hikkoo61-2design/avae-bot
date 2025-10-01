import OpenAI from "openai";
import dotenv from "dotenv";

// laad .env variabelen
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Hallo Avaé bot!" }],
  });

  console.log("Bot antwoord:", response.choices[0].message.content);
}

run();
