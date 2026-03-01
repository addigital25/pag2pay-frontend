export default function Cupons({ product, setProduct }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Cupons de Desconto</h2>
        <p className="text-sm text-gray-600 mb-6">Gerencie cupons de desconto para este produto</p>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        + Criar Novo Cupom
      </button>
      <div className="text-center py-12 text-gray-500">
        <p>Nenhum cupom criado ainda</p>
      </div>
    </div>
  )
}
