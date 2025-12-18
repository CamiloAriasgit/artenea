"use client"
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('obras')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('obras')
        .getPublicUrl(fileName)

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
      router.refresh()
      router.push('/dashboard')

    } catch (error: any) {
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 md:py-12 px-2 md:px-4">
      <div className="max-w-2xl mx-auto">
        {/* Botón Volver */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors px-2"
        >
          <ArrowLeft size={16} /> Volver al panel
        </Link>

        <div className="bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Subir Nueva Obra</h1>
            <p className="text-sm text-gray-500">Completa los detalles para mostrar la obra en la galería.</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Obra</label>
              <input 
                name="titulo" 
                type="text" 
                required 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-black transition-all" 
                placeholder="Ej: Atardecer en el mar" 
              />
            </div>

            {/* Precio y Categoría (Se apilan en móvil, 2 columnas en desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Precio ($)</label>
                <input 
                  name="precio" 
                  type="number" 
                  step="0.01"
                  required 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-black transition-all" 
                  placeholder="0.00" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                <select 
                  name="categoria" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-black transition-all appearance-none"
                >
                  <option value="Pintura">Pintura</option>
                  <option value="Escultura">Escultura</option>
                  <option value="Dibujo">Dibujo</option>
                </select>
              </div>
            </div>

            {/* Medidas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Medidas</label>
              <input 
                name="medidas" 
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-black transition-all" 
                placeholder="Ej: 50x70 cm" 
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
              <textarea 
                name="descripcion" 
                rows={4} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-black transition-all" 
                placeholder="Describe la técnica, historia o materiales..."
              ></textarea>
            </div>

            {/* Selector de Imagen Mejorado */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de la Obra</label>
              <div className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                  <p className="text-xs text-gray-500 group-hover:text-blue-600 font-medium text-center px-4">
                    Toca para seleccionar o arrastra una imagen
                  </p>
                </div>
                <input 
                  name="imagen" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>
            </div>

            {/* Botón de Publicar */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publicando...
                </span>
              ) : "Publicar Obra"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}