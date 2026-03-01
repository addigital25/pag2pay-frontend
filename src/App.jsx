import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import MyProducts from './pages/MyProducts'
import MyAffiliations from './pages/MyAffiliations'
import ProductEdit from './pages/ProductEdit'
import AffiliateStore from './pages/AffiliateStore'
import Sales from './pages/Sales'
import AfterPayReports from './pages/AfterPayReports'
import ChurnRate from './pages/ChurnRate'
import Abandoned from './pages/Abandoned'
import Bank from './pages/Bank'
import Settings from './pages/Settings'
import UserManagement from './pages/UserManagement'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

// Componente para proteger rotas de usuário
function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Redireciona para login de usuário se não estiver autenticado
  return user ? children : <Navigate to="/login" />
}

// Componente para redirecionar usuários logados
function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Redireciona baseado no tipo de usuário
  if (user) {
    return user.userType === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />
  }

  return children
}

function AppContent() {
  return (
    <Routes>
      {/* Rotas públicas de login */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path="/admin/login" element={
        <PublicRoute>
          <AdminLogin />
        </PublicRoute>
      } />

      {/* Dashboard - Usuário comum */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      } />

      {/* Dashboard Admin - Apenas Administradores */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requireAdmin={true}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Redirecionamento de /admin para /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Produtos */}
      <Route path="/admin/products/my-products" element={
        <PrivateRoute>
          <MyProducts />
        </PrivateRoute>
      } />
      <Route path="/admin/products/my-affiliations" element={
        <PrivateRoute>
          <MyAffiliations />
        </PrivateRoute>
      } />
      <Route path="/admin/products/:productId/edit" element={
        <PrivateRoute>
          <ProductEdit />
        </PrivateRoute>
      } />

      {/* Vitrine */}
      <Route path="/admin/affiliate-store" element={
        <PrivateRoute>
          <AffiliateStore />
        </PrivateRoute>
      } />

      {/* Relatórios */}
      <Route path="/admin/reports/sales" element={
        <PrivateRoute>
          <Sales />
        </PrivateRoute>
      } />
      <Route path="/admin/reports/afterpay" element={
        <PrivateRoute>
          <AfterPayReports />
        </PrivateRoute>
      } />
      <Route path="/admin/reports/churn" element={
        <PrivateRoute>
          <ChurnRate />
        </PrivateRoute>
      } />
      <Route path="/admin/reports/abandoned" element={
        <PrivateRoute>
          <Abandoned />
        </PrivateRoute>
      } />

      {/* Banco */}
      <Route path="/admin/bank" element={
        <PrivateRoute>
          <Bank />
        </PrivateRoute>
      } />

      {/* Configurações */}
      <Route path="/admin/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />

      {/* Gerenciamento de Usuários (Admin Only) */}
      <Route path="/admin/users" element={
        <ProtectedRoute requireAdmin={true}>
          <UserManagement />
        </ProtectedRoute>
      } />

      {/* Rotas públicas para checkout */}
      <Route path="/checkout/:productId" element={<Checkout />} />
      <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

      {/* Redirect padrão - rota raiz vai para login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
