import { motion } from "framer-motion";
import {
  QrCode,
  MonitorPlay,
  Camera,
  BookHeart,
  ShieldCheck,
  CloudDownload,
} from "lucide-react";

export const FeatureHighlight = () => {
  const features = [
    {
      title: "Seamless QR Access",
      description:
        "Guests scan the QR code to upload photos instantly, no apps or accounts required.",
      icon: <QrCode size={24} />,
    },
    {
      title: "Live Venue Feed",
      description:
        "Display candid photos and heartfelt wishes live on your venue screen as they happen.",
      icon: <MonitorPlay size={24} />,
    },
    {
      title: "Candid Memory Coverage",
      description:
        "Capture authentic moments and hidden gems that traditional photographers might miss.",
      icon: <Camera size={24} />,
    },
    {
      title: "Digital Guestbook & Wishes",
      description:
        "Collect personal messages, photo & video, and warm congratulations alongside every photo.",
      icon: <BookHeart size={24} />,
    },
    {
      title: "Host Control & Moderation",
      description:
        "Review, filter, or approve photos before they appear on the live venue screen.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Timeless Cloud Vault",
      description:
        "Download all high-resolution photos and videos safely archived for a lifetime.",
      icon: <CloudDownload size={24} />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-card border-y border-border">
      <div className="container px-6 mx-auto md:px-12">
        <div className="flex flex-col items-center gap-12 mb-16 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-space-bold text-foreground leading-[1.1] mb-6">
              Capturing Every Moment.
            </h2>
            <p className="text-lg leading-relaxed font-jakarta text-muted-foreground">
              Kami merancang setiap fitur untuk memberikan kemudahan bagi Anda
              dan pengalaman interaktif yang menyenangkan bagi para tamu.
            </p>
          </div>
          <div className="flex justify-end md:w-1/2">
            {/* Optional illustration or graphic could go here */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 transition-shadow duration-300 border bg-background rounded-2xl border-border hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-6 transition-transform duration-300 bg-secondary rounded-xl text-primary group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-space-bold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed font-jakarta text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
