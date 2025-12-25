import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BotonHero from '../components/BotonHero';
import { Store } from 'lucide-react';

const HeroS = () => {
    const scrollText = "Scroll";

    return (
        <section className="relative min-h-screen flex flex-col items-center text-center pt-14 md:pt-20 px-4 md:px-6 overflow-hidden bg-white">
            <Image
                src="/images/Face.png" // La ruta empieza con / y apunta a public
                alt="Descripción de la imagen"
                width={300}
                height={300}
                priority // Úsalo si es la imagen principal de la página
            />
            <h1 className='text-6xl sm:text-8xl font-bold tracking-tighter uppercase italic text-neutral-300'>
                ARTENEAZ
            </h1>
            <p className='font-light text-neutral-500'>
                Una colección de trazos, formas y emociones capturadas en el tiempo.
                <span className="hidden sm:inline"> Explorando el límite entre lo tangible y lo imaginario.</span>
            </p>
            <div className='mt-10 w-50 sm:w-110 flex flex-col sm:flex-row gap-2 justify-center items-center'>
                <Link
                    href="/tienda"
                    className="bg-violet-500 text-white flex items-center justify-center gap-3 px-4 py-4 w-full rounded-xl text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-violet-400 transition-all duration-500 ease-in-out font-medium text-center"
                >
                    <Store className="w-4 h-4 text-white" /> Visitar Tienda
                </Link>
                <BotonHero texto='CONTACTAR' />
            </div>
        </section>
    );
};

export default HeroS;