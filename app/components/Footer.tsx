import React from 'react'
import { Instagram, Facebook, Mail, MapPin, ArrowUpRight, ShieldCheck, Truck, Palette } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id='Footer' className="bg-zinc-950 text-white pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Marca y Bio */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold tracking-tighter mb-4 uppercase">Artenea</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Explorando la intersección entre la técnica clásica y el arte contemporáneo. Piezas únicas creadas con intención y alma desde el corazón de Colombia.
            </p>
            <div className="flex gap-4">
              <a href="https://wwww.instagram.com/arteneaz?igsh=MW9xbGV1cTYzbHJiMA==" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-violet-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-violet-600 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-zinc-500">Navegación</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tienda" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">Catálogo de Obras <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Panel de Gestión</Link></li>
              <li><Link href="/#sobre-mi" className="text-zinc-400 hover:text-white transition-colors">Sobre la Artista</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-zinc-500">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail size={16} className="text-violet-500" /> info@artenea.com
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <MapPin size={16} className="text-violet-500" /> Bogotá, Colombia
              </li>
              <li className="pt-2 text-[11px] text-zinc-500 uppercase tracking-widest font-bold">
                Lunes a Viernes <br/> <span className="font-light normal-case opacity-70">9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Valores de Marca (Reemplazo del Newsletter) */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-violet-400">Compromiso</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-violet-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase">Autenticidad</p>
                  <p className="text-[11px] text-zinc-500">Cada obra incluye un certificado firmado.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Truck size={18} className="text-violet-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase">Envíos Seguros</p>
                  <p className="text-[11px] text-zinc-500">Embalaje profesional para máxima protección.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Palette size={18} className="text-violet-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase">Encargos</p>
                  <p className="text-[11px] text-zinc-500">¿Buscas algo especial? Hablemos.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Línea final */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
          <p>© {currentYear} ARTENEA</p>
          <div className="flex gap-8">
            <span className="opacity-50">Arte Original</span>
            <span className="opacity-50">Hecho a mano</span>
          </div>
          <p className="normal-case font-light text-[12px] italic tracking-normal">
            diseñado para <span className="text-zinc-400 font-medium">Artenea Studio</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer