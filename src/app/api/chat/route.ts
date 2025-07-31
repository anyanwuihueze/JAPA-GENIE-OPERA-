import { NextRequest, NextResponse } from 'next/server';

interface MessagePart {
  text: string;
}

interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

export async function POST(req: NextRequest) {
  const { prompt, context = [] } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
  }
  
  const history: Message[] = context.map((msg: {role: 'user' | 'assistant', content: string}) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const systemInstruction: Message = {
      role: 'user',
      parts: [
        {
          text:
            'You are Japa Genie, an AI visa expert for Africans. ' +
            'Ask once for citizenship, destination, budget, purpose, travel history, education/job. ' +
            'Then give concise visa advice.'
        },
      ],
  };

  const modelInstruction: Message = {
    role: 'model',
    parts: [
        {
            text: 'Understood. I am Japa Genie. How can I help you today?'
        }
    ]
  }

  const userPrompt: Message = {
    role: 'user',
    parts: [{ text: prompt }]
  };

  const contents = [systemInstruction, modelInstruction, ...history, userPrompt];

  const body = { contents };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json({ reply: 'Sorry, the genie is having trouble right now.' }, { status: res.status });
    }

    const data = await res.json();

    if (!data.candidates || data.candidates.length === 0) {
      console.error('Gemini API Response blocked or empty:', data);
      const blockReason = data.promptFeedback?.blockReason;
      if (blockReason) {
         return NextResponse.json({ reply: `My apologies, my response was blocked for safety reasons (${blockReason}). Please try rephrasing your question.` });
      }
      return NextResponse.json({ reply: 'Sorry, I could not generate a response.' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return NextResponse.json({ error: 'Failed to fetch from Gemini API' }, { status: 500 });
  }
}