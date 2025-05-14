'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2 sm:gap-4">
          <img src="/logo-logexpress.png" alt="Logo LogExpress" className="h-8 w-8 sm:h-10 sm:w-10" />
          <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
            LogExpress
          </Link>
        </div>
        {/* Menu desktop */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition">Início</Link>
          <Link href="/contato" className="text-gray-700 hover:text-blue-700 font-medium transition">Contato</Link>
        </div>
        {/* Botão hamburger mobile */}
        <button
          className="md:hidden flex items-center p-2 rounded hover:bg-blue-50 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-white shadow px-4 pb-4 flex flex-col gap-2 animate-fade-in">
          <Link href="/" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition" onClick={() => setOpen(false)}>Início</Link>
          <Link href="/contato" className="py-2 text-gray-700 hover:text-blue-700 font-medium transition" onClick={() => setOpen(false)}>Contato</Link>
        </div>
      )}
    </header>
  );
} 