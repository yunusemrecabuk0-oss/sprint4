import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import type { PageName } from "./types/page";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header 
        title={currentTitle} 
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." 
      />
      
      <Navigation current={page} onNavigate={go} />

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList 
              events={upcoming} 
              onShowDetail={(id) => go("detail", id)} 
            />
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
            
            <EventFilter 
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            
            {filtered.length > 0 && (
              <p className="sonuc-bilgi">{filtered.length} etkinlik listeleniyor.</p>
            )}
            
            <EventList 
              events={filtered} 
              onShowDetail={(id) => go("detail", id)} 
              emptyText="Bulunamadı" 
            />
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && selected && (
          <EventDetail 
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {page === "detail" && !selected && (
          <div className="hata">
            <p>Etkinlik bulunamadı.</p>
            <button onClick={() => go("events")}>Listeye dön</button>
          </div>
        )}

        {/* EKLE / GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <EventForm 
            title={page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            categories={categories}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;