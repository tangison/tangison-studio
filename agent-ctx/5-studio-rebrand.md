# Task 5: Rebrand AI Chat Widget to Studio-Specific

## Summary

Rebranded the AI chat widget from TANGISON (AI lab) to TANGISON STUDIO (creative agency), replaced the custom SVG mark with the favicon image, and updated all text references throughout the widget and system prompt.

## Files Modified

### 1. `/home/z/tangison-studio/src/app/api/chat/route.ts`

**SYSTEM_PROMPT changes:**
- Replaced caveman personality ("smart caveman who knows technology", "grunt with wisdom") with professional, concise, knowledgeable personality about creative design
- Updated identity from "Tangison AI" / "TANGISON applied AI laboratory" to "Tangison Studio Assistant" / "TANGISON STUDIO creative digital agency"
- Updated location reference from `tangison.com` to `studio.tangison.com`
- Replaced AI-focused services (Applied AI, AI Infrastructure, R&D, Products) with studio services:
  - Website Design
  - Website Development
  - Application Design
  - Product Design
  - Brand Systems
  - Design Systems
  - Creative Direction
- Removed product references (SkillsCamp, Tangison Agent, SMEFrog Academy, Feorm)
- Updated approach section with design philosophy ("Design with intent", "Function drives form")
- Updated target audience from "Organizations in Africa that need AI systems" to "Organizations that need considered, well-crafted digital design"
- Updated pricing redirect to `studio.tangison.com/contact`
- Kept greeting: "Tangison Studio. How can we help?"
- Kept artifact formatting support (features, steps, compare, links)
- Kept voice mode rules

**HTTP headers updated:**
- `HTTP-Referer`: `https://tangison.com` → `https://studio.tangison.com`
- `X-Title`: `TANGISON AI Assistant` → `TANGISON STUDIO Assistant`

### 2. `/home/z/tangison-studio/src/components/tangison/ai-widget.tsx`

**Avatar changes:**
- Removed `TangisonMark` SVG component (custom SVG with lines and rectangles)
- Added `StudioAvatar` component using Next.js `Image` with `/brand/favicon.webp`
- Added `import Image from "next/image"`

**Text updates (10 locations):**
- Greeting message: "Tangison Studio AI. What do you need?" → "Tangison Studio. How can we help?"
- Header title: "TANGISON AI" → "TANGISON STUDIO"
- Header subtitle: "Applied AI. Ask anything." → "Creative Agency. Ask anything."
- Notification bubble: "Tangison AI. Ask anything." → "Tangison Studio. Ask anything."
- Footer: "TANGISON AI" → "TANGISON STUDIO"
- Bot message label: "TANGISON AI" → "TANGISON STUDIO"
- Hover tooltip: "Tangison AI" → "Tangison Studio"
- Trigger aria-labels: "Close/Open Tangison Studio AI" → "Close/Open Tangison Studio"
- Notification aria-label: "Open Tangison AI chat" → "Open Tangison Studio chat"
- Dialog aria-label: "Tangison AI Chat" → "Tangison Studio Chat"

**Suggested prompts updated:**
- "What does Tangison Studio build?" → "What services does Tangison Studio offer?"
- "How does self-hosted AI work?" → "How does the design process work?"
- "What industries do you serve?" (kept)
- "How do I engage Tangison Studio?" → "How do I start a project with the studio?"

**Other:**
- Removed caveman reference comment ("max ~80 words for caveman style" → "max ~80 words")
- Trigger button: Replaced `TangisonMark` with `StudioAvatar`, kept signal-ring-expand animation
- Header: Replaced `TangisonMark` with `StudioAvatar`
- All voice functionality (TTS, STT, voice mode toggle) preserved
- All artifact rendering preserved

## Verification
- `bun run lint` passes with no errors
- Favicon confirmed at `/home/z/tangison-studio/public/brand/favicon.webp`
- Dev server running successfully on port 3000
