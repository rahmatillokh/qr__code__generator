import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFetch = () => {
    setLoading(true);
    axios
      .get(`http://api.qrserver.com/v1/create-qr-code/?data=${value}`, {
        responseType: "blob", // Specify the response type as Blob
      })
      .then((response) => {
        const blob = new Blob([response.data]); // Create a Blob from the response data
        const url = window.URL.createObjectURL(blob);
        setUrl(url);
        setData(url); // Set data to the Blob URL
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(false); // Set data to false if there's an error
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (data) {
      handleFetch(); // Automatically fetch when data changes
    }
  }, [data]);

  return (
    <div className="header">
      {data ? <img src={data} alt="QR Code" /> : null}
      <div>
        <input
          disabled={loading}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="...."
        />
        <button disabled={loading} onClick={handleFetch}>
          Qr Code yaratish
        </button>

        {data ? (
          <a href={url} download={Math.random() * 10000000000 + ".png"}>
            Yuklab olish
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default App;
