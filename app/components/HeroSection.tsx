import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const scrollText = "Scroll";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
      {/* Fondo decorativo con blobs animados */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase italic">
          Artenea
        </h1>
        
        <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Una colección de trazos, formas y emociones capturadas en el tiempo. 
          Explorando el límite entre lo tangible y lo imaginario.
        </p>

        <div className="pt-8">
          <Link
            href="/tienda"
            className="inline-block border border-black px-12 py-4 text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 ease-in-out font-medium"
          >
            Visitar Tienda
          </Link>
        </div>
      </div>

      {/* Scroll indicator con efecto ola */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-[2px]">
        {scrollText.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-bounce text-[10px] uppercase tracking-widest text-gray-400"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationDuration: '1.5s' // Controla la velocidad del rebote
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;