import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'

export default function Products() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('my-products')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Cursos',
    image: '',
    affiliateEnabled: false,
    affiliateCommission: 30,
    paymentMethods: {
      pix: true,
      boleto: true,
      creditCard: true,
      afterPay: false
    }
  })

  useEffect(() => {
    fetchProducts()
  }, [activeTab])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/products?userId=${user.id}&type=${activeTab}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        producerId: user.id,
        producerName: user.name,
        affiliateCommission: parseInt(formData.affiliateCommission)
      }

      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        setShowProductForm(false)
        fetchProducts()
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: 'Cursos',
          image: '',
          affiliateEnabled: false,
          affiliateCommission: 30,
          paymentMethods: {
            pix: true,
            boleto: true,
            creditCard: true,
            afterPay: false
          }
        })
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      if (name.startsWith('payment_')) {
        const method = name.replace('payment_', '')
        setFormData({
          ...formData,
          paymentMethods: {
            ...formData.paymentMethods,
            [method]: checked
          }
        })
      } else {
        setFormData({ ...formData, [name]: checked })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
          {activeTab === 'my-products' && (
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              + Novo Produto
            </button>
          )}
        </div>

        {/* Tabs Slider */}
        <div className="bg-gray-100 rounded-lg p-1 inline-flex mb-6">
          <button
            onClick={() => setActiveTab('my-products')}
            className={`px-6 py-2.5 rounded-md font-medium transition-all ${
              activeTab === 'my-products'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Meus Produtos
          </button>
          <button
            onClick={() => setActiveTab('my-affiliations')}
            className={`px-6 py-2.5 rounded-md font-medium transition-all ${
              activeTab === 'my-affiliations'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Minhas Afiliações
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'my-products'
                ? 'Você ainda não tem produtos cadastrados'
                : 'Você ainda não está afiliado a nenhum produto'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-indigo-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Estoque: {product.stock}
                    </span>
                  </div>
                  {product.affiliateEnabled && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Afiliação Habilitada
                      </span>
                      <span className="text-xs text-gray-600">
                        {product.affiliateCommission}% comissão
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.paymentMethods.pix && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">PIX</span>
                    )}
                    {product.paymentMethods.boleto && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Boleto</span>
                    )}
                    {product.paymentMethods.creditCard && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Cartão</span>
                    )}
                    {product.paymentMethods.afterPay && (
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">AfterPay</span>
                    )}
                  </div>
                  {activeTab === 'my-products' && (
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition">
                      Editar Produto
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Novo Produto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estoque
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Cursos">Cursos</option>
                    <option value="E-books">E-books</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Mentorias">Mentorias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="border-t pt-4">
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="affiliateEnabled"
                      checked={formData.affiliateEnabled}
                      onChange={handleChange}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium">Habilitar Programa de Afiliados</span>
                  </label>

                  {formData.affiliateEnabled && (
                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comissão para Afiliados (%)
                      </label>
                      <input
                        type="number"
                        name="affiliateCommission"
                        value={formData.affiliateCommission}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <p className="font-medium mb-2">Formas de Pagamento Aceitas</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="payment_pix"
                        checked={formData.paymentMethods.pix}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>PIX</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="payment_boleto"
                        checked={formData.paymentMethods.boleto}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Boleto Bancário</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="payment_creditCard"
                        checked={formData.paymentMethods.creditCard}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Cartão de Crédito</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="payment_afterPay"
                        checked={formData.paymentMethods.afterPay}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Receba e Pague (AfterPay)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Criar Produto
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
