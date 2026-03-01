import { useState } from 'react'

export default function Afiliados({ product }) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    aprovados: true,
    reprovados: false,
    pendentes: true
  })
  const [searchTerm, setSearchTerm] = useState('')

  // Dados de exemplo de afiliados
  const [affiliates] = useState([
    {
      id: 1,
      name: 'João Silva',
      contact: 'joao@email.com',
      manager: 'Carlos Santos',
      since: '15/01/2024',
      sales: 45,
      commission: 'R$ 2.450,00',
      status: 'aprovado',
      awards: 3
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      contact: 'maria@email.com',
      manager: 'Ana Costa',
      since: '20/02/2024',
      sales: 12,
      commission: 'R$ 680,00',
      status: 'pendente',
      awards: 0
    },
    {
      id: 3,
      name: 'Pedro Santos',
      contact: 'pedro@email.com',
      manager: 'Carlos Santos',
      since: '10/03/2024',
      sales: 0,
      commission: 'R$ 0,00',
      status: 'reprovado',
      awards: 0
    }
  ])

  const handleApprove = (affiliateId) => {
    alert(`Afiliado ${affiliateId} aprovado!`)
  }

  const handleReject = (affiliateId) => {
    alert(`Afiliado ${affiliateId} reprovado!`)
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'aprovado': { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprovado' },
      'pendente': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendente' },
      'reprovado': { bg: 'bg-red-100', text: 'text-red-800', label: 'Reprovado' }
    }
    const s = statusMap[status] || statusMap['pendente']
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    )
  }

  const filteredAffiliates = affiliates.filter(affiliate => {
    // Filtro por status
    const statusMatch =
      (filters.aprovados && affiliate.status === 'aprovado') ||
      (filters.pendentes && affiliate.status === 'pendente') ||
      (filters.reprovados && affiliate.status === 'reprovado')

    // Filtro por nome
    const nameMatch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && nameMatch
  })

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botões */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Afiliados</h2>
          <p className="text-sm text-gray-600 mt-1">Gerencie os afiliados deste produto</p>
        </div>

        <div className="flex gap-3 items-center">
          {/* Pesquisa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Botão Filtros */}
          <button
            onClick={() => setShowFilters(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
          </button>
        </div>
      </div>

      {/* Tabela de Afiliados */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded text-emerald-600" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Nome/Contato
                  <span className="ml-1 text-gray-400">↕</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Gerente
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Desde
                  <span className="ml-1 text-gray-400">↕</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Vendas
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Comissão
                  <span className="ml-1 text-gray-400">↕</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Premiações
                  <span className="ml-1 text-gray-400">↕</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAffiliates.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                    Nenhum afiliado encontrado
                  </td>
                </tr>
              ) : (
                filteredAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded text-emerald-600" />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{affiliate.name}</p>
                        <p className="text-sm text-gray-500">{affiliate.contact}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {affiliate.manager}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {affiliate.since}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {affiliate.sales}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {affiliate.commission}
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(affiliate.status)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {affiliate.awards}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {affiliate.status === 'pendente' && (
                          <>
                            <button
                              onClick={() => handleApprove(affiliate.id)}
                              className="text-green-600 hover:text-green-800 font-medium text-sm"
                              title="Aprovar"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleReject(affiliate.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                              title="Reprovar"
                            >
                              ✕
                            </button>
                          </>
                        )}
                        {affiliate.status === 'aprovado' && (
                          <button
                            onClick={() => handleReject(affiliate.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                            title="Reprovar"
                          >
                            ✕
                          </button>
                        )}
                        {affiliate.status === 'reprovado' && (
                          <button
                            onClick={() => handleApprove(affiliate.id)}
                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                            title="Aprovar"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Filtros */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Filtrar Afiliados</h2>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.aprovados}
                  onChange={(e) => setFilters({ ...filters, aprovados: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium">Aprovados</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.reprovados}
                  onChange={(e) => setFilters({ ...filters, reprovados: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium">Reprovados</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.pendentes}
                  onChange={(e) => setFilters({ ...filters, pendentes: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium">Pendentes</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFilters({ aprovados: true, reprovados: false, pendentes: true })
                  setShowFilters(false)
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
