export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`font-bold inline-block ${className}`}>
      <span className="text-foreground">Kids</span>{" "}
      <span className="text-primary">Kiosk</span>
    </div>
  );
}
