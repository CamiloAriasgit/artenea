"use client"; // Necesario para el estado del menú en Next.js App Router

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Categorías', href: '#categorias' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <>
            {/* HEADER PRINCIPAL */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 h-15 flex items-center justify-between">
                    
                    {/* LOGO */}
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase italic text-neutral-400">
                        ARTENEAZ
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-violet-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/tienda" className="text-neutral-500 hover:text-violet-500 transition-colors">
                            <ShoppingBag size={20} />
                        </Link>
                    </nav>

                    {/* BOTÓN MÓVIL */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link href="/tienda" className="text-neutral-500">
                            <ShoppingBag size={20} />
                        </Link>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-neutral-500 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* MENÚ MÓVIL DESPLEGABLE */}
                <div className={`
                    absolute top-15 left-0 w-full bg-white border-b border-neutral-100 transition-all duration-300 ease-in-out md:hidden
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                `}>
                    <nav className="flex flex-col p-6 gap-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm uppercase tracking-[0.3em] text-neutral-600 font-light"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* SPACER: Para que el contenido no se oculte detrás del header fixed */}
            <div className="h-15"></div>
        </>
    );
};

export default Header;