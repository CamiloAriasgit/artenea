"use client"
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRef } from 'react'

type Props = {
  id: string
  titulo?: string // Añadido para personalizar el mensaje
  imageUrl: string
  onDelete: (formData: FormData) => Promise<void>
}

export default function BotonEliminar({ id, titulo = "esta obra", imageUrl, onDelete }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleConfirmAction = (e: React.MouseEvent) => {
    e.preventDefault();

    // Mostramos un toast tipo "advertencia" con botones de acción
    toast.warning(`¿Eliminar ${titulo}?`, {
      description: "Esta acción no se puede deshacer.",
      action: {
        label: "Eliminar",
        onClick: () => {
          // Si el usuario confirma, ejecutamos el envío del formulario
          if (formRef.current) {
            const promise = () => onDelete(new FormData(formRef.current!));
            
            toast.promise(promise(), {
              loading: 'Eliminando de la galería...',
              success: 'Obra eliminada correctamente',
              error: 'No se pudo eliminar la obra',
            });
          }
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <form ref={formRef} action={onDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="imageUrl" value={imageUrl} />
      <button 
        type="button" // Cambiado a button para manejar el click manualmente
        onClick={handleConfirmAction}
        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer rounded-lg transition-all duration-300 shadow-sm active:scale-90"
        title="Eliminar obra"
      >
        <Trash2 size={20} />
      </button>
    </form>
  )
}