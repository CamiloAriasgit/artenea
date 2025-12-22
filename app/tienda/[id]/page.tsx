import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Ruler, Info, ShieldCheck, Ban, Clock, AlertTriangle } from 'lucide-react'
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

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
    })

    // Lógica de identificación de estados precisa
    const estadoBajo = obra.estado_detalle?.toLowerCase() || '';
    const esVendido = estadoBajo.includes('vendido');
    const esReparacion = estadoBajo.includes('reparación');
    const esSuspendido = estadoBajo.includes('suspendido');

    // Nueva lógica: El botón de contacto aparece si está disponible O si está en reparación
    const mostrarBotonContacto = obra.disponible || esReparacion;

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

                {/* COLUMNA IZQUIERDA: Imagen */}
                <div className="lg:col-span-7 lg:sticky lg:top-12 self-start lg:mb-0">
                    <div className="relative group overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                        <img
                            src={obra.imagen_url}
                            alt={obra.titulo}
                            className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${!obra.disponible ? 'grayscale-[0.4] opacity-90' : ''}`}
                        />
                        
                        {/* Etiqueta flotante según el estado */}
                        {!obra.disponible && (
                            <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-500">
                                <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 text-white ${
                                    esVendido ? 'bg-red-500' : 
                                    esReparacion ? 'bg-amber-500' : 
                                    'bg-zinc-500'
                                }`}>
                                    {esVendido ? <Ban size={12} /> : esReparacion ? <Clock size={12} /> : <AlertTriangle size={12} />}
                                    {obra.estado_detalle}
                                </span>
                            </div>
                        )}
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

                        {/* Bloque de Precio / Estado Dinámico */}
                        <div className="mt-2">
                            {obra.disponible ? (
                                <p className="text-xl font-light text-zinc-500">
                                    {formatter.format(obra.precio)}
                                </p>
                            ) : (
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${
                                    esVendido ? 'bg-red-50 border-red-100 text-red-700' : 
                                    esReparacion ? 'bg-amber-50 border-amber-100 text-amber-700' : 
                                    'bg-zinc-100 border-zinc-200 text-zinc-600'
                                }`}>
                                    {esVendido ? <Ban size={14} /> : esReparacion ? <Clock size={14} /> : <AlertTriangle size={14} />}
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        {esVendido && "Obra no disponible para venta"}
                                        {esReparacion && "En proceso de restauración - puedes consultar"}
                                        {esSuspendido && "Catálogo - No disponible para venta"}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='flex justify-between pt-6 gap-2'>
                            {/* Botón de contacto habilitado para "Disponible" y "Reparación" */}
                            {mostrarBotonContacto && <BotonContacto tituloObra={obra.titulo} />}
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

                    {/* SECCIÓN DE REFERENCIA */}
                    <div className={`max-w-7xl mx-auto w-full transition-all duration-500 ${!obra.disponible ? 'pt-4' : ''}`}>
                        {!obra.disponible && (
                            <p className="text-[10px] text-violet-500 font-bold uppercase tracking-[0.2em] text-center mb-4 italic">
                                — Inspiración para pedidos personalizados —
                            </p>
                        )}
                        <BotonReferencia tituloObra={obra.titulo} />
                    </div>
                </div>
            </div>
        </main>
    )
}