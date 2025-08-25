import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-warm-beige/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">
            Autocuidado aonde você estiver.
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            As sessões de terapia tem duração de 50 min e acontecem 100% online, 
            com total sigilo e segurança.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-sage-green" />
                  <div>
                    <h3 className="font-medium text-foreground">Telefone</h3>
                    <p className="text-muted-foreground">+55 (11) 93020-2069</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-sage-green" />
                  <div>
                    <h3 className="font-medium text-foreground">Atendimento</h3>
                    <p className="text-muted-foreground">100% Online - Onde você estiver</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-sage-green" />
                  <div>
                    <h3 className="font-medium text-foreground">Duração</h3>
                    <p className="text-muted-foreground">50 minutos por sessão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA Section */}
          <div className="text-center lg:text-left">
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-soft">
              <h3 className="text-2xl font-light text-primary mb-6">
                Pronto para começar?
              </h3>
              <p className="text-foreground mb-8 leading-relaxed">
                Se você sentiu que é a hora de olhar para si e caminhar em direção 
                ao que realmente importa, só me chamar.
              </p>
              
              <div className="space-y-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full bg-sage-green hover:bg-deep-sage text-white"
                >
                  Agende pelo Doctoralia
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-sage-green text-sage-green hover:bg-sage-green hover:text-white"
                >
                  Falar no WhatsApp
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                CRP 06/157739
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;