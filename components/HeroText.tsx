"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Types each character one by one, starting after `startDelay` ms
function useTypewriter(text: string, charDelay: number, startDelay: number) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), charDelay);
    return () => clearTimeout(t);
  }, [started, count, text.length, charDelay]);

  return {
    text: text.slice(0, count),
    done: count >= text.length,
  };
}

// Brand intro ends at ~3.6s — start typing right after
const INTRO_END = 3650;
const CHAR_MS   = 65; // ms per character

const LINE1 = "Drive Your";
const LINE2 = "Dream";
const LINE3 = "Car Today";

const L1_START = INTRO_END;
const L1_END   = L1_START + LINE1.length * CHAR_MS;
const L2_START = L1_END + 80;
const L2_END   = L2_START + LINE2.length * CHAR_MS;
const L3_START = L2_END + 80;
const L3_END   = L3_START + LINE3.length * CHAR_MS;
const SUB_START   = L3_END + 250;
const BTN_START   = SUB_START + 500;

export default function HeroText() {
  const l1 = useTypewriter(LINE1, CHAR_MS, L1_START);
  const l2 = useTypewriter(LINE2, CHAR_MS, L2_START);
  const l3 = useTypewriter(LINE3, CHAR_MS, L3_START);

  const [showSub, setShowSub]     = useState(false);
  const [showBtns, setShowBtns]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSub(true), SUB_START);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowBtns(true), BTN_START);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-3xl space-y-6">

      {/* Badge — fades in with hero-content */}
      <div className="section-label shimmer w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Premium Car Showroom
      </div>

      {/* Headline — Bebas Neue, typed left to right */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.8rem, 9vw, 7.5rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          color: "#fff",
          textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          minHeight: "3.2em", // reserve space so layout doesn't jump
        }}
      >
        {/* Line 1 */}
        <span className="block">
          {l1.text}
          {!l1.done && l1.text.length > 0 && <span className="type-cursor">|</span>}
        </span>

        {/* Line 2 — gradient */}
        <span
          className="block"
          style={{
            background: "linear-gradient(135deg,#60a5fa,#a78bfa,#38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minHeight: "1em",
          }}
        >
          {l2.text}
          {l1.done && !l2.done && l2.text.length > 0 && (
            <span className="type-cursor" style={{ WebkitTextFillColor: "#60a5fa" }}>|</span>
          )}
        </span>

        {/* Line 3 */}
        <span className="block" style={{ minHeight: "1em" }}>
          {l3.text}
          {l2.done && !l3.done && l3.text.length > 0 && <span className="type-cursor">|</span>}
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg leading-relaxed max-w-lg"
        style={{
          color: "var(--text-secondary)",
          opacity: showSub ? 1 : 0,
          transform: showSub ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        Explore our exclusive collection of luxury, performance, and family vehicles.
        Unmatched quality, transparent pricing, and a buying experience like no other.
      </p>

      {/* Buttons */}
      <div
        className="flex flex-wrap gap-4 pt-2"
        style={{
          opacity: showBtns ? 1 : 0,
          transform: showBtns ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <Link href="/vehicles" className="btn-primary-glow px-8 py-3 rounded-xl font-semibold text-sm">
          Browse Vehicles
        </Link>
        <Link href="/contact" className="btn-glass px-8 py-3 rounded-xl font-semibold text-sm">
          Book Test Drive
        </Link>
      </div>

      <style jsx global>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .type-cursor {
          display: inline-block;
          font-weight: 100;
          margin-left: 1px;
          animation: cursorBlink 0.65s ease-in-out infinite;
          color: #60a5fa;
        }
      `}</style>
    </div>
  );
}
