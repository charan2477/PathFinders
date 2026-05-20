import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const user  = JSON.parse(localStorage.getItem("user"));
      if (token && user) return { token, user };
    } catch (_) {}
    return { token: null, user: null };
  });

  /* Called after successful login or register */
  const login = useCallback((data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  }, []);

  /* Clear everything on logout */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
  }, []);

  /* Update user data in context (e.g. after activity changes) */
  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuth(prev => ({ ...prev, user: updatedUser }));
  }, []);

  const value = {
    user:        auth.user,
    token:       auth.token,
    isLoggedIn:  !!auth.token,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* Custom hook — use this everywhere instead of reading localStorage directly */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
