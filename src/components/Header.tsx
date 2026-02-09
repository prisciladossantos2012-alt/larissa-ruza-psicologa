import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Serviços", href: "#servicos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex flex-col">
            <span className="font-sans text-lg lg:text-xl text-primary tracking-wide" style={{ fontWeight: 300 }}>
              Larissa Ruza
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground -mt-1">
              Psicologia
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-primary transition-colors font-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
              Agendar Sessão
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors font-light px-2 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-lg mt-2"
              >
                Agendar Sessão
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
