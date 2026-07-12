import { useEffect, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/components/site/countries-data";
import { getCountryFlagSvg, CountryFlag } from "@/components/site/country-flag";

type GlobeMod = typeof import("react-globe.gl");

export function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const [GlobeComp, setGlobeComp] = useState<GlobeMod["default"] | null>(null);
  const [size, setSize] = useState({ w: 480, h: 480 });
  const [hovered, setHovered] = useState<Country | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  // Client-only dynamic import to avoid SSR of Three.js
  useEffect(() => {
    let cancelled = false;
    import("react-globe.gl").then((mod) => {
      if (!cancelled) setGlobeComp(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const s = Math.min(r.width, r.height);
      setSize({ w: s, h: s });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (!controls) return;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onStart = () => {
      controls.autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
    const onEnd = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 3000);
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);
    return () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [GlobeComp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[560px] mx-auto"
      onMouseMove={(e) => {
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
    >
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, oklch(0.62 0.09 255 / 0.35) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      {GlobeComp ? (
        <GlobeComp
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#93B8D8"
          atmosphereAltitude={0.22}
          showGraticules={false}
          htmlElementsData={COUNTRIES}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlAltitude={0.02}
          htmlElement={(d: any) => {
            const el = document.createElement("div");
            const svg = getCountryFlagSvg(d.code);
            el.innerHTML = `<div style="
              width:32px;height:32px;cursor:pointer;
              filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));
              transform:translate(-50%,-50%);
              transition:transform .15s ease;
              border-radius:6px;overflow:hidden;
              display:flex;align-items:center;justify-content:center;
              background:white;
            ">${svg}</div>`;
            el.style.pointerEvents = "auto";
            el.onmouseenter = () => {
              setHovered(d);
              (el.firstChild as HTMLElement).style.transform = "translate(-50%,-50%) scale(1.35)";
            };
            el.onmouseleave = () => {
              setHovered(null);
              (el.firstChild as HTMLElement).style.transform = "translate(-50%,-50%) scale(1)";
            };
            return el;
          }}
          ringsData={COUNTRIES}
          ringLat={(d: any) => d.lat}
          ringLng={(d: any) => d.lng}
          ringColor={() => (t: number) => `rgba(201,166,70,${1 - t})`}
          ringMaxRadius={2.6}
          ringPropagationSpeed={1.6}
          ringRepeatPeriod={2000}
          ringAltitude={0.005}
        />
      ) : (
        <GlobeFallback />
      )}

      {/* Hover tooltip */}
      {hovered && tip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full bg-white rounded-2xl shadow-[var(--shadow-lift)] border border-border px-3 py-2 text-xs font-medium text-navy whitespace-nowrap"
          style={{ left: tip.x, top: tip.y - 10 }}
        >
          <span className="inline-flex h-5 w-5 mr-1.5 align-middle overflow-hidden rounded-sm">
            <CountryFlag code={hovered.code} className="w-full h-full" />
          </span>
          {hovered.name}
          <span className="ml-2 text-brand-blue font-semibold">· {hovered.roles} open roles</span>
        </div>
      )}

      {/* Floating stat badges */}
      <div className="absolute top-4 right-2 md:top-6 md:right-4 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-[var(--shadow-lift)] border border-border flex items-center gap-2 text-xs md:text-sm font-semibold text-navy">
        <span className="inline-flex h-6 w-6 rounded-full bg-gold/15 text-gold items-center justify-center text-[10px]">
          ★
        </span>
        5,000+ Placements
      </div>
      <div className="absolute bottom-8 left-0 md:left-2 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-[var(--shadow-lift)] border border-border flex items-center gap-2 text-xs md:text-sm font-semibold text-navy">
        <span className="inline-flex h-6 w-6 rounded-full bg-brand-blue/15 text-brand-blue items-center justify-center text-[10px]">
          17
        </span>
        Active Countries
      </div>

      <p className="absolute -bottom-2 inset-x-0 text-center text-xs italic text-muted-foreground">
        Drag to rotate
      </p>
    </div>
  );
}

function GlobeFallback() {
  return (
    <div className="absolute inset-8 rounded-full bg-navy shadow-[var(--shadow-lift)] relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.62 0.09 255 / 0.5), transparent 60%)",
        }}
      />
      {COUNTRIES.slice(0, 9).map((c, i) => (
        <span
          key={c.code}
          className="pulse-dot absolute h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(201,166,70,0.6)]"
          style={{
            left: `${20 + ((i * 37) % 60)}%`,
            top: `${20 + ((i * 53) % 60)}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
