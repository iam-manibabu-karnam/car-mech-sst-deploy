import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");

  const upload = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, content })
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <input placeholder="File name" onChange={e => setFileName(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
