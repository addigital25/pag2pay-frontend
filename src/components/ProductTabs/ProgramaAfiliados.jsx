import { useState, useEffect } from 'react'

export default function ProgramaAfiliados({ product, setProduct }) {
  const [affiliateConfig, setAffiliateConfig] = useState({
    participateInProgram: false,
    visibleInStore: false,
    autoApproval: false,
    affiliatesAccessAbandonment: false,
    commissionType: 'Último Clique',
    commissionMode: 'percentage',
    commissionValue: 55,
    cookieDuration: 999999
  })

  // Sincronizar com o produto quando ele carregar
  useEffect(() => {
    if (product && product.affiliateConfig) {
      setAffiliateConfig(product.affiliateConfig)
    }
  }, [product])

  const handleToggle = (field) => {
    const updated = {
      ...affiliateConfig,
      [field]: !affiliateConfig[field]
    }
    setAffiliateConfig(updated)
    if (setProduct) {
      setProduct({ ...product, affiliateConfig: updated })
    }
  }

  const handleChange = (field, value) => {
    const updated = {
      ...affiliateConfig,
      [field]: value
    }
    setAffiliateConfig(updated)
    if (setProduct) {
      setProduct({ ...product, affiliateConfig: updated })
    }
  }

  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Programa de Afiliados</h2>
        <p className="text-sm text-gray-600">Configure as opções do programa de afiliados para este produto</p>
      </div>

      {/* Configurações Gerais */}
      <div className="space-y-4">
        {/* Participar do programa de afiliados */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Participar do programa de afiliados?</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={affiliateConfig.participateInProgram}
              onChange={() => handleToggle('participateInProgram')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Visível da loja */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Visível da loja?</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={affiliateConfig.visibleInStore}
              onChange={() => handleToggle('visibleInStore')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Aprovação automática dos afiliados */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Aprovação automática dos afiliados</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={affiliateConfig.autoApproval}
              onChange={() => handleToggle('autoApproval')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Afiliados tem acesso aos abandonos */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Afiliados tem acesso aos abandonos</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={affiliateConfig.affiliatesAccessAbandonment}
              onChange={() => handleToggle('affiliatesAccessAbandonment')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      {/* Tipo de Comissionamento */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Comissionamento</h3>

        <div className="space-y-6">
          {/* Tipo de comissionamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de comissionamento
            </label>
            <input
              type="text"
              value={affiliateConfig.commissionType}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Padrão: Último Clique</p>
          </div>

          {/* Tipo de comissão */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de comissão
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="commissionMode"
                  value="percentage"
                  checked={affiliateConfig.commissionMode === 'percentage'}
                  onChange={(e) => handleChange('commissionMode', e.target.value)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Porcentagem</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="commissionMode"
                  value="fixed"
                  checked={affiliateConfig.commissionMode === 'fixed'}
                  onChange={(e) => handleChange('commissionMode', e.target.value)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Valor fixo</span>
              </label>
            </div>
          </div>

          {/* Valor da comissão */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da Comissão
            </label>
            <div className="relative">
              <input
                type="number"
                value={affiliateConfig.commissionValue}
                onChange={(e) => handleChange('commissionValue', parseFloat(e.target.value) || 0)}
                min="0"
                step={affiliateConfig.commissionMode === 'percentage' ? '1' : '0.01'}
                max={affiliateConfig.commissionMode === 'percentage' ? '100' : undefined}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              {affiliateConfig.commissionMode === 'percentage' && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              )}
              {affiliateConfig.commissionMode === 'fixed' && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {affiliateConfig.commissionMode === 'percentage'
                ? 'Porcentagem de comissão sobre o valor do produto'
                : 'Valor fixo de comissão por venda'}
            </p>
          </div>

          {/* Tempo de duração de cookie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo de duração de cookie (dias)
            </label>
            <input
              type="number"
              value={affiliateConfig.cookieDuration}
              onChange={(e) => handleChange('cookieDuration', parseInt(e.target.value) || 999999)}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Período em que o cookie do afiliado permanece válido (padrão: 999999 dias)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
