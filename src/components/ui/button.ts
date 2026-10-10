type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold-400 text-ink hover:bg-gold-500",
  secondary: "border border-gold-500 text-gold-800 hover:bg-gold-50",
  ghost: "text-ink hover:bg-gold-50",
  onDark: "text-gold-50 ring-1 ring-white/25 hover:bg-white/10", // outline button for dark backgrounds (footer)
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}
