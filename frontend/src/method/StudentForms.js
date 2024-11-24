import { useState, useEffect } from "react";
import axios from "axios";

function StudentForms(studentUsername) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!studentUsername) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/student_forms/${studentUsername}`);
        
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
  }, [studentUsername]);

  return { forms, loading, error };
}

export default StudentForms;
