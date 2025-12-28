"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Experiencia Inmersiva",
    desc: "Interfaces que responden a cada movimiento.",
    size: "md:col-span-4 md:row-span-2",
    img: "/tu-ruta-1.jpg", 
    color: "bg-blue-500"
  },
  {
    title: "Rendimiento",
    desc: "Optimización al 100%.",
    size: "md:col-span-4 md:row-span-1",
    img: "/tu-ruta-2.jpg",
    color: "bg-emerald-500"
  },
  {
    title: "Conectividad",
    desc: "Sincronización en la nube.",
    size: "md:col-span-4 md:row-span-1",
    img: "/tu-ruta-3.jpg",
    color: "bg-purple-500"
  },
  {
    title: "Seguridad Avanzada",
    desc: "Tus datos, protegidos por expertos.",
    size: "md:col-span-8 md:row-span-1",
    img: "/tu-ruta-4.jpg",
    color: "bg-orange-500"
  },
];

export default function BentoSection() {
  return (
    <section className="bg-slate-950 py-24 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Encabezado de Sección */}
        <div className="mb-16 flex flex-col items-end text-right">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light tracking-tight text-white md:text-6xl"
          >
            Elevamos el <span className="italic font-serif text-blue-400">estándar</span>
          </motion.h2>
          <div className="mt-4 h-1 w-24 bg-blue-500" />
        </div>

        {/* Grid Estilo Bento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl bg-slate-900 ${item.size}`}
            >
              {/* Overlay Gradiente */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
              
              {/* Imagen de Fondo */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Contenido */}
              <div className="relative z-20 flex h-full flex-col justify-end p-8">
                <div className={`mb-3 h-1 w-12 rounded-full ${item.color}`} />
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 max-w-[250px] text-sm text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                  {item.desc}
                </p>
              </div>

              {/* Efecto de Brillo (Glow) al Hover */}
              <div className="absolute -inset-full top-0 z-30 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1s_ease-in-out]" />
            </motion.div>
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