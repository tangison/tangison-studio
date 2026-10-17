"use client";

/**
 * Root-level error boundary: renders when the root layout itself fails.
 * It replaces the whole document, so it carries its own <html>/<body>
 * and the paper/ink tokens inline (the stylesheet may be the thing that
 * failed). Recovery is a full reload.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111315",
          color: "#f6f4ef",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "36rem" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.64,
              margin: 0,
            }}
          >
            500
          </p>
          <h1 style={{ fontSize: "2.2rem", lineHeight: 1.15, margin: "12px 0 0" }}>
            Something broke on our side.
          </h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6, margin: "16px 0 0" }}>
            The studio site hit an unexpected fault. A reload usually clears
            it. If it keeps happening, the contact page on the main site
            still works.
          </p>
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#f6f4ef",
                color: "#111315",
                border: 0,
                borderRadius: "999px",
                padding: "12px 22px",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="https://www.tangison.com/contact"
              style={{
                color: "#f6f4ef",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                padding: "12px 6px",
              }}
            >
              tangison.com/contact
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: "24px", fontSize: "12px", opacity: 0.45 }}>
              Ref: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
