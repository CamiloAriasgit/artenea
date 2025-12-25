import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BotonHero from '../components/BotonHero';

const HeroSection = () => {
    const scrollText = "Scroll";

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-white">
            
            {/* Contenido Principal */}
            <div className="relative z-10 text-center items-center flex flex-col space-y-6 md:space-y-10 w-full max-w-4xl">
                
                {/* Contenedor de Imagen + Texto con Responsividad Fluida */}
                <div className="relative w-full max-w-[320px] md:max-w-[500px] aspect-square">
                    <Image
                        src="/images/FaceHero.png" 
                        alt="Face Hero"
                        fill // Hace que la imagen llene el contenedor
                        priority
                        className="object-contain" // Mantiene la proporción sin recortarse
                    />
                    
                    {/* Texto "INSERT" - Ajuste de tamaño fluido */}
                    <h1 className="absolute -bottom-0 md:bottom-4 left-0 w-full text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-light tracking-tighter uppercase italic text-white/20 mix-blend-difference">
                        ARTENEA
                    </h1>
                </div>

                {/* Descripción - Ajuste de lectura */}
                <p className="text-base sm:text-lg md:text-xl font-light text-gray-600 max-w-xl mx-auto leading-relaxed">
                    Una colección de trazos, formas y emociones capturadas en el tiempo.
                    <span className="hidden sm:inline"> Explorando el límite entre lo tangible y lo imaginario.</span>
                </p>

                {/* Contenedor de Botones - De vertical a horizontal */}
                <div className="pt-4 md:pt-8 w-full max-w-[280px] sm:max-w-md flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
                    <Link
                        href="/tienda"
                        className="bg-violet-500 text-violet-50 px-6 py-4 w-full rounded-xl text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-violet-400 transition-all duration-500 ease-in-out font-medium text-center"
                    >
                        Visitar Tienda
                    </Link>
                </div>
            </div>

            {/* Scroll indicator - Oculto en móviles muy pequeños para evitar ruido visual */}
            <div className="hidden xs:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2">
                {scrollText.split("").map((letter, index) => (
                    <span
                        key={index}
                        className="inline-block animate-bounce text-[10px] uppercase tracking-widest text-gray-400"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '1.5s'
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