'use client' // Importante: Esto lo hace interactivo
import { Share2 } from 'lucide-react'

export default function BotonCompartir({ id, titulo }: { id: string, titulo: string }) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault() // Evita que el Link del padre se active
    
    const url = `${window.location.origin}/tienda/${id}`
    
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, url })
      } catch (err) {
        console.log('Error al compartir', err)
      }
    } else {
      // Fallback si el navegador no soporta share (escritorio)
      await navigator.clipboard.writeText(url)
      alert('¡Enlace copiado al portapapeles!')
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="p-1 text-gray-500 hover:text-violet-600 bg-gray-100 rounded transition-colors shadow-sm"
      title="Compartir obra"
    >
      <Share2 size={20} />
    </button>
  )
}