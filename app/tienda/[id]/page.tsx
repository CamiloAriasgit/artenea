import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // Usamos el componente Image de Next.js
import { ArrowLeft, MessageCircle, Ruler, Info, ShieldCheck } from 'lucide-react'

export default async function ObraDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: obra } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (!obra) notFound()

  // Formateador de precio
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900">
      {/* Navegación sutil */}
      <nav className="max-w-7xl mx-auto p-6 lg:px-12">
        <Link 
          href="/tienda" 
          className="group inline-flex items-center gap-2 text-zinc-400 hover:text-black transition-all duration-300 uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Regresar a la Colección
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Columna Izquierda: Imagen con efecto de profundidad */}
        <div className="lg:col-span-7 sticky top-12">
          <div className="relative group overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <img 
              src={obra.imagen_url} 
              alt={obra.titulo} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Columna Derecha: Información Detallada */}
        <div className="lg:col-span-5 flex flex-col space-y-10">
          <section className="space-y-4">
            <div className="inline-block px-3 py-1 border border-violet-100 bg-violet-50/50 rounded-full">
               <span className="text-violet-600 uppercase tracking-widest text-[10px] font-bold">
                {obra.categoria}
               </span>
            </div>
            
            <h1 className="text-5xl font-light tracking-tighter text-zinc-950 leading-tight uppercase">
              {obra.titulo}
            </h1>
            
            <p className="text-3xl font-extralight text-zinc-500">
              {formatter.format(obra.precio)}
            </p>
          </section>

          {/* Bloques de Información Estructurada */}
          <div className="grid gap-8 py-8 border-y border-zinc-100">
            <div className="flex gap-4">
              <div className="mt-1 text-zinc-400"><Ruler size={18} strokeWidth={1.5} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Dimensiones</p>
                <p className="text-zinc-700 font-medium">{obra.medidas}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-zinc-400"><Info size={18} strokeWidth={1.5} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Descripción del Artista</p>
                <p className="text-zinc-600 leading-relaxed font-serif italic text-lg text-balance">
                  "{obra.descripcion}"
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 text-zinc-400"><ShieldCheck size={18} strokeWidth={1.5} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Garantía</p>
                <p className="text-zinc-500 text-sm italic">Obra original certificada con entrega asegurada.</p>
              </div>
            </div>
          </div>

          {/* Acción Principal */}
          <div className="space-y-4">
            <a 
              href={`https://wa.me/TUNUMERO?text=Hola! Me interesa la obra "${obra.titulo}" que vi en tu galería web.`}
              target="_blank"
              className="group relative flex items-center justify-center gap-3 w-full bg-zinc-950 text-white px-8 py-6 rounded-sm hover:bg-violet-700 transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold shadow-2xl shadow-zinc-200 overflow-hidden"
            >
              <MessageCircle size={18} className="z-10" />
              <span className="z-10">Solicitar Información</span>
              {/* Efecto de brillo al pasar el mouse */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
            </a>
            
            <p className="text-center text-zinc-400 text-[10px] tracking-wide">
              CONSULTA POR OPCIONES DE ENMARCADO Y ENVÍO INTERNACIONAL
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}