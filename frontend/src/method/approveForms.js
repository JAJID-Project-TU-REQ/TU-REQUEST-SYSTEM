// src/method/approveForm.js

import axios from 'axios';

export const approveForm = async (form_id, professorUsername, status, comment) => {
  try {
    const response = await axios.patch(`https://tu-request-backend.onrender.com/forms/${form_id}/approve`, {
      professor: professorUsername,
      status: status,
      comment: comment,
    });
    return response.data;
  } catch (err) {
    console.error("Error approving form:", err);
    throw err;
  }
};
