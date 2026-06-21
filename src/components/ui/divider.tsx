export function Divider() {
  return (
    <div className="flex items-center gap-3 my-12">
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-bg-tertiary to-transparent" />
      <span className="w-1 h-1 rounded-full bg-text-muted" />
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-bg-tertiary to-transparent" />
    </div>
  );
}
