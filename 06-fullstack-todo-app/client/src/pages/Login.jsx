import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API = "http://localhost:5101/api";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (mode === "register") {
        await axios.post(`${API}/auth/register`, form);
        setMode("login");
        setMessage("Account created. Please log in.");
        return;
      }

      const { data } = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password
      });
      login(data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <main className="center">
      <form className="card form" onSubmit={submit}>
        <h1>{mode === "login" ? "Login" : "Create account"}</h1>
        {mode === "register" && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength="6"
        />
        <button>{mode === "login" ? "Login" : "Register"}</button>
        {message && <p>{message}</p>}
        <button
          className="secondary"
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Need an account?" : "Already registered?"}
        </button>
      </form>
    </main>
  );
}
