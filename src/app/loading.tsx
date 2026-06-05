import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-warm-white flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-8">
        {/* Logo mark with breathing glow */}
        <div className="relative">
          <Image
            src="/images/logo.webp"
            alt="TANGISON logo"
            width={874}
            height={286}
            className="h-8 w-auto opacity-70 relative z-10"
            style={{
              animation: "breathe-glow 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
          />
          <div
            className="absolute inset-0 blur-xl bg-rust-signal/10"
            style={{
              animation: "breathe-glow-bg 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Loading artifact — signal line with traveling pulse */}
        <div className="w-32 h-[1px] bg-ink/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-rust-signal/80 to-transparent"
            style={{
              animation: "signal-travel 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
          />
        </div>

        {/* Subtle status text with cycling */}
        <div className="relative h-4 overflow-hidden">
          <span
            className="font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-[0.4em] absolute inset-0 flex items-center justify-center"
            style={{
              animation: "text-cycle 4.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
          >
            Loading
          </span>
          <span
            className="font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-[0.4em] absolute inset-0 flex items-center justify-center"
            style={{
              animation: "text-cycle 4.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
              animationDelay: "1.4s",
            }}
          >
            Preparing
          </span>
          <span
            className="font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-[0.4em] absolute inset-0 flex items-center justify-center"
            style={{
              animation: "text-cycle 4.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
              animationDelay: "2.8s",
            }}
          >
            Almost ready
          </span>
        </div>
      </div>
    </div>
  );
}
