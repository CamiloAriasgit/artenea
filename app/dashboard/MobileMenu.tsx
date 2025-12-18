"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, PlusCircle, List, ExternalLink, User } from 'lucide-react'

export default function MobileMenu({ email }: { email: string | undefined }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      {/* Botón Hamburguesa */}
      <button onClick={toggleMenu} className="p-2 text-gray-600 focus:outline-none bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay y Menú Desplegable */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b shadow-xl z-50 flex flex-col p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6">
            <Link 
              href="/dashboard" 
              onClick={toggleMenu}
              className="flex items-center gap-3 font-medium text-gray-700 hover:text-violet-600 transition-colors"
            >
              <List size={20} /> Lista de Obras
            </Link>
            <Link 
              href="/dashboard/nuevo" 
              onClick={toggleMenu}
              className="flex items-center gap-3 font-medium text-gray-700 hover:text-violet-600 transition-colors"
            >
              <PlusCircle size={20} />Añadir Nueva
            </Link>
            <Link 
              href="/tienda" 
              target="_blank" 
              className="flex items-center gap-3 font-medium text-gray-700 hover:text-violet-600 transition-colors"
            >
              <ExternalLink size={20} /> Ver Web
            </Link>

            <div className="h-px bg-gray-300 my-2"></div>

            {/* Info de Usuario y Logout */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-500 italic">
                <User size={16} /> {email}
              </div>
              <form action="/auth/signout" method="post">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-3 rounded-xl font-bold transition-colors"
                >
                  <LogOut size={20} /> Cerrar Sesión
                </button>
              </form>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}