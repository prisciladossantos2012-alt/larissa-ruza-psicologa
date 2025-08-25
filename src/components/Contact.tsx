const Contact = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Autocuidado aonde você estiver.
          </h2>
          
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            As sessões de terapia tem duração de 50 min e acontecem 100% online, 
            com total sigilo e segurança.
          </p>
          
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Se você sentiu que é a hora de olhar para si e caminhar em direção 
            ao que realmente importa, só me chamar.
          </p>
          
          <div className="space-y-6">
            <a 
              href="http://bit.ly/psilariruza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-12 py-4 text-lg hover:bg-blue-600 transition-colors duration-300 rounded"
            >
              Para agendar clique aqui
            </a>
            
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800">
                Agende pelo Doctoralia
              </p>
              <p className="text-lg text-gray-700 mt-2">
                +55 (11) 93020-2069
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;