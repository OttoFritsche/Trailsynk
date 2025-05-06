
/**
 * Configurações de ambiente para o aplicativo TrailSynk
 * 
 * Este arquivo centraliza o acesso a variáveis de ambiente e configurações
 * para facilitar a integração com diferentes ambientes (dev, prod)
 */

export const config = {
  // URL base da API do backend
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Modo de ambiente (development, production)
  nodeEnv: import.meta.env.MODE || 'development',
  
  // Configurações do Strava (cliente ID para configuração OAuth)
  strava: {
    clientId: import.meta.env.VITE_STRAVA_CLIENT_ID,
    redirectUri: import.meta.env.VITE_STRAVA_REDIRECT_URI || `${window.location.origin}/app`
  },
  
  // Mapbox token para visualização de mapas
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
  
  // Opções para desenvolvimento
  isDevelopment: import.meta.env.DEV === true,
  isProduction: import.meta.env.PROD === true,
  
  // Timeout padrão para requisições em ms
  apiTimeout: 15000,
  
  // Prefixo para chaves no localStorage
  storagePrefix: 'trailsynk_'
};

/**
 * Função auxiliar para recuperar valores do localStorage com prefixo padrão
 */
export function getStorageItem(key: string): string | null {
  return localStorage.getItem(`${config.storagePrefix}${key}`);
}

/**
 * Função auxiliar para definir valores no localStorage com prefixo padrão
 */
export function setStorageItem(key: string, value: string): void {
  localStorage.setItem(`${config.storagePrefix}${key}`, value);
}

/**
 * Função auxiliar para remover valores do localStorage com prefixo padrão
 */
export function removeStorageItem(key: string): void {
  localStorage.removeItem(`${config.storagePrefix}${key}`);
}
