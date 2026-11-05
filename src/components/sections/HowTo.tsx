import { motion } from "framer-motion";
import { QrCode, MonitorPlay, Camera } from "lucide-react";

export const HowTo = () => {
  const features = [
    {
      title: "Guests Scan the QR",
      description:
        "Guests scan the QR code on their tables using their smartphones—no app downloads or registration needed.",
      icon: <QrCode size={24} />,
    },
    {
      title: "Take a Pic & Share",
      description:
        "Guests select their favorite candid photos or videos, add a personal wish, and upload them instantly.",
      icon: <MonitorPlay size={24} />,
    },
    {
      title: "Live Social Feed & Save Forever",
      description:
        "Photos appear instantly in an interactive, feed for everyone to see, with full-resolution downloads saved for a lifetime",
      icon: <Camera size={24} />,
    },
  ];

  return (
    <section id="howto" className="py-24 bg-card border-y border-border">
      <div className="container px-6 mx-auto md:px-12">
        <div className="flex flex-col items-center gap-2 mb-16">
          <h2 className="text-4xl md:text-5xl font-space-bold text-foreground leading-[1.1] text-center">
            How It Works.
          </h2>
          <p className="text-lg leading-relaxed text-center font-jakarta text-muted-foreground">
            Just 3 Simple Steps
          </p>
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
