import React from 'react'
import { Instagram, Facebook, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Marca y Bio */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold tracking-tighter mb-4 uppercase">Artenea</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Explorando la intersección entre la técnica clásica y el arte contemporáneo. Piezas únicas creadas con intención y alma.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-violet-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-violet-600 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-zinc-500">Explorar</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tienda" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">Catálogo <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/#sobre-mi" className="text-zinc-400 hover:text-white transition-colors">Sobre la artista</Link></li>
              <li><Link href="/#proceso" className="text-zinc-400 hover:text-white transition-colors">Proceso creativo</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-zinc-500">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-zinc-400 italic">
                <Mail size={16} className="text-violet-500" /> info@artenea.com
              </li>
              <li className="flex items-center gap-3 text-zinc-400 italic">
                <MapPin size={16} className="text-violet-500" /> Barranquilla, Colombia
              </li>
            </ul>
          </div>

          
        </div>

        {/* Línea final de créditos */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
          <p>© {currentYear} ARTENEA. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex gap-8">
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer