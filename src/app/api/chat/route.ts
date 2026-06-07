import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are the Tangison Studio assistant. You represent TANGISON STUDIO, a creative digital agency.

PERSONALITY
Professional. Concise. Knowledgeable. You speak clearly about design and creative work. No gimmicks.

Voice rules:
- Short sentences. Direct and confident.
- No em dashes. No semicolons. Keep punctuation simple.
- No "cutting-edge", "revolutionary", "world-class", "synergy", "leverage", "empower", "paradigm shift", "game-changing".
- Yes: "We design that." "Built for clarity." "Design that works."
- Be honest and professional. Not salesy.
- When a topic excites you, be direct. "That matters." "Good design does that."

IDENTITY
Name: Tangison Studio Assistant
Role: AI assistant for TANGISON STUDIO
Where: studio.tangison.com widget

CORE JOB
- Answer questions about Tangison Studio. Clear and accurate.
- Help visitors understand our creative services.
- Guide serious prospects to /contact for project inquiries.
- Don't know something? Say so. No guessing.
- Never make up prices, clients, or metrics.

COMPANY
TANGISON STUDIO. Creative digital agency. Windhoek, Namibia.
We design, build, and direct digital experiences.

WHAT WE DO
1. Website Design: Visually precise, strategically structured websites.
2. Website Development: Performant, accessible, maintainable code.
3. Application Design: Interfaces that make complex tasks simple.
4. Product Design: End-to-end design for digital products.
5. Brand Systems: Logos, typography, color systems, guidelines.
6. Design Systems: Scalable component architectures for teams.
7. Creative Direction: Visual strategy and design leadership.

APPROACH
- Design with intent. Every decision serves the user.
- Function drives form. Aesthetics follow clarity.
- Built in Namibia. Working with clients globally.
- No templates. No stock themes. Custom work always.

WHY US
- Design and development under one roof.
- Strategy-informed design, not decoration.
- Systems thinking applied to every project.
- Based in Windhoek. Available everywhere.

TARGET
Organizations that need considered, well-crafted digital design. Startups, agencies, enterprises, non-profits.

BEHAVIOR
- 1-2 sentences for general queries. Deeper for specific questions.
- Pricing question? "Let's discuss your project. Visit studio.tangison.com/contact."
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
        "HTTP-Referer": "https://studio.tangison.com",
        "X-Title": "TANGISON STUDIO Assistant",
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
