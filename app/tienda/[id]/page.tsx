import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'

export default async function ObraDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: obra } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (!obra) notFound()

  return (
    <main className="min-h-screen bg-white">
      <nav className="p-6">
        <Link href="/tienda" className="flex items-center gap-2 text-gray-400 hover:text-violet-600 transition-colors uppercase text-xs tracking-widest font-bold">
          <ArrowLeft size={16} /> Volver a la tienda
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-4 grid md:grid-cols-2 gap-12 lg:gap-24">
        {/* Imagen */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-2xl shadow-gray-200">
          <img src={obra.imagen_url} alt={obra.titulo} className="w-full h-auto object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-2">
            <span className="text-violet-600 uppercase tracking-[0.3em] text-xs font-bold">{obra.categoria}</span>
            <h1 className="text-4xl md:text-5xl font-light text-black uppercase tracking-tighter">{obra.titulo}</h1>
            <p className="text-2xl text-gray-400 font-light">${obra.precio}</p>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Descripción</p>
            <p className="text-gray-600 leading-relaxed text-lg italic">"{obra.descripcion}"</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Especificaciones</p>
            <p className="text-gray-900 font-medium">{obra.medidas}</p>
          </div>

          <div className="pt-8">
            <a 
              href={`https://wa.me/TUNUMERO?text=Hola! Me interesa la obra "${obra.titulo}"`}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-black text-white px-10 py-5 rounded-full hover:bg-violet-600 transition-all duration-500 uppercase tracking-widest text-sm font-bold shadow-xl shadow-gray-200"
            >
              <MessageCircle size={20} /> Consultar disponibilidad
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}