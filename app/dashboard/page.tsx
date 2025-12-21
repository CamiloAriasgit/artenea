import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import BotonEliminar from './BotonEliminar'
import { Search } from 'lucide-react' // Icono opcional

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const supabase = await createClient()
  const { categoria } = await searchParams

  // Lógica de filtrado
  let query = supabase.from('productos').select('*').order('created_at', { ascending: false })
  
  if (categoria && categoria !== 'Todos') {
    query = query.eq('categoria', categoria)
  }
  
  const { data: obras, error } = await query

  // Lista de categorías para el filtro (Misma de tu tienda)
  const categoriasFiltro = ['Todos', 'Pintura', 'Escultura', 'Dibujo', 'Crochet', 'Bisutería', 'Grabado']

  async function eliminarObra(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const imageUrl = formData.get('imageUrl') as string
    const supabaseClient = await createClient()

    const fileName = imageUrl.split('/').pop()
    if (fileName) {
      await supabaseClient.storage.from('obras').remove([fileName])
    }

    await supabaseClient.from('productos').delete().eq('id', id)

    revalidatePath('/dashboard')
    revalidatePath('/tienda')
  }

  if (error) return <p className="text-black p-4">Error al cargar gestión.</p>

  return (
    <div className="max-w-5xl mx-auto py-6 px-2">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-700">Gestionar Obras</h1>
        <Link 
          href="/dashboard/nuevo" 
          className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          + Nueva
        </Link>
      </div>

      {/* BARRA DE FILTRO */}
      <div className="mb-4 px-2 overflow-x-auto no-scrollbar">
        <div className="flex justify-center gap-2 min-w-max">
          {categoriasFiltro.map((cat) => {
            const isActive = (categoria === cat) || (!categoria && cat === 'Todos')
            return (
              <Link
                key={cat}
                href={cat === 'Todos' ? '/dashboard' : `/dashboard?categoria=${cat}`}
                className={`px-4 py-1.5 rounded-full text-xs transition-all border ${
                  isActive 
                  ? 'bg-violet-300 text-violet-600 border-violet-300' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-violet-300'
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </div>

      {/* VISTA MÓVIL (Cards) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {obras?.map((obra) => (
          <div key={obra.id} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img src={obra.imagen_url} alt="" className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm line-clamp-1">{obra.titulo}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{obra.categoria}</span>
                <span className="text-sm font-semibold text-green-600">${obra.precio}</span>
              </div>
            </div>
            <BotonEliminar id={obra.id} imageUrl={obra.imagen_url} onDelete={eliminarObra} />
          </div>
        ))}
      </div>

      {/* VISTA DESKTOP (Tabla) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-black">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Obra</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Categoría</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Precio</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {obras?.map((obra) => (
              <tr key={obra.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={obra.imagen_url} alt="" className="w-10 h-10 object-cover rounded-md bg-gray-50" />
                    <span className="font-medium text-gray-800">{obra.titulo}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px] uppercase font-bold">
                        {obra.categoria}
                    </span>
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">${obra.precio}</td>
                <td className="px-6 py-4 text-right">
                  <BotonEliminar id={obra.id} imageUrl={obra.imagen_url} onDelete={eliminarObra} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensaje vacío */}
      {obras?.length === 0 && (
        <div className="p-20 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
          No se encontraron obras en la categoría <span className="font-bold">"{categoria || 'Todos'}"</span>.
        </div>
      )}
    </div>
  )
}