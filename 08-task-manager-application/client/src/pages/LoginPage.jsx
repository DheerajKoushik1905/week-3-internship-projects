import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App.jsx";

const API = "http://localhost:5103/api";

export default function LoginPage() {
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (registering) {
        await axios.post(`${API}/auth/register`, form);
        setRegistering(false);
        setMessage("Account created. Log in to continue.");
      } else {
        const { data } = await axios.post(`${API}/auth/login`, {
          email: form.email,
          password: form.password
        });
        login(data.token);
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <main className="center">
      <form className="panel auth" onSubmit={submit}>
        <p className="eyebrow">Task Manager</p>
        <h1>{registering ? "Create your account" : "Welcome back"}</h1>
        {registering && (
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        )}
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="6" required />
        <button>{registering ? "Register" : "Login"}</button>
        {message && <p>{message}</p>}
        <button className="ghost" type="button" onClick={() => setRegistering(!registering)}>
          {registering ? "Already have an account?" : "Create an account"}
        </button>
      </form>
    </main>
  );
}
