import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Nome é obrigatório").max(50, "Máximo 50 caracteres").regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos"),
  lastName: z.string().trim().min(1, "Sobrenome é obrigatório").max(50, "Máximo 50 caracteres").regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Sobrenome contém caracteres inválidos"),
  whatsapp: z.string().trim().min(1, "WhatsApp é obrigatório").regex(/^\+?[\d\s()-]{10,20}$/, "Número de WhatsApp inválido"),
  howDidYouMeetMe: z.string().max(500, "Máximo 500 caracteres").optional().or(z.literal('')),
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    howDidYouMeetMe: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLengths: Record<string, number> = { firstName: 50, lastName: 50, whatsapp: 20, howDidYouMeetMe: 500 };
    if (maxLengths[name] && value.length > maxLengths[name]) return;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    const validated = result.data;
    const message = `Olá! Meu nome é ${validated.firstName} ${validated.lastName}.\nMeu WhatsApp: ${validated.whatsapp}\n${validated.howDidYouMeetMe ? `Como me conheceu: ${validated.howDidYouMeetMe}` : ""}\n\nGostaria de agendar uma sessão de terapia.`;
    const whatsappNumber = "5511930202069";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setFormData({ firstName: "", lastName: "", whatsapp: "", howDidYouMeetMe: "" });
    setErrors({});
  };

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left side */}
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Contato</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Pronta para dar o primeiro passo?
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">
                Se você sentiu que é a hora de olhar para si e caminhar em direção ao que realmente importa, entre em contato.
              </p>

              <div className="grid gap-5">
                {[
                  { icon: Calendar, label: "Agende pelo Doctoralia", href: "http://bit.ly/psilariruza", isLink: true },
                  { icon: Phone, label: "+55 (11) 93020-2069" },
                  { icon: Mail, label: "larissaruza@gmail.com" },
                  { icon: Instagram, label: "@lariruza.psi", href: "https://www.instagram.com/lariruza.psi", isLink: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    {item.isLink ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-light">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-foreground font-light">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-background rounded-2xl p-8 sm:p-10 shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-2">Envie uma mensagem</h3>
              <p className="text-muted-foreground text-sm font-light mb-6">Deixe seus dados e eu te retorno.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-1.5 block font-medium">Nome <span className="text-destructive">*</span></label>
                    <input type="text" name="firstName" placeholder="Nome" value={formData.firstName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                    {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-1.5 block font-medium">Sobrenome <span className="text-destructive">*</span></label>
                    <input type="text" name="lastName" placeholder="Sobrenome" value={formData.lastName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                    {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-foreground mb-1.5 block font-medium">WhatsApp <span className="text-destructive">*</span></label>
                  <input type="tel" name="whatsapp" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={handleInputChange} maxLength={20} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background" />
                  {errors.whatsapp ? <p className="text-xs text-destructive mt-1">{errors.whatsapp}</p> : <p className="text-xs text-muted-foreground mt-1">Coloque um número válido</p>}
                </div>

                <div>
                  <label className="text-sm text-foreground mb-1.5 block font-medium">Como me conheceu?</label>
                  <textarea name="howDidYouMeetMe" value={formData.howDidYouMeetMe} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-background resize-none" />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-sm font-medium rounded-lg transition-colors">
                  Enviar Mensagem
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
