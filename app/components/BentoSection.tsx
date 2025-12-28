"use client";

import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../components/FadeIn';

const features = [
  {
    title: "Curaduría Exclusiva",
    desc: "Cada pieza es seleccionada para contar una historia única en tu hogar.",
    size: "md:col-span-4 md:row-span-2",
    img: "/images/Sandia.jpg", 
    color: "bg-violet-500"
  },
  {
    title: "Técnica Maestra",
    desc: "Procesos artesanales que elevan la materia a arte.",
    size: "md:col-span-4 md:row-span-1",
    img: "/images/Gato.jpg",
    color: "bg-neutral-400"
  },
  {
    title: "Lienzos Vivos",
    desc: "Texturas que invitan a ser exploradas con la mirada.",
    size: "md:col-span-4 md:row-span-1",
    img: "/images/Mar.jpg",
    color: "bg-violet-400"
  },
  {
    title: "Esculpiendo el Futuro",
    desc: "Visiones contemporáneas que desafían lo convencional.",
    size: "md:col-span-8 md:row-span-1",
    img: "/images/SeñorAzul.jpg",
    color: "bg-neutral-200"
  },
];

export default function BentoSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Encabezado de Sección */}
        <div className="mb-16 flex flex-col items-end text-right">
          <FadeIn direction="right">
            <h2 className="text-4xl font-light tracking-tight text-neutral-800 md:text-6xl">
              Elevamos la <span className="italic font-light text-neutral-400">esencia</span> del arte
            </h2>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <div className="mt-4 h-1 w-24 bg-violet-500" />
          </FadeIn>
        </div>

        {/* Grid Estilo Bento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
          {features.map((item, index) => (
            <div key={index} className={item.size}>
              <FadeIn direction="up" delay={index * 0.15}>
                <div className="group relative overflow-hidden rounded-3xl bg-neutral-100 aspect-square md:aspect-auto md:h-full">
                  
                  {/* Overlay Gradiente - Más suave para un look artístico */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  
                  {/* Imagen de Fondo usando Next Image para optimización */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Contenido */}
                  <div className="relative z-20 flex h-full flex-col justify-end p-8">
                    <div className={`mb-3 h-1 w-12 rounded-full ${item.color} transition-all duration-500 group-hover:w-24`} />
                    <h3 className="text-2xl font-light tracking-tight text-white uppercase">{item.title}</h3>
                    <p className="mt-2 max-w-[280px] text-sm text-neutral-300 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 font-light">
                      {item.desc}
                    </p>
                  </div>

                  {/* Efecto de Brillo (Glow) al Hover - Sutil */}
                  <div className="absolute -inset-full top-0 z-30 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shine_1.2s_ease-in-out]" />
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
      `}</style>
    </section>
  );
}