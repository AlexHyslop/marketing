// Kent Services logo: a text-message bubble with a K, because an enquiry
// arriving by text is what we sell. Paths, not text, so it never depends
// on a font loading.

export function LogoMark({ className = "h-9 w-9", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path
        d="M8 3h32a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H19l-9 8v-8H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z"
        fill={inverse ? "#ffffff" : "#47653a"}
      />
      <path
        d="M14 10h6.5v8.6L28 10h8l-9.2 10.2L36.5 30h-8.2l-6.4-7.2-1.4 1.5V30H14z"
        fill={inverse ? "#47653a" : "#ffffff"}
      />
    </svg>
  );
}

export function Logo({ size = "md", inverse = false }: { size?: "sm" | "md"; inverse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={size === "sm" ? "h-7 w-7" : "h-10 w-10"} inverse={inverse} />
      <span className={`headline ${size === "sm" ? "text-2xl" : "text-3xl"} ${inverse ? "text-white" : ""}`}>
        Kent Services
      </span>
    </span>
  );
}
