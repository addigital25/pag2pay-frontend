import { useState } from 'react'

export default function Gerente({ product }) {
  const [showManagerForm, setShowManagerForm] = useState(false)
  const [editingManager, setEditingManager] = useState(null)
  const [formData, setFormData] = useState({
    associatedUser: '',
    commissionType: 'percentage',
    commissionWithAffiliate: '',
    commissionWithoutAffiliate: ''
  })

  // Lista de gerentes de exemplo
  const [managers] = useState([
    {
      id: 1,
      name: 'Carlos Santos',
      email: 'carlos@email.com',
      commissionType: 'Porcentagem',
      commissionWithAffiliate: '5%',
      commissionWithoutAffiliate: '10%',
      affiliates: 12,
      sales: 150
    },
    {
      id: 2,
      name: 'Ana Costa',
      email: 'ana@email.com',
      commissionType: 'Porcentagem',
      commissionWithAffiliate: '5%',
      commissionWithoutAffiliate: '10%',
      affiliates: 8,
      sales: 95
    }
  ])

  const handleNewManager = () => {
    setEditingManager(null)
    setFormData({
      associatedUser: '',
      commissionType: 'percentage',
      commissionWithAffiliate: '',
      commissionWithoutAffiliate: ''
    })
    setShowManagerForm(true)
  }

  const handleEditManager = (manager) => {
    setEditingManager(manager)
    setFormData({
      associatedUser: manager.id,
      commissionType: 'percentage',
      commissionWithAffiliate: manager.commissionWithAffiliate.replace('%', ''),
      commissionWithoutAffiliate: manager.commissionWithoutAffiliate.replace('%', '')
    })
    setShowManagerForm(true)
  }

  const handleSaveManager = () => {
    // Validação básica
    if (!formData.associatedUser) {
      alert('Por favor, selecione um associado!')
      return
    }
    if (!formData.commissionWithAffiliate || !formData.commissionWithoutAffiliate) {
      alert('Por favor, preencha os valores de comissão!')
      return
    }

    alert('Gerente salvo com sucesso!')
    setShowManagerForm(false)
  }

  const handleDeleteManager = (managerId) => {
    if (confirm('Tem certeza que deseja remover este gerente?')) {
      alert(`Gerente ${managerId} removido!`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerentes</h2>
          <p className="text-sm text-gray-600 mt-1">Gerencie os gerentes deste produto</p>
        </div>

        <button
          onClick={handleNewManager}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Novo Gerente
        </button>
      </div>

      {/* Lista de Gerentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {managers.map((manager) => (
          <div key={manager.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                <p className="text-sm text-gray-500">{manager.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditManager(manager)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteManager(manager.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remover"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo de comissão:</span>
                <span className="font-medium">{manager.commissionType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Com afiliado:</span>
                <span className="font-medium text-emerald-600">{manager.commissionWithAffiliate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sem afiliado:</span>
                <span className="font-medium text-emerald-600">{manager.commissionWithoutAffiliate}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Afiliados:</span>
                <span className="font-medium">{manager.affiliates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vendas:</span>
                <span className="font-medium">{manager.sales}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Informações do Gerente */}
      {showManagerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Informações do Gerente</h2>
              <button
                onClick={() => setShowManagerForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Associado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associado <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.associatedUser}
                  onChange={(e) => setFormData({ ...formData, associatedUser: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option value="">Selecione um associado</option>
                  <option value="1">Carlos Santos</option>
                  <option value="2">Ana Costa</option>
                  <option value="3">Pedro Lima</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Busque um usuário pelo <strong>e-mail</strong> ou pelo <strong>documento</strong>.
                </p>
              </div>

              {/* Tipo de comissão */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de comissão <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="commissionType"
                      value="percentage"
                      checked={formData.commissionType === 'percentage'}
                      onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Porcentagem</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="commissionType"
                      value="fixed"
                      checked={formData.commissionType === 'fixed'}
                      onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">Valor fixo</span>
                  </label>
                </div>
              </div>

              {/* Valor da comissão com afiliado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da comissão com afiliado (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.commissionWithAffiliate}
                  onChange={(e) => setFormData({ ...formData, commissionWithAffiliate: e.target.value })}
                  placeholder="0"
                  min="0"
                  step={formData.commissionType === 'percentage' ? '1' : '0.01'}
                  max={formData.commissionType === 'percentage' ? '100' : undefined}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Valor recebido em vendas com participação de afiliado.
                </p>
              </div>

              {/* Valor da comissão sem afiliado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da comissão sem afiliado (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.commissionWithoutAffiliate}
                  onChange={(e) => setFormData({ ...formData, commissionWithoutAffiliate: e.target.value })}
                  placeholder="0"
                  min="0"
                  step={formData.commissionType === 'percentage' ? '1' : '0.01'}
                  max={formData.commissionType === 'percentage' ? '100' : undefined}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Valor recebido em vendas sem participação de afiliado (Essa configuração surtirá efeito apenas para gerentes de <strong>todos</strong> afiliados).
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveManager}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium"
                >
                  {editingManager ? 'Salvar Alterações' : 'Adicionar Gerente'}
                </button>
                <button
                  onClick={() => setShowManagerForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
