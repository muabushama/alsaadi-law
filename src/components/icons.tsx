type IconProps = { className?: string };

export function IconGavel({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20h10M14 4l6 6M8 14l6-6M4.5 17.5l3-3" />
    </svg>
  );
}
export function IconScroll({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 4h9a3 3 0 0 1 3 3v12H8a3 3 0 0 0-3 3V7a3 3 0 0 1 3-3z" />
      <path d="M9 8h8M9 12h8M9 16h5" />
    </svg>
  );
}
export function IconFamily({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <path d="M4.5 19c.6-3 2.4-4.5 5-4.5s4.4 1.5 5 4.5M14 14.6c1.7.2 3.3 1.4 4 4.4" />
    </svg>
  );
}
export function IconColumns({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M6 6v12M18 6v12M4 18h16M12 6v12" />
    </svg>
  );
}
export function IconShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3z" />
    </svg>
  );
}
export function IconBuilding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20V8l8-4 8 4v12H4z" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}
export function IconStamp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="9" r="4" />
      <path d="M6 20h12M8 16h8v4H8z" />
    </svg>
  );
}
export function IconGold({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17h18M5 17l2.5-8h9L19 17M9 9l3-5 3 5" />
    </svg>
  );
}
export function IconBalance({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18M5 8h14M5 8l-3 6h6L5 8zm14 0-3 6h6l-3-6zM8 21h8" />
    </svg>
  );
}

const map = {
  gavel: IconGavel,
  scroll: IconScroll,
  family: IconFamily,
  columns: IconColumns,
  shield: IconShield,
  building: IconBuilding,
  stamp: IconStamp,
  gold: IconGold,
  balance: IconBalance,
} as const;

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Comp = map[name as keyof typeof map] ?? IconBalance;
  return <Comp className={className} />;
}
