import Link from "next/link";

type Variant = "solid" | "gold" | "outline" | "outlineLight";

type Props = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const variants: Record<Variant, string> = {
  solid: "bg-obsidian text-silk hover:bg-gold hover:text-obsidian",
  gold: "bg-gold text-obsidian hover:bg-obsidian hover:text-silk",
  outline: "border border-gold text-obsidian hover:bg-gold hover:text-obsidian",
  outlineLight: "border border-champagne/60 text-silk hover:bg-silk hover:text-obsidian",
};

export default function LuxButton({ to, href, onClick, children, variant = "solid", className = "", type }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 px-8 py-4 text-[12px] font-body font-semibold uppercase tracking-wide-luxe transition-all duration-500 rounded-sm ${variants[variant]} ${className}`;
  if (to)
    return (
      <Link href={to} className={cls}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  return (
    <button type={type || "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
