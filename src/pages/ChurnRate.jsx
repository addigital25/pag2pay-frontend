import AdminLayout from '../components/AdminLayout'

export default function ChurnRate() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Churn Rate</h1>
          <p className="text-gray-600">Taxa de cancelamento e reembolso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Taxa de Churn</p>
            <p className="text-3xl font-bold text-red-600">2.5%</p>
            <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Pedidos Cancelados</p>
            <p className="text-3xl font-bold text-orange-600">12</p>
            <p className="text-xs text-gray-500 mt-1">Este mês</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Valor em Reembolsos</p>
            <p className="text-3xl font-bold text-purple-600">R$ 1.847,00</p>
            <p className="text-xs text-gray-500 mt-1">Este mês</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Motivos de Cancelamento</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Produto não atendeu expectativas</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Compra por engano</span>
                <span className="text-sm font-medium text-gray-900">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Problemas técnicos</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Outros motivos</span>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
