import { motion } from "framer-motion";
import { MainButton } from "../ui/MainButton";
import { Check } from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";

export const Pricing = () => {
  const { settings } = useSettings();
  const waNumber = settings?.company_phone
    ? settings.company_phone.replace(/\D/g, "")
    : "6281234567890";
  const appName = settings?.app_name || "Nadrical";

  const plans = [
    {
      name: "Basic",
      price: "150K",
      description: "Cocok untuk pernikahan intim dengan tamu terbatas.",
      features: [
        "Desain Template Standar",
        "Masa Aktif 3 Bulan",
        "RSVP & Buku Tamu",
        "Navigasi Lokasi",
        "Tanpa Custom Musik",
        "Max 100 Tamu",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "299K",
      description:
        "Kustomisasi penuh dengan fitur interaktif untuk momen terbaik.",
      features: [
        "Semua Template Premium",
        "Masa Aktif 1 Tahun",
        "Unimited Tamu VIP",
        "Custom Musik Latar",
        "Galeri Foto (Max 20)",
        "Hitung Mundur Acara",
        "Kirim via WhatsApp",
      ],
      popular: true,
    },
    {
      name: "Exclusive",
      price: "500K",
      description:
        "Pelayanan spesial dengan kustomisasi desain sesuai tema Anda.",
      features: [
        "Semua Fitur Premium",
        "Masa Aktif Selamanya",
        "Desain Custom Eksklusif",
        "Galeri Video & Foto (Unlimited)",
        "Buku Tamu Interaktif",
        "Prioritas Support 24/7",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-space-bold text-foreground mb-6">
            Pilihan Paket
          </h2>
          <p className="font-jakarta text-lg text-muted-foreground">
            Harga transparan tanpa biaya tersembunyi. Pilih paket yang paling
            sesuai dengan kebutuhan pernikahan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular
                  ? "border-primary bg-background shadow-xl scale-100 md:scale-105 z-10"
                  : "border-border bg-background"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-jakarta-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Terpopuler
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-space-bold text-2xl text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="font-jakarta text-sm text-muted-foreground h-10">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-space-bold text-4xl text-foreground">
                    Rp {plan.price}
                  </span>
                  <span className="font-jakarta text-muted-foreground">
                    /acara
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-primary shrink-0" />
                      <span className="font-jakarta text-sm text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <MainButton
                  text="Pilih Paket Ini"
                  variant={plan.popular ? "primary" : "outline"}
                  fullWidth
                  href={`https://wa.me/${waNumber}?text=Halo ${appName}, saya tertarik dengan paket ${plan.name} seharga Rp ${plan.price}`}
                  external
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
