import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-ust">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
          </figure>
        )}
        <div className="kunye">
          <h3>Etkinlik Künyesi</h3>
          <p><strong>Tarih:</strong> {event.date}, {event.time}</p>
          <p><strong>Yer:</strong> {event.location}</p>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        </div>
      </div>
      <div className="detay-alt">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="detay-butonlar">
          <button onClick={onBack}>&larr; Listeye dön</button>
          <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;