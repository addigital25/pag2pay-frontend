import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AdminLayout from '../components/AdminLayout'

// Import tab components
import DadosGerais from '../components/ProductTabs/DadosGerais'
import Planos from '../components/ProductTabs/Planos'
import Checkouts from '../components/ProductTabs/Checkouts'
import ProgramaAfiliados from '../components/ProductTabs/ProgramaAfiliados'
import Afiliados from '../components/ProductTabs/Afiliados'
import Gerente from '../components/ProductTabs/Gerente'
import Cupons from '../components/ProductTabs/Cupons'
import Campanhas from '../components/ProductTabs/Campanhas'
import Avaliacoes from '../components/ProductTabs/Avaliacoes'
import AfterPayConfig from '../components/ProductTabs/AfterPayConfig'

export default function ProductEdit() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dados-gerais')
  const [showPlanosDropdown, setShowPlanosDropdown] = useState(false)
  const [showComissionamentoDropdown, setShowComissionamentoDropdown] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Erro ao carregar produto:', error)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })

      if (response.ok) {
        alert('Produto atualizado com sucesso!')
        navigate('/admin/products/my-products')
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Produto excluído com sucesso!')
        navigate('/admin/products/my-products')
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      alert('Erro ao excluir produto')
    }
  }

  const mainTabs = [
    { id: 'dados-gerais', name: 'Dados gerais', icon: '⚙️' },
    { id: 'planos', name: 'Planos', icon: '📋', hasDropdown: true },
    { id: 'checkouts', name: 'Checkouts', icon: '🛒' },
    { id: 'programa-afiliados', name: 'Programa de Afiliados', icon: '🤝' },
    { id: 'afiliados', name: 'Afiliados', icon: '👥' },
    { id: 'gerente', name: 'Gerente', icon: '👔' },
    { id: 'cupons', name: 'Cupons de Desconto', icon: '🎟️' }
  ]

  const secondaryTabs = [
    { id: 'campanhas', name: 'Campanhas', icon: '📢' },
    { id: 'avaliacoes', name: 'Avaliações', icon: '⭐' },
    { id: 'afterpay', name: 'After Pay', icon: '💳' }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Produto não encontrado</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/products/my-products')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Editar Produto: {product.name}</h1>
            <p className="text-sm text-gray-500">Código: {product.code}</p>
          </div>
        </div>

        {/* Main Tabs - Linha 1 */}
        <div className="bg-white rounded-t-lg border-b border-gray-200 px-4 pt-4">
          <div className="flex gap-1 overflow-x-auto">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-3 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 border-b-3 border-transparent'
                }`}
                style={{ borderBottomWidth: '3px' }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
                {tab.hasDropdown && <span className="ml-1">▼</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Tabs - Linha 2 */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <div className="flex gap-1">
            {secondaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded transition ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-6 min-h-[500px]">
          {activeTab === 'dados-gerais' && <DadosGerais product={product} setProduct={setProduct} userRole={user?.role} />}
          {activeTab === 'planos' && <Planos product={product} setProduct={setProduct} />}
          {activeTab === 'checkouts' && <Checkouts product={product} setProduct={setProduct} />}
          {activeTab === 'programa-afiliados' && <ProgramaAfiliados product={product} setProduct={setProduct} />}
          {activeTab === 'afiliados' && <Afiliados product={product} />}
          {activeTab === 'gerente' && <Gerente product={product} />}
          {activeTab === 'cupons' && <Cupons product={product} setProduct={setProduct} />}
          {activeTab === 'campanhas' && <Campanhas product={product} setProduct={setProduct} />}
          {activeTab === 'avaliacoes' && <Avaliacoes product={product} setProduct={setProduct} />}
          {activeTab === 'afterpay' && <AfterPayConfig product={product} setProduct={setProduct} />}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDelete}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir Produto
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/products/my-products')}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
