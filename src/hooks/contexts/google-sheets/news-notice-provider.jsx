import Papa from "papaparse";
import { useEffect, useState } from "react";
import GooglesheetContext from "./GooglesheetContext";
import RandomLoadingMessage from "../../../utils/RandomLoadingMessage";
import axios from "axios";

// csv to json converter
const csvToJson = (csvString) => {
  const results = Papa.parse(csvString, {
    header: true, // Converts rows to objects using headers as keys
    dynamicTyping: true, // Automatically converts numbers and booleans
    skipEmptyLines: true, // Skips empty lines in the CSV
  });

  if (results.errors.length > 0) {
    console.error("Error parsing CSV:", results.errors);
    return null;
  }

  return results.data; // Returns an array of JSON objects
};

const NewsNoticeProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=1871965751&single=true&output=csv",
          {
            withCredentials: false, // 🚫 Disable sending credentials (cookies, etc.)
          }
        );
        setData(csvToJson(response.data));
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GooglesheetContext.Provider value={data}>
      {!loading ? children : <RandomLoadingMessage />  }
    </GooglesheetContext.Provider>
  );
};
export default NewsNoticeProvider;
