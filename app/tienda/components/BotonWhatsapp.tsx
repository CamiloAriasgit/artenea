"use client"
import { MessageCircle } from 'lucide-react'

interface BotonWhatsappProps {
  texto: string;
  mensajePersonalizado?: string;
}

export default function BotonWhatsapp({ texto, mensajePersonalizado }: BotonWhatsappProps) {
  const NUMERO_DE_TELEFONO = "573218927580";
  
  // Mensaje por defecto si no se pasa uno por props
  const MENSAJE_PREDETERMINADO = mensajePersonalizado || "¡Hola! Me gustaría pedir una obra personalizada.";
  
  const mensajeCodificado = encodeURIComponent(MENSAJE_PREDETERMINADO);
  const whatsappUrl = `https://wa.me/${NUMERO_DE_TELEFONO}?text=${mensajeCodificado}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full px-2 py-1 font-light tracking-widest text-gray-500 text-[10px] md:text-xs uppercase bg-white shadow-sm flex items-center justify-center gap-3 transition-all duration-300 group-hover:bg-violet-900"
    >
        {texto}
        <div className="bg-violet-50 shadow rounded-full p-1.5 hover:bg-violet-400 transition-colors">
          <MessageCircle size={14} className="text-violet-600" />
        </div>
    </a>
  );
}