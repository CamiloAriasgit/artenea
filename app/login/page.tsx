"use client"
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg("Credenciales inválidas. Intenta de nuevo.")
    } else {
      router.push('/dashboard') // Te mandamos directo al formulario de carga
      router.refresh()
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-5 m-10 bg-white rounded-xl shadow-lg flex flex-col gap-4 w-96">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Admin Artenea</h1>
        <p className="text-sm text-gray-500 text-center mb-4">Solo acceso autorizado</p>
        
        {errorMsg && <p className="text-red-500 text-sm bg-red-50 p-2 rounded text-center">{errorMsg}</p>}
        
        <input 
          name="email" 
          type="email" 
          placeholder="Correo electrónico" 
          className="p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black" 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Contraseña" 
          className="p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-black" 
          required 
        />
        <button type="submit" className="bg-violet-600 text-white p-3 rounded-lg font-bold hover:bg-violet-700 transition-colors mt-2">
          Entrar
        </button>
      </form>
    </div>
  )
}