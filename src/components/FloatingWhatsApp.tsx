import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

const FloatingWhatsApp = () => {
  const handleClick = () => {
    trackWhatsAppClick("WhatsApp Flutuante", "https://wa.me/34657907439");
  };

  return (
    <a
      href="https://wa.me/34657907439"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
