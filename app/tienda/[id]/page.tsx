import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Ruler, Info, ShieldCheck } from 'lucide-react'
import BotonContacto from '../components/BotonContacto'
import BotonCompartirDetails from '../components/BotonCompartirDetails'
import BotonReferencia from '../components/BotonReferencia'

export default async function ObraDetalle({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: obra } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single()

    if (!obra) notFound()

    // Formateador de precio (puedes cambiar 'es-CL' y 'CLP' por tu moneda local)
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
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

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-10 grid lg:grid-cols-12 gap-12 items-start">

                {/* COLUMNA IZQUIERDA: Imagen 
            - lg:sticky y lg:top-12: Solo se queda fija en desktop.
            - mb-8 lg:mb-0: Separación en móvil que desaparece en desktop.
        */}
                <div className="lg:col-span-7 lg:sticky lg:top-12 self-start lg:mb-0">
                    <div className="relative group overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                        <img
                            src={obra.imagen_url}
                            alt={obra.titulo}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>

                {/* COLUMNA DERECHA: Información Detallada */}
                <div className="lg:col-span-5 flex flex-col space-y-5">
                    <section className="space-y-0 flex flex-col justify-center">
                        <span className="text-violet-600 uppercase tracking-widest text-[10px] font-bold">
                            {obra.categoria}
                        </span>
                        <h1 className="text-2xl md:text-5xl tracking-tighter text-zinc-950 leading-tight uppercase">
                            {obra.titulo}
                        </h1>
                        <p className="text-xl font-light text-zinc-500">
                            {formatter.format(obra.precio)}
                        </p>
                        <div className='flex justify-between pt-4 gap-2'>
                            <BotonContacto tituloObra={obra.titulo} />
                            <BotonCompartirDetails id={obra.id} titulo={obra.titulo} />
                        </div>

                    </section>

                    {/* Bloques de Información Estructurada */}
                    <div className="grid gap-8 py-8 border-y border-zinc-100">
                        {/* Medidas */}
                        <div className="flex gap-4">
                            <div className="mt-1 text-zinc-400"><Ruler size={18} strokeWidth={1.5} /></div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Dimensiones</p>
                                <p className="text-zinc-700 font-medium">{obra.medidas}</p>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="flex gap-4">
                            <div className="mt-1 text-zinc-400"><Info size={18} strokeWidth={1.5} /></div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Descripción de la obra</p>
                                <p className="text-zinc-600 leading-relaxed font-serif italic text-lg text-balance">
                                    "{obra.descripcion}"
                                </p>
                            </div>
                        </div>

                        {/* Garantía/Envío */}
                        <div className="flex gap-4">
                            <div className="mt-1 text-zinc-400"><ShieldCheck size={18} strokeWidth={1.5} /></div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Certificación</p>
                                <p className="text-zinc-500 text-sm italic">Obra original firmada por el artista. Incluye certificado de autenticidad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <BotonReferencia tituloObra={obra.titulo} />
                    </div>
                </div>
            </div>
        </main>
    )
}