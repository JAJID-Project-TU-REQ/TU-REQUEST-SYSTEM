import { useState, useEffect } from "react";
import axios from "axios";

const useAdvisorDetails = (username) => { // ใช้ prefix "use" ตาม convention ของ hooks
    const [advisor, setAdvisor] = useState("");

    useEffect(() => {
        const fetchAdvisorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get_advisor/${username}`);
                setAdvisor(response.data); // เก็บค่าที่ fetch ได้ลง state
            } catch (err) {
                console.error("Failed to fetch advisor details:", err);
                setAdvisor(null); // ตั้งค่า null กรณีเกิดข้อผิดพลาด
            }
        };

        if (username) {
            fetchAdvisorDetails();
        }
    }, [username]);

    return advisor; // ส่งค่ากลับ
};

export default useAdvisorDetails;