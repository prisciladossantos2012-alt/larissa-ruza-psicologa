import { useState } from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="absolute inset-x-0 top-4 flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-white">
          <h1 className="text-lg font-light italic">
            Larissa Ruza
            <span className="block text-xs tracking-wider uppercase">Psicologia</span>
          </h1>
        </div>

        {/* CTA Button */}
        <div>
          <a 
            href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border border-white text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            agende sua<br />sessão
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;