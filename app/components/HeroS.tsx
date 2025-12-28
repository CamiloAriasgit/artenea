import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BotonHero from '../components/BotonHero';
import { Store, ChevronDown } from 'lucide-react';

const HeroS = () => {
    return (
        <section className="relative h-screen min-h-[700px] flex flex-col items-center pt-10 sm:pt-1 px-5 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white">
            
            {/* CONTENEDOR DE IMAGEN Y TÍTULO SUPERPUESTOS */}
            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">
                
                {/* Título de fondo (Grande y sutil) */}
                <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[15vw] font-bold tracking-tighter uppercase italic text-neutral-200/80 leading-none select-none z-0'>
                    ARTENEAZ
                </h1>

                {/* Imagen de la Escultura con sombra suave */}
                <div className="relative z-10 w-[280px] h-[280px] md:w-[450px] md:h-[450px] transition-transform duration-1000 hover:scale-105">
                    <Image
                        src="/images/Hero.png"
                        alt="ARTENEAZ Sculpture"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* TEXTO Y ACCIONES */}
            <div className='relative z-20 flex flex-col items-center pt-10 max-w-lg mt-[-20px]'>
                <p className='text-sm md:text-base font-light text-neutral-500 text-center leading-relaxed tracking-wide'>
                    Una colección de trazos, formas y emociones capturadas en el tiempo.
                </p>

                <div className='mt-8 w-full flex flex-col sm:flex-row gap-3 justify-center items-center'>
                    <Link
                        href="/tienda"
                        className="bg-violet-600 text-violet-100 flex items-center justify-center gap-5 px-4 py-4 w-full rounded-xl text-xs uppercase tracking-[0.3em] hover:bg-violet-500 transition-all duration-500 ease-in-out font-medium"
                    >
                        <Store className="w-4 h-4" /> Visitar Tienda
                    </Link>
                    
                    <div className="w-full sm:w-auto">
                        <BotonHero texto='CONTACTAR' />
                    </div>
                </div>
            </div>

            {/* Indicador de Scroll (Para dar elegancia) */}
            <div className="absolute bottom-28 sm:botton-8 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-300">Scroll</span>
                <ChevronDown size={14} className="text-neutral-300" />
            </div>

        </section>
    );
};

export default HeroS;