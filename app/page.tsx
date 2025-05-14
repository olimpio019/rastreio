'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TrackingStatus from './components/TrackingStatus';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface Tracking {
  trackingCode: string;
  status: string;
  recipientName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  events: TrackingEvent[];
}

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState<Tracking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/tracking/${code}`);
      if (!response.ok) {
        throw new Error('Rastreio não encontrado');
      }
      const data = await response.json();
      setTracking(data);
      router.push(`/rastreio/${code}`);
    } catch (error) {
      setError('Código de rastreio inválido ou não encontrado');
      setTracking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-2 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Rastreie seu Pedido
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
          Digite o código de rastreamento para acompanhar seu pedido
        </p>
      </div>

      <div className="mt-6 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-6 px-2 sm:px-4 shadow sm:rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código de Rastreamento
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Digite o código"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Textos de credibilidade */}
      <section className="max-w-2xl mx-auto mt-8 text-center px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Por que escolher a LogExpress?</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <span className="text-2xl sm:text-3xl text-blue-600 font-bold block mb-2">+10.000</span>
            <span className="text-gray-700 text-sm sm:text-base">Entregas realizadas</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <span className="text-2xl sm:text-3xl text-blue-600 font-bold block mb-2">99%</span>
            <span className="text-gray-700 text-sm sm:text-base">Satisfação dos clientes</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <span className="text-2xl sm:text-3xl text-blue-600 font-bold block mb-2">24/7</span>
            <span className="text-gray-700 text-sm sm:text-base">Suporte dedicado</span>
          </div>
        </div>
      </section>

      {/* Avaliações de clientes */}
      <section className="max-w-2xl mx-auto mt-8 px-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">O que nossos clientes dizem</h3>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <span className="inline-block w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-base sm:text-lg">A</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 italic text-sm sm:text-base">“Entrega super rápida e atendimento excelente. Recomendo!”</p>
              <div className="flex items-center mt-1 sm:mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                ))}
                <span className="ml-2 text-xs sm:text-sm text-gray-500">Ana Paula</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <span className="inline-block w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-base sm:text-lg">J</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 italic text-sm sm:text-base">“Sistema de rastreio fácil de usar e muito confiável.”</p>
              <div className="flex items-center mt-1 sm:mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                ))}
                <span className="ml-2 text-xs sm:text-sm text-gray-500">João Silva</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <span className="inline-block w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-base sm:text-lg">M</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 italic text-sm sm:text-base">“Recomendo a LogExpress para todos que querem agilidade e segurança.”</p>
              <div className="flex items-center mt-1 sm:mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                ))}
                <span className="ml-2 text-xs sm:text-sm text-gray-500">Marina Souza</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {tracking && (
        <div className="mt-8">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações do Pedido</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Destinatário</p>
                <p className="font-medium">{tracking.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status Atual</p>
                <p className="font-medium">{tracking.status}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Endereço</p>
                <p className="font-medium">
                  {tracking.address}, {tracking.city} - {tracking.state}, {tracking.zipCode}
                </p>
              </div>
            </div>
          </div>
          <TrackingStatus events={tracking.events} />
        </div>
      )}

      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Rastreamento em Tempo Real</h3>
            <p className="text-sm text-gray-600">Acompanhe seu pedido minuto a minuto</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">100% Seguro</h3>
            <p className="text-sm text-gray-600">Seus dados estão protegidos</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Rápido e Eficiente</h3>
            <p className="text-sm text-gray-600">Resultados instantâneos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
