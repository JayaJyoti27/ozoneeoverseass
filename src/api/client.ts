const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

type RequestOptions = {
  params?: Record<string, any>;
};

function buildUrl(path: string, params?: Record<string, any>) {
  const url = new URL(path.startsWith("http") ? path : `${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

async function request(method: string, path: string, body?: any, options?: RequestOptions) {
  const url = buildUrl(path, options?.params);

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: any = undefined;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error: any = new Error(`Request failed with status ${res.status}`);
    error.response = {
      status: res.status,
      statusText: res.statusText,
      data,
    };
    throw error;
  }

  return { data };
}

const api = {
  get: (path: string, options?: RequestOptions) => request("GET", path, undefined, options),
  post: (path: string, body?: any, options?: RequestOptions) =>
    request("POST", path, body, options),
  put: (path: string, body?: any, options?: RequestOptions) => request("PUT", path, body, options),
  patch: (path: string, body?: any, options?: RequestOptions) =>
    request("PATCH", path, body, options),
  delete: (path: string, options?: RequestOptions) => request("DELETE", path, undefined, options),
};

export default api;
