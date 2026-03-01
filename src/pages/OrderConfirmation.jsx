import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erro ao carregar pedido:', err)
        setLoading(false)
      })
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">Pedido não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600">
              Seu pedido foi realizado com sucesso
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-bold text-lg mb-4">Detalhes do Pedido</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do Pedido:</span>
                <span className="font-semibold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Produto:</span>
                <span className="font-semibold">{order.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-semibold">R$ {order.productPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  Aguardando Envio
                </span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-bold text-lg mb-3">Próximos Passos</h2>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-sm font-bold mr-3 flex-shrink-0">
                  1
                </span>
                <span className="text-gray-700">
                  Enviaremos seu produto para o endereço informado
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-sm font-bold mr-3 flex-shrink-0">
                  2
                </span>
                <span className="text-gray-700">
                  Você receberá um código de rastreamento por email
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-sm font-bold mr-3 flex-shrink-0">
                  3
                </span>
                <span className="text-gray-700">
                  Após confirmar o recebimento, você receberá o link de pagamento
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-sm font-bold mr-3 flex-shrink-0">
                  4
                </span>
                <span className="text-gray-700">
                  Pague com segurança através do link enviado
                </span>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Não é necessário pagar agora. O link de pagamento será enviado somente após você receber o produto.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Acompanhar Pedido
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
