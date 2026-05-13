"use client";

import Image from "next/image";

type Variety = { name: string; photo: string };

export default function ScrollToVarieties({ varieties }: { varieties: Variety[] }) {
  if (varieties.length === 0) return null;

  const handleClick = () => {
    document.getElementById("varieties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        marginTop: "32px",
        paddingTop: "24px",
        borderTop: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div style={{ display: "flex" }}>
        {varieties.slice(0, 4).map((v, i) => (
          <div
            key={v.name}
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid white",
              marginLeft: i === 0 ? 0 : "-10px",
              background: "var(--green-surface)",
              flexShrink: 0,
            }}
          >
            {v.photo && (
              <Image src={v.photo} alt={v.name} fill className="object-cover" sizes="40px" />
            )}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: "13px", color: "var(--ink-soft)", fontWeight: 500 }}>
          {varieties.length} {varieties.length === 1 ? "variety" : "varieties"}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "8px",
            padding: "5px 12px",
            borderRadius: "20px",
            background: "var(--green-surface)",
            color: "var(--green-ink)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
        >
          Scroll to explore
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "bounce-down 1.4s ease-in-out infinite" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
