import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual a abordagem terapêutica utilizada?",
    answer: "Trabalho com Terapias Cognitivo-Comportamentais Contextuais (TCC, Terapia do Esquema e Terapia de Aceitação e Compromisso - ACT), oferecendo um atendimento personalizado para cada paciente e demanda.",
  },
  {
    question: "Atende por plano de saúde?",
    answer: "Atualmente o atendimento é particular. Após cada sessão, emito recibo para que você possa solicitar reembolso ao seu plano de saúde, caso ele ofereça essa opção.",
  },
  {
    question: "Como funciona a psicoterapia na modalidade online?",
    answer: "As sessões acontecem por videochamada, com duração de 50 minutos. Você precisa apenas de um dispositivo com câmera, internet estável e um ambiente privado. É tão eficaz quanto a terapia presencial.",
  },
  {
    question: "Como funciona a psicoterapia na modalidade presencial?",
    answer: "As sessões acontecem na Avenida Portugal, 397 em Santo André, no ABC Paulista, com duração de 50 minutos. Diversos estacionamentos nas proximidades.",
  },
  {
    question: "Como funciona o processo terapêutico?",
    answer: "Os objetivos são definidos a partir da sua demanda. As sessões são semanais ou quinzenais, 50 minutos cada, com privacidade total e sigilo. Você não só fala sobre os problemas, mas aprende técnicas para lidar com eles no dia a dia. E a gente acompanha sua evolução, ajustando o que precisar.",
  },
  {
    question: "Posso fazer terapia morando fora do Brasil?",
    answer: "Sim! Atendo brasileiros em qualquer lugar do mundo. Inclusive, tenho experiência pessoal com imigração e entendo os desafios emocionais desse processo.",
  },
  {
    question: "Como agendar minha primeira sessão?",
    answer: "Você pode agendar diretamente pelo Doctoralia, pelo WhatsApp ou preenchendo o formulário de contato aqui no site. Responderei o mais breve possível!",
  },
  {
    question: "Qual idade você atende?",
    answer: "Adolescentes a partir de 16 anos, adultos e casais.",
  },
];

const FAQ = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "faq_cta_click",
      "Ainda tenho dúvidas sobre o processo",
      "Olá, Larissa. Li as informações do site e ainda tenho algumas dúvidas sobre o processo terapêutico."
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Dúvidas Frequentes</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              Perguntas Frequentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-muted rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-medium text-foreground text-base hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
            >
              Ainda tenho dúvidas sobre o processo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
