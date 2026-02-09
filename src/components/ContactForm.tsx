import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, Instagram } from "lucide-react";
import { z } from "zod";
import contactBg from "@/assets/contact-bg.jpg";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Nome é obrigatório").max(50, "Máximo 50 caracteres").regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos"),
  lastName: z.string().trim().min(1, "Sobrenome é obrigatório").max(50, "Máximo 50 caracteres").regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Sobrenome contém caracteres inválidos"),
  whatsapp: z.string().trim().min(1, "WhatsApp é obrigatório").regex(/^\+?[\d\s()-]{10,20}$/, "Número de WhatsApp inválido"),
  howDidYouMeetMe: z.string().max(500, "Máximo 500 caracteres").optional().or(z.literal(''))
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
    howDidYouMeetMe: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Enforce maxLength limits
    const maxLengths: Record<string, number> = { firstName: 50, lastName: 50, whatsapp: 20, howDidYouMeetMe: 500 };
    if (maxLengths[name] && value.length > maxLengths[name]) return;
    setFormData({ ...formData, [name]: value });
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const validated = result.data;
    
    const message = `Olá! Meu nome é ${validated.firstName} ${validated.lastName}.
Meu WhatsApp: ${validated.whatsapp}
${validated.howDidYouMeetMe ? `Como me conheceu: ${validated.howDidYouMeetMe}` : ''}

Gostaria de agendar uma sessão de terapia.`;
    
    const whatsappNumber = "5511930202069";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    setFormData({ firstName: '', lastName: '', whatsapp: '', howDidYouMeetMe: '' });
    setErrors({});
  };

  return <section className="py-16 sm:py-20 relative min-h-screen overflow-hidden" style={{
    backgroundImage: `url(${contactBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center min-h-screen py-8 bg-white/95 backdrop-blur-sm rounded-lg mx-4">
            {/* Left side - Contact info */}
            <div className="text-[#2c4186] animate-fade-in px-6 lg:px-8 lg:w-2/5">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed mb-12 sm:mb-16">
                Se você sentiu<br />
                que é a hora de<br />
                olhar para si e<br />
                caminhar em direção<br />
                ao que realmente<br />
                importa, só me chamar.
              </h3>
              
              <div className="grid gap-6 text-left">
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.2s'}}>
                  <div className="w-12 h-12 bg-[#2c4186]/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#2c4186]" strokeWidth={1.5} />
                  </div>
                  <a href="http://bit.ly/psilariruza" className="text-black hover:text-gray-700 transition-colors text-lg font-light underline hover:no-underline">
                    Agende pelo Doctoralia
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.4s'}}>
                  <div className="w-12 h-12 bg-[#2c4186]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#2c4186]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-lg font-light">+55 (11) 93020-2069</span>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
                  <div className="w-12 h-12 bg-[#2c4186]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#2c4186]" strokeWidth={1.5} />
                  </div>
                  <span className="text-black text-lg font-light">larissaruza@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.8s'}}>
                  <div className="w-12 h-12 bg-[#2c4186]/10 rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-[#2c4186]" strokeWidth={1.5} />
                  </div>
                  <a href="https://www.instagram.com/lariruza.psi" className="text-black hover:text-gray-700 transition-colors text-lg font-light underline hover:no-underline">Instagram</a>
                </div>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="bg-white/90 backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-lg border border-gray-200 animate-scale-in w-full lg:w-3/5" style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl sm:text-3xl font-light mb-4 text-center text-gray-800">
              Entre em Contato
            </h2>
            <p className="text-gray-600 mb-6 text-center font-light">
              Se preferir, deixa seus dados e eu te retorno.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 mb-2 block font-light">
                  Seu nome <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input type="text" name="firstName" placeholder="Nome" value={formData.firstName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input type="text" name="lastName" placeholder="Sobrenome" value={formData.lastName} onChange={handleInputChange} maxLength={50} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-gray-700 mb-2 block font-light">
                  Seu Whatsapp <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="whatsapp" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={handleInputChange} maxLength={20} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" />
                {errors.whatsapp ? <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p> : <p className="text-sm text-gray-500 mt-1 font-light">Coloque um número válido</p>}
              </div>
              
              <div>
                <label className="text-gray-700 mb-2 block font-light">
                  Como você me conheceu?
                </label>
                <textarea name="howDidYouMeetMe" value={formData.howDidYouMeetMe} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
              
              <Button type="submit" className="w-full bg-[#2c4186] hover:bg-[#2c4186]/90 text-white py-4 text-lg font-light rounded-md transition-colors">
                Enviar
              </Button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default ContactForm;