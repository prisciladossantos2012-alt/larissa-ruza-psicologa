import { useEffect } from 'react';

const DoctoraliaWidget = () => {
  useEffect(() => {
    // Load Doctoralia widget script
    const loadWidget = () => {
      if (!document.getElementById('zl-widget-s')) {
        const script = document.createElement('script');
        script.id = 'zl-widget-s';
        script.src = '//platform.docplanner.com/js/widget.js';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    loadWidget();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-center">
          <h3 className="text-2xl font-playfair text-white mb-2">Agende sua Consulta Online</h3>
          <p className="text-white/90 text-sm font-light">
            Escolha o melhor horário para sua sessão de terapia
          </p>
        </div>
        
        <div className="p-6 bg-white">
          <a 
            id="zl-url" 
            className="zl-url block w-full" 
            href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3" 
            rel="nofollow" 
            data-zlw-doctor="larissa-ruza" 
            data-zlw-type="big_with_calendar" 
            data-zlw-opinion="false" 
            data-zlw-hide-branding="true" 
            data-zlw-saas-only="true" 
            data-zlw-a11y-title="Widget de marcação de consultas médicas"
          >
            Larissa Ruza - Doctoralia.com.br
          </a>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-sm text-gray-600 font-light">
            ✓ Sessões online seguras &nbsp;|&nbsp; ✓ Agendamento flexível &nbsp;|&nbsp; ✓ Confirmação imediata
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctoraliaWidget;