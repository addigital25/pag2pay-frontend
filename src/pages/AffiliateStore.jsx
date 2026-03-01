import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'

export default function AffiliateStore() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/products?type=affiliate-store')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
    setLoading(false)
  }

  const handleAffiliate = async (productId) => {
    try {
      const response = await fetch('http://localhost:3001/api/affiliations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          affiliateId: user.id
        })
      })

      if (response.ok) {
        alert('Afiliação realizada com sucesso!')
        fetchProducts()
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao se afiliar')
      }
    } catch (error) {
      console.error('Erro ao se afiliar:', error)
      alert('Erro ao processar afiliação')
    }
  }

  const filteredProducts = products
    .filter(p => {
      if (filter === 'all') return true
      return p.category === filter
    })
    .filter(p => {
      if (!searchTerm) return true
      return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             p.description.toLowerCase().includes(searchTerm.toLowerCase())
    })

  const categories = ['all', ...new Set(products.map(p => p.category))]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Vitrine de Produtos</h1>
          <p className="text-gray-600">
            Escolha produtos para se afiliar e começar a ganhar comissões
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Produto
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do produto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Todas as Categorias</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="mt-4 text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'Nenhum produto encontrado com os filtros aplicados'
                : 'Nenhum produto disponível para afiliação no momento'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Exibindo {filteredProducts.length} produto(s)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {product.affiliateCommission}% de comissão
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                      {product.description}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Preço do Produto</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                        <span className="text-sm font-medium text-green-800">
                          Sua comissão por venda:
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          R$ {((product.price * product.affiliateCommission) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Formas de pagamento:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.paymentMethods.pix && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                            PIX
                          </span>
                        )}
                        {product.paymentMethods.boleto && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                            Boleto
                          </span>
                        )}
                        {product.paymentMethods.creditCard && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                            Cartão
                          </span>
                        )}
                        {product.paymentMethods.afterPay && (
                          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded font-medium">
                            AfterPay
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                      <span>Produtor: {product.producerName}</span>
                      <span>Estoque: {product.stock}</span>
                    </div>

                    <button
                      onClick={() => handleAffiliate(product.id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-md hover:shadow-lg"
                    >
                      Quero me Afiliar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
