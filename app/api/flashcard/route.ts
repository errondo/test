import { convertToModelMessages, streamText } from 'ai';
import { createGoogleGenerativeAI, } from '@ai-sdk/google';
import { sourceMapsEnabled } from 'process';
import { NextRequest, NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY ,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  generateId: () => crypto.randomUUID(),
});
export async function POST(req: NextRequest) {
  const { messages } = await req.json();
console.log("messages:", messages);
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: " Respond ONLY with valid JSON in the following structure: { \"flashcards\": [ { \"front\": \"string\", \"back\": \"string\" }] } No markdown. No explanations. JSON ONLY.",
    prompt: convertToModelMessages(messages),
  });
  const t = await result.text
  const card = JSON.parse(t)
  console.log( "the json generated is" +t)
      return NextResponse.json(card);
}