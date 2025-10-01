import { useState, useEffect } from "react";

function App() {
  const [cases, setCases] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");


  const fetchCases = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/get_cases");
    const data = await res.json();
    setCases(data);
  };

  const submitCase = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/create_case", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    // Clear form before page reload
    setTitle("");
    setDescription("");
    setStatus("open");

    // Refresh the list to show new case added
    fetchCases();
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div>
      <h1>Case Manager</h1>

      <p> Create a new case</p>

      <form onSubmit={submitCase} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Case title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit">Add Case</button>
      </form>


      <p> Your current cases</p>
      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <ul>
          {cases.map((c) => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
              <b>{c.title}</b>, status:  {c.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
