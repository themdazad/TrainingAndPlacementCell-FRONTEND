import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";
const PLACEMENT_DRIVES_API = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=673892581&single=true&output=csv";

// CSV to JSON converter
const csvToJson = (csvString) => {
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
};

// ✅ Proper custom hook
export default function usePlacementDrivesData() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(PLACEMENT_DRIVES_API, {
          withCredentials: false,
        });
        setResponse(csvToJson(res.data) || []);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return {
    data: response,
    loading,
    error,
  };
  
}
