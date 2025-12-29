'use client'
import { MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

interface BotonContactoProps {
  tituloObra: string
  texto?: string
  className?: string
}

export default function BotonContacto({ 
  tituloObra, 
  texto = "Pedir obra",
  className = "" 
}: BotonContactoProps) {
  
  const WHATSAPP_NUMBER = "573218927580"
  const mensaje = encodeURIComponent(`Hola! Me interesa la obra "${tituloObra}"`)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`

  const notificarRedireccion = () => {
    toast.info("Abriendo WhatsApp", {
      description: `Enviando consulta por "${tituloObra}"`,
      icon: <MessageCircle size={16} className="text-green-500" />
    })
  }

  return (
    <div className={`w-full ${className}`}>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={notificarRedireccion}
        className="group relative flex items-center justify-center gap-3 h-full bg-violet-600 text-violet-50 px-8 rounded-sm hover:bg-violet-700 hover:text-violet-50 transition-all duration-500 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold shadow-2xl shadow-zinc-200 overflow-hidden"
      >
        <MessageCircle size={18} className="z-10" />
        <span className="z-10">{texto}</span>
        
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
      </a>
    </div>
  )
}