"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Shield, Layers } from "lucide-react";


const metrics = [
  { icon: Users, value: 10000000, suffix: "+", label: "App Downloads" },
  { icon: Star, value: 4.8, suffix: "★", label: "Avg. Store Rating", decimal: true },
  { icon: Shield, value: 99.9, suffix: "%", label: "Crash-Free Rate", decimal: true },
  { icon: Layers, value: 30, suffix: "+", label: "Apps Shipped" },
];

function CountUp({ target, suffix, decimal, inView }: { target: number; suffix: string; decimal?: boolean; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (decimal) {
        setCount(parseFloat((eased * target).toFixed(1)));
      } else {
        setCount(Math.floor(eased * target));
      }

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target, decimal]);

  const formatNumber = (n: number) => {
    if (!decimal && n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
    if (!decimal && n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return decimal ? n.toFixed(1) : n.toString();
  };

  return (
    <span className="gradient-text" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800 }}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" style={{ padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p style={{ fontSize: "12px", color: "#D946EF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "12px" }}>
            About
          </p>
          <p style={{
            fontSize: "18px",
            color: "#cbd5e1",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}>
            I am a mobile app developer specializing in building modern, user-friendly applications using Flutter and Firebase. I focus on creating efficient, scalable, and well-structured solutions with clean UI/UX design and smooth performance. I have experience working with backend integration, APIs, and real-time features to deliver complete mobile solutions. I am committed to continuous learning and delivering high-quality work that meets client needs and enhances user experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        > 
        //jnmgiyguttu
          <p style={{ fontSize: "12px", color: "#D946EF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "12px" }}>
            Impact
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: "#f8fafc" }}>
            Numbers That Speak
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid-metrics"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                style={{ position: "relative" }}
              >
                <div
                  className="glass"
                  style={{
                    borderRadius: "16px",
                    padding: "clamp(24px, 3vw, 32px)",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "background 0.3s",
                  }}
                >
                  {/* Bottom glow border */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "66%",
                    height: "2px",
                    background: "linear-gradient(90deg, #D946EF, #F97316)",
                    opacity: 0.4,
                  }} />

                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}>
                    <Icon size={22} color="#D946EF" />
                  </div>

                  <CountUp target={metric.value} suffix={metric.suffix} decimal={metric.decimal} inView={isInView} />

                  <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>{metric.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
