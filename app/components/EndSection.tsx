"use client";

import { motion } from "framer-motion";

export default function CoolSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-white to-violet-200 px-6 py-20 md:px-12 lg:px-24 flex items-center">
      {/* Elemento Decorativo de Fondo (Acento) */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-slate-50 transition-all duration-700 ease-in-out md:block hidden" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* BLOQUE DE TEXTO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-violet-600">
              Nueva Colección 2026
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-neutral-800 font-extralight leading-[0.9]">
              Transforma Tus Espacios Con <span className="italic font-light text-neutral-400">Obras Únicas</span>
            </h2>
            <p className="text-neutral-500 max-w-sm font-light leading-relaxed mt-6 mb-6">
              Creamos experiencias digitales que no solo se ven bien, sino que se sienten naturales. Simplicidad radical en cada píxel.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-violet-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-105 active:scale-95">
                Explorar Tienda
              </button>
              <button className="group flex items-center gap-2 font-bold text-violet-600">
                Ver más <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.div>

          {/* BLOQUE DE IMÁGENES (EL "WOW") */}
          <div className="relative lg:col-span-7">
            <div className="relative grid grid-cols-10 gap-4">
              
              {/* Imagen Principal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="col-span-7 overflow-hidden rounded-2xl shadow-2xl"
              >
                <img 
                  src="images/SeñorAzul.jpg" 
                  alt="Feature principal"
                  className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-110 md:h-[500px]"
                />
              </motion.div>

              {/* Imagen Flotante 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -left-6 col-span-4 w-48 overflow-hidden rounded-xl border-8 border-white shadow-xl md:w-64"
              >
                <img 
                  src="/images/Mar.jpg" 
                  alt="Detalle"
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.div>

              {/* Imagen Flotante 2 (Decorativa) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="col-span-3 flex items-center justify-center"
              >
                <div className="h-32 w-32 rounded-full bg-blue-100 p-4 text-blue-600 md:h-40 md:w-40">
                    {/* Placeholder para un SVG o Icono circular */}
                    <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-blue-400 text-center text-[10px] font-bold uppercase tracking-tighter">
                        Innovation <br/> Focus
                    </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}