import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Sección Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Un fondo decorativo suave o podrías poner una imagen de ella trabajando */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase italic">
            Artenea
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Una colección de trazos, formas y emociones capturadas en el tiempo. Explorando el límite entre lo tangible y lo imaginario.
          </p>
          
          <div className="pt-8">
            <Link 
              href="/tienda" 
              className="inline-block border border-black px-12 py-4 text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 ease-in-out font-medium"
            >
              Visitar Tienda
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        </div>
      </section>

      {/* Sección Breve Sobre Ella */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
            {/* Aquí puedes poner una foto de ella pintando */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic font-light">
              [ Foto de la Artista ]
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-light uppercase tracking-widest">La Visión</h2>
            <div className="w-12 h-px bg-black"></div>
            <p className="text-gray-600 leading-relaxed font-light">
              Cada pieza es un diálogo entre el material y la intención. Mi trabajo busca resaltar la belleza de lo imperfecto y la fuerza de la expresión artística en su forma más pura.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              Desde óleos sobre lienzo hasta esculturas que desafían el equilibrio, cada obra está disponible para aquellos que buscan conectar con una historia única.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
          © {new Date().getFullYear()} Artenea Portfolio — Hecho con amor
        </p>
      </footer>
    </div>
  )
}