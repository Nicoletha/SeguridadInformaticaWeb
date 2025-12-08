export const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = {
  async get(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include", // ENVÍA LA COOKIE
      headers: {
        "Content-Type": "application/json",
      }
    });

    return res;
  },

  async post(endpoint: string, body: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include", // ENVÍA LA COOKIE AUTOMÁTICAMENTE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res;
  },
}
