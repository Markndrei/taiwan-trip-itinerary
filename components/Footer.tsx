"use client";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 border flex items-center justify-center"
                style={{ borderColor: "var(--vermillion)" }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--vermillion)" }}
                >
                  台
                </span>
              </div>
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "rgba(245,240,232,0.5)", letterSpacing: "0.25em" }}
              >
                Taiwan 2027
              </span>
            </div>
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "rgba(245,240,232,0.4)",
                fontWeight: 300,
                maxWidth: "24rem",
                lineHeight: 1.7,
              }}
            >
              A personal travel itinerary for a spring journey through Taiwan, 
              January 11 - 15, 2027. Seven days, four cities, one beautiful island.
            </p>
          </div>

          {/* Center - Large CN character */}
          <div
            className="font-display hidden lg:block"
            style={{
              fontSize: "6rem",
              fontWeight: 300,
              color: "rgba(245,240,232,0.2)",
              lineHeight: 1,
            }}
          >
            台灣
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            {[
              { label: "March 15, 2027", cn: "出發日期" },
              { label: "March 21, 2027", cn: "回程日期" },
              { label: "4 Cities · 8 Destinations", cn: "旅行規模" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span
                  className="font-mono text-xs"
                  style={{
                    color: "rgba(245,240,232,0.25)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.cn}
                </span>
                <div className="h-px w-6" style={{ background: "rgba(245,240,232,0.15)" }} />
                <span
                  className="font-body"
                  style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.6)", fontWeight: 300 }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }}
        >
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(245,240,232,0.2)", letterSpacing: "0.1em" }}
          >
            © 2027 Banging BB Taiwan Trip Itinerary
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-xs flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              color: "rgba(245,240,232,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "0.6rem",
            }}
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}