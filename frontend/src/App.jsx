import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, { method: "GET", headers: { "Content-Type": "application/json" } })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.data.message);
      })
      .catch((error) => console.error("Error fetching: ", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌾 Collitap</h1>
      <p>{message}</p>
    </div>
  );
}
