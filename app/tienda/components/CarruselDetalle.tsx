'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
    imagenes: string[];
    titulo: string;
    disponible: boolean;
}

export default function CarruselDetalle({ imagenes, titulo, disponible }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => setCurrentIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));
    const next = () => setCurrentIndex((i) => (i === imagenes.length - 1 ? 0 : i + 1));

    return (
        <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-auto overflow-hidden">
            {/* Contenedor Deslizable */}
            <div 
                className="flex h-full transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {imagenes.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`${titulo} - vista ${i + 1}`}
                        className={`w-full h-full object-cover flex-shrink-0 transition-opacity duration-700 ${!disponible ? 'grayscale-[0.4] opacity-90' : ''}`}
                    />
                ))}
            </div>

            {/* Controles Nav (solo si hay más de 1 imagen) */}
            {imagenes.length > 1 && (
                <>
                    <button 
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-black hover:bg-white transition-all shadow-md z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-black hover:bg-white transition-all shadow-md z-10"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Miniaturas o Bolitas indicadoras */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {imagenes.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 transition-all rounded-full ${currentIndex === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}