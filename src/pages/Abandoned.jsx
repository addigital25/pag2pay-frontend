import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

export default function Abandoned() {
  const [abandoned] = useState([
    {
      id: '1',
      customer: { name: 'João Silva', email: 'joao@email.com' },
      productName: 'Curso de Marketing Digital',
      value: 497.00,
      abandonedAt: '2024-02-28 14:32',
      step: 'payment'
    },
    {
      id: '2',
      customer: { name: 'Maria Santos', email: 'maria@email.com' },
      productName: 'E-book: Vendas Online',
      value: 97.00,
      abandonedAt: '2024-02-28 11:15',
      step: 'checkout'
    },
    {
      id: '3',
      customer: { name: 'Pedro Oliveira', email: 'pedro@email.com' },
      productName: 'Mentoria Individual',
      value: 997.00,
      abandonedAt: '2024-02-27 16:45',
      step: 'payment'
    }
  ])

  const getStepLabel = (step) => {
    const steps = {
      checkout: 'Checkout',
      payment: 'Pagamento',
      confirmation: 'Confirmação'
    }
    return steps[step] || step
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Abandonos</h1>
          <p className="text-gray-600">Carrinhos e checkouts abandonados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Total Abandonado</p>
            <p className="text-3xl font-bold text-orange-600">
              R$ {abandoned.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Carrinhos Abandonados</p>
            <p className="text-3xl font-bold text-red-600">{abandoned.length}</p>
            <p className="text-xs text-gray-500 mt-1">Este mês</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Taxa de Abandono</p>
            <p className="text-3xl font-bold text-yellow-600">18.5%</p>
            <p className="text-xs text-gray-500 mt-1">Média mensal</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etapa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abandonado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {abandoned.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.customer.name}</div>
                    <div className="text-sm text-gray-500">{item.customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">
                    R$ {item.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      {getStepLabel(item.step)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.abandonedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                      Enviar Lembrete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Dica de Recuperação</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Envie emails automáticos para clientes que abandonaram o carrinho com descontos especiais ou lembretes. Estudos mostram que 30% dos carrinhos abandonados podem ser recuperados com follow-up adequado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
