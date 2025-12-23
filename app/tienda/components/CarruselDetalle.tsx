'use client'
import { useState, useRef, useEffect } from 'react'

interface Props {
    imagenes: string[];
    titulo: string;
    disponible: boolean;
}

export default function CarruselDetalle({ imagenes, titulo, disponible }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sincronizar los puntitos indicadores con el scroll manual del usuario
    const handleScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / width);
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div className="relative w-full overflow-hidden group">
            {/* Contenedor con Scroll Snap:
                - h-auto permite que la imagen dicte la altura.
                - snap-x obligatorio para que "salte" de imagen en imagen.
                - no-scrollbar para ocultar la barra de scroll estética.
            */}
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {imagenes.map((img, i) => (
                    <div 
                        key={i} 
                        className="w-full flex-shrink-0 snap-center flex items-center justify-center"
                    >
                        <img
                            src={img}
                            alt={`${titulo} - vista ${i + 1}`}
                            className={`w-full h-auto object-contain transition-opacity duration-700 ${
                                !disponible ? 'grayscale-[0.4] opacity-90' : ''
                            }`}
                        />
                    </div>
                ))}
            </div>

            {/* Indicadores (Puntos) - Solo si hay más de una imagen */}
            {imagenes.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {imagenes.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                currentIndex === i 
                                ? 'bg-white w-4' 
                                : 'bg-white/30 w-1'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Estilo CSS para ocultar la barra de scroll en Chrome/Safari */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}