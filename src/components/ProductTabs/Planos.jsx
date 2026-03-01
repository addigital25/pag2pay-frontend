import { useState } from 'react'

export default function Planos({ product, setProduct }) {
  const [plans, setPlans] = useState(product.plans || [])
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [activePlanTab, setActivePlanTab] = useState('loja')
  const [currentPlan, setCurrentPlan] = useState(null)
  const [editingPlanId, setEditingPlanId] = useState(null)

  const planTabs = [
    { id: 'loja', icon: '🛒', name: 'Informações' },
    { id: 'condicoes', icon: '💳', name: 'Pagamentos' },
    { id: 'frete', icon: '🚚', name: 'Frete' },
    { id: 'afiliacao', icon: '👥', name: 'Afiliação' },
    { id: 'termos', icon: '📋', name: 'Termos e Condições' }
  ]

  const getEmptyPlan = () => ({
    name: '',
    price: '',
    description: '',
    itemsQuantity: 1,
    installments: 12,
    isAvailableForSale: true,
    hideFromAffiliates: false,
    requireEmail: true,
    checkoutEmail: '',
    headerImage: '',
    sideImage: '',
    supplier: {
      email: '',
      value: ''
    },
    paymentMethods: {
      creditCard: true,
      boleto: true,
      pix: true,
      afterPay: false
    },
    maxInstallments: 12,
    maxInstallmentsNoInterest: 1,
    chargeType: 'unica',
    shipping: {
      name: '',
      deliveryTime: '',
      fixedPrice: ''
    },
    affiliation: {
      enabled: true,
      commission: 30,
      customCommission: false,
      customCommissionValue: 30,
      hideFromAffiliates: false,
      allowedAffiliates: []
    },
    terms: []
  })

  const handleAddPlan = () => {
    setCurrentPlan(getEmptyPlan())
    setEditingPlanId(null)
    setActivePlanTab('loja')
    setShowPlanForm(true)
  }

  const handleEditPlan = (plan) => {
    setCurrentPlan({ ...plan })
    setEditingPlanId(plan.id)
    setActivePlanTab('loja')
    setShowPlanForm(true)
  }

  const handleCancelPlan = () => {
    setShowPlanForm(false)
    setCurrentPlan(null)
    setEditingPlanId(null)
  }

  const handleSavePlan = () => {
    // Validação básica
    if (!currentPlan.name || !currentPlan.price) {
      alert('Por favor, preencha os campos obrigatórios (Nome e Preço)')
      return
    }

    let newPlans
    if (editingPlanId) {
      // Editando plano existente
      newPlans = plans.map(p => p.id === editingPlanId ? { ...currentPlan, id: editingPlanId } : p)
    } else {
      // Novo plano
      newPlans = [...plans, { ...currentPlan, id: Date.now() }]
    }

    setPlans(newPlans)
    setProduct({ ...product, plans: newPlans })
    setShowPlanForm(false)
    setCurrentPlan(null)
    setEditingPlanId(null)
  }

  const handleDeletePlan = (planId) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return
    const newPlans = plans.filter(p => p.id !== planId)
    setPlans(newPlans)
    setProduct({ ...product, plans: newPlans })
  }

  const handleDuplicatePlan = (plan) => {
    const duplicated = { ...plan, id: Date.now(), name: `${plan.name} (Cópia)` }
    const newPlans = [...plans, duplicated]
    setPlans(newPlans)
    setProduct({ ...product, plans: newPlans })
  }

  // Se estiver no formulário de criação/edição, mostrar apenas ele
  if (showPlanForm && currentPlan) {
    return (
      <div className="space-y-6">
        {/* Header com botão voltar */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancelPlan}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold">
                {editingPlanId ? 'Editar Plano' : 'Novo Plano'}
              </h2>
              <p className="text-sm text-gray-600">Configure todas as opções do plano</p>
            </div>
          </div>
          <button
            onClick={handleSavePlan}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {editingPlanId ? 'Atualizar Plano' : 'Salvar Plano'}
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-1 overflow-x-auto">
            {planTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlanTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 transition border-b-2 ${
                  activePlanTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activePlanTab === 'loja' && (
            <div className="space-y-8">
              {/* Informações Básicas */}
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-900">Informações Básicas</h4>
                <p className="text-sm text-gray-600 mb-4">Configure os dados principais do plano</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome do Plano <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentPlan.name}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                      placeholder="Ex: Plano Básico, Premium, VIP..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preço (R$) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={currentPlan.price}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
                      placeholder="0,00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantidade de itens por plano
                    </label>
                    <input
                      type="number"
                      value={currentPlan.itemsQuantity || 1}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, itemsQuantity: parseInt(e.target.value) || 1 })}
                      placeholder="1"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição do Plano
                  </label>
                  <textarea
                    value={currentPlan.description}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
                    placeholder="Descreva os benefícios e diferenciais deste plano..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Esta descrição será exibida para os clientes na página de compra</p>
                </div>
              </div>

              {/* Disponibilidade e Configurações */}
              <div className="border-t pt-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Disponibilidade</h4>

                <div className="space-y-4">
                  {/* Disponível para venda */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Disponível para venda?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentPlan.isAvailableForSale !== false}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, isAvailableForSale: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  {/* Ocultar para afiliados */}
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Ocultar plano para afiliados?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentPlan.hideFromAffiliates || false}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, hideFromAffiliates: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  {/* Exigir e-mail */}
                  <div>
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Exigir e-mail na compra?</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentPlan.requireEmail !== false}
                          onChange={(e) => setCurrentPlan({ ...currentPlan, requireEmail: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                    {currentPlan.requireEmail !== false && (
                      <div className="mt-2 ml-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-xs text-blue-800">
                          <span className="font-semibold">📧 Checkout:</span> Aparecerá um checkbox embaixo do campo de e-mail com a opção "Não possuo e-mail" para clientes que não tiverem.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Split com Fornecedor */}
              <div className="border-t pt-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Split com Fornecedor</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail do Fornecedor
                    </label>
                    <input
                      type="email"
                      value={currentPlan.supplier?.email || ''}
                      onChange={(e) => setCurrentPlan({
                        ...currentPlan,
                        supplier: { ...currentPlan.supplier, email: e.target.value }
                      })}
                      placeholder="fornecedor@exemplo.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Valor para o Fornecedor (R$)
                    </label>
                    <input
                      type="number"
                      value={currentPlan.supplier?.value || ''}
                      onChange={(e) => setCurrentPlan({
                        ...currentPlan,
                        supplier: { ...currentPlan.supplier, value: e.target.value }
                      })}
                      placeholder="0,00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Valor que será enviado automaticamente para o fornecedor pela plataforma</p>
              </div>

              {/* Imagens do Checkout */}
              <div className="border-t pt-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Imagens do Checkout</h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Imagem do Cabeçalho
                    </label>
                    <input
                      type="text"
                      value={currentPlan.headerImage || ''}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, headerImage: e.target.value })}
                      placeholder="URL da imagem do cabeçalho"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Imagem do Canto Direito
                    </label>
                    <input
                      type="text"
                      value={currentPlan.sideImage || ''}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, sideImage: e.target.value })}
                      placeholder="URL da imagem do canto direito"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail do Checkout Padrão
                    </label>
                    <input
                      type="email"
                      value={currentPlan.checkoutEmail || ''}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, checkoutEmail: e.target.value })}
                      placeholder="checkout@exemplo.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <p className="text-xs text-gray-500 mt-1">E-mail exibido na página de checkout</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlanTab === 'condicoes' && (
            <div className="space-y-6">
              {/* Configurações de Parcelamento */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-gray-900">Configurações de Parcelamento</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Máximo de parcelas no cartão
                    </label>
                    <select
                      value={currentPlan.maxInstallments || 12}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, maxInstallments: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="1">1x</option>
                      <option value="2">2x</option>
                      <option value="3">3x</option>
                      <option value="4">4x</option>
                      <option value="5">5x</option>
                      <option value="6">6x</option>
                      <option value="7">7x</option>
                      <option value="8">8x</option>
                      <option value="9">9x</option>
                      <option value="10">10x</option>
                      <option value="11">11x</option>
                      <option value="12">12x</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Máximo de parcelas sem juros
                    </label>
                    <select
                      value={currentPlan.maxInstallmentsNoInterest || 12}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, maxInstallmentsNoInterest: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="1">1x</option>
                      <option value="2">2x</option>
                      <option value="3">3x</option>
                      <option value="4">4x</option>
                      <option value="5">5x</option>
                      <option value="6">6x</option>
                      <option value="7">7x</option>
                      <option value="8">8x</option>
                      <option value="9">9x</option>
                      <option value="10">10x</option>
                      <option value="11">11x</option>
                      <option value="12">12x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePlanTab === 'frete' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-900">Configurações de Frete</h4>
                <p className="text-sm text-gray-600">Defina as informações de entrega do produto</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Frete
                  </label>
                  <input
                    type="text"
                    value={currentPlan.shipping?.name || ''}
                    onChange={(e) => setCurrentPlan({
                      ...currentPlan,
                      shipping: { ...currentPlan.shipping, name: e.target.value }
                    })}
                    placeholder="Ex: Frete Grátis, Entrega Expressa..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Como você quer chamar o frete para este plano</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prazo de Entrega
                  </label>
                  <input
                    type="text"
                    value={currentPlan.shipping?.deliveryTime || ''}
                    onChange={(e) => setCurrentPlan({
                      ...currentPlan,
                      shipping: { ...currentPlan.shipping, deliveryTime: e.target.value }
                    })}
                    placeholder="Ex: 5 a 7 dias úteis"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Prazo estimado para entrega</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valor Fixo do Frete (R$)
                  </label>
                  <input
                    type="number"
                    value={currentPlan.shipping?.fixedPrice || ''}
                    onChange={(e) => setCurrentPlan({
                      ...currentPlan,
                      shipping: { ...currentPlan.shipping, fixedPrice: e.target.value }
                    })}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Valor cobrado pelo frete (deixe em branco se grátis)</p>
                </div>
              </div>
            </div>
          )}

          {activePlanTab === 'afiliacao' && (
            <div className="space-y-8">
              {/* Comissão Personalizada */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-900">Comissão personalizada para Afiliados?</label>
                    <button className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ?
                    </button>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentPlan.affiliation?.customCommission || false}
                      onChange={(e) => setCurrentPlan({
                        ...currentPlan,
                        affiliation: { ...currentPlan.affiliation, customCommission: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {currentPlan.affiliation?.customCommission && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tipo de comissão para real brasileiro (R$):
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={true}
                            readOnly
                            className="w-4 h-4 text-green-500 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">Porcentagem</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer opacity-50">
                          <input
                            type="radio"
                            disabled
                            className="w-4 h-4 text-gray-400"
                          />
                          <span className="text-sm text-gray-500">Valor fixo</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Valor da comissão:
                      </label>
                      <input
                        type="text"
                        value={`${currentPlan.affiliation?.customCommissionValue || 30},00%`}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '')
                          const numValue = parseInt(value) || 0
                          setCurrentPlan({
                            ...currentPlan,
                            affiliation: { ...currentPlan.affiliation, customCommissionValue: Math.min(100, numValue) }
                          })
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Ocultar para Afiliados */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-900">Ocultar plano para afiliados?</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentPlan.affiliation?.hideFromAffiliates || false}
                      onChange={(e) => setCurrentPlan({
                        ...currentPlan,
                        affiliation: { ...currentPlan.affiliation, hideFromAffiliates: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* Afiliados Permitidos - Só aparece se "Ocultar plano para afiliados" estiver MARCADO */}
              {currentPlan.affiliation?.hideFromAffiliates && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Liberar a visualização do plano para os seguintes afiliados</h4>

                  {/* Lista de afiliados permitidos */}
                  {currentPlan.affiliation?.allowedAffiliates?.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {currentPlan.affiliation.allowedAffiliates.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <span className="text-sm text-gray-700">✕ 52.289.656 QUERVIN DAMASCENO DO NASCIMENTO / {email}</span>
                          <button
                            onClick={() => {
                              const updated = currentPlan.affiliation.allowedAffiliates.filter((_, i) => i !== index)
                              setCurrentPlan({
                                ...currentPlan,
                                affiliation: { ...currentPlan.affiliation, allowedAffiliates: updated }
                              })
                            }}
                            className="text-gray-400 hover:text-red-600 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input para adicionar afiliado - apenas se tiver pelo menos um */}
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Digite o CPF ou e-mail do afiliado para buscar"
                      id="affiliate-email-input"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const email = e.target.value.trim()
                          if (email && email.includes('@')) {
                            const current = currentPlan.affiliation?.allowedAffiliates || []
                            if (!current.includes(email)) {
                              setCurrentPlan({
                                ...currentPlan,
                                affiliation: {
                                  ...currentPlan.affiliation,
                                  allowedAffiliates: [...current, email]
                                }
                              })
                              e.target.value = ''
                            }
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('affiliate-email-input')
                        const email = input.value.trim()
                        if (email && email.includes('@')) {
                          const current = currentPlan.affiliation?.allowedAffiliates || []
                          if (!current.includes(email)) {
                            setCurrentPlan({
                              ...currentPlan,
                              affiliation: {
                                ...currentPlan.affiliation,
                                allowedAffiliates: [...current, email]
                              }
                            })
                            input.value = ''
                          }
                        }
                      }}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePlanTab === 'termos' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-900">Termos e Condições</h4>
                <p className="text-sm text-gray-600">Adicione termos específicos para este plano</p>
              </div>

              {/* Lista de termos */}
              {currentPlan.terms && currentPlan.terms.length > 0 && (
                <div className="space-y-3">
                  {currentPlan.terms.map((term, index) => (
                    <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">{term}</p>
                        </div>
                        <button
                          onClick={() => {
                            const updated = currentPlan.terms.filter((_, i) => i !== index)
                            setCurrentPlan({ ...currentPlan, terms: updated })
                          }}
                          className="flex-shrink-0 text-red-600 hover:text-red-800 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Adicionar novo termo */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adicionar Novo Termo
                </label>
                <textarea
                  id="new-term-input"
                  placeholder="Digite o termo ou condição..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none mb-3"
                ></textarea>
                <button
                  onClick={() => {
                    const input = document.getElementById('new-term-input')
                    const text = input.value.trim()
                    if (text) {
                      const current = currentPlan.terms || []
                      setCurrentPlan({
                        ...currentPlan,
                        terms: [...current, text]
                      })
                      input.value = ''
                    }
                  }}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar Termo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Lista de planos (quando não está no formulário)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Planos de Pagamento</h2>
          <p className="text-gray-600">
            Configure os planos e formas de pagamento do seu produto
          </p>
        </div>

        {/* Botão no canto superior direito quando há planos */}
        {plans.length > 0 && (
          <button
            onClick={handleAddPlan}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Plano
          </button>
        )}
      </div>

      {/* Lista de Planos */}
      {plans.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum plano cadastrado</h3>
          <p className="text-sm text-gray-500 mb-4">Comece criando seu primeiro plano de pagamento</p>
          <button
            onClick={handleAddPlan}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Criar Primeiro Plano
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Planos Cadastrados ({plans.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-indigo-600 transition">
                      {plan.name || 'Sem nome'}
                    </h4>
                    <p className="text-3xl font-extrabold text-indigo-600">
                      R$ {parseFloat(plan.price || 0).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{plan.description}</p>
                )}

                {/* Badges de informações */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {plan.installments > 1 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      até {plan.installments}x
                    </span>
                  )}
                  {plan.paymentMethods?.pix && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      PIX
                    </span>
                  )}
                  {plan.affiliation?.enabled && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Afiliação {plan.affiliation.commission}%
                    </span>
                  )}
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="flex-1 text-sm bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDuplicatePlan(plan)}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    title="Duplicar plano"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                    title="Excluir plano"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
