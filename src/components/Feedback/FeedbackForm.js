import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { createFeedback, updateFeedback } from "../../service/apiService";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import "./FeedbackForm.scss";

const FeedbackForm = ({ bookingId, userId, carId, onSuccess, feedback }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [feedbackId, setFeedbackId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feedback) {
      setContent(feedback.content || "");
      setRating(feedback.rating || 5);
      setFeedbackId(feedback.id || null);
    } else {
      setContent("");
      setRating(5);
      setFeedbackId(null);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (feedbackId) {
        await updateFeedback(feedbackId, { content, rating });
        toast.success("Feedback updated!");
      } else {
        await createFeedback(bookingId, { content, rating });
        toast.success("Feedback submitted!");
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="feedback-form">
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <div className="star-rating mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={28}
              className="star"
              color={star <= rating ? "#ffc107" : "#e4e5e9"}
              style={{ cursor: "pointer", marginRight: 4 }}
              onClick={() => setRating(star)}
              data-testid={`star-${star}`}
            />
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="success" disabled={loading}>
        {loading ? "Submitting..." : feedbackId ? "Update Feedback" : "Submit Feedback"}
      </Button>
    </Form>
  );
};

export default FeedbackForm;