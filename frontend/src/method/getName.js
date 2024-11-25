import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const GetName = (senderId) => {
  const [name, setName] = useState("");

    const fetchName = async (senderId) => {
      try {
        const response = await axios.get(`https://tu-request-backend.onrender.com/find-name-by-username/${senderId}`);
        
        // Set the response data to the form state
        setName(response.data.name_th);
      } catch (err) {
        console.error("Error fetching name:", err);
      }
    };

    if (senderId) {
      fetchName(senderId);
    }
  return { name };

};

export default GetName;