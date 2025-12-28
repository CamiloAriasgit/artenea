"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette } from 'lucide-react';
import { FadeIn } from './FadeIn';

const PersonalizadoSection = () => {
    return (
        <section id='Personalizado' className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-10 overflow-hidden bg-white">
            
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* LADO IZQUIERDO: Texto con FadeIn individual para cada bloque */}
                <div className="lg:col-span-5 text-left space-y-8 z-10">
                    <FadeIn direction="right">
                        <h1 className='text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-neutral-800 font-extralight leading-[0.9]'>
                            Convirtamos <br />
                            <span className="italic font-light text-neutral-400">Tu Idea</span> <br />
                            en una Obra
                        </h1>
                    </FadeIn>
                    
                    <FadeIn direction="right" delay={0.2}>
                        <p className="text-neutral-500 max-w-sm font-light leading-relaxed">
                            Proyectos personalizados que capturan tu esencia. Esculturas, tejidos y lienzos diseñados exclusivamente para tu espacio.
                        </p>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.3}>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center gap-4 group text-neutral-800"
                        >
                            <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-500">
                                <Palette size={18} className="group-hover:text-white transition-colors" />
                            </div>
                            <span className="uppercase text-xs tracking-[0.3em] font-medium">Cotizar Proyecto</span>
                        </Link>
                    </FadeIn>
                </div>

                {/* LADO DERECHO: Composición Asimétrica con aparición escalonada */}
                <div className="lg:col-span-7 relative h-[500px] md:h-[700px] w-full">
                    
                    {/* Imagen 2 (Arriba Izquierda) - Aparece primero en las imágenes */}
                    <div className='absolute top-0 left-0 w-[45%] aspect-square z-10'>
                        <FadeIn direction="down" delay={0.4}>
                            <div className='relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl group'>
                                <Image 
                                    src="/images/Collar.jpg" 
                                    alt="Bisutería"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-4'>
                                    <span className='text-white uppercase text-[10px] tracking-widest'>BISUTERIA</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Imagen Principal (Centro) - El foco central */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square z-20'>
                        <FadeIn direction="up" delay={0.2}>
                            <div className='relative w-full aspect-square overflow-hidden rounded-3xl shadow-2xl group'>
                                <Image 
                                    src="/images/SeñorAzul.jpg" 
                                    alt="Dibujo"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    priority
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-8'>
                                    <span className='text-white uppercase text-xs tracking-widest'>DIBUJO</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Imagen 3 (Abajo Derecha) - Último elemento en aparecer */}
                    <div className='absolute bottom-0 right-0 w-[45%] aspect-square z-30'>
                        <FadeIn direction="left" delay={0.6}>
                            <div className='relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl group'>
                                <Image 
                                    src="/images/Oso.png" 
                                    alt="Crochet"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-4'>
                                    <span className='text-white uppercase text-[10px] tracking-widest'>CROCHET</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </div>

            {/* Elemento Decorativo de fondo con entrada suave */}
            <FadeIn direction="left" delay={0.8} className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 -z-10">
                <div className="w-full h-full bg-neutral-50 rounded-l-full" />
            </FadeIn>
        </section>
    );
};

export default PersonalizadoSection;