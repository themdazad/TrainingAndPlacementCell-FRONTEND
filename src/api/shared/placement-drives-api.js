import useGoogleSheet from "../../hooks/useFetch.js"

export default function PlacementDrivesDataAPI(){
  const res = useGoogleSheet("https://docs.google.com/spreadsheets/d/e/2PACX-1vQl8ryQvd4otEGN24fOy0eWNudgr1zPRJtLC1x5xw0CoIb_6dEBns5hPZzLX9YzAV166dEZz-bMWfGm/pub?gid=673892581&single=true&output=csv");
console.log(res)
  return res; // contained JSON response
}