import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const FormDetails = (form_id) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        // Make the axios GET request to fetch form details
        const response = await axios.get(`https://tu-request-backend.onrender.com/forms/${form_id}`);
        
        // Set the response data to the form state
        setForm(response.data);
      } catch (err) {
        setError(err.message); // Set error message if fetching fails
      } finally {
        setLoading(false);
      }
    };

    if (form_id) {
      fetchFormDetails(form_id); // Only fetch if form_id is available
    }
  }, [form_id]); // Dependency array to fetch when form_id changes

  return { form, loading, error }; // Return form data, loading state, and error
};

export default FormDetails;