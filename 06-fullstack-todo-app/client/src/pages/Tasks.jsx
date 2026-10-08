import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API = "http://localhost:5101/api";

export default function Tasks() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const client = axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` }
  });

  const load = async () => {
    const { data } = await client.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    load().catch(() => logout());
  }, []);

  const addTask = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    await client.post("/tasks", { title });
    setTitle("");
    await load();
  };

  const toggle = async (task) => {
    await client.put(`/tasks/${task._id}`, { completed: !task.completed });
    await load();
  };

  const remove = async (id) => {
    await client.delete(`/tasks/${id}`);
    await load();
  };

  return (
    <main className="container">
      <header className="topbar">
        <div>
          <p className="eyebrow">Week 3</p>
          <h1>Full Stack To-Do</h1>
        </div>
        <button className="secondary" onClick={logout}>Logout</button>
      </header>

      <form className="card add-row" onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task" />
        <button>Add</button>
      </form>

      <section className="task-list">
        {tasks.map((task) => (
          <article className="card task" key={task._id}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={() => toggle(task)} />
              <span className={task.completed ? "done" : ""}>{task.title}</span>
            </label>
            <button className="danger" onClick={() => remove(task._id)}>Delete</button>
          </article>
        ))}
      </section>
    </main>
  );
}
