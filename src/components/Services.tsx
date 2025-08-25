import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, Briefcase, Plane } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Psicoterapia online",
      description: "para brasileiros no mundo inteiro (adolescentes e adultos)."
    },
    {
      icon: Heart,
      title: "Psicodiagnóstico e tratamento",
      description: "terapêutico para transtornos de humor e personalidade."
    },
    {
      icon: Briefcase,
      title: "Mentoria e orientação",
      description: "de carreira."
    },
    {
      icon: Plane,
      title: "Mentoria preparatória",
      description: "para imigração."
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">
            Meu trabalho é
          </h2>
          <p className="text-2xl md:text-3xl text-foreground font-light">
            dedicado em:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-500 border-border/50">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-sage-green/10 flex items-center justify-center group-hover:bg-sage-green/20 transition-colors duration-300">
                      <service.icon className="w-6 h-6 text-sage-green" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;