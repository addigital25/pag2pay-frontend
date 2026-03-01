import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('webhook')
  const [settings, setSettings] = useState({
    webhook: {
      url: '',
      events: {
        orderCreated: true,
        orderPaid: false,
        orderShipped: false,
        orderDelivered: false
      }
    },
    api: {
      publicKey: 'pk_live_xxxxxxxxxxx',
      secretKey: 'sk_live_xxxxxxxxxxx',
      enabled: true
    },
    pixel: {
      facebookPixel: '',
      googleAnalytics: '',
      tiktokPixel: '',
      enabled: false
    },
    integration: {
      whatsapp: '',
      telegram: '',
      email: 'contato@afterpay.com',
      enableNotifications: true
    },
    bank: {
      bankName: '',
      accountType: 'corrente',
      agency: '',
      accountNumber: '',
      cpfCnpj: '',
      holderName: ''
    }
  })

  const sections = [
    { id: 'webhook', name: 'Webhook (Postback)', icon: '🔔' },
    { id: 'api', name: 'API', icon: '🔑' },
    { id: 'pixel', name: 'Pixel', icon: '📊' },
    { id: 'integration', name: 'Integrações', icon: '🔗' }
  ]

  const handleSave = () => {
    // Aqui você faria a chamada à API para salvar as configurações
    alert('Configurações salvas com sucesso!')
    console.log('Settings:', settings)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-600">Gerencie webhooks, integrações e dados bancários</p>
        </div>

        {/* Tabs Slider */}
        <div className="bg-gray-100 rounded-lg p-1 inline-flex mb-6 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2.5 rounded-md font-medium transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Webhook Section */}
        {activeSection === 'webhook' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Webhook (Postback)</h2>
            <p className="text-sm text-gray-600 mb-6">
              Configure a URL para receber notificações automáticas sobre eventos da plataforma
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Webhook
                </label>
                <input
                  type="url"
                  value={settings.webhook.url}
                  onChange={(e) => setSettings({
                    ...settings,
                    webhook: { ...settings.webhook, url: e.target.value }
                  })}
                  placeholder="https://seu-site.com/webhook"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enviaremos requisições POST para esta URL quando eventos ocorrerem
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Eventos para Notificar
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.webhook.events.orderCreated}
                      onChange={(e) => setSettings({
                        ...settings,
                        webhook: {
                          ...settings.webhook,
                          events: { ...settings.webhook.events, orderCreated: e.target.checked }
                        }
                      })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pedido Criado</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.webhook.events.orderPaid}
                      onChange={(e) => setSettings({
                        ...settings,
                        webhook: {
                          ...settings.webhook,
                          events: { ...settings.webhook.events, orderPaid: e.target.checked }
                        }
                      })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pedido Pago</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.webhook.events.orderShipped}
                      onChange={(e) => setSettings({
                        ...settings,
                        webhook: {
                          ...settings.webhook,
                          events: { ...settings.webhook.events, orderShipped: e.target.checked }
                        }
                      })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pedido Enviado</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.webhook.events.orderDelivered}
                      onChange={(e) => setSettings({
                        ...settings,
                        webhook: {
                          ...settings.webhook,
                          events: { ...settings.webhook.events, orderDelivered: e.target.checked }
                        }
                      })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pedido Entregue</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Section */}
        {activeSection === 'api' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Chaves API</h2>
            <p className="text-sm text-gray-600 mb-6">
              Use essas chaves para integrar a AfterPay com seu sistema
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chave Pública
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.api.publicKey}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(settings.api.publicKey)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use no frontend (pode ser exposta publicamente)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chave Secreta
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={settings.api.secretKey}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(settings.api.secretKey)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ Nunca compartilhe essa chave. Use apenas no backend!
                </p>
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.api.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      api: { ...settings.api, enabled: e.target.checked }
                    })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">API Habilitada</span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800 font-medium mb-2">📖 Documentação da API</p>
                <p className="text-xs text-blue-700">
                  Acesse a documentação completa em: <code className="bg-blue-100 px-1 py-0.5 rounded">https://api.afterpay.com/docs</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pixel Section */}
        {activeSection === 'pixel' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Pixels de Rastreamento</h2>
            <p className="text-sm text-gray-600 mb-6">
              Configure pixels para rastrear conversões e comportamento dos usuários
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.pixel.facebookPixel}
                  onChange={(e) => setSettings({
                    ...settings,
                    pixel: { ...settings.pixel, facebookPixel: e.target.value }
                  })}
                  placeholder="1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.pixel.googleAnalytics}
                  onChange={(e) => setSettings({
                    ...settings,
                    pixel: { ...settings.pixel, googleAnalytics: e.target.value }
                  })}
                  placeholder="G-XXXXXXXXXX ou UA-XXXXXXXXX-X"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.pixel.tiktokPixel}
                  onChange={(e) => setSettings({
                    ...settings,
                    pixel: { ...settings.pixel, tiktokPixel: e.target.value }
                  })}
                  placeholder="XXXXXXXXXXXXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.pixel.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      pixel: { ...settings.pixel, enabled: e.target.checked }
                    })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Pixels Habilitados</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Integration Section */}
        {activeSection === 'integration' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Integrações</h2>
            <p className="text-sm text-gray-600 mb-6">
              Configure integrações com serviços externos
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Business API
                </label>
                <input
                  type="tel"
                  value={settings.integration.whatsapp}
                  onChange={(e) => setSettings({
                    ...settings,
                    integration: { ...settings.integration, whatsapp: e.target.value }
                  })}
                  placeholder="+55 11 99999-9999"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Envie notificações de pedidos via WhatsApp
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram Bot Token
                </label>
                <input
                  type="text"
                  value={settings.integration.telegram}
                  onChange={(e) => setSettings({
                    ...settings,
                    integration: { ...settings.integration, telegram: e.target.value }
                  })}
                  placeholder="123456789:ABCdefGhIjKlmNoPQRsTUVwxyZ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Receba alertas de vendas no Telegram
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de Notificações
                </label>
                <input
                  type="email"
                  value={settings.integration.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    integration: { ...settings.integration, email: e.target.value }
                  })}
                  placeholder="contato@afterpay.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.integration.enableNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      integration: { ...settings.integration, enableNotifications: e.target.checked }
                    })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Notificações Habilitadas</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Bank Section */}
        {activeSection === 'bank' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Dados Bancários</h2>
            <p className="text-sm text-gray-600 mb-6">
              Configure sua conta bancária para receber os pagamentos
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banco
                </label>
                <select
                  value={settings.bank.bankName}
                  onChange={(e) => setSettings({
                    ...settings,
                    bank: { ...settings.bank, bankName: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Selecione o banco</option>
                  <option value="001">Banco do Brasil</option>
                  <option value="237">Bradesco</option>
                  <option value="104">Caixa Econômica</option>
                  <option value="341">Itaú</option>
                  <option value="033">Santander</option>
                  <option value="260">Nubank</option>
                  <option value="077">Inter</option>
                  <option value="212">Banco Original</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Conta
                </label>
                <select
                  value={settings.bank.accountType}
                  onChange={(e) => setSettings({
                    ...settings,
                    bank: { ...settings.bank, accountType: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="corrente">Conta Corrente</option>
                  <option value="poupanca">Conta Poupança</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agência
                  </label>
                  <input
                    type="text"
                    value={settings.bank.agency}
                    onChange={(e) => setSettings({
                      ...settings,
                      bank: { ...settings.bank, agency: e.target.value }
                    })}
                    placeholder="0001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número da Conta
                  </label>
                  <input
                    type="text"
                    value={settings.bank.accountNumber}
                    onChange={(e) => setSettings({
                      ...settings,
                      bank: { ...settings.bank, accountNumber: e.target.value }
                    })}
                    placeholder="12345-6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF/CNPJ do Titular
                </label>
                <input
                  type="text"
                  value={settings.bank.cpfCnpj}
                  onChange={(e) => setSettings({
                    ...settings,
                    bank: { ...settings.bank, cpfCnpj: e.target.value }
                  })}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Titular
                </label>
                <input
                  type="text"
                  value={settings.bank.holderName}
                  onChange={(e) => setSettings({
                    ...settings,
                    bank: { ...settings.bank, holderName: e.target.value }
                  })}
                  placeholder="Nome completo conforme cadastro no banco"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Importante:</strong> Certifique-se de que os dados bancários estejam corretos.
                  Erros podem causar atrasos nos pagamentos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-lg"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
