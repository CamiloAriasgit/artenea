import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import BotonEliminar from './BotonEliminar'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: obras, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })

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

      {/* VISTA MÓVIL (Cards) - Se oculta en tablets/pc (md:hidden) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {obras?.map((obra) => (
          <div key={obra.id} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img src={obra.imagen_url} alt="" className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm line-clamp-1">{obra.titulo}</span>
                <span className="text-xs text-gray-500">{obra.categoria}</span>
                <span className="text-sm font-semibold text-green-600">${obra.precio}</span>
              </div>
            </div>
            <BotonEliminar id={obra.id} imageUrl={obra.imagen_url} onDelete={eliminarObra} />
          </div>
        ))}
      </div>

      {/* VISTA DESKTOP (Tabla) - Se oculta en móviles (hidden md:block) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-black">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Obra</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Precio</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {obras?.map((obra) => (
              <tr key={obra.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={obra.imagen_url} alt="" className="w-12 h-12 object-cover rounded-md" />
                    <span className="font-medium">{obra.titulo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{obra.categoria}</td>
                <td className="px-6 py-4 font-medium text-green-600">${obra.precio}</td>
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
        <div className="p-20 text-center text-gray-500 bg-white rounded-xl border border-dashed">
          No hay obras publicadas aún.
        </div>
      )}
    </div>
  )
}