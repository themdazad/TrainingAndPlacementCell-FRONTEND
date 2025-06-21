import axios from "axios";
import Papa from "papaparse";
import { useState } from "react";

// csv to json converter
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

const fetchData = async ({ url }) => {
  const [response, setResponse] = useState(null);  
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  try {
    const res = await axios.get(url, { withCredentials: false });
    setResponse(csvToJson(res.data));
  } catch (err) {
    setError(err);
    console.error("Error fetching data:", err);
  } finally {
    setLoading(false);
  }

  return {response,loading, error};
};

export default fetchData;
