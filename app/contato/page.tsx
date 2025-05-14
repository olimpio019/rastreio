import React from 'react';

export default function Contato() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Fale Conosco</h1>
        <p className="text-gray-600 text-center mb-8">Tem dúvidas, sugestões ou precisa de suporte? Preencha o formulário abaixo ou entre em contato pelos canais informados.</p>
        <form className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" id="nome" name="nome" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">Enviar</button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <p><strong>Email:</strong> contato@logexpress.com.br</p>
          <p><strong>Telefone:</strong> (11) 54852-4523</p>
        </div>
      </div>
    </div>
  );
} 