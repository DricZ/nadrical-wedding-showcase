import { motion } from "framer-motion";
import {
  CheckCircle2,
  Navigation,
  Images,
  MessageSquare,
  Clock,
  Music,
} from "lucide-react";

export const FeatureHighlight = () => {
  const features = [
    {
      title: "Desain Eksklusif",
      description:
        "Pilihan template premium yang dirancang khusus untuk memukau tamu Anda.",
      icon: <Images size={24} />,
    },
    {
      title: "RSVP & Ucapan",
      description:
        "Tamu dapat mengonfirmasi kehadiran dan memberikan ucapan langsung di website.",
      icon: <MessageSquare size={24} />,
    },
    {
      title: "Navigasi Lokasi",
      description:
        "Integrasi Google Maps untuk memudahkan tamu menemukan lokasi acara.",
      icon: <Navigation size={24} />,
    },
    {
      title: "Hitung Mundur",
      description:
        "Bikin tamu semakin antusias dengan fitur countdown menuju hari bahagia.",
      icon: <Clock size={24} />,
    },
    {
      title: "Latar Belakang Musik",
      description:
        "Tambahkan lagu favorit untuk membangun suasana romantis saat tamu membuka undangan.",
      icon: <Music size={24} />,
    },
    {
      title: "Tanpa Batas Tamu",
      description:
        "Sebarkan undangan ke sebanyak mungkin tamu tanpa khawatir biaya tambahan.",
      icon: <CheckCircle2 size={24} />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-space-bold text-foreground leading-[1.1] mb-6">
              Lebih dari sekadar <br className="hidden md:block" />
              <span className="text-primary">undangan biasa.</span>
            </h2>
            <p className="font-jakarta text-lg text-muted-foreground leading-relaxed">
              Kami merancang setiap fitur untuk memberikan kemudahan bagi Anda
              dan pengalaman interaktif yang menyenangkan bagi para tamu.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-end">
            {/* Optional illustration or graphic could go here */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-space-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-jakarta text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
