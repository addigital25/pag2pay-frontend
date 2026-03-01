import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'

export default function Sales() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    customerName: '',
    cpf: '',
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/orders?userId=${user.id}`)
      const data = await response.json()
      // Filtrar apenas pedidos pagos/enviados/entregues
      const salesOrders = data.filter(order =>
        ['paid', 'shipped', 'delivered'].includes(order.paymentStatus)
      )
      setOrders(salesOrders)
    } catch (error) {
      console.error('Erro ao carregar vendas:', error)
    }
    setLoading(false)
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const clearFilters = () => {
    setFilters({
      customerName: '',
      cpf: '',
      status: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: ''
    })
  }

  const filteredOrders = orders.filter((order) => {
    if (filters.customerName && !order.customer.name.toLowerCase().includes(filters.customerName.toLowerCase())) {
      return false
    }
    if (filters.cpf && !order.customer.cpf.includes(filters.cpf)) {
      return false
    }
    if (filters.status && order.status !== filters.status) {
      return false
    }
    if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
      return false
    }
    return true
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendente' },
      paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'Pago' },
      shipped: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Enviado' },
      delivered: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Entregue' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' }
    }
    const s = statusMap[status] || statusMap.pending
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    )
  }

  const getPaymentMethodBadge = (method) => {
    const methodMap = {
      pix: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'PIX' },
      boleto: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Boleto' },
      creditCard: { bg: 'bg-green-100', text: 'text-green-700', label: 'Cartão' },
      afterPay: { bg: 'bg-pink-100', text: 'text-pink-700', label: 'AfterPay' }
    }
    const m = methodMap[method] || methodMap.pix
    return (
      <span className={`px-2 py-1 rounded text-xs ${m.bg} ${m.text}`}>
        {m.label}
      </span>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vendas</h1>
          <p className="text-gray-600">Todas as vendas confirmadas e pagas</p>
        </div>

        <div className="flex gap-6">
          {/* Lista de Vendas */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma venda encontrada</h3>
                <p className="mt-1 text-sm text-gray-500">Suas vendas confirmadas aparecerão aqui.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pedido
                      </th>
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
                        Pagamento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.cpf}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{order.productName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                          R$ {order.totalValue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPaymentMethodBadge(order.paymentMethod)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(order.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Filtros no Lado Direito */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Limpar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={filters.customerName}
                  onChange={handleFilterChange}
                  placeholder="Digite o nome"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={filters.cpf}
                  onChange={handleFilterChange}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status do Pedido
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="paid">Pago</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Forma de Pagamento
                </label>
                <select
                  name="paymentMethod"
                  value={filters.paymentMethod}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Todas</option>
                  <option value="pix">PIX</option>
                  <option value="boleto">Boleto</option>
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="afterPay">AfterPay</option>
                </select>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-2">Total Filtrado</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {filteredOrders.length} vendas
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  R$ {filteredOrders.reduce((sum, order) => sum + order.totalValue, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
