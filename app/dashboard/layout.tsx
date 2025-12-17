import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si no hay usuario, redirigir al login inmediatamente
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 w-full py-4 px-6 flex justify-between items-center shadow-sm fixed">
        <div className="flex gap-8 items-center">
          <span className="font-bold text-xl text-gray-800 tracking-tight">Panel Admin</span>
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard/nuevo" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              + Nueva Obra
            </Link>
            <Link href="/tienda" target="_blank" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Ver Tienda ↗
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="bg-gray-100 hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cerrar Sesión
            </button>
          </form>
        </div>
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  )
}