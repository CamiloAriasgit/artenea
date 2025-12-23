'use client' 

import { Share2, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function BotonCompartirDetails({ id, titulo }: { id: string, titulo: string }) {
  const [copiado, setCopiado] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const url = `${window.location.origin}/tienda/${id}`
    
    // Caso 1: Dispositivos móviles (Nativo)
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `Obra: ${titulo}`, 
          text: `Mira esta obra en Artenea: ${titulo}`,
          url 
        })
        toast.success("¡Compartido con éxito!")
      } catch (err) {
        // No mostramos error si el usuario simplemente canceló la acción
        if ((err as Error).name !== 'AbortError') {
          toast.error("No se pudo compartir")
        }
      }
    } else {
      // Caso 2: Escritorio (Copiar al portapapeles)
      try {
        await navigator.clipboard.writeText(url)
        setCopiado(true)
        
        toast.success("Enlace copiado", {
          description: "El link se ha guardado en tu portapapeles.",
          icon: <Check size={16} className="text-emerald-500" />
        })
        
        setTimeout(() => setCopiado(false), 2000)
      } catch (err) {
        toast.error("Error al copiar el enlace")
      }
    }
  }

  return (
    <button 
      onClick={handleShare}
      className={`
        p-1 h-12 w-12 rounded transition-all duration-300 flex items-center justify-center
        ${copiado 
          ? 'bg-emerald-50 text-emerald-600 scale-105' 
          : 'bg-white text-gray-500 hover:text-violet-600 hover:bg-violet-50 shadow-sm active:scale-90'
        }
      `}
      title={copiado ? "¡Enlace copiado!" : "Compartir obra"}
    >
      {copiado ? <Check size={22} /> : <Share2 size={22} />}
    </button>
  )
}