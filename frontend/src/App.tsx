import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
}

const API_URL = process.env.API_URL || "";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/items`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>test-nixpacks-monorepo frontend</h1>
      {error && <p style={{ color: "red" }}>Error fetching items: {error}</p>}
      {!error && items.length === 0 && <p>Loading items...</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              #{item.id} — {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
