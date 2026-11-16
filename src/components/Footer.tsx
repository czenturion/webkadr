export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-muted">
        <p>© {new Date().getFullYear()} WebKadr</p>
      </div>
    </footer>
  );
}
