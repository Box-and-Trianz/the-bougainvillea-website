type Props = { children: React.ReactNode; className?: string; light?: boolean };

export default function Eyebrow({ children, className = "", light = false }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-10 bg-gold/60" />
      <span
        className={`text-[11px] font-body font-semibold uppercase tracking-luxe ${
          light ? "text-champagne/90" : "text-gold"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
