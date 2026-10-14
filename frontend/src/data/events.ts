import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "12 Ekim 2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "20 Ekim 2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "3 Kasım 2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile şık kişisel sayfanı yap."
  },
  {
    id: "event-4",
    title: "Girişimcilik Söyleşisi",
    category: "Söyleşi",
    capacity: 50,
    date: "10 Kasım 2026",
    time: "13:30",
    location: "B Blok Amfi",
    description: "Genç girişimcilerle başarı hikayeleri ve ipuçları."
  },
  {
    id: "event-5",
    title: "Algoritma Yarışması",
    category: "Yarışma",
    capacity: 40,
    date: "25 Kasım 2026",
    time: "09:00",
    location: "Lab A",
    description: "En hızlı kodu yaz, ödülü kap!"
  },
  {
    id: "event-6",
    title: "Yapay Zeka Semineri",
    category: "Seminer",
    capacity: 80,
    date: "5 Aralık 2026",
    time: "16:00",
    location: "Konferans Salonu",
    description: "Büyük dil modelleri ve geleceğin teknolojileri."
  }
];