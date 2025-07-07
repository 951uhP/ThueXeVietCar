import React, { useState } from "react";
import "./Finish.scss";

const Finish = (props) => {
  const { formData, previewImage } = props
  const dummyData = [
    {
      id: 1,
      name: `${formData.name}`,
      ratings: 4,
      noOfRides: `${formData.mileage}`,
      price: `${formData.basePrice}/day`,
      location: `${formData.address}`,
      status: "Available",
      images: previewImage ? previewImage : null,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Quản lý carousel
  const currentCar = dummyData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyData.length);
  };

  return (
    <div className="finish-container">
      <h3>Preview</h3>
      <div className="preview-section">
        <div className="image-carousel">
          <div className="image-placeholder">
            <img src={currentCar.images} alt={currentCar.name} />
          </div>
        </div>
        <div className="car-details">
          <h4>{currentCar.name}</h4>
          <div className="details-row">
            <span>Ratings:</span>
            <div className="stars span">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < currentCar.ratings ? "star filled" : "star"
                    }
                  >
                    ⭐
                  </span>
                ))}
            </div>
            <span>({currentCar.ratings} ratings)</span>
          </div>
          <div className="details-row">
            <span>No. of rides: </span>
            <span className="span">{currentCar.noOfRides}</span>
          </div>
          <div className="details-row">
            <span>Price:</span>
            <span className="span">
              {Number(formData.basePrice || 0).toLocaleString("vi-VN")} VND/ngày
            </span>
          </div>
          <div className="details-row">
            <span>Locations:</span>
            <span className="span">{currentCar.location}</span>
          </div>
          <div className="details-row">
            <span>Status:</span>
            <span
              className={`span ${currentCar.status === "Available"
                ? "status-available"
                : "status-unavailable"
                }`}
            >
              {currentCar.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finish;
