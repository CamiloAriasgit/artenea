import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from 'lucide-react';
import { FadeIn } from './FadeIn'; // Asegúrate de que la ruta sea correcta

const CategorySection = () => {
    return (
        <section id='Categoria' className="relative min-h-screen flex flex-col items-center text-center px-4 md:px-6 pt-10 sm:pt-10 overflow-hidden bg-white">
            
            {/* Título con aparición suave */}
            <FadeIn direction="up">
                <h1 className='text-3xl sm:text-5xl tracking-tighter text-neutral-800 font-extralight'>
                    Explora Diversas <span className='italic font-light text-neutral-400'>Categorías</span>
                </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
                <Link
                    href="/tienda"
                    className="text-neutral-400 flex items-center justify-center gap-2 mt-5 mb-5 hover:text-violet-500 transition-colors duration-300"
                >
                    <Store className="w-4 h-4" /> Ver Tienda
                </Link>
            </FadeIn>

            {/* Contenedor Principal del Grid */}
            <div className='w-full max-w-5xl flex flex-col sm:flex-row-reverse gap-2'>

                {/* CATEGORÍA 1 - Grande */}
                {/* Envolvemos el div de la imagen. No afecta el layout porque FadeIn es un bloque */}
                <div className='w-full'>
                    <FadeIn direction="up" delay={0.2}>
                        <div className='relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl group'>
                            <Image
                                src="/images/Sandia.jpg"
                                alt="Categoría Principal"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6'>
                                <span className='text-white uppercase text-sm tracking-[0.2em] font-medium'>
                                    Esculturas
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* COLUMNA DE CATEGORÍAS 2 y 3 */}
                <div className='flex flex-row sm:flex-col w-full sm:w-1/2 gap-2'>
                    
                    {/* CATEGORÍA 2 */}
                    <div className='w-full'>
                        <FadeIn direction="up" delay={0.3}>
                            <div className='relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl group'>
                                <Image
                                    src="/images/Gato.jpg"
                                    alt="Categoría Secundaria"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4'>
                                    <span className='text-white uppercase text-[10px] tracking-widest'>
                                        Grabado
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* CATEGORÍA 3 */}
                    <div className='w-full'>
                        <FadeIn direction="up" delay={0.4}>
                            <div className='relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl group'>
                                <Image
                                    src="/images/Mar.jpg"
                                    alt="Categoría Terciaria"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4'>
                                    <span className='text-white uppercase text-[10px] tracking-widest'>
                                        Pintura
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Footer de la sección */}
            <FadeIn direction="up" delay={0.5}>
                <Link
                    href="/tienda"
                    className="text-neutral-400 font-light flex items-center justify-center gap-2 mt-10 mb-5 hover:text-violet-500 transition-colors duration-300"
                >
                    Toca Para Explorar Más...
                </Link>
            </FadeIn>
        </section>
    );
};

export default CategorySection;