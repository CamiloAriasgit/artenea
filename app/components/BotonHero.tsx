"use client"
import { MessageCircle } from 'lucide-react'

interface BotonWhatsappProps {
  texto: string;
  mensajePersonalizado?: string;
}

export default function BotonWhatsapp({ texto, mensajePersonalizado }: BotonWhatsappProps) {
  const NUMERO_DE_TELEFONO = "573003607632";
  
  // Mensaje por defecto si no se pasa uno por props
  const MENSAJE_PREDETERMINADO = mensajePersonalizado || "¡Hola! Me gustaría pedir una obra personalizada.";
  
  const mensajeCodificado = encodeURIComponent(MENSAJE_PREDETERMINADO);
  const whatsappUrl = `https://wa.me/${NUMERO_DE_TELEFONO}?text=${mensajeCodificado}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-violet-100 border-2 border-violet-100 text-violet-500 px-4 py-4 w-full rounded-xl text-sm uppercase tracking-[0.3em] hover:bg-violet-200 hover:border-violet-200 transition-all duration-500 ease-in-out font-medium"
    >
        {texto}
    
    </a>
  );
}