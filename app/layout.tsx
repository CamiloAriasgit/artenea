import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Importamos el componente Toaster
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Personaliza aquí el título de la tienda de tu novia
export const metadata: Metadata = {
  title: "Galería de Arte | Portafolio",
  description: "Exhibición de obras de arte originales y piezas únicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* 2. Añadimos el Toaster al final del body */}
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton
          toastOptions={{
            style: { 
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
      </body>
    </html>
  );
}