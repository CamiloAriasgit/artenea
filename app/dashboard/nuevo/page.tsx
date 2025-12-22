"use client"
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload, ArrowLeft, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface PreviewImage {
    url: string;
    file: File;
}

export default function NuevoProducto() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // ESTADOS PARA MÚLTIPLES PREVIEWS
    const [previews, setPreviews] = useState<PreviewImage[]>([])

    // Manejar múltiples archivos
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                file: file
            }))
            setPreviews(prev => [...prev, ...newPreviews])
        }
        // Limpiamos el valor del input para que permita seleccionar los mismos archivos si se borran
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleRemoveImage = (index: number) => {
        setPreviews(prev => {
            const updated = [...prev]
            URL.revokeObjectURL(updated[index].url) // Limpiar memoria
            updated.splice(index, 1)
            return updated
        })
    }

    useEffect(() => {
        return () => {
            previews.forEach(p => URL.revokeObjectURL(p.url))
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (previews.length === 0) {
            alert("Por favor, selecciona al menos una imagen.")
            return
        }
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const titulo = formData.get('titulo') as string
        const precio = formData.get('precio') as string
        const categoria = formData.get('categoria') as string
        const medidas = formData.get('medidas') as string
        const descripcion = formData.get('descripcion') as string

        try {
            // 1. Subir todas las imágenes en paralelo
            const uploadPromises = previews.map(async (p) => {
                const fileExt = p.file.name.split('.').pop()
                const fileNameStorage = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
                
                const { error: uploadError } = await supabase.storage
                    .from('obras')
                    .upload(fileNameStorage, p.file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('obras')
                    .getPublicUrl(fileNameStorage)
                
                return publicUrl
            })

            const urlsSubidas = await Promise.all(uploadPromises)

            // 2. Insertar en DB (Usamos la primera foto para 'imagen_url' y todas para 'imagenes')
            const { error: dbError } = await supabase.from('productos').insert({
                titulo,
                descripcion,
                precio: parseFloat(precio),
                categoria,
                medidas,
                imagen_url: urlsSubidas[0], // Portada (compatibilidad)
                imagenes: urlsSubidas      // Array completo para el carrusel
            })

            if (dbError) throw dbError

            alert("¡Obra publicada con éxito!")
            router.refresh()
            router.push('/dashboard')

        } catch (error: any) {
            alert("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 py-6 md:py-12 px-2 md:px-4 text-black">
            <div className="max-w-2xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 px-2">
                    <ArrowLeft size={16} /> Volver al panel
                </Link>

                <div className="bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Subir Nueva Obra</h1>
                        <p className="text-sm text-gray-500">Puedes seleccionar varias fotos (la primera será la portada).</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Obra</label>
                            <input name="titulo" type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500" placeholder="Ej: Atardecer en el mar" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Precio ($)</label>
                                <input name="precio" type="number" step="1" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500" placeholder='0' />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                                <select name="categoria" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500">
                                    {['Pintura', 'Dibujo', 'Escultura', 'Crochet', 'Bisutería', 'Grabado'].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Medidas</label>
                            <input name="medidas" type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500" placeholder="Ej: 50x70 cm" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                            <textarea name="descripcion" rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500" placeholder="Cuéntanos mas sobre la obra..."></textarea>
                        </div>

                        {/* SECTOR DE IMÁGENES MÚLTIPLES */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 font-bold flex justify-between">
                                Fotos de la Obra <span>({previews.length})</span>
                            </label>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {/* Botón para añadir más */}
                                <div className="relative group flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all cursor-pointer">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-violet-500" />
                                    <span className="text-[10px] text-gray-500 mt-1">Añadir fotos</span>
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>

                                {/* Previews de las fotos seleccionadas */}
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative h-32 group rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                        <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                        {index === 0 && (
                                            <span className="absolute top-1 left-1 bg-violet-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Portada</span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 p-1 bg-white/90 text-red-500 rounded-full shadow-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-[0.98] disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Publicando {previews.length} fotos...
                                </>
                            ) : "Publicar Obra"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}