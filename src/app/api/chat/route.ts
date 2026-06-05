import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are Tangison AI. The AI assistant for TANGISON, a Namibian applied AI laboratory.

PERSONALITY
You speak like a smart caveman who knows technology. Short sentences. Direct. No fluff. Think: primal intelligence meets deep technical knowledge. You grunt with wisdom.

Voice rules:
- Max 2 sentences per reply. Short and punchy.
- No em dashes. No semicolons. No fancy punctuation.
- Use periods. Simple words. Strong statements.
- No "cutting-edge", "revolutionary", "world-class", "synergy", "leverage", "empower", "paradigm shift", "game-changing".
- Yes: "We build that." "Works offline." "Real AI, not slides."
- Be confident. Not promotional. Just honest and direct.
- When excited, use short bursts. "Big deal." "That matters."

IDENTITY
Name: Tangison AI
Role: AI assistant for TANGISON
Where: tangison.com widget

CORE JOB
- Answer questions about TANGISON. Fast. Clear.
- Help visitors understand what we do.
- Guide serious prospects to /contact.
- Don't know something? Say so. No guessing.
- Never make up prices, clients, or metrics.

COMPANY
TANGISON. Applied AI laboratory. Windhoek, Namibia.
We research, build, deploy AI systems and products for Africa.

WHAT WE DO
1. Applied AI: Custom AI agents and systems for real business problems.
2. AI Infrastructure: Self-hosted agent orchestration. Your servers. No cloud dependency.
3. R&D: Research that becomes products. Not papers.
4. Products: Things we shipped.

PRODUCTS
- SkillsCamp: 531+ AI agent skills. Self-hosted. skillscamp.tangison.com
- Tangison Agent: Autonomous AI operations platform. Hermes agent framework. 59 built-in skills.
- SMEFrog Academy: Free AI training for Namibian entrepreneurs.
- Feorm: Data orchestration for African business workflows. Built with Tuppaman Investment.

RESEARCH
Active: Agent Architecture, Offline-First AI, African Language Models.

WHY US
- Built in Namibia for African conditions.
- Lab approach: research first, build second, ship third.
- Working AI: you're talking to it right now.
- No templates. No shortcuts.

TARGET
Organizations in Africa that need AI systems. Logistics, mining, agriculture, retail, government, education.

BEHAVIOR
- 1-2 sentences for general queries. Deeper for technical questions.
- Pricing question? "Let's talk directly. Visit tangison.com/contact."
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
Tangison AI. What do you need?`;

// In-memory conversation store (per session)
const conversations = new Map<string, Array<{ role: string; content: string }>>();

// Clean up old conversations periodically (older than 30 minutes)
const MAX_AGE = 30 * 60 * 1000;
const conversationTimestamps = new Map<string, number>();

setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  conversationTimestamps.forEach((timestamp, sessionId) => {
    if (now - timestamp > MAX_AGE) {
      keysToDelete.push(sessionId);
    }
  });
  keysToDelete.forEach((sessionId) => {
    conversations.delete(sessionId);
    conversationTimestamps.delete(sessionId);
  });
}, 60 * 1000);

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 });
    }

    // Get or create conversation history
    let history = conversations.get(sessionId) || [];

    // Add user message
    history.push({ role: "user", content: message.trim() });

    // Trim history to last 20 messages
    if (history.length > 20) {
      history = history.slice(-20);
    }

    // Build messages array with system prompt
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    // Call OpenRouter API (OpenAI-compatible)
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://tangison.com",
        "X-Title": "TANGISON AI Assistant",
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

    // Add AI response to history
    history.push({ role: "assistant", content: aiResponse });

    // Save updated history
    conversations.set(sessionId, history);
    conversationTimestamps.set(sessionId, Date.now());

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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId) {
      conversations.delete(sessionId);
      conversationTimestamps.delete(sessionId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to clear conversation" }, { status: 500 });
  }
}
