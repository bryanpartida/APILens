export function BrandMark({ className = "h-11 w-11" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-lime-300/40 bg-lime-300/10 text-lime-300 shadow-[0_0_22px_rgba(163,230,53,0.12)] ${className}`}
      aria-hidden="true"
    >
      <span className="font-mono text-xl font-semibold">{`{}`}</span>
    </div>
  );
}

function IconBase({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function SearchIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function DatabaseIcon({ className }) {
  return (
    <IconBase className={className}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </IconBase>
  );
}

export function GridIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V3" />
    </IconBase>
  );
}

export function EyeIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function BracesIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M10 4H8a2 2 0 0 0-2 2v3c0 1.1-.9 2-2 2 1.1 0 2 .9 2 2v3a2 2 0 0 0 2 2h2" />
      <path d="M14 4h2a2 2 0 0 1 2 2v3c0 1.1.9 2 2 2-1.1 0-2 .9-2 2v3a2 2 0 0 1-2 2h-2" />
    </IconBase>
  );
}

export function HashIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 9h14" />
      <path d="M4 15h14" />
      <path d="M10 3 8 21" />
      <path d="m16 3-2 18" />
    </IconBase>
  );
}
