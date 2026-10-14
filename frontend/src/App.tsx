import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const currentTitle = page === "detail" && selected ? selected.title : "Kampüs Etkinlikleri";

  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri — ${selected.title}`;
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri — Tüm Etkinlikler";
    } else if (page === "add") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Güncelle";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kategori">{event.category}</p>
        <p><strong>Tarih:</strong> {event.date}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p>{event.description}</p>
        <button onClick={() => go("detail", event.id)}>Detayları gör</button>
      </article>
    );
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <header className="site-baslik">
        <h1>{currentTitle}</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav className="menu">
          <button
            onClick={() => go("home")}
            aria-current={page === "home" ? "page" : undefined}
            className={page === "home" ? "aktif" : ""}
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => go("events")}
            aria-current={page === "events" ? "page" : undefined}
            className={page === "events" ? "aktif" : ""}
          >
            Etkinlikler
          </button>
          <button
            onClick={() => go("add")}
            aria-current={page === "add" ? "page" : undefined}
            className={page === "add" ? "aktif" : ""}
          >
            Ekle
          </button>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="grid">
              {upcoming.map(renderCard)}
            </div>
            <button className="tumunu-gor" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section className="etkinlikler-sayfasi">
            <h2>Tüm Etkinlikler</h2>
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>
            <div className="filtreler">
              <input
                type="search"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <p className="sonuc-bilgi">
              {filtered.length === 0 ? "Bulunamadı" : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <div className="grid">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-ust">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                </figure>
              )}
              <div className="kunye">
                <h3>Etkinlik Künyesi</h3>
                <p><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
                <p><strong>Yer:</strong> {selected.location}</p>
                <p><strong>Kategori:</strong> {selected.category}</p>
                <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
              </div>
            </div>
            <div className="detay-alt">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <div className="detay-butonlar">
                <button onClick={() => go("events")}>&larr; Listeye dön</button>
                <button onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
              </div>
            </div>
          </article>
        )}

        {page === "detail" && !selected && (
          <div className="hata">
            <p>Etkinlik bulunamadı.</p>
            <button onClick={() => go("events")}>Listeye dön</button>
          </div>
        )}

        {/* EKLE / GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="form-bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <label htmlFor="title">Etkinlik Adı</label>
            <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

            <label htmlFor="category">Kategori</label>
            <select id="category">
              <option value="">Seçiniz</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label htmlFor="date">Tarih</label>
            <input id="date" type="date" />

            <label htmlFor="time">Saat</label>
            <input id="time" type="time" />

            <label htmlFor="location">Yer</label>
            <input id="location" maxLength={100} placeholder="Örn. A Blok Konferans Salonu" />

            <label htmlFor="capacity">Kontenjan</label>
            <input id="capacity" type="number" min={1} />

            <label htmlFor="description">Açıklama</label>
            <textarea id="description" rows={5} maxLength={500} />

            <button type="submit">Kaydet</button>
          </form>
        )}
      </main>

      <footer>
        <p>Yunus Emre Çabuk — 2416501026 — 2026</p>
      </footer>
    </>
  );
}

export default App;