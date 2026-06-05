"use client";

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp, Mic, MicOff, Volume2, Copy, Check, RotateCcw, ExternalLink } from "lucide-react";
import Link from "next/link";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: number;
  artifact?: ArtifactData | null;
}

type VoiceState = "idle" | "listening" | "processing" | "speaking";

interface ArtifactFeature {
  label: string;
  desc: string;
}
interface ArtifactStep {
  num: number;
  label: string;
  desc: string;
}
interface ArtifactCompareRow {
  label: string;
  a: string;
  b: string;
}
interface ArtifactLink {
  label: string;
  url: string;
}

interface ArtifactData {
  type: "features" | "steps" | "compare" | "links";
  title: string;
  items?: ArtifactFeature[];
  steps?: ArtifactStep[];
  rows?: ArtifactCompareRow[];
  links?: ArtifactLink[];
}

/* ─── Constants ─── */
const SESSION_ID = `tng-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const SUGGESTED_PROMPTS = [
  "What does Tangison Studio build?",
  "How does self-hosted AI work?",
  "What industries do you serve?",
  "How do I engage Tangison Studio?",
];

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "bot",
  content: "Tangison Studio AI. What do you need?",
  timestamp: Date.now(),
  artifact: null,
};

/* ─── Helpers ─── */
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseArtifact(text: string): { content: string; artifact: ArtifactData | null } {
  const artifactRegex = /\[ARTIFACT\]([\s\S]*?)\[\/ARTIFACT\]/;
  const match = text.match(artifactRegex);

  if (!match) return { content: text, artifact: null };

  try {
    const parsed = JSON.parse(match[1].trim());
    const cleanContent = text.replace(artifactRegex, "").trim();
    return { content: cleanContent, artifact: parsed as ArtifactData };
  } catch {
    return { content: text, artifact: null };
  }
}

/* ─── Waveform Visualizer ─── */
function WaveformVisualizer({ state, bars = 5 }: { state: VoiceState; bars?: number }) {
  if (state === "idle") return null;

  const scales =
    state === "listening"
      ? [0.25, 1, 0.5, 1.25, 0.25]
      : state === "processing"
        ? [0.5, 0.75, 0.5, 0.75, 0.5]
        : [0.375, 1.125, 0.625, 0.875, 0.375];

  const duration =
    state === "listening" ? 0.8 : state === "processing" ? 1.2 : 0.6;

  return (
    <div className="flex items-center justify-center gap-[3px] h-5">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] h-4 bg-rust-signal origin-bottom"
          animate={{
            scaleY: scales[i % scales.length],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Custom Tangison Mark Icon ─── */
function TangisonMark({ size = 20, color = "var(--color-skeleton-bone)" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2="40" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <line x1="4" y1="14" x2="20" y2="14" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <line x1="7" y1="6" x2="12" y2="0" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <line x1="17" y1="6" x2="12" y2="0" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <rect x="8.5" y="24" width="7" height="7" fill={color} />
    </svg>
  );
}

/* ─── Copy Button ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 pl-3 opacity-0 group-hover/bot:opacity-60 hover:!opacity-100 transition-opacity"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="w-3 h-3 text-rust-signal" />
      ) : (
        <Copy className="w-3 h-3 text-fog-gray/40" />
      )}
      <span
        className={`font-jetbrains text-[9px] tracking-[0.08em] ${copied ? "text-rust-signal" : "text-fog-gray/40"}`}
      >
        {copied ? "COPIED" : "COPY"}
      </span>
    </button>
  );
}

/* ─── Artifact Renderers ─── */
function ArtifactCard({ artifact }: { artifact: ArtifactData }) {
  if (artifact.type === "features" && artifact.items) {
    return (
      <div
        className="mt-2 border border-skeleton-bone/[0.08] overflow-hidden bg-steel-shadow"
      >
        <div className="px-3 py-2 border-b border-skeleton-bone/[0.06] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-rust-signal" />
          <span className="font-jetbrains text-[9px] text-fog-gray/60 uppercase tracking-[0.15em]">
            {artifact.title}
          </span>
        </div>
        <div className="divide-y divide-skeleton-bone/[0.04]">
          {artifact.items.map((item, i) => (
            <div key={i} className="px-3 py-2 flex gap-2">
              <span className="font-jetbrains text-[11px] text-rust-signal shrink-0 mt-0.5">+</span>
              <div>
                <span className="font-satoshi text-[12px] text-skeleton-bone font-medium">{item.label}</span>
                <span className="block font-satoshi text-[11px] text-fog-gray/50 leading-snug">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (artifact.type === "steps" && artifact.steps) {
    return (
      <div
        className="mt-2 border border-skeleton-bone/[0.08] overflow-hidden bg-steel-shadow"
      >
        <div className="px-3 py-2 border-b border-skeleton-bone/[0.06] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-rust-signal" />
          <span className="font-jetbrains text-[9px] text-fog-gray/60 uppercase tracking-[0.15em]">
            {artifact.title}
          </span>
        </div>
        <div className="divide-y divide-skeleton-bone/[0.04]">
          {artifact.steps.map((step) => (
            <div key={step.num} className="px-3 py-2 flex gap-3 items-start">
              <span className="font-jetbrains text-[11px] text-rust-signal/70 shrink-0 w-5 text-right">{String(step.num).padStart(2, "0")}</span>
              <div>
                <span className="font-satoshi text-[12px] text-skeleton-bone font-medium">{step.label}</span>
                <span className="block font-satoshi text-[11px] text-fog-gray/50 leading-snug">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (artifact.type === "compare" && artifact.rows) {
    return (
      <div
        className="mt-2 border border-skeleton-bone/[0.08] overflow-hidden bg-steel-shadow"
      >
        <div className="px-3 py-2 border-b border-skeleton-bone/[0.06] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-rust-signal" />
          <span className="font-jetbrains text-[9px] text-fog-gray/60 uppercase tracking-[0.15em]">
            {artifact.title}
          </span>
        </div>
        <div className="divide-y divide-skeleton-bone/[0.04]">
          {artifact.rows.map((row, i) => (
            <div key={i} className="px-3 py-2 grid grid-cols-3 gap-2 text-[11px]">
              <span className="font-jetbrains text-fog-gray/50 uppercase tracking-wider">{row.label}</span>
              <span className="font-satoshi text-skeleton-bone/70">{row.a}</span>
              <span className="font-satoshi text-skeleton-bone/70">{row.b}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (artifact.type === "links" && artifact.links) {
    return (
      <div
        className="mt-2 border border-skeleton-bone/[0.08] overflow-hidden bg-steel-shadow"
      >
        <div className="px-3 py-2 border-b border-skeleton-bone/[0.06] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-rust-signal" />
          <span className="font-jetbrains text-[9px] text-fog-gray/60 uppercase tracking-[0.15em]">
            {artifact.title}
          </span>
        </div>
        <div className="divide-y divide-skeleton-bone/[0.04]">
          {artifact.links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="px-3 py-2 flex items-center justify-between hover:bg-skeleton-bone/[0.03] transition-colors"
            >
              <span className="font-satoshi text-[12px] text-skeleton-bone/80">{link.label}</span>
              <ExternalLink className="w-3 h-3 text-fog-gray/30" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ─── Main Widget Component ─── */
export function TangisonAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [notification, setNotification] = useState(false);
  const notificationDismissedRef = useRef(false);

  // Voice state — persist voiceMode in sessionStorage
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [voiceMode, setVoiceMode] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("tng-voice-mode") === "true";
    } catch {
      return false;
    }
  });
  const [transcript, setTranscript] = useState("");

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mounted state
  const mounted = useSyncExternalStore(
    useCallback((onStoreChange) => {
      onStoreChange();
      return () => {};
    }, []),
    () => true,
    () => false
  );

  // Voice support detection
  const voiceSupported = useSyncExternalStore(
    useCallback((onStoreChange) => {
      onStoreChange();
      return () => {};
    }, []),
    () => typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window),
    () => false
  );

  // Init speech synth ref on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Show notification after 3s
  useEffect(() => {
    if (isOpen || notificationDismissedRef.current) return;
    const timer = setTimeout(() => setNotification(true), 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      notificationDismissedRef.current = true;
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      synthRef.current?.cancel();
    };
  }, []);

  /* ─── Backend TTS (high-quality, primary) ─── */
  const speakBackend = useCallback(async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setVoiceState("speaking");

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, speed: 0.88 }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setVoiceState("idle");
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setVoiceState("idle");
        URL.revokeObjectURL(url);
      };

      await audio.play();
    } catch {
      setVoiceState("idle");
    }
  }, []);

  /* ─── Browser-native TTS (fallback only) ─── */
  const speakNative = useCallback((text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 0.85;
    utterance.volume = 1;

    const voices = synthRef.current.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.includes("Google UK") ||
        v.name.includes("Daniel") ||
        v.name.includes("Alex")
    );
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setVoiceState("speaking");
    utterance.onend = () => setVoiceState("idle");
    utterance.onerror = () => setVoiceState("idle");

    synthRef.current.speak(utterance);
  }, []);

  /* ─── Speak (prefers backend for human voice) ─── */
  const speak = useCallback(
    (text: string) => {
      // Strip markdown for voice
      const clean = text
        .replace(/\[ARTIFACT\][\s\S]*?\[\/ARTIFACT\]/g, "")
        .replace(/#{1,6}\s/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/^[-•]\s/gm, "")
        .trim();

      // Truncate for voice (max ~80 words for caveman style)
      const words = clean.split(/\s+/);
      const truncated = words.length > 80 ? words.slice(0, 80).join(" ") + "." : clean;

      if (!truncated) return;

      // Prefer backend TTS for better human voice; fallback to native
      speakBackend(truncated).catch(() => {
        speakNative(truncated);
      });
    },
    [speakBackend, speakNative]
  );

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setVoiceState("idle");
  }, []);

  /* ─── Send Message ─── */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setTranscript("");
      setIsLoading(true);
      setIsTyping(true);
      setShowPrompts(false);
      stopSpeaking();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: SESSION_ID, message: text.trim() }),
        });

        if (!res.ok) throw new Error("Failed to get response");

        const data = await res.json();
        const { content, artifact } = parseArtifact(data.response);

        const botMsg: Message = {
          id: uid(),
          role: "bot",
          content,
          timestamp: Date.now(),
          artifact,
        };

        setMessages((prev) => [...prev, botMsg]);

        // Auto-speak in voice mode
        if (voiceMode) speak(data.response);
      } catch {
        const errMsg: Message = {
          id: uid(),
          role: "bot",
          content: "Connection lost. Try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    },
    [isLoading, voiceMode, speak, stopSpeaking]
  );

  /* ─── Browser-native STT ─── */
  const startListening = useCallback(() => {
    if (!voiceSupported) return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setVoiceState("listening");
    recognition.onresult = (e: any) => {
      const t = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setTranscript(t);
      if (e.results[e.results.length - 1].isFinal) {
        setVoiceState("idle");
        sendMessage(t);
      }
    };
    recognition.onerror = () => setVoiceState("idle");
    recognition.onend = () => setVoiceState("idle");

    recognitionRef.current = recognition;
    recognition.start();
    stopSpeaking();
  }, [voiceSupported, sendMessage, stopSpeaking]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setVoiceState("idle");
  }, []);

  /* ─── Handle Submit ─── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* ─── Handle Prompt Click ─── */
  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  /* ─── Handle Key Down ─── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ─── Toggle Voice Mode ─── */
  const toggleVoiceMode = () => {
    setVoiceMode((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem("tng-voice-mode", String(next));
      } catch {
        // sessionStorage unavailable
      }
      if (!next) {
        stopSpeaking();
        stopListening();
      }
      return next;
    });
  };

  /* ─── Clear Conversation ─── */
  const clearConversation = useCallback(async () => {
    stopSpeaking();
    stopListening();
    setMessages([GREETING_MESSAGE]);
    setShowPrompts(true);
    setInput("");
    setTranscript("");

    try {
      await fetch(`/api/chat?sessionId=${SESSION_ID}`, { method: "DELETE" });
    } catch {
      // Silently fail
    }
  }, [stopSpeaking, stopListening]);

  /* ─── Close Panel ─── */
  const closePanel = () => {
    setIsOpen(false);
    stopSpeaking();
    stopListening();
  };

  const showNotification = notification && !isOpen;

  if (!mounted) return null;

  return (
    <>
      {/* ─── Trigger Button ─── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-[52px] h-[52px] flex items-center justify-center transition-all duration-300 group"
        style={{
          background: isOpen ? "var(--color-terminal-black)" : "var(--color-atlantic-black)",
          border: isOpen
            ? "1px solid color-mix(in srgb, var(--color-skeleton-bone) 20%, transparent)"
            : "1px solid color-mix(in srgb, var(--color-skeleton-bone) 12%, transparent)",
        }}
        aria-label={isOpen ? "Close Tangison Studio AI" : "Open Tangison Studio AI"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-fog-gray" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <TangisonMark size={22} color="var(--color-skeleton-bone)" />
              <span className="absolute inset-0 border border-rust-signal/30 animate-[signal-ring-expand_2s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="absolute right-full mr-3 whitespace-nowrap font-jetbrains text-[10px] text-fog-gray/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Tangison AI
          </span>
        )}

        {showNotification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-[10px] h-[10px] bg-rust-signal border-2 border-terminal-black"
          />
        )}
      </motion.button>

      {/* ─── Notification Bubble ─── */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[88px] right-6 z-[9998] cursor-pointer max-w-[220px] flex items-center gap-2 px-3.5 py-2.5 bg-atlantic-black border border-skeleton-bone/[0.1]"
            role="button"
            aria-label="Open Tangison AI chat"
          >
            <div className="w-1.5 h-1.5 bg-rust-signal shrink-0" />
            <span className="font-jetbrains text-[11px] text-fog-gray leading-snug">
              Tangison AI. Ask anything.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[84px] right-6 z-[9998] flex flex-col max-sm:fixed max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-screen max-sm:h-dvh bg-atlantic-black border border-skeleton-bone/[0.08]"
            style={{
              width: "min(400px, calc(100vw - 48px))",
              height: "600px",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Tangison AI Chat"
          >
            {/* ─── Header ─── */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 shrink-0 bg-terminal-black border-b border-skeleton-bone/[0.06]"
            >
              <TangisonMark size={28} color="var(--color-skeleton-bone)" />

              <div className="flex-1">
                <div className="font-jetbrains text-[11px] tracking-[0.14em] text-skeleton-bone font-medium">
                  TANGISON AI
                </div>
                <div className="font-jetbrains text-[9px] text-fog-gray/50 tracking-[0.1em] mt-0.5">
                  Applied AI. Ask anything.
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Status */}
                <div className="flex items-center gap-1.5">
                  <div className="relative w-[7px] h-[7px]">
                    <div className="w-[7px] h-[7px] bg-rust-signal absolute" />
                    <div className="absolute inset-0 w-[7px] h-[7px] bg-rust-signal animate-[pulse-ring_2s_ease-out_infinite]" />
                  </div>
                  <span className="font-jetbrains text-[9px] text-rust-signal tracking-[0.1em]">
                    LIVE
                  </span>
                </div>

                {/* Clear button */}
                <button
                  onClick={clearConversation}
                  className="p-1 text-fog-gray/25 hover:text-fog-gray/60 transition-colors"
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>

                {/* Voice mode toggle */}
                {voiceSupported && (
                  <button
                    onClick={toggleVoiceMode}
                    className="p-1 transition-colors"
                    style={{
                      background: voiceMode ? "var(--color-rust-muted)" : "transparent",
                      color: voiceMode ? "var(--color-rust-signal)" : "var(--color-fog-gray)",
                    }}
                    title={voiceMode ? "Disable voice mode" : "Enable voice mode"}
                    aria-label={voiceMode ? "Disable voice mode" : "Enable voice mode"}
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={closePanel}
                  className="text-fog-gray/30 hover:text-fog-gray transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ─── Voice Mode Banner ─── */}
            <AnimatePresence>
              {voiceMode && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: "top" }}
                  className="shrink-0 overflow-hidden"
                >
                  <div
                    className="flex items-center gap-2 px-4 py-1.5 bg-rust-signal/[0.08] border-b border-rust-signal/[0.15]"
                  >
                    <WaveformVisualizer
                      state={voiceState === "speaking" || voiceState === "listening" ? voiceState : "idle"}
                      bars={7}
                    />
                    <span className="font-jetbrains text-[10px] text-rust-signal tracking-[0.1em]">
                      {voiceState === "listening"
                        ? "LISTENING..."
                        : voiceState === "speaking"
                          ? "SPEAKING..."
                          : voiceState === "processing"
                            ? "PROCESSING..."
                            : "VOICE MODE"}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 t-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col"
                >
                  {msg.role === "user" ? (
                    /* User Bubble */
                    <div className="self-end max-w-[85%]">
                      <div
                        className="px-3.5 py-2.5 text-[13.5px] leading-relaxed font-satoshi text-skeleton-bone bg-steel-shadow"
                      >
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    /* Bot Bubble */
                    <div className="self-start max-w-[95%] group/bot">
                      <div className="font-jetbrains text-[9px] text-rust-signal/70 tracking-[0.12em] pl-3 mb-1">
                        TANGISON AI
                      </div>
                      <div
                        className="px-3.5 py-2.5 text-[13.5px] leading-[1.65] font-satoshi text-fog-gray font-normal bg-transparent border-l-2 border-rust-signal/45 pl-3"
                      >
                        {msg.content}
                      </div>

                      {/* Artifact Card */}
                      {msg.artifact && <ArtifactCard artifact={msg.artifact} />}

                      {/* Action row */}
                      <div className="flex items-center gap-3 mt-1">
                        <CopyButton text={msg.content} />
                        <button
                          onClick={() => speak(msg.content)}
                          className="flex items-center gap-1.5 pl-3 opacity-0 group-hover/bot:opacity-60 hover:!opacity-100 transition-opacity"
                          aria-label="Read aloud"
                        >
                          <Volume2 className="w-3 h-3 text-fog-gray/40" />
                          <span className="font-jetbrains text-[9px] text-fog-gray/40 tracking-[0.08em]">
                            {voiceMode ? "REPLAY" : "READ"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Suggested Prompts */}
              <AnimatePresence>
                {showPrompts && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "top" }}
                    className="flex flex-col gap-1.5 pl-3"
                  >
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <motion.button
                        key={prompt}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-left font-jetbrains text-[12px] text-fog-gray/50 px-3 py-2 transition-all duration-300 hover:text-skeleton-bone hover:bg-skeleton-bone/[0.03] hover:border-rust-signal/30 bg-transparent border border-skeleton-bone/[0.08]"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <div
                  className="self-start pl-3.5 border-l-2 border-rust-signal/45"
                >
                  <div className="flex gap-1.5 items-center py-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-rust-signal"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Voice state visualizer (when not in voice mode banner) */}
              {!voiceMode && voiceState !== "idle" && (
                <div className="flex items-center justify-center gap-2 py-2">
                  <WaveformVisualizer state={voiceState} />
                  <span className="font-jetbrains text-[9px] text-fog-gray/40 uppercase tracking-wider">
                    {voiceState === "listening"
                      ? "Listening..."
                      : voiceState === "processing"
                        ? "Processing..."
                        : "Speaking..."}
                  </span>
                </div>
              )}

              {/* Live transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-end max-w-[85%] px-3.5 py-2 text-[13px] text-fog-gray/60 italic font-satoshi bg-steel-shadow border-l-2 border-rust-signal/20"
                >
                  {transcript}
                  <span className="animate-[blink_1s_infinite] ml-0.5">|</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Input Area ─── */}
            <div
              className="shrink-0 px-3 py-3 bg-terminal-black border-t border-skeleton-bone/[0.06]"
            >
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div
                  className="flex-1 flex items-center transition-colors focus-within:border-rust-signal/40 bg-steel-shadow border border-skeleton-bone/[0.07]"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent px-3 py-2.5 text-[13px] font-satoshi text-skeleton-bone placeholder:text-fog-gray/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-signal focus-visible:ring-offset-1"
                    disabled={isLoading || voiceState === "listening"}
                    aria-label="Chat message input"
                  />

                  {/* Microphone Button */}
                  {voiceSupported && (
                    <div className="pr-1">
                      {voiceState === "listening" ? (
                        <button
                          type="button"
                          onClick={stopListening}
                          className="p-2.5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center text-rust-signal bg-rust-signal/15 border border-rust-signal/50"
                          aria-label="Stop listening"
                        >
                          <MicOff className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={startListening}
                          className="p-2.5 text-fog-gray/40 hover:text-fog-gray/70 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-skeleton-bone/[0.08]"
                          disabled={isLoading}
                          aria-label="Voice input"
                        >
                          <Mic className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-[44px] h-[44px] flex items-center justify-center transition-all duration-300 disabled:opacity-30 hover:bg-rust-signal/80 active:scale-95 shrink-0"
                  style={{
                    background: input.trim() && !isLoading ? "var(--color-rust-signal)" : "var(--color-steel-shadow)",
                  }}
                  aria-label="Send message"
                >
                  <ArrowUp className="w-4 h-4 text-skeleton-bone" />
                </button>
              </form>
            </div>

            {/* ─── Footer ─── */}
            <div
              className="flex items-center justify-between px-4 py-1.5 shrink-0 bg-terminal-black border-t border-skeleton-bone/[0.04]"
            >
              <span className="font-jetbrains text-[9px] text-fog-gray/25 tracking-[0.1em]">
                TANGISON AI
              </span>
              <span className="font-jetbrains text-[9px] text-fog-gray/20 tracking-[0.06em]">
                {voiceMode ? "VOICE" : "TEXT"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
