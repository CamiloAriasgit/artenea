"use client"
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload, ArrowLeft, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function NuevoProducto() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Referencia al input de archivo para poder limpiarlo manualmente
    const fileInputRef = useRef<HTMLInputElement>(null)

    // ESTADOS PARA LA PREVIEW
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    // Función para manejar el cambio del archivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFileName(file.name)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    // Limpiar la selección
    const handleRemoveImage = () => {
        setPreviewUrl(null)
        setFileName(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = "" // Reset técnico del input
        }
    }

    // Limpiar la URL temporal para no consumir memoria
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        // Obtenemos el archivo directamente del input para mayor seguridad
        const file = fileInputRef.current?.files?.[0]

        const titulo = formData.get('titulo') as string
        const precio = formData.get('precio') as string
        const categoria = formData.get('categoria') as string
        const medidas = formData.get('medidas') as string
        const descripcion = formData.get('descripcion') as string

        if (!file) {
            alert("Por favor, selecciona una imagen.")
            setLoading(false)
            return
        }

        try {
            const fileExt = file.name.split('.').pop()
            const fileNameStorage = `${Date.now()}.${fileExt}`

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('obras')
                .upload(fileNameStorage, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('obras')
                .getPublicUrl(fileNameStorage)

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
        <main className="min-h-screen bg-gray-50 py-6 md:py-12 px-2 md:px-4 text-black">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors px-2"
                >
                    <ArrowLeft size={16} /> Volver al panel
                </Link>

                <div className="bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Subir Nueva Obra</h1>
                        <p className="text-sm text-gray-500">Completa los detalles para la galería.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la Obra</label>
                            <input name="titulo" type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black focus:ring-2 focus:ring-violet-500" placeholder="Ej: Atardecer en el mar" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Precio ($)</label>
                                <input name="precio" type="number" step="0.01" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black focus:ring-2 focus:ring-violet-500" placeholder='0.00' />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                                <select name="categoria" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black focus:ring-2 focus:ring-violet-500">
                                    <option value="Pintura">Pintura</option>
                                    <option value="Dibujo">Dibujo</option>
                                    <option value="Escultura">Escultura</option>
                                    <option value="Crochet">Crochet</option>
                                    <option value="Bisutería">Bisutería</option>
                                    <option value="Grabado">Grabado</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Medidas</label>
                            <input name="medidas" type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black focus:ring-2 focus:ring-violet-500" placeholder="Ej: 50x70 cm" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                            <textarea name="descripcion" rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black focus:ring-2 focus:ring-violet-500" placeholder="Cuéntanos mas sobre la obra..."></textarea>
                        </div>

                        {/* SECTOR DE IMAGEN CORREGIDO */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen de la Obra</label>

                            <div className="relative">
                                {/* El input siempre está presente pero invisible, permitiendo que el archivo persista */}
                                <input
                                    ref={fileInputRef}
                                    name="imagen"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer ${previewUrl ? 'hidden' : 'block'}`}
                                    required={!previewUrl}
                                />

                                {!previewUrl ? (
                                    <div className="group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-violet-500 mb-2" />
                                            <p className="text-xs text-gray-500 group-hover:text-violet-600 font-medium">Toca para seleccionar imagen</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-48 object-contain bg-black/5"
                                        />
                                        <div className="p-3 flex items-center justify-between bg-white border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-black">
                                                <ImageIcon size={16} className="text-violet-500" />
                                                <span className="text-xs font-medium truncate max-w-[200px]">{fileName}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Publicando...
                                </>
                            ) : "Publicar Obra"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}