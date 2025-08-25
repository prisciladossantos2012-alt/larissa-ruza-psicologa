import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Ansiedade = () => {
  const benefits = [
    "Técnicas comprovadas para reduzir a ansiedade",
    "Estratégias de enfrentamento personalizadas",
    "Atendimento 100% online e sigiloso",
    "Profissional especializada em terapias de terceira geração",
    "Horários flexíveis para sua agenda"
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-sage-green to-deep-sage text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              Supere a Ansiedade
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Transforme sua relação com a ansiedade e recupere o controle da sua vida
            </p>
            <Button variant="cta" size="lg" className="bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur-sm text-white">
              Comece Sua Jornada Agora
            </Button>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">
                A ansiedade está limitando sua vida?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-medium mb-4">Você se identifica com:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Preocupações constantes e excessivas</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Dificuldade para relaxar ou dormir</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Sintomas físicos como coração acelerado</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Evitar situações por medo ou ansiedade</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Impactos na sua vida:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Relacionamentos afetados</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Produtividade no trabalho reduzida</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Qualidade de vida comprometida</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
                      <span>Sensação de estar preso(a)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-warm-beige/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-primary mb-8 text-center">
                A terapia pode te ajudar
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-medium mb-6">Com a terapia você vai:</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-sage-green mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="border-border/50">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-medium mb-4">Pronta para começar?</h3>
                    <p className="text-muted-foreground mb-6">
                      Agende sua primeira sessão e dê o primeiro passo para uma vida sem ansiedade.
                    </p>
                    <Button variant="cta" size="lg" className="w-full">
                      Agendar Primeira Sessão
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Larissa Ruza - CRP 06/157739
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingWhatsApp />
    </>
  );
};

export default Ansiedade;