import { useState } from 'react'
import ImageUpload from '../ImageUpload'

export default function DadosGerais({ product, setProduct, userRole }) {
  const [tags, setTags] = useState(product.tags || [])
  const [tagInput, setTagInput] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (tags.length < 5 && !tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()]
        setTags(newTags)
        setProduct({ ...product, tags: newTags })
        setTagInput('')
      }
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    setTags(newTags)
    setProduct({ ...product, tags: newTags })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'APROVADO':
        return 'text-green-600'
      case 'PENDENTE':
        return 'text-yellow-600'
      case 'AGUARDANDO ALTERAÇÃO':
        return 'text-orange-600'
      default:
        return 'text-gray-600'
    }
  }

  const isAdmin = userRole === 'admin'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Dados do produto</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Upload de Imagem */}
        <div className="md:col-span-1">
          <ImageUpload
            value={product.image}
            onChange={(imageData) => setProduct({ ...product, image: imageData })}
          />
        </div>

        {/* Coluna Direita - Informações do Produto */}
        <div className="md:col-span-2 space-y-6">
          {/* Header com Código e Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-gray-600">Código: </span>
                <span className="font-medium">{product.code || 'Gerando...'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="approvalStatus"
                  value={product.approvalStatus || 'PENDENTE'}
                  onChange={handleChange}
                  disabled={!isAdmin}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    !isAdmin ? 'bg-gray-100 cursor-not-allowed' : ''
                  } ${getStatusColor(product.approvalStatus)}`}
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="APROVADO">Aprovado</option>
                  <option value="AGUARDANDO ALTERAÇÃO">Aguardando Alteração</option>
                </select>
                {!isAdmin && (
                  <p className="text-xs text-gray-500 mt-1">
                    Apenas administradores podem alterar o status
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato
                </label>
                <select
                  name="productType"
                  value={product.productType || 'E-book'}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="E-book">E-book</option>
                  <option value="Assinatura">Assinatura</option>
                  <option value="Curso">Curso</option>
                  <option value="Produto Físico">Produto Físico</option>
                </select>
              </div>
            </div>
          </div>

          {/* Link do produto na loja */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link do produto na loja:
            </label>
            <input
              type="url"
              name="storeLink"
              value={product.storeLink || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com/produto"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-blue-600"
            />
          </div>

          {/* Disponível para venda */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              Disponível para venda?
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="availableForSale"
                checked={product.availableForSale !== false}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {/* Moedas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Moedas
            </label>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300">
              <button className="text-gray-400 hover:text-gray-600">×</button>
              <span className="text-sm">BRL (R$) - Real brasileiro</span>
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              required
            ></textarea>
          </div>

          {/* Categoria (mantido para compatibilidade com backend) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={product.category || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Saúde, Bem-estar e Beleza">Saúde, Bem-estar e Beleza</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Educação">Educação</option>
              <option value="Negócios">Negócios</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="mr-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                    {tag}
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Digite uma tag e pressione Enter"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={tags.length >= 5}
              />
              <p className="text-xs text-gray-500">
                * O número máximo de tags disponível é 5
              </p>
            </div>
          </div>

          {/* CEP de origem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEP de origem <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="originZipCode"
              value={product.originZipCode || ''}
              onChange={handleChange}
              placeholder="00000-000"
              maxLength="9"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* URL da página de vendas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página de vendas <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="salesPageUrl"
              value={product.salesPageUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com/vendas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* URL da página de obrigado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página de obrigado
            </label>
            <input
              type="url"
              name="thankYouPageUrl"
              value={product.thankYouPageUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* URL da página de obrigado para pedido em processamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página de obrigado para pedido em processamento
            </label>
            <input
              type="url"
              name="thankYouProcessingUrl"
              value={product.thankYouProcessingUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* URL da página de obrigado para boletos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página de obrigado para boletos
            </label>
            <input
              type="url"
              name="thankYouBoletoUrl"
              value={product.thankYouBoletoUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* URL da página de obrigado para pix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página de obrigado para pix
            </label>
            <input
              type="url"
              name="thankYouPixUrl"
              value={product.thankYouPixUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Se não informar, será usado a página de obrigado para boletos.
            </p>
          </div>

          {/* URL da página do reclame aqui */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da página do reclame aqui
            </label>
            <input
              type="url"
              name="reclameAquiUrl"
              value={product.reclameAquiUrl || ''}
              onChange={handleChange}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* E-mail de suporte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail de suporte
            </label>
            <input
              type="email"
              name="supportEmail"
              value={product.supportEmail || ''}
              onChange={handleChange}
              placeholder="addigitalltda25@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Se não cadastrado, será usado o mesmo endereço de e-mail de seu login.
            </p>
          </div>

          {/* Tempo de garantia */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo de garantia <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="warrantyDays"
                value={product.warrantyDays || ''}
                onChange={handleChange}
                placeholder="7"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* É Amostra? */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              É Amostra?
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isSample"
                checked={product.isSample || false}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          {/* Tipo de frete / Valor fixo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de frete <span className="text-red-500">*</span>
              </label>
              <select
                name="shippingType"
                value={product.shippingType || 'Frete Fixo'}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Frete Fixo">Frete Fixo</option>
                <option value="Frete Grátis">Frete Grátis</option>
                <option value="Correios">Correios</option>
                <option value="Transportadora">Transportadora</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor fixo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fixedShippingPrice"
                value={product.fixedShippingPrice || ''}
                onChange={handleChange}
                placeholder="R$ 29,90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Frete embutido no preço? */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              Frete embutido no preço?
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="shippingIncluded"
                checked={product.shippingIncluded || false}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {/* Divulgar dados para emissão de nota fiscal para o afiliado? */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              Divulgar dados para emissão de nota fiscal para o afiliado?
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="shareDataForInvoice"
                checked={product.shareDataForInvoice || false}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
