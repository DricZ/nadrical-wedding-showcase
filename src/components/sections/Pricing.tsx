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
      description:
        "Ideal for intimate ceremonies, holy matrimony, or close family gatherings.",
      features: [
        "Photo Uploads Only (Max 4 photos / guest)",
        "Public or Private Upload Options",
        "Up to 50 Invited Guests",
        "Instant Table QR Code Access (No app required)",
        "Digital Wedding Gallery",
        "Interactive Gallery with Real-Time Likes",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "250K",
      description:
        "Our most popular choice for lively celebrations with rich guest interactions.",
      features: [
        "Includes All Basic Plan Features",
        "Photo & Video Uploads (Max 6 media items / guest)",
        "Up to 200 Invited Guests",
        "Interactive Gallery with Real-Time Likes & Comments",
      ],
      popular: true,
    },
    {
      name: "Exclusive",
      price: "500K",
      description:
        "All-in-one unlimited experience for grand celebrations with total peace of mind.",
      features: [
        "Includes All Premium Plan Features",
        "Unlimited Photo & Video Uploads",
        "Unlimited Invited Guests",
        "Pin Couple Wedding Photos to Gallery (By Request)",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 border-t bg-card border-border">
      <div className="container px-6 mx-auto md:px-12">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-6 text-4xl md:text-5xl font-space-bold text-foreground">
            Pricing Plans
          </h2>
          <p className="text-lg font-jakarta text-muted-foreground">
            Transparent pricing with no hidden fees. Choose the ideal plan to
            capture and celebrate your wedding memories.
          </p>
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
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
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-space-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="min-h-[2.5rem] text-sm font-jakarta text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-4xl font-space-bold text-foreground">
                    Rp {plan.price}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-primary shrink-0" />
                      <span className="text-sm font-jakarta text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-border">
                <MainButton
                  text="Choose Plan"
                  variant={plan.popular ? "primary" : "outline"}
                  fullWidth
                  href={`https://wa.me/${waNumber}?text=Hi ${appName}, I am interested in the ${plan.name} plan`}
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
