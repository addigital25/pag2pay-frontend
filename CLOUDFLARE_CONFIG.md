# Configuração Cloudflare Pages

## Build Settings

Para configurar corretamente o deploy no Cloudflare Pages:

1. **Framework preset**: `Vite`
2. **Build command**: `npm run build`
3. **Build output directory**: `dist`
4. **Root directory**: `/` (deixe vazio ou use a raiz do repositório)
5. **Node version**: `18` (especificado em .nvmrc)

## Variáveis de Ambiente

Não são necessárias variáveis de ambiente para o build, pois o frontend se conecta diretamente ao backend do Railway.

## URLs Configuradas

Todas as requisições do frontend apontam para:
- Backend: `https://pag2pay-backend01-production.up.railway.app`

## Troubleshooting

Se o site não carregar ou mostrar erros:
1. Limpe o cache do Cloudflare: Dashboard → Caching → Purge Everything
2. Force um novo deploy: Settings → Builds & deployments → Retry deployment
3. Verifique os logs de build: Deployments → [último deploy] → View build log
