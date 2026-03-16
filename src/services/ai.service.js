import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAI(){
    const response = await model.invoke("who is virat kohli");
    console.log(response.text)
}