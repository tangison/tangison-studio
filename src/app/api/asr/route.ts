import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { audio } = await req.json();

    if (!audio || typeof audio !== "string") {
      return NextResponse.json({ error: "Audio base64 data is required" }, { status: 400 });
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const response = await zai.audio.asr.create({
      file_base64: audio,
    });

    return NextResponse.json({
      success: true,
      transcription: response.text,
    });
  } catch (error) {
    console.error("ASR API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Speech recognition failed" },
      { status: 500 }
    );
  }
}
