import { useState, useEffect } from "react";

function App() {
  const [cases, setCases] = useState([]);


  const fetchCases = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/get_cases");
    const data = await res.json();
    setCases(data);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div>
      <h1>Case Manager</h1>
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
