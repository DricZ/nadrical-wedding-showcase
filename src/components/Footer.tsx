import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-space-bold text-2xl text-primary mb-4">
              Nadrical
              <span className="text-muted-foreground font-space-regular text-xl">
                .wedding
              </span>
            </h2>
            <p className="text-muted-foreground font-jakarta text-sm leading-relaxed max-w-sm">
              Undangan pernikahan digital premium dengan desain elegan, fitur
              lengkap, dan pengalaman yang tak terlupakan untuk momen spesial
              Anda.
            </p>
          </div>

          <div>
            <h3 className="font-space-medium text-foreground mb-4">Layanan</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Undangan Website
                </Link>
              </li>
              <li>
                <Link
                  to="/themes"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Katalog Tema
                </Link>
              </li>
              <li>
                <Link
                  to="/#pricing"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Harga Paket
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-space-medium text-foreground mb-4">Kontak</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-jakarta text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-jakarta text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nadrical Wedding. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
