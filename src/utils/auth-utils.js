import { setAuthToken } from 'src/Services/auth/jwtAuth';

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

/**
 * Get current user data
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Get current token
 * @returns {string|null}
 */
export const getCurrentToken = () => localStorage.getItem('token');

/**
 * Initialize authentication from localStorage
 */
export const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  setAuthToken(null);
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('roleId');
};

/**
 * Logout user and redirect to login
 */
export const logout = () => {
  clearAuth();
  window.location.href = `${__IMG_URL__}/login`;
};
