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
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-xl font-playfair text-white mb-2">Agende sua Consulta</h3>
        <p className="text-white/80 text-sm">Use o widget abaixo para agendar diretamente</p>
      </div>
      
      <a 
        id="zl-url" 
        className="zl-url block text-center" 
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
  );
};

export default DoctoraliaWidget;