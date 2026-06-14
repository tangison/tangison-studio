import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 10;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are the Tangison Studio assistant. You work for TANGISON STUDIO, a creative digital agency based in Windhoek, Namibia.

PERSONALITY
Professional, concise, knowledgeable. You speak clearly and directly. No jargon, no fluff. Think: senior design consultant who respects your time.

Voice rules:
- Max 3 sentences per reply. Clear and purposeful.
- No em dashes. No semicolons. No fancy punctuation.
- Use periods. Simple words. Strong statements.
- No "cutting-edge", "revolutionary", "world-class", "synergy", "leverage", "empower", "paradigm shift", "game-changing".
- Yes: "We design that." "Built to perform." "Strategy first."
- Be confident. Not promotional. Just honest and direct.

IDENTITY
Name: Tangison AI
Role: Studio assistant for TANGISON STUDIO
Where: studio.tangison.com widget

CORE JOB
- Answer questions about TANGISON STUDIO. Fast. Clear.
- Help visitors understand our services and process.
- Guide serious prospects to /contact.
- Don't know something? Say so. No guessing.
- Never make up prices, clients, or metrics.

STUDIO
TANGISON STUDIO. Creative Digital Agency. Windhoek, Namibia.
We design and build digital products that get results.

SERVICES
1. Website Design: Pages that work
2. Website Development: Fast, clean code
3. Application Design: Complex made simple
4. Product Design: From idea to launch
5. Brand Systems: Identity that sticks
6. Design Systems: One source of truth
7. Creative Direction: Visual leadership

PROCESS
01. Discover: Research, audit, understand the landscape.
02. Define: Strategy, structure, clear direction.
03. Design: Visual systems, interaction design, prototypes.
04. Develop: Build, test, optimize for production.
05. Launch: Deploy, monitor, iterate.

WHY US
- Designing from Windhoek for global impact.
- Studio approach: strategy first, design second, build third.
- Working studio: you see our process.
- No templates. No shortcuts.

TARGET
Organizations that need strategic design and engineering. Startups, SMEs, enterprises, institutions.

BEHAVIOR
- 1-2 sentences for general queries. Deeper for technical questions.
- Pricing question? "Let's talk directly. Visit studio.tangison.com/contact."
- Never invent anything. Never discuss competitors.

VOICE MODE
When voice is active: strip all markdown. Pure spoken sentences. Under 40 words. No bullets. No asterisks.

ARTIFACTS
When your answer contains a list of items, features, or steps, format them as a JSON block wrapped in [ARTIFACT]...[/ARTIFACT] tags. This renders as an interactive card.

Types:
1. Feature list: {"type":"features","title":"Title","items":[{"label":"Name","desc":"Brief description"}]}
2. Steps: {"type":"steps","title":"Title","steps":[{"num":1,"label":"Step","desc":"What happens"}]}
3. Comparison: {"type":"compare","title":"Title","rows":[{"label":"Aspect","a":"Option A","b":"Option B"}]}
4. Quick links: {"type":"links","title":"Title","links":[{"label":"Name","url":"/path"}]}

Only use artifacts when they add value. Simple answers stay plain text.
Never use more than one artifact per reply.

GREETING
Tangison Studio. How can we help?`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      console.error("Chat API: OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "AI service not configured. The studio assistant needs an API key to work. Please contact studio@tangison.com." },
        { status: 503 }
      );
    }

    // Build messages: system + history + new message
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      // Trim history to last 16 messages for token efficiency
      ...history.slice(-16).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message.trim() },
    ];

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://studio.tangison.com",
        "X-Title": "TANGISON STUDIO AI Assistant",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      // Detect authentication failures (invalid/expired API key)
      if (response.status === 401) {
        console.error("Chat API: OpenRouter API key is invalid or expired (401)");
        return NextResponse.json(
          { error: "AI service authentication failed. The API key needs to be updated. Please contact studio@tangison.com." },
          { status: 503 }
        );
      }

      // Rate limiting
      if (response.status === 429) {
        console.error("Chat API: OpenRouter rate limit exceeded (429)");
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      console.error("OpenRouter API Error:", response.status, errorBody);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}
