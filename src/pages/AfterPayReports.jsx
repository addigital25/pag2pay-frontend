import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'

export default function AfterPayReports() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/orders?userId=${user.id}`)
      const data = await response.json()
      // Filtrar apenas pedidos AfterPay
      const afterPayOrders = data.filter(order => order.paymentMethod === 'afterPay')
      setOrders(afterPayOrders)
    } catch (error) {
      console.error('Erro ao carregar pedidos AfterPay:', error)
    }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">After Pay</h1>
          <p className="text-gray-600">Vendas com pagamento após recebimento</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma venda AfterPay</h3>
            <p className="mt-1 text-sm text-gray-500">Vendas com AfterPay aparecerão aqui.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Pedidos AfterPay</h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.productName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-pink-600">R$ {order.totalValue.toFixed(2)}</p>
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                        AfterPay
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
