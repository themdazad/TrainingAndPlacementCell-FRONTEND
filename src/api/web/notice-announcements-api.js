import useGoogleSheet from '../../hooks/useGoogleSheet.js';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=1871965751&single=true&output=csv';

export default function useNoticeAnnouncements() {
  return useGoogleSheet(SHEET_URL); // {data, loading, error}
}
