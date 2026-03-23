import React from "react";
import { useState } from "react";

const API_URL = "https://web-production-b9abc.up.railway.app/predict";

export default function App() {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckReview = async () => {
    setLoading(true);
    setPrediction("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      const data = await response.json();
      setPrediction(data.prediction || "No prediction");
    } catch (error) {
      setPrediction("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Fake Review Detector</h1>

        <textarea
          className="review-input"
          placeholder="Enter review text"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          rows={6}
        />

        <button className="check-button" type="button" onClick={handleCheckReview} disabled={loading}>
          {loading ? "Checking..." : "Check Review"}
        </button>

        <div className="result-box">
          Result: <strong>{prediction || "-"}</strong>
        </div>
      </section>
    </main>
  );
}
