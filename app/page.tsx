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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Rastreie seu Pedido
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite o código de rastreamento para acompanhar seu pedido
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
