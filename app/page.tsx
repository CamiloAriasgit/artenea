import Link from 'next/link'
import HeroSection from './components/HeroSection';
import HeroS from './components/HeroS';
import CategorySection from './components/CategorySection';
import Header from './components/Header';
import PersonalizadoSection from './components/PersonalizadoSection';

const text = "Scroll";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Sección Hero */}
      <Header />
      <HeroS />
      <CategorySection />
      <PersonalizadoSection />

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