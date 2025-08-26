import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, Instagram } from "lucide-react";
import contactBg from "@/assets/contact-bg.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
    howDidYouMeetMe: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-8">
            {/* Left side - Contact info */}
            <div className="text-white animate-fade-in">
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
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <a href="http://bit.ly/psilariruza" className="text-white hover:text-white/80 transition-colors text-lg font-light underline hover:no-underline">
                    Agende pelo Doctoralia
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.4s'}}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-white text-lg font-light">+55 (11) 93020-2069</span>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-white text-lg font-light">larissaruza@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-4 animate-scale-in" style={{animationDelay: '0.8s'}}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <a href="https://www.instagram.com/lariruza.psi" className="text-white hover:text-white/80 transition-colors text-lg font-light underline hover:no-underline">Instagram</a>
                </div>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-lg relative z-10 animate-scale-in" style={{animationDelay: '0.5s'}}>
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
                  <input type="text" name="firstName" placeholder="Nome" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" required />
                  <input type="text" name="lastName" placeholder="Sobrenome" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" required />
                </div>
              </div>
              
              <div>
                <label className="text-gray-700 mb-2 block font-light">
                  Seu Whatsapp <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="whatsapp" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors" required />
                <p className="text-sm text-gray-500 mt-1 font-light">
                  Coloque um número válido
                </p>
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