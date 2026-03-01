import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import config from '../config'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
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

    if (isLogin) {
      // Login apenas de usuário
      const result = await login(formData.email, formData.password, 'user')
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error)
      }
    } else {
      // Criar conta de usuário
      try {
        const response = await fetch(`${config.apiUrl}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            type: 'user'
          })
        })

        const data = await response.json()

        if (data.success) {
          // Fazer login automático após criar conta
          const loginResult = await login(formData.email, formData.password, 'user')
          if (loginResult.success) {
            navigate('/dashboard')
          }
        } else {
          setError(data.error || 'Erro ao criar conta')
        }
      } catch (err) {
        setError('Erro ao processar solicitação')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl font-black text-white">P2</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Pag2Pay</h1>
          <p className="text-gray-600 mt-2 text-sm">Plataforma de Vendas e Afiliados</p>
        </div>

        {/* Tabs Login/Criar Conta */}
        <div className="flex mb-6 bg-gray-50 rounded-lg p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true)
              setError('')
            }}
            className={`flex-1 py-2.5 rounded-md font-medium transition ${
              isLogin ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false)
              setError('')
            }}
            className={`flex-1 py-2.5 rounded-md font-medium transition ${
              !isLogin ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="Seu nome completo"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isLogin && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm">
              <strong>Credenciais de Teste:</strong><br />
              <div className="mt-2 bg-white bg-opacity-70 p-2 rounded">
                <strong>Usuário:</strong> usuario@pag2pay.com / usuario123
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              Não tem uma conta?{' '}
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError('')
                }}
                className="text-emerald-600 font-medium hover:underline"
              >
                Criar agora
              </button>
            </p>
          ) : (
            <p>
              Já tem uma conta?{' '}
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError('')
                }}
                className="text-emerald-600 font-medium hover:underline"
              >
                Fazer login
              </button>
            </p>
          )}
        </div>

        {/* Link para Admin */}
        <div className="mt-4 text-center">
          <a
            href="/admin/login"
            className="text-xs text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-1"
          >
            🔐 Acesso Administrativo
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
