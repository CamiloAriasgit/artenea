import { MessageCircle } from 'lucide-react'

interface BotonContactoProps {
  tituloObra: string
  texto?: string
  className?: string
}

export default function BotonContacto({ 
  tituloObra, 
  texto = "Consultar Disponibilidad",
  className = "" 
}: BotonContactoProps) {
  
  const WHATSAPP_NUMBER = "573003607632" // Configúralo aquí una sola vez
  const mensaje = encodeURIComponent(`Hola! Me interesa la obra "${tituloObra}"`)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`

  return (
    <div className={`space-y-6 ${className}`}>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-3 w-full bg-violet-600 text-violet-50 px-4 py-2 rounded-sm hover:bg-violet-700 hover:text-violet-50 transition-all duration-500 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold shadow-2xl shadow-zinc-200 overflow-hidden"
      >
        <MessageCircle size={18} className="z-10" />
        <span className="z-10">{texto}</span>
        
        {/* Efecto Shimmer */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
      </a>
    </div>
  )
}