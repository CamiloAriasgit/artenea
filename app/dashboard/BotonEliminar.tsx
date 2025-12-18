"use client"
import { Trash2 } from 'lucide-react' // Importamos el icono

type Props = {
  id: string
  imageUrl: string
  onDelete: (formData: FormData) => Promise<void>
}

export default function BotonEliminar({ id, imageUrl, onDelete }: Props) {
  return (
    <form action={onDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="imageUrl" value={imageUrl} />
      <button 
        type="submit"
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        onClick={(e) => {
          if (!confirm("¿Estás seguro de que quieres eliminar esta obra?")) {
            e.preventDefault();
          }
        }}
        title="Eliminar obra"
      >
        <Trash2 size={20} />
      </button>
    </form>
  )
}