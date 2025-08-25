import { Card, CardContent } from "@/components/ui/card";

const TherapyFor = () => {
  const reasons = [
    {
      title: "quer mudar",
      subtitle: "(hábitos, carreira, país, vida...)",
      description: "e não sabe por onde começar"
    },
    {
      title: "tem se sentido",
      subtitle: "triste, cansado, irritado ou ansioso",
      description: "com frequência"
    },
    {
      title: "sente dificuldade",
      subtitle: "em entender seus",
      description: "sentimentos"
    },
    {
      title: "quer melhorar",
      subtitle: "a qualidade dos seus",
      description: "relacionamentos"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-warm-beige/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
            A terapia serve
          </h2>
          <p className="text-2xl md:text-3xl text-foreground font-light">
            para você que...
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium text-primary mb-2">
                  {reason.title}
                </h3>
                <p className="text-lg text-foreground mb-3">
                  {reason.subtitle}
                </p>
                <p className="text-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
            ou apenas precisa ter um momento seu, para se conhecer, (re)descobrir 
            e trilhar o caminho de <span className="text-primary font-medium">uma vida mais significativa</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;