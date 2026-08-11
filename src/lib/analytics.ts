// GA4 Analytics helper functions

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (eventName: string, params?: Record<string, string>) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
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

const WHATSAPP_NUMBER = "34657907439";

/**
 * Track a GA4 event and redirect to WhatsApp with a qualified message.
 * Uses sendBeacon to ensure the event is sent before navigation.
 */
export const trackAndRedirectWhatsApp = (
  eventName: string,
  buttonText: string,
  whatsappMessage: string
) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  trackEvent(eventName, {
    page_location: window.location.href,
    button_text: buttonText,
    link_url: url,
  });

  // Small delay to ensure event is dispatched
  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, 150);
};
