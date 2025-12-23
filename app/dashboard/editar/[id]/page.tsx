import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditarObraPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: obra } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (!obra) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 text-black">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Cancelar edición y volver
        </Link>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <header className="mb-8 border-b border-gray-50 pb-6">
            <h1 className="text-2xl font-bold text-gray-800">Editar Obra</h1>
            <p className="text-sm text-gray-500">Estás editando: <span className="text-violet-600 font-medium">{obra.titulo}</span></p>
          </header>

          <EditForm obra={obra} />
        </div>
      </div>
    </main>
  )
}