import React, { useState } from "react";
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import "./MyReport.scss";

function MyReport() {
  // Dummy data
  const feedbacks = [
    {
      id: 1,
      user: "User 1234",
      avatar: "",
      date: "12/02/2022 08:30",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula placerat faucibus. Sed convallis tempus rhoncus. Sed vel dapibus est.",
      car: "Nissan Navara El 2017",
      from: "13/02/2022 - 12:00 PM",
      to: "23/02/2022 - 14:00 PM",
    },
    {
      id: 2,
      user: "User 1234",
      avatar: "",
      date: "12/02/2022 08:30",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula placerat faucibus.",
      car: "Nissan Navara El 2017",
      from: "13/02/2022 - 12:00 PM",
      to: "23/02/2022 - 14:00 PM",
    },
    {
      id: 3,
      user: "User 1234",
      avatar: "",
      date: "12/02/2022 08:30",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis tempus rhoncus.",
      car: "Nissan Navara El 2017",
      from: "13/02/2022 - 12:00 PM",
      to: "23/02/2022 - 14:00 PM",
    },
  ];

  const averageRating = 4.25;

  return (
    <div className="container">
      <div className="my-report">
        <div className="average-rating">
          <h4>Average Ratings</h4>
          <h1>{averageRating}</h1>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${
                  index < Math.round(averageRating) ? "filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="rating-details">
          <div className="rating-filter">
            <Button className="btn-detail">All (200)</Button>
            <Button className="btn-detail">5 Stars (100)</Button>
            <Button className="btn-detail">4 Stars (50)</Button>
            <Button className="btn-detail">3 Stars (50)</Button>
            <Button className="btn-detail">2 Stars (0)</Button>
            <Button className="btn-detail">1 Star (0)</Button>
          </div>
        </div>
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="feedback-card mb-3">
              <Card.Body>
                <div className="feedback-header d-flex align-items-center">
                  <div className="avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className="user-info">
                    <h6>{feedback.user}</h6>
                    <p>{feedback.date}</p>
                  </div>
                  <div className="rating ms-auto">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`star ${
                          index < feedback.rating ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="feedback-comment">{feedback.comment}</p>
                <div className="car-info">
                  <p>
                    <strong>{feedback.car}</strong>
                  </p>
                  <p>
                    From: {feedback.from} <br />
                    To: {feedback.to}
                  </p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyReport;
