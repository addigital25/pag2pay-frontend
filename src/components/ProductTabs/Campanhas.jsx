export default function Campanhas({ product, setProduct }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Campanhas de Marketing</h2>
        <p className="text-sm text-gray-600 mb-6">Configure campanhas de email e follow-up</p>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        + Criar Campanha
      </button>
    </div>
  )
}
