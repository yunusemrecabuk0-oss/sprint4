import type { Category } from "../../types/campus-event";

interface EventFormProps {
  title: string;
  categories: Category[];
  onSubmit: () => void;
}

function EventForm({ title, categories, onSubmit }: EventFormProps) {
  return (
    <form 
      className="form" 
      onSubmit={(e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
        onSubmit();
      }}
    >
      <h2>{title}</h2>
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
  );
}

export default EventForm;