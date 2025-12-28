"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BotonHero from '../components/BotonHero';
import { Store, ChevronDown } from 'lucide-react';
import { FadeIn } from './FadeIn';

const HeroS = () => {
    return (
        <section className="relative flex flex-col items-center pt-10 sm:pt-1 px-5 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white">

            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">

                {/* Título de fondo: Aparece con un delay sutil y sin movimiento exagerado */}
                <FadeIn direction="up" delay={0.2}>
                    <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[15vw] font-bold tracking-tighter uppercase italic text-neutral-200/80 leading-none select-none z-0'>
                        ARTENEAZ
                    </h1>
                </FadeIn>

                {/* Imagen de la Escultura: Aparece desde arriba para dar peso visual */}
                <FadeIn direction="down" delay={0.4} className="relative z-10">
                    <div className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] transition-transform duration-1000 hover:scale-105">
                        <Image
                            src="/images/Hero.png"
                            alt="ARTENEAZ Sculpture"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </FadeIn>
            </div>
            {/* Bloque de Texto y Botones: Suben suavemente */}
            <div className='relative z-20 flex flex-col items-center pt-10 pb-15 sm:pb-10 max-w-lg mt-[-20px]'>
                <FadeIn direction="up" delay={0.6}>
                    <p className='text-sm md:text-base font-light text-neutral-500 text-center leading-relaxed tracking-wide'>
                        Una colección de trazos, formas y emociones capturadas en el tiempo.
                    </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.8} className="w-full">
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
                </FadeIn>
            </div>

            {/* Indicador de Scroll: Aparece al final de todo */}
            <FadeIn direction="up" delay={1.2} className="absolute bottom-28 sm:bottom-28">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-300">Scroll</span>
                    <ChevronDown size={14} className="text-neutral-300" />
                </div>
            </FadeIn>

        </section>
    );
};

export default HeroS;