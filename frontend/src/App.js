import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import govUkLogo from "./assets/images/gov_uk_logo.PNG"; 
import Banner from "./components/Banner";


import CasePage from "./CasePage";

function App() {
  const [cases, setCases] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [error, setError] = useState(null);


  const fetchCases = async () => {
    try{
      const res = await fetch("http://127.0.0.1:8000/api/get_cases");

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
    const data = await res.json();
    setCases(data);
    } catch (error){
      console.error("Failed to fetch cases:", error);
      setError("Could not connect to the backend for some reason");
    }
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

   // Delete a case
   const deleteCase = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/delete_case/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete case");

      // Update frontend list without reloading all cases
      setCases(cases.filter((c) => c.id !== id));
    } catch (err) {
      setError("Failed to delete case.");
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main case list and form */}
        <Route
          path="/"
          element={
            // TODO: Format indentation
            <div>
              <Banner />

              <h1>Case Manager</h1>

              <p>Create a new case</p>
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
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <button type="submit">Add Case</button>
              </form>

              <p>Your current cases</p>
              {cases.length === 0 ? (
                <p>No cases found.</p>
              ) : (
                <ul>
                  {cases.map((c) => (
                    <li key={c.id} style={{ marginBottom: "10px" }}>
                      <b>{c.title}</b>, status: {c.status}{" "}
                      <Link to={`/cases/${c.id}`} style={{ marginLeft: "10px" }}>
                        View Case
                      </Link>
                      <button
                        style={{ marginLeft: "10px", color: "red" }}
                        onClick={() => deleteCase(c.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          }
        />

        {/* Single case page */}
        <Route path="/cases/:id" element={<CasePage />} />
      </Routes>
    </Router>
  );
  
}

export default App;
