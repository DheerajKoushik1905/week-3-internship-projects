import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../App.jsx";

const API = "http://localhost:5103/api";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", priority: "medium" });
  const [filter, setFilter] = useState("all");

  const client = useMemo(() => axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` }
  }), [token]);

  const load = async () => {
    const { data } = await client.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    load().catch(() => logout());
  }, [client]);

  const add = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    await client.post("/tasks", form);
    setForm({ ...form, title: "" });
    await load();
  };

  const updateStatus = async (task, status) => {
    await client.put(`/tasks/${task._id}`, { status });
    await load();
  };

  const remove = async (id) => {
    await client.delete(`/tasks/${id}`);
    await load();
  };

  const visible = tasks.filter((task) => filter === "all" || task.status === filter);

  return (
    <main className="container">
      <header className="header">
        <div>
          <p className="eyebrow">Week 3 Mini Project</p>
          <h1>Task Manager</h1>
          <p>Track tasks, status, and priority in one place.</p>
        </div>
        <button className="ghost" onClick={logout}>Logout</button>
      </header>

      <form className="panel composer" onSubmit={add}>
        <input placeholder="What needs to be done?" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <button>Add Task</button>
      </form>

      <div className="filters">
        {["all", "todo", "in-progress", "done"].map((item) => (
          <button className={filter === item ? "" : "ghost"} key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="grid">
        {visible.map((task) => (
          <article className="panel task" key={task._id}>
            <div className="task-head">
              <span className={`priority ${task.priority}`}>{task.priority}</span>
              <button className="delete" onClick={() => remove(task._id)}>×</button>
            </div>
            <h3>{task.title}</h3>
            <select value={task.status} onChange={(e) => updateStatus(task, e.target.value)}>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </article>
        ))}
      </section>
    </main>
  );
}
