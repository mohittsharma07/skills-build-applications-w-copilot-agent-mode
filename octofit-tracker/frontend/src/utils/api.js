export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl =
    typeof codespaceName === 'string' && codespaceName.trim()
      ? `https://${codespaceName.trim()}-8000.app.github.dev`
      : 'http://localhost:8000';

  return `${baseUrl}/api/${resource}/`;
}

export function getPayloadItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
}
