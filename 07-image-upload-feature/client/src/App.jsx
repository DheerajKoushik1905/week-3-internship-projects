import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5102";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const loadImages = async () => {
    const { data } = await axios.get(`${API}/api/images`);
    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const choose = (event) => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : "");
  };

  const upload = async (event) => {
    event.preventDefault();
    if (!file) return setMessage("Choose an image first.");

    const data = new FormData();
    data.append("image", file);

    try {
      await axios.post(`${API}/api/upload`, data);
      setMessage("Image uploaded successfully.");
      setFile(null);
      setPreview("");
      event.target.reset();
      await loadImages();
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <main className="container">
      <section className="hero">
        <p>Week 3 Assignment</p>
        <h1>Image Upload Feature</h1>
        <span>React preview + Express/Multer upload endpoint</span>
      </section>

      <form className="card" onSubmit={upload}>
        <input type="file" accept="image/*" onChange={choose} />
        {preview && <img className="preview" src={preview} alt="Selected preview" />}
        <button>Upload Image</button>
        {message && <p>{message}</p>}
      </form>

      <section>
        <h2>Uploaded Images</h2>
        <div className="grid">
          {images.map((image) => (
            <img key={image.url} src={`${API}${image.url}`} alt={image.name} />
          ))}
        </div>
      </section>
    </main>
  );
}
