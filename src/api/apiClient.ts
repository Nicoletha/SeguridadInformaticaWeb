export const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.json();
  },

  async post(endpoint: string, body: any) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  },
};
