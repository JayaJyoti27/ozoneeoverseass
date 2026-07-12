import type { CSSProperties } from "react";

export function Blob({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={`pointer-events-none absolute ${className}`}
      style={style}
    >
      <path
        fill="#EAF2FC"
        d="M421,340Q394,430,304,461Q214,492,146,428Q78,364,89,275Q100,186,177,133Q254,80,342,101Q430,122,455,211Q480,300,421,340Z"
      />
    </svg>
  );
}

export function DotGrid({
  className = "",
  cols = 8,
  rows = 6,
}: {
  className?: string;
  cols?: number;
  rows?: number;
}) {
  const dots = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x * 14 + 3}
          cy={y * 14 + 3}
          r={1.6}
          fill="#1E4D8C"
          opacity={0.35}
        />,
      );
    }
  }
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      width={cols * 14}
      height={rows * 14}
    >
      {dots}
    </svg>
  );
}

export function GoldUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 12"
      className={`inline-block ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M2,8 Q100,-4 198,6"
        stroke="#C9A646"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
