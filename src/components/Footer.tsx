import { Link } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="py-12 mt-auto border-t bg-card border-border">
      <div className="container px-6 mx-auto md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-space-bold text-primary">
              {settings?.wedding_logo || settings?.app_logo ? (
                <img
                  src={settings?.wedding_logo || settings.app_logo}
                  alt={settings?.app_name || "Logo"}
                  className="object-contain w-auto h-8"
                />
              ) : (
                <>
                  {settings?.app_name || "Nadrical"}
                  <span className="text-xl text-muted-foreground font-space-regular">
                    .wedding
                  </span>
                </>
              )}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground font-jakarta">
              Undangan pernikahan digital premium dengan desain elegan, fitur
              lengkap, dan pengalaman yang tak terlupakan untuk momen spesial
              Anda.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-space-medium text-foreground">Layanan</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Undangan Website
                </Link>
              </li>
              <li>
                <Link
                  to="/themes"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Katalog Tema
                </Link>
              </li>
              <li>
                <Link
                  to="/#pricing"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Harga Paket
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-space-medium text-foreground">Kontak</h3>
            <ul className="flex flex-col gap-2">
              {settings?.company_phone && (
                <li>
                  <a
                    href={`https://wa.me/${settings.company_phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {settings?.company_website && (
                <li>
                  <a
                    href={`https://${settings.company_website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                  >
                    Website
                  </a>
                </li>
              )}
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t border-border md:flex-row">
          <p className="text-xs font-jakarta text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            {settings?.copyright || settings?.app_name || "Nadrical Wedding"}.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
