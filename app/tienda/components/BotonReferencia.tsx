'use client' // Necesario para obtener la URL actual del navegador

import { MessageCircle, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BotonReferenciaProps {
  tituloObra: string
}

export default function BotonReferencia({ tituloObra }: BotonReferenciaProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  // Obtenemos la URL solo cuando el componente se monta en el cliente
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const WHATSAPP_NUMBER = "573218927580" 
  const mensaje = encodeURIComponent(
    `¡Hola! Me encantó la obra "${tituloObra}" pero me gustaría solicitar una personalización similar. Aquí está el enlace para referencia: ${currentUrl}`
  )
  const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`

  return (
    <div className="pt-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center text-violet-500">
            <Sparkles size={24} />
        </div>
        
        <h3 className="text-xl font-light uppercase tracking-widest text-zinc-800">
            Encargos Personalizados
        </h3>
        
        <p className='text-zinc-500 font-light italic text-balance'>
            ¿Te gusta el estilo de "{tituloObra}"? Puedo crear una pieza única basada en esta obra, adaptada a tus medidas y preferencias.
        </p>

        <a
          href={urlWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-3 w-full bg-white border border-zinc-200 text-zinc-950 px-8 py-6 rounded-sm hover:bg-violet-500 hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold shadow-sm overflow-hidden"
        >
          <MessageCircle size={18} className="z-10" />
          <span className="z-10">Solicitar obra similar</span>
          
          {/* Efecto Shimmer invertido para el botón blanco */}
          <div className="absolute inset-0 w-1/2 h-full bg-zinc-400/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
        </a>

        <p className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-medium">
            Proceso artesanal · Piezas únicas certificadas
        </p>
      </div>
    </div>
  )
}