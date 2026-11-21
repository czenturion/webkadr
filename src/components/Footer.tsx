import { container } from "./section";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className={`${container} py-6 text-center text-sm text-muted`}>
        <p>© {new Date().getFullYear()} WebKadr</p>
      </div>
    </footer>
  );
}
