import { useState, useEffect } from "react";
import axios from "axios";

function SelectProfessor() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tu-request-backend.onrender.com/get_professor`);
        
        if (response.data && response.data.length === 0) {
          setData([]);  // Set an empty array if no forms are found
        } else {
          setData(response.data);  // Otherwise, set the fetched forms
        }

        setError(null); // Clear any previous error
      } catch (err) {
        return null;
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default SelectProfessor;
