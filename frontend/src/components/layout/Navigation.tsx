import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <button
        onClick={() => onNavigate("home")}
        aria-current={current === "home" ? "page" : undefined}
        className={current === "home" ? "aktif" : ""}
      >
        Ana Sayfa
      </button>
      <button
        onClick={() => onNavigate("events")}
        aria-current={current === "events" ? "page" : undefined}
        className={current === "events" ? "aktif" : ""}
      >
        Etkinlikler
      </button>
      <button
        onClick={() => onNavigate("add")}
        aria-current={current === "add" ? "page" : undefined}
        className={current === "add" ? "aktif" : ""}
      >
        Ekle
      </button>
    </nav>
  );
}

export default Navigation;