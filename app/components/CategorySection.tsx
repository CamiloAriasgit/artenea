import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from 'lucide-react';

const CategorySection = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center text-center px-4 md:px-6 overflow-hidden bg-white">
            {/* Encabezado */}
            <h1 className='text-3xl sm:text-5xl tracking-tighter text-neutral-500 font-light'>
                Explora Diversas Categorías
            </h1>
            
            <Link
                href="/tienda"
                className="text-neutral-400 flex items-center justify-center gap-2 mt-5 mb-5 hover:text-violet-500 transition-colors duration-300"
            >
                <Store className="w-4 h-4" /> Ver Tienda
            </Link>

            {/* ESTRUCTURA 1:1 (CUADRADA) */}
            <div className='w-full max-w-5xl flex flex-col sm:flex-row-reverse gap-2'>
                
                {/* CATEGORÍA 1 - Cuadrado Grande */}
                <div className='relative w-full aspect-square overflow-hidden rounded-2xl group'>
                    <Image 
                        src="/images/Sandia.jpg" 
                        alt="Categoría Principal"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    {/* Gradiente sutil abajo */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6'>
                        <span className='text-white uppercase text-sm tracking-[0.2em] font-medium'>
                            Esculturas
                        </span>
                    </div>
                </div>

                {/* COLUMNA DE CATEGORÍAS 2 y 3 */}
                <div className='flex flex-row sm:flex-col w-full sm:w-1/2 gap-2'>
                    
                    {/* CATEGORÍA 2 - Cuadrado Pequeño */}
                    <div className='relative w-full aspect-square overflow-hidden rounded-2xl group'>
                        <Image 
                            src="/images/Face.png" 
                            alt="Categoría Secundaria"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4'>
                            <span className='text-white uppercase text-[10px] tracking-widest'>
                                Abstracto
                            </span>
                        </div>
                    </div>

                    {/* CATEGORÍA 3 - Cuadrado Pequeño */}
                    <div className='relative w-full aspect-square overflow-hidden rounded-2xl group'>
                        <Image 
                            src="/images/Crochet.webp" 
                            alt="Categoría Terciaria"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4'>
                            <span className='text-white uppercase text-[10px] tracking-widest'>
                                Crochet
                            </span>
                        </div>
                    </div>

                </div>  
            </div>
        </section>
    );
};

export default CategorySection;