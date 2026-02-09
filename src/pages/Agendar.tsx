import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DOCTORALIA_URL = "https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3";

const Agendar = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Preserve any UTM params and forward them
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const url = new URL(DOCTORALIA_URL);
    
    utmParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) url.searchParams.set(param, value);
    });

    window.location.replace(url.toString());
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecionando para agendamento...</p>
    </div>
  );
};

export default Agendar;
