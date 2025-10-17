export const BASE_URL = import.meta.env.VITE_BASE_URL || `http://127.0.0.1:8000`;

export const API = {
  REGISTER: `${BASE_URL}/register/`,
  LOGIN: `${BASE_URL}/login/`,
  TOKEN_REFRESH: `${BASE_URL}/token/refresh/`,
  MESSAGES: `${BASE_URL}/messages/`,
  MESSAGE_DETAIL: (id) => `${BASE_URL}/message/${id}/`,
  SEND_MESSAGE: (secret_link) => `${BASE_URL}/message/send/${secret_link}/`,
  USERS: `${BASE_URL}/users/`,
  DASHBOARD: `${BASE_URL}/dashboard/`,
};
