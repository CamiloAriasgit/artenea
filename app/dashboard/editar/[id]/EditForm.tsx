"use client"
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Save, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner' // Importamos toast

export default function EditForm({ obra }: { obra: any }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [disponible, setDisponible] = useState(obra.disponible)
  const [estadoDetalle, setEstadoDetalle] = useState(obra.estado_detalle || 'Disponible')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const updates = {
      titulo: formData.get('titulo'),
      precio: parseFloat(formData.get('precio') as string),
      categoria: formData.get('categoria'),
      medidas: formData.get('medidas'),
      descripcion: formData.get('descripcion'),
      disponible: disponible,
      estado_detalle: disponible ? 'Disponible' : estadoDetalle,
    }

    // Definimos la función de actualización para la promesa
    const actualizarObra = async () => {
      const { error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', obra.id)

      if (error) throw error
      return updates.titulo
    }

    // Ejecutamos la promesa con Sonner
    try {
      await toast.promise(actualizarObra(), {
        loading: 'Guardando cambios...',
        success: (titulo) => {
          setTimeout(() => {
            router.push('/dashboard')
            router.refresh()
          }, 1000)
          return `¡"${titulo}" actualizada con éxito!`
        },
        error: (err) => {
          setLoading(false)
          return `Error: ${err.message}`
        },
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección de Disponibilidad */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${disponible ? 'border-green-100 bg-green-50' : 'border-amber-100 bg-amber-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {disponible ? <CheckCircle2 className="text-green-600" /> : <AlertCircle className="text-amber-600" />}
            <div>
              <p className="font-bold text-gray-800">Estado de Disponibilidad</p>
              <p className="text-xs text-gray-500">¿Se puede comprar directamente?</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setDisponible(!disponible)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${disponible ? 'bg-green-600' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${disponible ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {!disponible && (
          <div className="mt-4 pt-4 border-t border-amber-200 animate-in fade-in slide-in-from-top-2">
            <label className="block text-sm font-semibold text-amber-800 mb-2">Motivo de no disponibilidad:</label>
            <select 
              value={estadoDetalle}
              onChange={(e) => setEstadoDetalle(e.target.value)}
              className="w-full p-2 bg-white border border-amber-300 rounded-lg text-sm text-amber-900 outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            >
              <option value="Artículo vendido">Artículo vendido</option>
              <option value="Bajo reparación">Bajo reparación (se puede solicitar)</option>
              <option value="Artículo suspendido">Artículo suspendido</option>
            </select>
          </div>
        )}
      </div>

      {/* Resto de campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Obra</label>
          <input name="titulo" defaultValue={obra.titulo} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-black transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Precio ($)</label>
          <input name="precio" type="number" step="1" defaultValue={obra.precio} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-black transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
          <select name="categoria" defaultValue={obra.categoria} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-black transition-all">
            {['Pintura', 'Dibujo', 'Escultura', 'Crochet', 'Bisutería', 'Grabado'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Medidas</label>
        <input name="medidas" defaultValue={obra.medidas} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-black transition-all" placeholder="Ej: 50x70 cm" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
        <textarea name="descripcion" defaultValue={obra.descripcion} rows={4} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-black transition-all"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : <Save size={20} />}
        {loading ? "Guardando..." : "Guardar Cambios"}
      </button>
    </form>
  )
}