import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

export default function useGoogleSheet(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null); // for aborting requests

  useEffect(() => {
    if (!url) return;

    // Cancel any previous request
    abortRef.current?.abort();
    const abortController = new AbortController();
    abortRef.current = abortController;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(url, {
          signal: abortController.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
          withCredentials: false,
        });

        const parsed = Papa.parse(res.data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        if (parsed.errors.length > 0) {
          throw new Error(parsed.errors.map((e) => e.message).join(', '));
        }

        setData(parsed.data || []);
      } catch (err) {
        if (axios.isCancel(err)) return; // silent cancel
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // cleanup on unmount
  }, [url]);

  return { data, loading, error };
}
