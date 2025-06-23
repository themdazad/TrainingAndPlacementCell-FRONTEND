import axios from "axios";
import Papa from "papaparse";
import { useEffect, useState } from "react";

// ✅ custom hook for Google Sheet Data
export default function useGoogleSheet(url) {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function handleAPI() {
      try {
        const res = await axios.get(url, {
          withCredentials: false,
        });
        setRes(csvToJson(res.data) || []); // calling csv-string to JSON converter.
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    handleAPI();
    
  }, []);

  return { res, loading, error };
}


// Convert received csv-string from googlesheet into JSON 
function csvToJson(csvString) {
  const results = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (results.errors.length > 0) {
    console.error("Error parsing CSV:", results.errors);
    return null;
  }
  return results.data;
}
