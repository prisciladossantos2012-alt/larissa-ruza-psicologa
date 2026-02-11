// GA4 Analytics helper functions

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (eventName: string, params?: Record<string, string>) => {
  // gtag
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  // dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};

export const trackWhatsAppClick = (buttonText: string, linkUrl: string) => {
  trackEvent('click_whatsapp', {
    page_location: window.location.href,
    button_text: buttonText,
    link_url: linkUrl,
  });
};

export const trackDoctoraliaClick = (buttonText: string, linkUrl: string) => {
  trackEvent('click_doctoralia', {
    page_location: window.location.href,
    button_text: buttonText,
    link_url: linkUrl,
  });
};

export const trackFormSubmit = () => {
  trackEvent('form_submit', {
    page_location: window.location.href,
    button_text: 'Enviar Mensagem',
    link_url: '',
  });
};
