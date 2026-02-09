import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a terapia online?",
    answer: "As sessões acontecem por videochamada, com duração de 50 minutos. Você precisa apenas de um dispositivo com câmera, internet estável e um ambiente privado. É tão eficaz quanto a terapia presencial.",
  },
  {
    question: "Qual a abordagem terapêutica utilizada?",
    answer: "Trabalho principalmente com Terapia do Esquema, integrada com Terapias Contextuais e de Terceira Geração, oferecendo um atendimento personalizado para cada paciente.",
  },
  {
    question: "Quanto tempo dura o tratamento?",
    answer: "Varia conforme cada pessoa e demanda. Algumas pessoas sentem melhorias significativas em poucas sessões, enquanto outras optam por um acompanhamento mais longo. Juntas definimos o melhor caminho.",
  },
  {
    question: "Atende por plano de saúde?",
    answer: "Atualmente o atendimento é particular. Após cada sessão, emito recibo para que você possa solicitar reembolso ao seu plano de saúde, caso ele ofereça essa opção.",
  },
  {
    question: "Posso fazer terapia morando fora do Brasil?",
    answer: "Sim! Atendo brasileiros em qualquer lugar do mundo. Inclusive, tenho experiência pessoal com imigração e entendo os desafios emocionais desse processo.",
  },
  {
    question: "Como agendar minha primeira sessão?",
    answer: "Você pode agendar diretamente pelo Doctoralia, pelo WhatsApp ou preenchendo o formulário de contato aqui no site. Responderei o mais breve possível!",
  },
];

const FAQ = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

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
        </div>
      </div>
    </section>
  );
};

export default FAQ;
