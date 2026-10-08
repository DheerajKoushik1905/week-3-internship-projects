import { Navigate, Route, Routes } from "react-router-dom";
import { createContext, useContext, useMemo, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tm_token") || "");
  const value = useMemo(() => ({
    token,
    login(next) { localStorage.setItem("tm_token", next); setToken(next); },
    logout() { localStorage.removeItem("tm_token"); setToken(""); }
  }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function Private({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Private><Dashboard /></Private>} />
      </Routes>
    </AuthProvider>
  );
}
