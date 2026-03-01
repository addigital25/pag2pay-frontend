// Configuração centralizada da aplicação
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production'
}

export default config
