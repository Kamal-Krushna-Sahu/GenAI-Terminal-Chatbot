import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage } from "langchain";

// configuration to take user input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// create "model" from ChatMistralAI
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

/*
  messages array to send all chats to AI (Context)
  ------------------------------------------------
  This is not a scalable way to implement chat context.
  Pricing would be high,
  AI Response time will increase.
*/
const messages = [];

while (true) {
  const question = await rl.question("You : ");
  messages.push(new HumanMessage(question));

  const response = await model.invoke(messages);
  messages.push(new AIMessage(response.text));

  console.log("AI : ", response.text);
}
