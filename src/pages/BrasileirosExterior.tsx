import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ArrowRight, Globe, Heart, Shield, Video, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BrasileirosExterior = () => {
  return (
    <>
      <Helmet>
        <title>Psicóloga Online para Brasileiros no Exterior | Larissa Ruza</title>
        <meta
          name="description"
          content="Psicóloga brasileira com experiência internacional. Terapia online para brasileiros que moram fora do Brasil. Apoio emocional para imigração, adaptação cultural, saudade e recomeços. CRP 06/157739."
        />
        <meta name="keywords" content="psicóloga brasileira no exterior, terapia online para imigrantes, psicóloga para brasileiros fora do Brasil, terapia imigração, psicóloga online português, saúde mental imigrantes brasileiros" />
        <link rel="canonical" href="https://larissaruzapsicologa.com/brasileiros-no-exterior" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-32 pb-16 sm:pb-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                Atendimento Online em Português
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
                Psicóloga online para brasileiros no exterior
              </h1>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto mb-8 leading-relaxed">
                Eu já vivi na Espanha e na Irlanda. Sei o que é recomeçar em outro país, lidar com a saudade, a solidão e as incertezas de estar longe de casa. Ofereço um espaço seguro, em português, para você cuidar da sua saúde mental onde quer que esteja.
              </p>
              <a
                href="/agendar"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-medium hover:bg-primary/90 transition-all duration-300 uppercase"
              >
                Agendar Minha Sessão
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* Desafios emocionais */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-4">
                Os desafios emocionais da imigração
              </h2>
              <p className="text-muted-foreground text-center font-light max-w-2xl mx-auto mb-12">
                Morar fora do Brasil traz conquistas, mas também desafios que muitas vezes não temos com quem compartilhar.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Heart, title: "Saudade e solidão", desc: "A distância da família e amigos pode gerar um vazio difícil de preencher." },
                  { icon: Globe, title: "Adaptação cultural", desc: "Lidar com uma nova cultura, idioma e costumes exige muita energia emocional." },
                  { icon: Shield, title: "Crise de identidade", desc: "Quem sou eu longe de tudo que conheço? Essa pergunta surge com frequência." },
                  { icon: Heart, title: "Ansiedade e estresse", desc: "A pressão por dar certo, questões de visto e instabilidade financeira." },
                  { icon: Globe, title: "Relacionamentos à distância", desc: "Manter vínculos saudáveis com quem ficou e construir novos." },
                  { icon: Shield, title: "Luto migratório", desc: "Processar as perdas simbólicas que acompanham toda mudança de país." },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-muted rounded-xl border border-border text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Por que eu */}
          <section className="py-16 sm:py-20 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-12">
                Por que fazer terapia comigo?
              </h2>
              <div className="space-y-4">
                {[
                  "Experiência pessoal com imigração (Brasil, Espanha e Irlanda)",
                  "Atendimento 100% online, em português, em qualquer fuso horário",
                  "Abordagens baseadas em evidências (TCC, Terapia do Esquema, ACT)",
                  "Mais de 8 anos acompanhando brasileiros em transições internacionais",
                  "Horários flexíveis — manhã, tarde e noite (horário de Brasília)",
                  "Sigilo total e ambiente seguro para você se expressar",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Como funciona */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Como funciona a terapia online?
              </h2>
              <p className="text-muted-foreground font-light max-w-2xl mx-auto mb-12">
                Simples, seguro e acessível de qualquer lugar do mundo.
              </p>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Agende", desc: "Escolha o melhor horário para você, considerando seu fuso." },
                  { step: "2", title: "Conecte-se", desc: "Sessão por videochamada segura, de 50 minutos." },
                  { step: "3", title: "Transforme", desc: "Construa mudanças reais com acompanhamento contínuo." },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                      {item.step}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="/agendar"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-medium hover:bg-primary/90 transition-all duration-300 mt-12 uppercase"
              >
                Quero Começar Minha Terapia
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
};

export default BrasileirosExterior;
