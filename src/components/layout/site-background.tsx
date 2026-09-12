export function SiteBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background-primary" />
      <div className="absolute inset-0 site-aurora" />
      <div className="absolute inset-0 site-grid" />
    </div>
  );
}
