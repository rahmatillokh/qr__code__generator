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
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        const qrCodeUrl = window.URL.createObjectURL(blob);
        setUrl(qrCodeUrl);
        setData(qrCodeUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data) {
      handleFetch();
    }
  }, [data]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "QR Code",
          text: "Check out this QR Code!",
          url: url, // Share the URL of the generated QR code
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Share failed:", error);
        });
    }
  };

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
          <div>
            <a href={url} download={Math.random() * 10000000000 + ".png"}>
              Yuklab olish
            </a>
            <button onClick={handleShare}>Share</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
