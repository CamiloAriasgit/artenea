import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette } from 'lucide-react';

const PersonalizadoSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-10 overflow-hidden bg-white">
            
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-5 text-left space-y-8 z-10">
                    <h1 className='text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-neutral-800 font-extralight leading-[0.9]'>
                        Convirtamos <br />
                        <span className="italic font-light text-neutral-400">Tu Idea</span> <br />
                        en una Obra
                    </h1>
                    
                    <p className="text-neutral-500 max-w-sm font-light leading-relaxed">
                        Proyectos personalizados que capturan tu esencia. Esculturas, tejidos y lienzos diseñados exclusivamente para tu espacio.
                    </p>

                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-4 group text-neutral-800"
                    >
                        <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-500">
                            <Palette size={18} className="group-hover:text-white transition-colors" />
                        </div>
                        <span className="uppercase text-xs tracking-[0.3em] font-medium">Cotizar Proyecto</span>
                    </Link>
                </div>

                {/* LADO DERECHO: Composición Asimétrica (7 columnas) */}
                <div className="lg:col-span-7 relative h-[500px] md:h-[700px] w-full">
                    
                    {/* Imagen Principal (Sandia) - Central y grande */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square overflow-hidden rounded-3xl shadow-2xl z-20 group'>
                        <Image 
                            src="/images/SeñorAzul.jpg" 
                            alt="Esculturas"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            priority
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-8'>
                            <span className='text-white uppercase text-xs tracking-widest'>Pintura</span>
                        </div>
                    </div>

                    {/* Imagen 2 (Face) - Flotando arriba a la izquierda */}
                    <div className='absolute top-0 left-0 w-[45%] aspect-square overflow-hidden rounded-2xl shadow-xl z-10 group'>
                        <Image 
                            src="/images/Collar.jpg" 
                            alt="Abstracto"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-4'>
                            <span className='text-white uppercase text-[10px] tracking-widest'>BISUTERIA</span>
                        </div>
                    </div>

                    {/* Imagen 3 (Crochet) - Flotando abajo a la derecha */}
                    <div className='absolute bottom-0 right-0 w-[45%] aspect-square overflow-hidden rounded-2xl shadow-xl z-30 group'>
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

                </div>
                
            </div>

            {/* Elemento Decorativo de fondo */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 bg-neutral-50 rounded-l-full -z-10" />
        </section>
    );
};

export default PersonalizadoSection;