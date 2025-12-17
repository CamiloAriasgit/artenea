"use client"
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function NuevoProducto() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('imagen') as File
    const titulo = formData.get('titulo') as string
    const precio = formData.get('precio') as string
    const categoria = formData.get('categoria') as string
    const medidas = formData.get('medidas') as string
    const descripcion = formData.get('descripcion') as string

    try {
      // 1. Subir la imagen al bucket 'obras'
      // Usamos un nombre único con Date.now() para evitar colisiones
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('obras')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // 2. Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('obras')
        .getPublicUrl(fileName)

      // 3. Insertar los datos en la tabla 'productos'
      const { error: dbError } = await supabase.from('productos').insert({
        titulo,
        descripcion,
        precio: parseFloat(precio),
        categoria,
        medidas,
        imagen_url: publicUrl
      })

      if (dbError) throw dbError

      alert("¡Obra publicada exitosamente!")
      router.refresh() // Refresca los datos del servidor
      router.push('/dashboard') // Opcional: volver al panel principal

    } catch (error: any) {
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Subir Nueva Obra</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input name="titulo" type="text" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="Ej: Atardecer en el mar" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
              <input name="precio" type="number" required className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select name="categoria" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black">
                <option value="Pintura">Pintura</option>
                <option value="Escultura">Escultura</option>
                <option value="Dibujo">Dibujo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medidas</label>
            <input name="medidas" type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="Ej: 50x70 cm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea name="descripcion" rows={3} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="Cuéntanos más sobre la obra..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de la Obra</label>
            <input name="imagen" type="file" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400"
          >
            {loading ? "Publicando..." : "Publicar Obra"}
          </button>
        </form>
      </div>
    </main>
  )
}