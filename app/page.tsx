import Link from 'next/link'
import HeroS from './components/HeroS';
import CategorySection from './components/CategorySection';
import Header from './components/Header';
import PersonalizadoSection from './components/PersonalizadoSection';
import EndSection from './components/EndSection';
import Footer from './components/Footer';

const text = "Scroll";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Sección Hero */}
      <Header />
      <HeroS />
      <CategorySection />
      <PersonalizadoSection />
      <EndSection />
      <Footer/>
    </div>
  )
}