import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Banner from "./components/Banner";
import { API_URL } from "./config";

export default function CasePage() {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
  
    useEffect(() => {
      fetch(`${API_URL}/get_case/${id}`)
        .then((res) => res.json())
        .then((data) => setCaseData(data));
    }, [id]);
  
    if (!caseData) return <p>Loading case...</p>;
  
    return (

      <div>
      <Banner />
        <div style={{ padding: "20px" }}>
          <h2>{caseData.title}</h2>
          <p><b>Status:</b> {caseData.status}</p>
          <p><b>Description:</b> {caseData.description}</p>
          <p><b>Date:</b> {caseData.due_date}</p>
          <Link to="/">
            <button>← Back to Cases</button>
          </Link>
        </div>
      </div>
    );
  }