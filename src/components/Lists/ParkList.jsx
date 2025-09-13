// useParks.js
import axios from "axios";
import { useEffect, useState } from "react";

export default function useParks() {
  const [parks, setParks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/parks`, {
          headers: {
            Accept: "application/json",
          },
        });
        setParks(response.data);
      } catch (err) {
        setError("Impossible de charger les parcs pour le moment.");
      }
    };

    fetchParks();
  }, []);

  return { parks, error };
}
