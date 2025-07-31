import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt, context = [] } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const messages = [
    {
      role: 'user',
      parts: [
        {
          text:
            'You are Japa Genie, an AI visa expert. ' +
            'Ask once for citizenship, destination, budget, purpose, history, education/job. ' +
            'Then give concise visa advice.\n\nUser: ' +
            prompt,
        },
      ],
    },
    ...context,
  ];

  messages.push({ role: 'user', parts: [{ text: prompt }] });

  const body = { contents: messages };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );

  const data = await res.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';
  return NextResponse.json({ reply });
}
