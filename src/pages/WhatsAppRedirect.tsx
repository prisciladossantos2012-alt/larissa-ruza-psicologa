import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { trackWhatsAppClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "34657907439";
const DEFAULT_MESSAGE = "Olá! Tenho interesse em agendar uma sessão e gostaria de receber as informações sobre formato, investimento e disponibilidade de horários.";

const WhatsAppRedirect = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const customMessage = searchParams.get("text") || DEFAULT_MESSAGE;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
    
    trackWhatsAppClick("Redirect WhatsApp", url);
    
    window.location.replace(url);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecionando para WhatsApp...</p>
    </div>
  );
};

export default WhatsAppRedirect;
