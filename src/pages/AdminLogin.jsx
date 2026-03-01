import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password, 'admin')
    if (result.success) {
      navigate('/admin/dashboard')
    } else {
      setError(result.error || 'Email ou senha inválidos')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo Admin */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Pag2Pay Admin</h1>
          <p className="text-slate-400 mt-2 text-sm">Painel Administrativo</p>
        </div>

        {/* Alerta de Acesso Restrito */}
        <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <strong>Acesso Restrito</strong>
          </div>
          <p className="mt-1 text-xs">Apenas administradores autorizados podem acessar esta área.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Administrativo
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition placeholder-slate-400"
              placeholder="admin@pag2pay.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition placeholder-slate-400"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Credenciais de Teste - Apenas em DEV */}
          <div className="bg-slate-700/50 border border-slate-600 text-slate-300 px-4 py-3 rounded-lg text-xs">
            <strong className="text-slate-200">Credenciais de Teste:</strong><br />
            <div className="mt-2 bg-slate-900/50 p-2 rounded font-mono">
              admin@pag2pay.com / admin123
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Verificando...' : 'Acessar Painel Admin'}
          </button>
        </form>

        {/* Link para login de usuário */}
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-slate-400 hover:text-slate-200 transition">
            ← Voltar para login de usuário
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>🔒 Conexão segura | Todos os acessos são registrados</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
