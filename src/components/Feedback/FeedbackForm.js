import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { createFeedback, updateFeedback, getFeedbackByRenterAndCar } from "../../service/apiService";
import { toast } from "react-toastify";

const FeedbackForm = ({ bookingId, renterId, carId, onSuccess }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [feedbackId, setFeedbackId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Kiểm tra feedback cũ khi mở form
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getFeedbackByRenterAndCar(renterId, carId);
        console.log("Fetched feedback:", res);
        if (res && res.data && res.data.id) {
          setFeedbackId(res.data.id);
          setContent(res.data.content);
          setRating(res.data.rating);
        }
      } catch (e) {
        // Không có feedback cũ, không làm gì
      }
    };
    fetchFeedback();
  }, [renterId, carId]);

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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{star} Star{star > 1 && "s"}</option>
          ))}
        </Form.Control>
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