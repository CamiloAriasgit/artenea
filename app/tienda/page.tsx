import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const supabase = await createClient()
  const { categoria } = await searchParams

  // 1. Iniciamos la consulta
  let query = supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. Si hay una categoría seleccionada (y no es "Todos"), filtramos
  if (categoria && categoria !== 'Todos') {
    query = query.eq('categoria', categoria)
  }

  const { data: obras, error } = await query

  const categorias = ['Todos', 'Pintura', 'Escultura', 'Dibujo']

  return (
    <main className="min-h-screen bg-white">
      <header className="py-12 px-6 border-b">
        <h1 className="text-4xl font-light tracking-widest text-center uppercase text-black">Galería de Arte</h1>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 3. Botones de Filtro */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map((cat) => (
            <Link
              key={cat}
              href={cat === 'Todos' ? '/tienda' : `/tienda?categoria=${cat}`}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all border ${
                (categoria === cat) || (!categoria && cat === 'Todos')
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {obras?.map((obra) => (
            <div key={obra.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={obra.imagen_url} 
                  alt={obra.titulo}
                  className="object-cover w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-6 space-y-1 text-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium uppercase tracking-tighter">{obra.titulo}</h3>
                  <span className="text-gray-600 font-light">${obra.price || obra.precio}</span>
                </div>
                <p className="text-sm text-gray-400 font-light italic">
                  {obra.categoria} — {obra.medidas}
                </p>
                <div className="pt-4 border-t border-gray-50 mt-4">
                   <p className="text-sm text-gray-600 line-clamp-2 mb-4">{obra.descripcion}</p>
                   <button className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                     Consultar disponibilidad
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {obras?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No se encontraron obras en la categoría "{categoria}".</p>
            <Link href="/tienda" className="text-blue-600 underline mt-2 inline-block">Ver todo el catálogo</Link>
          </div>
        )}
      </div>
    </main>
  )
}