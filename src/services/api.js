// import axios from "axios";
// import { setupInterceptors } from "./axiosInterceptors";

// const apiUrl = process.env.REACT_APP_API_URL;
// //Création instance axios et sa config par défaut
// const api = axios.create({
//   baseURL: `${apiUrl}/api`,
//   withCredentials: true,
//   // Nom du cookie généré par Symfony
//   xsrfCookieName: "XSRF-TOKEN", 
//   // Nom du header que Symfony attend
//   xsrfHeaderName: "X-CSRF-Token",
// });
// //intercepteur qui affiche toast si erreur
// setupInterceptors(api); 

// // api.interceptors.request.use((config) => {
// //   return config;
// // });

import axios from "axios";
import { setupInterceptors } from "./axiosInterceptors";

const apiUrl = process.env.REACT_APP_API_URL;
const isProduction = process.env.NODE_ENV === "production";

// Variable pour stocker le token CSRF
let csrfToken = null;

// Fonction pour récupérer le token CSRF
export const getCsrfToken = async () => {
  if (!csrfToken) {
    try {
      const response = await axios.get(
        `${isProduction ? "/api" : `${apiUrl}/api`}/csrf-token`,
        {
          withCredentials: true,
        }
      );
      csrfToken = response.data.csrf_token;
    } catch (error) {
      console.error("Erreur lors de la récupération du token CSRF:", error);
      throw error;
    }
  }
  return csrfToken;
};

// Création instance axios et sa config par défaut
const api = axios.create({
  baseURL: isProduction ? "/api" : `${apiUrl}/api`,
  withCredentials: true,
});

// Intercepteur pour ajouter automatiquement le token CSRF
api.interceptors.request.use(async (config) => {
  // Seulement pour les méthodes mutatives
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(config.method?.toUpperCase())
  ) {
    try {
      const token = await getCsrfToken();
      config.headers["X-CSRF-Token"] = token;
    } catch (error) {
      console.error("Impossible de récupérer le token CSRF:", error);
    }
  }
  return config;
});

// Intercepteur qui affiche toast si erreur
setupInterceptors(api);

export default api;