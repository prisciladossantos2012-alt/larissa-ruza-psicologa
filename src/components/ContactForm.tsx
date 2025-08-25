import { useState } from "react";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left side - Contact info */}
            <div className="text-gray-800">
              <h3 className="text-2xl font-normal mb-8">
                Se você sentiu que é a hora de olhar para si e caminhar em direção 
                ao que realmente importa, só me chamar.
              </h3>
              
              <div className="grid gap-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <a href="http://bit.ly/psilariruza" className="text-gray-800 hover:underline">
                    Agende pelo Doctoralia
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <span className="text-gray-800">+55 (11) 93020-2069</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <span className="text-gray-800">larissaruza@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📱</span>
                  </div>
                  <a href="https://www.instagram.com/lariruza.psi" className="text-gray-800 hover:underline">Instagram</a>
                </div>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg relative z-10">
            <h2 className="text-3xl font-normal mb-4 text-center text-gray-800">
              Entre em Contato
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Se preferir, deixa seus dados e eu te retorno.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-700 mb-2 block">
                  Seu nome <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Sobrenome"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-700 mb-2 block">
                  Seu Whatsapp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="(00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Coloque um número válido
                </p>
              </div>
              
              <div>
                <label className="text-gray-700 mb-2 block">
                  Como você me conheceu?
                </label>
                <textarea
                  name="howDidYouMeetMe"
                  value={formData.howDidYouMeetMe}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium"
              >
                Enviar
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