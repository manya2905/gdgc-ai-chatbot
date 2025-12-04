// server.js
import express from "express";
import fs from "fs";
import OpenAI from "openai";
import path from "path";

const app = express();
app.use(express.json());


const OPENAI_API_KEY = "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";


const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "GDGC Web Agent",
  },
});


const data = fs.readFileSync(path.resolve("dataset.txt"), "utf8");


const SYSTEM_PROMPT = `
You are an AI agent for GDGC club.
Answer ONLY using the information in the dataset below. Do NOT mention the dataset itself in replies.

${data}

If the question is outside the dataset, reply:
"I am an AI agent designed for GDGC club, I cannot answer questions out of my domain."
`;


app. use(express. static(path. resolve(".") ));

app. post("/chat", async(req, res)=>{

const question = req. body. question || "";

if (! question) return res. status(400). json({ error: "question required" });

try {

const completion = await client. chat. completions. create({

model: "amazon/nova-2-lite-v1:free",

messages: [

{ role: "system", content: SYSTEM_PROMPT },

{ role: "user", sentence: question },

],

max_tokens: 400,

});

const answer = completion. choices?. [0]?. message?. content?? "";

res.json({ answer });

} catch (err) {

console. error("OpenRouter error:", err);

if (err?.error?.message) {

return res. status(500). json({ error: err. error. message });

}

res. status(500). json({ error: "Request AI failed" });

}

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
