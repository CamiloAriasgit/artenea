import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import BotonEliminar from './BotonEliminar' // Importamos el nuevo componente

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: obras, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })

  // Esta función se queda aquí porque es una Server Action
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

  if (error) return <p className="text-black">Error al cargar gestión.</p>

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestionar Obras</h1>
        <Link 
          href="/dashboard/nuevo" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Nueva Obra
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-black">
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
                <td className="px-6 py-4 font-medium">${obra.precio}</td>
                <td className="px-6 py-4 text-right">
                  {/* Usamos el componente de cliente aquí */}
                  <BotonEliminar 
                    id={obra.id} 
                    imageUrl={obra.imagen_url} 
                    onDelete={eliminarObra} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {obras?.length === 0 && (
          <div className="p-10 text-center text-gray-500">No hay obras publicadas aún.</div>
        )}
      </div>
    </div>
  )
}