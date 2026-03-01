import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'
import ImageUpload from '../components/ImageUpload'

export default function MyProducts() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    aprovado: true,
    pendente: true,
    aguardando: true
  })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Educação',
    productType: 'E-book',
    image: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Admin vê todos os produtos, usuários normais veem apenas os seus
      const url = user.role === 'admin'
        ? 'http://localhost:3001/api/products'
        : `http://localhost:3001/api/products?userId=${user.id}&type=my-products`

      const response = await fetch(url)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação
    if (!formData.name || !formData.description || !formData.price) {
      alert('Por favor, preencha todos os campos obrigatórios!')
      return
    }

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        productType: formData.productType,
        image: formData.image || 'https://via.placeholder.com/400x300?text=Sem+Imagem',
        producerId: user.id,
        producerName: user.name
      }

      console.log('Enviando produto:', productData)

      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('Produto criado:', result)
        alert('Produto criado com sucesso!')
        setShowProductForm(false)
        fetchProducts()
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Educação',
          productType: 'E-book',
          image: ''
        })
      } else {
        const errorData = await response.json()
        console.error('Erro do servidor:', errorData)
        alert('Erro ao criar produto: ' + (errorData.error || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3001.')
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'APROVADO': { bg: 'bg-green-100', text: 'text-green-800', label: 'APROVADO', dot: 'bg-green-500' },
      'PENDENTE': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'PENDENTE', dot: 'bg-yellow-500' },
      'AGUARDANDO ALTERAÇÃO': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'AGUARDANDO ALTERAÇÃO', dot: 'bg-orange-500' }
    }
    const s = statusMap[status] || statusMap['PENDENTE']
    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${s.bg} ${s.text}`}>
          {s.label}
        </span>
      </div>
    )
  }

  const filteredProducts = products.filter(product => {
    if (filters.aprovado && product.approvalStatus === 'APROVADO') return true
    if (filters.pendente && product.approvalStatus === 'PENDENTE') return true
    if (filters.aguardando && product.approvalStatus === 'AGUARDANDO ALTERAÇÃO') return true
    return false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.role === 'admin' ? 'Todos os produtos' : 'Meus Produtos'}
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                Por padrão o carregamento inicial do filtro busca os status: <span className="font-medium text-gray-700">APROVADO</span>, <span className="font-medium text-gray-700">PENDENTE</span> e <span className="font-medium text-gray-700">AGUARDANDO ALTERAÇÃO</span>.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(true)}
                className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Realizar filtro
              </button>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Cadastrar Produto
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">Comece criando seu primeiro produto.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowProductForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Novo Produto
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={product.image || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(product.approvalStatus || 'PENDENTE')}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <h3 className="font-semibold text-lg flex-1">{product.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    Código: <span className="font-mono font-medium text-gray-700">{product.code}</span>
                  </p>
                  {user.role === 'admin' && product.producerName && (
                    <p className="text-xs text-gray-600 mb-3">
                      Produtor: <span className="font-medium text-indigo-600">{product.producerName}</span>
                    </p>
                  )}
                  <button
                    onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    MAIS INFORMAÇÕES
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Filtros */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Filtrar Produtos</h2>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.aprovado}
                    onChange={(e) => setFilters({ ...filters, aprovado: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium">APROVADO</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.pendente}
                    onChange={(e) => setFilters({ ...filters, pendente: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium">PENDENTE</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.aguardando}
                    onChange={(e) => setFilters({ ...filters, aguardando: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium">AGUARDANDO ALTERAÇÃO</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ aprovado: true, pendente: true, aguardando: true })
                    setShowFilters(false)
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Aplicar Filtro
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Form Modal - SIMPLIFICADO */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto pt-20">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4">Criar Produto</h2>
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

                <div className="grid grid-cols-2 gap-4">
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
                      <option value="Saúde, Bem-estar e Beleza">Saúde, Bem-estar e Beleza</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Educação">Educação</option>
                      <option value="Negócios">Negócios</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Produto
                    </label>
                    <select
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="E-book">E-book</option>
                      <option value="Assinatura">Assinatura</option>
                      <option value="Curso">Curso</option>
                      <option value="Produto Físico">Produto Físico</option>
                    </select>
                  </div>
                </div>

                {/* Upload de Imagem */}
                <ImageUpload
                  value={formData.image}
                  onChange={(imageData) => setFormData({ ...formData, image: imageData })}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Configurações Avançadas</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Após criar o produto, você poderá configurar afiliação, formas de pagamento, planos, checkouts e muito mais clicando em "MAIS INFORMAÇÕES".
                      </p>
                    </div>
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
