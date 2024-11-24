// src/method/useFetchForms.js

import { useState, useEffect } from "react";
import axios from "axios";

function ProfessorForms(professorUsername) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!professorUsername) return; // Only fetch if professorName exists

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/professor_forms/${professorUsername}`);
        
        if (response.data && response.data.length === 0) {
          setForms([]);  // Set an empty array if no forms are found
        } else {
          setForms(response.data);  // Otherwise, set the fetched forms
        }

        setError(null); // Clear any previous error
      } catch (err) {
        return null;
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchData();
  }, [professorUsername]);

  return { forms, loading, error };
}

export default ProfessorForms;
