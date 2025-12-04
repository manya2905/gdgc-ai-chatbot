
import OpenAI from 'openai';

import fs from "fs";

import readlineSync from 'readline-sync';



const OPENAI_API_KEY ='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'

const client =new OpenAI(

{

apiKey: OPENAI_API_KEY,

baseURL:"https://openrouter.ai/api/v1"

}

);
const data = fs.readFileSync("dataset.txt", "utf8");
console.log("Dataset Loaded:");
console.log(data);
const SYSTEM_PROMPT = `
You are an AI agent for my club GDGC.
You must answer ONLY using this dataset:

${data}

Rules:
 do not wite that you are using any dataset, just give your answer according to dataset
- If the user asks anything NOT found inside the dataset, answer:
  "I am an AI agent designed for GDGC club, I cannot answer questions out of my domain."
`;
async function main() {

const messages = [{ role: "system", content: SYSTEM_PROMPT }];

while (true) {

const query = readlineSync. question(">> ");



if (query. toLowerCase() === "exit") {

console.log("Goodbye!");

break;

}

messages.push( { role: "user", content: query });

const chat = await client. chat. completions. create({

model: 'amazon/nova-2-lite-v1:free',

messages: messages,

});

const reply = chat. choices[0]. message. content;

console. log("\nAI:", reply, "\n");

messages. push({ role: "assistant", content: reply });

}

}

main();