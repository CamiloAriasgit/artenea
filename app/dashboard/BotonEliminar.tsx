"use client" // Indispensable para usar onClick

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
        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        onClick={(e) => {
          if (!confirm("¿Estás seguro de que quieres eliminar esta obra?")) {
            e.preventDefault();
          }
        }}
      >
        Eliminar
      </button>
    </form>
  )
}