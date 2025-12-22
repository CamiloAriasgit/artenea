import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ShoppingBag, LayoutGrid, Palette, Mountain, PenTool, Scissors, Gem, Stamp } from 'lucide-react'
import BotonCompartir from './components/BotonCompartir'
import BotonDetalles from './components/BotonDetalles'
import BotonWhatsapp from './components/BotonWhatsapp'

export default async function TiendaPage({
    searchParams,
}: {
    searchParams: Promise<{ categoria?: string }>
}) {
    const supabase = await createClient()
    const { categoria } = await searchParams

    let query = supabase.from('productos').select('*').order('created_at', { ascending: false })
    if (categoria && categoria !== 'Todos') {
        query = query.eq('categoria', categoria)
    }
    const { data: obras } = await query

    const categorias = [
        { name: 'Todos', icon: <LayoutGrid size={16} /> },
        { name: 'Pintura', icon: <Palette size={16} /> },
        { name: 'Dibujo', icon: <PenTool size={16} /> },
        { name: 'Escultura', icon: <Mountain size={16} /> },
        { name: 'Crochet', icon: <Scissors size={16} /> },
        { name: 'Bisutería', icon: <Gem size={16} /> },
        { name: 'Grabado', icon: <Stamp size={16} /> },
    ]

    return (
        <main className="min-h-screen bg-gray-100 pb-20">

            {/* SECCIÓN FIJA: Header y Filtros */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">

                {/* Header */}
                <header className="py-4 px-3 flex items-center justify-between max-w-7xl mx-auto">
                    <div className='flex items-center gap-2'>
                        <div className="bg-violet-100 p-2 rounded-full text-violet-600">
                            <ShoppingBag size={18} />
                        </div>
                        <h1 className="text-lg font-light tracking-[0.2em] uppercase text-gray-500 font-sans">Tienda</h1>
                    </div>
                    <BotonWhatsapp
                        texto="Personalizados"
                        mensajePersonalizado="¡Hola! Vi tu tienda y me interesa una obra personalizada. ¿Podrías darme información?"
                    />
                </header>

                {/* Filtros: Centrados en PC, Scroll en Móvil */}
               <div className="w-full pb-4 px-4 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex overflow-x-auto md:justify-center gap-2 no-scrollbar scroll-smooth">
                            {categorias.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={cat.name === 'Todos' ? '/tienda' : `/tienda?categoria=${cat.name}`}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all border shrink-0 ${(categoria === cat.name) || (!categoria && cat.name === 'Todos')
                                            ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-100'
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-violet-300 hover:text-violet-600'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO: Grid de Obras */}
            <div className="max-w-7xl mx-auto px-2 py-6 md:py-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 md:gap-x-8 md:gap-y-12">
                    {obras?.map((obra) => (
                        <Link
                            href={`/tienda/${obra.id}`}
                            key={obra.id}
                            className={`group flex bg-white p-2 shadow-sm border border-gray-100 rounded-lg flex-col transition-all hover:shadow-md ${!obra.disponible ? 'opacity-90' : ''}`}
                        >
                            {/* Contenedor de Imagen */}
                            <div className="relative overflow-hidden bg-white rounded-md aspect-square flex items-center justify-center">
                                <img
                                    src={obra.imagen_url}
                                    alt={obra.titulo}
                                    className={`max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 ${!obra.disponible ? 'grayscale-[0.5]' : ''}`}
                                />
                                
                                {/* ETIQUETA DE DISPONIBILIDAD */}
                                {!obra.disponible && (
                                    <div className="absolute inset-0 bg-black/5 flex items-start justify-end p-2">
                                        <span className={`px-2 py-1 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-tighter shadow-sm backdrop-blur-sm ${
                                            obra.estado_detalle?.includes('vendido') 
                                                ? 'bg-red-500/90 text-white' 
                                                : obra.estado_detalle?.includes('reparación')
                                                ? 'bg-amber-500/90 text-white'
                                                : 'bg-zinc-500/90 text-white'
                                        }`}>
                                            {obra.estado_detalle || 'No disponible'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                        <h3 className="text-xs md:text-base font-bold text-gray-800 uppercase tracking-tight group-hover:text-violet-600 transition-colors line-clamp-1">
                                            {obra.titulo}
                                        </h3>
                                        <span className={`font-black text-xs md:text-sm ${!obra.disponible ? 'text-gray-400 line-through decoration-1' : 'text-gray-500'}`}>
                                            ${obra.precio.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                                        {obra.categoria} — {obra.medidas}
                                    </p>
                                </div>

                                {/* Acciones */}
                                <div className="pt-2 flex items-center justify-between mt-auto border-t border-gray-100">
                                    <BotonDetalles />
                                    <BotonCompartir id={obra.id} titulo={obra.titulo} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mensaje de no resultados */}
                {obras?.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <p className="text-gray-400 text-sm italic tracking-widest uppercase">No hay obras en la categoría <span className="font-bold">"{categoria || 'Todos'}"</span></p>
                    </div>
                )}
            </div>
        </main>
    )
}