import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Checkout() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        // Set default payment method
        if (data.paymentMethods.pix) setSelectedPayment('pix')
        else if (data.paymentMethods.boleto) setSelectedPayment('boleto')
        else if (data.paymentMethods.creditCard) setSelectedPayment('creditCard')
        else if (data.paymentMethods.afterPay) setSelectedPayment('afterPay')
        setLoading(false)
      })
      .catch(err => {
        console.error('Erro ao carregar produto:', err)
        setLoading(false)
      })
  }, [productId])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedPayment) {
      alert('Selecione uma forma de pagamento')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          customer: formData,
          quantity,
          paymentMethod: selectedPayment,
          affiliateId: new URLSearchParams(window.location.search).get('ref') || null
        })
      })

      const order = await response.json()
      navigate(`/order-confirmation/${order.id}`)
    } catch (err) {
      console.error('Erro ao criar pedido:', err)
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">Produto não encontrado</p>
        </div>
      </div>
    )
  }

  const totalValue = product.price * quantity

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Pedido</h1>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Left: Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                {/* Quantity Selector */}
                <div className="mb-4 pb-4 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Estoque disponível: {product.stock}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({quantity}x):</span>
                    <span>R$ {totalValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Frete:</span>
                    <span className="text-green-600 font-semibold">GRÁTIS</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t pt-3">
                    <span>Total:</span>
                    <span className="text-indigo-600">R$ {totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {product.paymentMethods.pix && (
                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedPayment === 'pix' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="pix"
                          checked={selectedPayment === 'pix'}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-5 h-5 text-purple-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">PIX</p>
                              <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                            </div>
                            <span className="text-2xl">💳</span>
                          </div>
                        </div>
                      </label>
                    )}

                    {product.paymentMethods.boleto && (
                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedPayment === 'boleto' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="boleto"
                          checked={selectedPayment === 'boleto'}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">Boleto Bancário</p>
                              <p className="text-sm text-gray-600">Vencimento em 3 dias úteis</p>
                            </div>
                            <span className="text-2xl">🏦</span>
                          </div>
                        </div>
                      </label>
                    )}

                    {product.paymentMethods.creditCard && (
                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedPayment === 'creditCard' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="creditCard"
                          checked={selectedPayment === 'creditCard'}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-5 h-5 text-green-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">Cartão de Crédito</p>
                              <p className="text-sm text-gray-600">Parcelamento disponível</p>
                            </div>
                            <span className="text-2xl">💳</span>
                          </div>
                        </div>
                      </label>
                    )}

                    {product.paymentMethods.afterPay && (
                      <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedPayment === 'afterPay' ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="afterPay"
                          checked={selectedPayment === 'afterPay'}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-5 h-5 text-pink-600"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">Receba e Pague</p>
                              <p className="text-sm text-gray-600">Pague somente após receber o produto</p>
                            </div>
                            <span className="text-2xl">📦</span>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>

                  {selectedPayment === 'afterPay' && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Como funciona:</strong> Você receberá o produto primeiro e terá 7 dias para realizar o pagamento após confirmar o recebimento.
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Data */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Dados do Cliente</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="(00) 00000-0000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="00000-000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Rua, número, complemento"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estado *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="PR">Paraná</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="PE">Pernambuco</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !selectedPayment}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-bold text-lg shadow-lg"
                >
                  {submitting ? 'Processando...' : 'Finalizar Pedido'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
