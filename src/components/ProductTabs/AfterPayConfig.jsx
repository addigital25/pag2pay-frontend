export default function AfterPayConfig({ product, setProduct }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Configuração AfterPay</h2>
        <p className="text-sm text-gray-600 mb-6">Configure pagamento após recebimento</p>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="rounded text-indigo-600" />
        <span className="font-medium">Habilitar AfterPay</span>
      </label>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          AfterPay permite que o cliente receba o produto e pague apenas após recebê-lo.
        </p>
      </div>
    </div>
  )
}
