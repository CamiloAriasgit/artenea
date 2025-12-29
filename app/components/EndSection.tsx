"use client";

import React from 'react';
import { FadeIn } from '../components/FadeIn'; // Ajusta la ruta según tu proyecto

export default function CoolSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white px-6 py-20 md:px-12 lg:px-24 flex items-center">
      
      {/* Elemento Decorativo de Fondo */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-slate-50 transition-all duration-700 ease-in-out md:block hidden" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* BLOQUE DE TEXTO */}
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-violet-600">
                Nueva Colección 2026
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-neutral-800 font-extralight leading-[0.9]">
                Transforma Tus Espacios Con <span className="italic font-light text-neutral-400">Obras Únicas</span>
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <p className="text-neutral-500 max-w-sm font-light leading-relaxed mt-6 mb-6">
                Descubre piezas exclusivas que combinan técnica clásica y arte contemporáneo, diseñadas para inspirar y transformar cualquier ambiente.
              </p>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full bg-violet-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-105 active:scale-95">
                  Explorar Tienda
                </button>
                <button className="group flex items-center gap-2 font-bold text-violet-600">
                  Ver más <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </FadeIn>
          </div>

          {/* BLOQUE DE IMÁGENES */}
          <div className="relative lg:col-span-7">
            <div className="relative grid grid-cols-10 gap-4">
              
              {/* Imagen Principal */}
              <div className="col-span-7">
                <FadeIn direction="up" delay={0.3}>
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src="images/Send.jpg" 
                      alt="Feature principal"
                      className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-110 md:h-[500px]"
                    />
                  </div>
                </FadeIn>
              </div>

              {/* Imagen Flotante 1 (Superpuesta) */}
              <div className="absolute -bottom-10 -left-6 col-span-4 w-48 md:w-64 z-20">
                <FadeIn direction="up" delay={0.7}>
                  <div className="overflow-hidden rounded-xl border-8 border-white shadow-xl">
                    <img 
                      src="/images/Wsend.jpg" 
                      alt="Detalle"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </FadeIn>
              </div>

              {/* Elemento Decorativo (Círculo) */}
              <div className="col-span-3 flex items-center justify-center">
                <FadeIn direction="left" delay={0.9}>
                  <div className="h-27 w-27 rounded-full bg-violet-100 p-4 text-violet-600 md:h-40 md:w-40 animate-pulse-slow">
                    <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-violet-400 text-center text-[10px] font-bold uppercase tracking-tighter">
                        Arteneaz
                    </div>
                  </div>
                </FadeIn>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}