import React, { useState } from "react";
import "./RateTrip.scss";

function RateTrip() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleHover = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    alert(`Rating: ${rating} stars\nReview: ${review}`);
  };

  return (
    <div className="rate-a-trip">
      <h3 className="title">Rate your trip</h3>
      <p className="subtitle">
        Do you enjoy your trip, please let us know what you think
      </p>

      {/* Stars */}
      <div className="stars" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hoverRating || rating) ? "selected" : ""
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => handleHover(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="review-box"
        placeholder="Write your review here..."
        value={review}
        onChange={handleReviewChange}
      />

      {/* Buttons */}
      <div className="buttons">
        <button className="btn btn-skip" onClick={() => alert("Skipped!")}>
          Skip
        </button>
        <button className="btn btn-send" onClick={handleSubmit}>
          Send Review
        </button>
      </div>
    </div>
  );
}

export default RateTrip;
