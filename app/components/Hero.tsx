"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1711925447142-652a1b25047a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1543571345-69f59a77e329?q=80&w=2199&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1749855015869-f952f2b3810e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612263234878-12b62dd50d5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1621899154887-22b1b6f7f5cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1597131519154-80afbae93377?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721998258414-7b87c926c321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611088433323-46fa6b0c7af9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1629096346363-b96e4d9634a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const stats = [
  { value: "40+", label: "Varieties" },
  { value: "3", label: "Categories" },
  { value: "2 yrs", label: "Growing" },
];

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(Math.floor(Math.random() * HERO_IMAGES.length));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "740px", paddingBottom: "100px" }}
    >
      {HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Rooftop garden landscape"
          fill
          className="object-cover"
          priority={i === 0}
          sizes="100vw"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,30,16,0.72) 0%, rgba(10,30,16,0.38) 55%, rgba(10,30,16,0.18) 100%)",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16 w-full">
        <div style={{ paddingTop: "64px", maxWidth: "660px" }}>
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: "0 0 24px",
            }}
          >
            A living garden{" "}
            <em
              style={{ fontStyle: "italic", color: "#E8C97A", fontWeight: 400 }}
            >
              above
            </em>{" "}
            the city.
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "rgba(255,255,255,0.88)",
              maxWidth: "480px",
              lineHeight: 1.65,
              marginBottom: "32px",
            }}
          >
            A small, slow-growing collection of forty-some plants tended on a
            sunlit rooftop in Williamsburg — flowers I cut for the kitchen
            table, fruits I share with neighbours, vegetables that mostly make
            it to dinner.
          </p>

          <div
            className="flex flex-wrap items-center"
            style={{ gap: "12px", marginBottom: "48px" }}
          >
            <a
              href="#plants"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--green-ink)" }}
            >
              Tour the garden
              <ArrowIcon />
            </a>
            <a
              href="#journal"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              Read the journal
            </a>
          </div>

          <div
            className="flex flex-wrap"
            style={{
              gap: "32px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "30px",
                    fontWeight: 400,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.72)",
                    marginTop: "6px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
