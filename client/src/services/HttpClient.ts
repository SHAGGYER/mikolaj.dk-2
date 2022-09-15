import axios from "axios";

// axios.interceptors.request.use((config) => {
//   return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
// });

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      throw new Error("NETWORK_ERROR");
    }

    throw error;
  }
);

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

const HttpClient = () => {
  const token = localStorage.getItem("token");

  const defaultSettings = {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };

  return {
    get: <T>(url, options = {}) =>
      axios.get<T>(url, { ...defaultSettings, ...options }),
    post: <T>(url, data, options = {}) =>
      axios.post<T>(url, data, { ...defaultSettings, ...options }),
    put: <T>(url, data, options = {}) =>
      axios.put<T>(url, data, { ...defaultSettings, ...options }),
    delete: <T>(url, options = {}) =>
      axios.delete<T>(url, { ...defaultSettings, ...options }),
  };
};

export default HttpClient;
