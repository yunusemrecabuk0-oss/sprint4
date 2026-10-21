import type { CampusEvent } from "../../types/campus-event";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p className="kategori">{event.category}</p>
      <p><strong>Tarih:</strong> {event.date}, {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p>{event.description}</p>
      <button onClick={() => onShowDetail(event.id)}>Detayları gör</button>
    </article>
  );
}

export default EventCard;