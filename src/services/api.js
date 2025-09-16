import axios from "axios";
import { setupInterceptors } from "./axiosInterceptors";

const apiUrl = process.env.REACT_APP_API_URL;
//Création instance axios et sa config par défaut
const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // Nom du cookie généré par Symfony
  xsrfHeaderName: "X-CSRF-Token", // Nom du header que Symfony attend
});
//intercepteur qui affiche toast si erreur
setupInterceptors(api); 

// api.interceptors.request.use((config) => {
//   return config;
// });

export default api;
