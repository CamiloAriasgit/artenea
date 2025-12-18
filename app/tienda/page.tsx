import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ShoppingBag, LayoutGrid, Palette, Mountain, PenTool } from 'lucide-react'

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
    { name: 'Escultura', icon: <Mountain size={16} /> },
    { name: 'Dibujo', icon: <PenTool size={16} /> },
  ]

  return (
    <main className="min-h-screen bg-white pb-20">
      <header className="py-4 px-6 border-b border-gray-100 flex items-center gap-2">
        <div className="bg-violet-100 p-3 rounded-full text-violet-600 mb-2">
          <ShoppingBag size={20} />
        </div>
        <h1 className="text-xl font-light tracking-[0.2em] uppercase text-black">Tienda</h1>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Filtros */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-3 no-scrollbar scroll-smooth">
          {categorias.map((cat) => (
            <Link
              key={cat.name}
              href={cat.name === 'Todos' ? '/tienda' : `/tienda?categoria=${cat.name}`}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all border shrink-0 ${
                (categoria === cat.name) || (!categoria && cat.name === 'Todos')
                  ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-100'
                  : 'bg-white text-gray-500 border-gray-100 hover:border-violet-300 hover:text-violet-600'
              }`}
            >
              {cat.icon}
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Grid de productos ajustado a 2 columnas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12 mt-12">
          {obras?.map((obra) => (
            <Link href={`/tienda/${obra.id}`} key={obra.id} className="group flex flex-col">
              {/* Contenedor sin aspecto fijo para respetar proporción real */}
              <div className="relative overflow-hidden bg-gray-50 rounded-sm">
                <img 
                  src={obra.imagen_url} 
                  alt={obra.titulo}
                  className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <h3 className="text-sm md:text-lg font-medium text-black uppercase tracking-tight group-hover:text-violet-600 transition-colors">
                    {obra.titulo}
                  </h3>
                  <span className="text-violet-600 font-semibold text-sm md:text-base">${obra.precio}</span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest leading-none">
                  {obra.categoria} — {obra.medidas}
                </p>
                <div className="pt-2 md:pt-4">
                   <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 border-b border-gray-200 pb-1 group-hover:border-violet-600 group-hover:text-violet-600 transition-all">
                     Ver detalles
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}