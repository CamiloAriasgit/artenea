'use client' 

import { Share2, Check } from 'lucide-react'
import { useState } from 'react'

export default function BotonCompartir({ id, titulo }: { id: string, titulo: string }) {
  const [copiado, setCopiado] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    // 1. Evitamos que el clic se propague al Link padre (la carta)
    e.preventDefault()
    e.stopPropagation()
    
    const url = `${window.location.origin}/tienda/${id}`
    
    // 2. Intentamos usar el menú nativo de compartir (Móvil)
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `Obra: ${titulo}`, 
          text: `Mira esta obra en Artenea: ${titulo}`,
          url 
        })
      } catch (err) {
        console.log('Error al compartir', err)
      }
    } else {
      // 3. Fallback para Escritorio: Copiar al portapapeles
      try {
        await navigator.clipboard.writeText(url)
        setCopiado(true)
        
        // El icono de "Copiado" vuelve a ser de "Compartir" tras 2 segundos
        setTimeout(() => setCopiado(false), 2000)
      } catch (err) {
        alert('No se pudo copiar el enlace')
      }
    }
  }

  return (
    <button 
      onClick={handleShare}
      className={`
        p-2 rounded-lg transition-all duration-300 flex items-center justify-center
        ${copiado 
          ? 'bg-emerald-100 text-emerald-600 scale-110' 
          : 'bg-white text-gray-500 hover:text-violet-600 hover:bg-violet-50 border border-gray-100 shadow-sm active:scale-90'
        }
      `}
      title={copiado ? "¡Enlace copiado!" : "Compartir obra"}
    >
      {copiado ? <Check size={18} /> : <Share2 size={18} />}
    </button>
  )
}