export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className ?? ""}`}
      aria-label="SWEverse logo"
    >
      {/* Icon mark — terminal cursor in a rounded square */}
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/20">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary"
        >
          <path
            d="M7 8L3 12L7 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 8L21 12L17 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 4L10 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </span>

      {/* Wordmark */}
      <span className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-white">
        SWE
        <span className="text-primary">verse</span>
      </span>
    </span>
  );
}
