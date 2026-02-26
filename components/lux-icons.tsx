type IconName = "architecture" | "intelligence" | "conversion" | "discovery" | "build" | "launch";

type Props = {
  name: IconName;
  className?: string;
};

export default function LuxIcon({ name, className }: Props) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  if (name === "architecture") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="6" rx="1.5" {...common} />
        <rect x="3" y="14" width="7.5" height="6" rx="1.5" {...common} />
        <rect x="13.5" y="14" width="7.5" height="6" rx="1.5" {...common} />
      </svg>
    );
  }

  if (name === "intelligence") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M12 3.5a7 7 0 0 1 7 7c0 2.3-1.1 4.1-2.7 5.4-.8.6-1.3 1.5-1.3 2.5V20H9v-1.6c0-1-.5-1.9-1.3-2.5A6.9 6.9 0 0 1 5 10.5a7 7 0 0 1 7-7Z" {...common} />
        <path d="M9.5 20h5" {...common} />
      </svg>
    );
  }

  if (name === "conversion") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M4 4v16h16" {...common} />
        <path d="m8 14 3-3 3 2 4-5" {...common} />
        <path d="m18 8 .2-1.7L20 6.5" {...common} />
      </svg>
    );
  }

  if (name === "discovery") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <circle cx="11" cy="11" r="7" {...common} />
        <path d="m20 20-3.5-3.5" {...common} />
      </svg>
    );
  }

  if (name === "build") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="m14 7 3 3-8 8H6v-3l8-8Z" {...common} />
        <path d="m13 8 3 3" {...common} />
        <path d="M4 20h16" {...common} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 19h16" {...common} />
      <path d="M12 4v15" {...common} />
      <path d="m8 8 4-4 4 4" {...common} />
    </svg>
  );
}
