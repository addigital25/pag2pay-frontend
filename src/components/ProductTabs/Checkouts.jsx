import { useState, useEffect } from 'react'

export default function Checkouts({ product, setProduct }) {
  const [checkoutConfig, setCheckoutConfig] = useState({
    description: 'Checkout Padrão',
    paymentMethods: {
      boleto: true,
      creditCard: true,
      pix: true,
      receiveAndPay: false
    },
    boletoDueDays: 5,
    countdown: {
      enabled: false,
      backgroundColor: '#ffffff',
      textColor: '#000000',
      time: '00:00:00',
      title: 'Tempo limitado!',
      text: 'Preço promocional encerrará em:'
    }
  })

  // Sincronizar com o produto quando ele carregar
  useEffect(() => {
    if (product && product.checkoutConfig) {
      setCheckoutConfig(product.checkoutConfig)
    }
  }, [product])

  const handlePaymentMethodChange = (method) => {
    const updated = {
      ...checkoutConfig,
      paymentMethods: {
        ...checkoutConfig.paymentMethods,
        [method]: !checkoutConfig.paymentMethods[method]
      }
    }
    setCheckoutConfig(updated)
    if (setProduct) {
      setProduct({ ...product, checkoutConfig: updated })
    }
  }

  const handleDescriptionChange = (value) => {
    const updated = { ...checkoutConfig, description: value }
    setCheckoutConfig(updated)
    if (setProduct) {
      setProduct({ ...product, checkoutConfig: updated })
    }
  }

  const handleBoletoDueDaysChange = (value) => {
    const updated = { ...checkoutConfig, boletoDueDays: parseInt(value) || 5 }
    setCheckoutConfig(updated)
    if (setProduct) {
      setProduct({ ...product, checkoutConfig: updated })
    }
  }

  const handleCountdownToggle = () => {
    const updated = {
      ...checkoutConfig,
      countdown: {
        ...checkoutConfig.countdown,
        enabled: !checkoutConfig.countdown.enabled
      }
    }
    setCheckoutConfig(updated)
    if (setProduct) {
      setProduct({ ...product, checkoutConfig: updated })
    }
  }

  const handleCountdownChange = (field, value) => {
    const updated = {
      ...checkoutConfig,
      countdown: {
        ...checkoutConfig.countdown,
        [field]: value
      }
    }
    setCheckoutConfig(updated)
    if (setProduct) {
      setProduct({ ...product, checkoutConfig: updated })
    }
  }

  return (
    <div className="space-y-8">
      {/* Configurações do checkout */}
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Configurações do checkout</h2>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={checkoutConfig.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Checkout Padrão"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Pagamento */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Pagamento</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Formas de pagamento <span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-3 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkoutConfig.paymentMethods.boleto}
                onChange={() => handlePaymentMethodChange('boleto')}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">Boleto</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkoutConfig.paymentMethods.creditCard}
                onChange={() => handlePaymentMethodChange('creditCard')}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">Cartão de crédito</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkoutConfig.paymentMethods.pix}
                onChange={() => handlePaymentMethodChange('pix')}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">Pix</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkoutConfig.paymentMethods.receiveAndPay}
                onChange={() => handlePaymentMethodChange('receiveAndPay')}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">Receba e pague</span>
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-2">É necessário selecionar ao menos uma forma de pagamento.</p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dias de vencimento do boleto
          </label>
          <input
            type="number"
            value={checkoutConfig.boletoDueDays}
            onChange={(e) => handleBoletoDueDaysChange(e.target.value)}
            min="1"
            max="30"
            className="w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            Dias corridos. (Se caso o dia de vencimento não for dia útil, a data é alterada para próximo dia útil.)
          </p>
        </div>
      </div>

      {/* Contador */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Contador</h3>

        {/* Toggle Usar contador */}
        <div className="flex items-center justify-between mb-6">
          <label className="text-sm font-medium text-gray-700">Usar contador?</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checkoutConfig.countdown.enabled}
              onChange={handleCountdownToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Configurações do contador - só aparecem se enabled = true */}
        {checkoutConfig.countdown.enabled && (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor de fundo
              </label>
              <input
                type="text"
                value={checkoutConfig.countdown.backgroundColor}
                onChange={(e) => handleCountdownChange('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor do texto
              </label>
              <input
                type="text"
                value={checkoutConfig.countdown.textColor}
                onChange={(e) => handleCountdownChange('textColor', e.target.value)}
                placeholder="#000000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo
              </label>
              <input
                type="text"
                value={checkoutConfig.countdown.time}
                onChange={(e) => handleCountdownChange('time', e.target.value)}
                placeholder="00:00:00"
                className="w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={checkoutConfig.countdown.title}
                onChange={(e) => handleCountdownChange('title', e.target.value)}
                placeholder="Tempo limitado!"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Se não informado será exibido o título padrão "Tempo limitado!".
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto
              </label>
              <textarea
                value={checkoutConfig.countdown.text}
                onChange={(e) => handleCountdownChange('text', e.target.value)}
                placeholder="Preço promocional encerrará em:"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Se não informado será exibido o texto padrão "Preço promocional encerrará em:".
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
