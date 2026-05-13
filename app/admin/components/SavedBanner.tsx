"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SavedBanner({ message = "Changes saved" }: { message?: string }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      // strip ?saved from URL without re-render
      const url = new URL(window.location.href);
      url.searchParams.delete("saved");
      router.replace(url.pathname, { scroll: false });
    }, 3000);
    return () => clearTimeout(t);
  }, [router]);

  if (!visible) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "10px 16px", borderRadius: "8px", marginBottom: "20px",
      background: "var(--green-ink)", border: "none",
      color: "#fff", fontSize: "13px", fontWeight: 500,
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {message}
    </div>
  );
}
