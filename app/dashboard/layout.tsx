import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import MobileMenu from './MobileMenu' // Importamos el nuevo menú

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center shadow-sm">
        <div className="flex gap-8 items-center">
          <span className="font-bold text-xl text-gray-800 tracking-tight leading-none flex items-center">
            Artenea <span className="text-xs bg-violet-200 font-normal text-violet-400 px-1 py-0.5 rounded-full tracking-widest ml-1">Admin</span>
          </span>
          
          {/* Navegación Desktop (se oculta en móvil) */}
          <div className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
              Lista de Obras
            </Link>
            <Link href="/dashboard/nuevo" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
              + Añadir Nueva
            </Link>
            <Link href="/" target="_blank" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
              Ver Web ↗
            </Link>
          </div>
        </div>
        
        {/* Lado derecho Desktop (se oculta en móvil) */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-xs text-gray-400 font-mono">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="bg-gray-100 hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cerrar Sesión
            </button>
          </form>
        </div>

        {/* Menú Hamburguesa para Móvil (se muestra solo en móvil) */}
        <MobileMenu email={user.email} />
      </nav>

      {/* Padding top para compensar el nav fixed */}
      <main className="pt-15">
        {children}
      </main>
    </div>
  )
}