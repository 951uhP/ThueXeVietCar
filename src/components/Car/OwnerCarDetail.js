import React, { useEffect, useState } from "react";
import { Carousel, Tab, Tabs, Table, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserCarsDetail,
  confirmDeposit,
  postConfirmPayment,
  getOwnersBooking,
  getAllFeedBack, 
  getAverageRating
} from "../../service/apiService"; // API service
import LoadingIcon from "../Loading";
import { PiCalculatorBold } from "react-icons/pi";
import Swal from "sweetalert2";
import "./CarDetails.scss"; // Sử dụng chung style với CarDetails

function OwnerCarDetail() {
  const navigate = useNavigate();
  const { carId } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageURLs, setImageURLs] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const fetchImages = async (imageApis) => {
    try {
      const imagePromises = imageApis.map((api) =>
        fetch(`http://localhost:9999${api}`).then((res) => {
          if (res.ok) {
            return res.blob();
          }

          throw new Error("Failed to fetch image");
        })
      );
      const blobs = await Promise.all(imagePromises);
      const urls = blobs.map((blob) => URL.createObjectURL(blob));
      setImageURLs(urls);

      // Cleanup URLs on unmount
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch car details and images
  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await getUserCarsDetail(carId);
        if (response && response.statusCode === 200) {
          setCarDetail(response.data);
          if (response.data.images?.length) {
            await fetchImages(response.data.images);
          }
        } else {
          console.error("Failed to fetch car details.");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarDetail();
    // Fetch feedbacks
        const fetchFeedbacks = async () => {
          try {
            const data = await getAllFeedBack(carId);
            setFeedbacks(Array.isArray(data) ? data : []);
          } catch (error) {
            setFeedbacks([]);
          }
        };
        fetchFeedbacks();
    
    // Fetch average rating
    const fetchAverageRating = async () => {
      try {
        const data = await getAverageRating(carId);
        setAverageRating(data || null);
      } catch (error) {
        setAverageRating(null);
      }
    };
    fetchAverageRating();
  }, [carId]);


  useEffect(() => {
    const fetchBookingId = async () => {
      try {
        const bookingResponse = await getOwnersBooking();
        if (bookingResponse && bookingResponse.statusCode === 200) {
          // Tìm booking có carId trùng và trạng thái phù hợp
          const bookings = bookingResponse.data.result;
          const found = bookings.find(
            (b) =>
              b.carId === carDetail.id &&
              (
                (carDetail.carStatus === "Booked" &&
                  b.bookingStatus === "Deposit Paid") ||
                (carDetail.carStatus === "Stopped" &&
                  b.bookingStatus === "Payment Paid")
              )
          );
          if (found) setBookingId(found.id);
        }
      } catch (error) {
        console.error("Error fetching owner's bookings:", error);
      }
    };

    if (carDetail && carDetail.id) {
      fetchBookingId();
    }
  }, [carDetail]);

  const handleUpdateCar = () => {
    navigate(`/owner-car-details/update/${carId}`);
  };

  const handleConfirm = async () => {
    if (!bookingId) {
      Swal.fire("Error", "No related booking found for this car.", "error");
      return;
    }
    try {
      if (carDetail.carStatus === "Booked") {
        await confirmDeposit(bookingId);
        Swal.fire("Success", "Deposit confirmed!", "success");
      } else if (carDetail.carStatus === "Stopped") {
        await postConfirmPayment(bookingId);
        Swal.fire("Success", "Payment confirmed!", "success");
      }
      // Optionally reload car detail here
      // fetchCarDetail();
    } catch (error) {
      Swal.fire("Error", "Failed to confirm. Please try again.", "error");
      console.error("Error confirming:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (!carDetail) {
    return <p>No car details found.</p>;
  }

  return (
    <Container>
      <div className="car-details-container">
        <div className="row">
          {/* Carousel */}
          <div className="col-lg-7 col-md-12 mb-4">
            <div className="car-carousel">
              <Carousel>
                {imageURLs.length > 0 ? (
                  imageURLs.map((url, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={url}
                        alt={`Car Image ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/no-image-available.jpg";
                        }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      src="/no-image-available.jpg"
                      alt="No Images Available"
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          </div>
          {/* Info Panel */}
          <div className="col-lg-5 col-md-12">
            <div className="car-info-panel">
              <div className="car-title">{carDetail.name}</div>
              <div className="car-price">
                {formatCurrency(carDetail.basePrice)}{" "}
                <span style={{ fontSize: "1rem", fontWeight: 400 }}>/day</span>
              </div>
              <div className="car-location">
                <i className="bi bi-geo-alt-fill"></i>
                {carDetail.address}
              </div>
              <div className="car-average-rating mb-2">
                <PiCalculatorBold style={{ fontSize: 22, color: "#ffc107", marginRight: 8 }} />
                {averageRating ? (
                  <>
                    <span style={{ color: "#ffc107", fontSize: 20, fontWeight: 700 }}>
                      {averageRating.toFixed(1)}
                    </span>
                    <span style={{ color: "#ffc107", fontSize: 18, marginLeft: 4 }}>★</span>
                  </>
                ) : (
                  <span className="text-muted">No rating yet</span>
                )}
              </div>
              <div
                className={
                  "car-status-badge " +
                  (carDetail.carStatus === "Available"
                    ? "available"
                    : carDetail.carStatus === "Booked"
                    ? "booked"
                    : "stopped")
                }
              >
                <i className="bi bi-check-circle-fill"></i> {carDetail.carStatus}
              </div>
              <Button
                className="rent-btn"
                style={{ marginTop: 16, background: "#ffc107", color: "#222" }}
                onClick={handleUpdateCar}
              >
                Update Car's Information
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey="basic" id="car-details-tabs" className="mt-4 car-details-tabs">
          <Tab eventKey="basic" title="Basic Information">
            <div className="car-info-grid mt-3">
              <div className="info-item">
                <span className="info-label">License plate:</span>
                <span className="info-value">{carDetail.licensePlate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Color:</span>
                <span className="info-value">{carDetail.color}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Brand name:</span>
                <span className="info-value">{carDetail.brand}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Model:</span>
                <span className="info-value">{carDetail.model}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Production year:</span>
                <span className="info-value">{carDetail.productionYears}</span>
              </div>
              <div className="info-item">
                <span className="info-label">No. of seats:</span>
                <span className="info-value">{carDetail.numberOfSeats}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Transmission:</span>
                <span className="info-value">{carDetail.transmissionType}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fuel:</span>
                <span className="info-value">{carDetail.fuelType}</span>
              </div>
            </div>
            <h4 className="mt-4">Documents:</h4>
            <div className="car-documents-list">
              {carDetail.documents.map((doc, index) => {
                const fileName = doc.split("/").pop();
                return (
                  <div className="doc-item" key={index}>
                    <span className="doc-index">{index + 1}.</span>
                    <a href={doc} className="doc-name" download={fileName}>{fileName}</a>
                    <span className="doc-note">None</span>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="details" title="Details">
            <div className="mt-3">
              <p>
                <strong>Mileage:</strong> {carDetail.mileage} km
              </p>
              <p>
                <strong>Fuel consumption:</strong> {carDetail.fuelConsumption} liter/100 km
              </p>
              <p>
                <strong>Address:</strong> {carDetail.address}
              </p>
              <p>
                <strong>Description:</strong>
              </p>
              <p>{carDetail.description}</p>
              <p>
                <strong>Additional Function:</strong> {carDetail.additionalFunctions}
              </p>
            </div>
          </Tab>
          <Tab eventKey="terms" title="Terms of use">
            <div className="mt-3">
              <p>
                <strong>Base price:</strong> {formatCurrency(carDetail.basePrice)} VND/Day
              </p>
              <p>
                <strong>Required Deposit:</strong> {formatCurrency(carDetail.deposit)} VND
              </p>
              <p>
                <strong>Term of use:</strong>
              </p>
              {carDetail.termsOfUse &&
                carDetail.termsOfUse
                  .split(",")
                  .map((term, idx) => (
                    <div key={idx}>
                      <input type="checkbox" checked disabled /> {term.trim()}
                    </div>
                  ))}
            </div>
          </Tab>
          <Tab eventKey="feedback" title="Feedback">
                      <div className="mt-3">
                        {feedbacks.length === 0 && (
                          <div className="text-muted">No feedback yet.</div>
                        )}
                        {feedbacks.map((fb, idx) => (
                          <div key={fb.id || idx} className="mb-4 p-3 rounded" style={{ background: "#f8f9fa", border: "1px solid #eee" }}>
                            <div className="d-flex align-items-center mb-2">
                              <strong className="me-2">{fb.userName || "User"}</strong>
                              <span>
                                {[1,2,3,4,5].map(star => (
                                  <span key={star} style={{ color: star <= fb.rating ? "#ffc107" : "#e4e5e9", fontSize: 18 }}>
                                    ★
                                  </span>
                                ))}
                              </span>
                            </div>
                            <div className="mb-1">{fb.content}</div>
                            {/* Hiển thị thêm ngày thuê */}
                            <div className="text-muted" style={{ fontSize: 13 }}>
                              {fb.bookingStartDate && fb.bookingEndDate && (
                                <>
                                  <span>
                                    <strong>Rental:</strong> {new Date(fb.bookingStartDate).toLocaleDateString("vi-VN")} - {new Date(fb.bookingEndDate).toLocaleDateString("vi-VN")}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="text-muted" style={{ fontSize: 13 }}>
                              <strong>Created at:</strong> {fb.date ? new Date(fb.date).toLocaleDateString("vi-VN") : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default OwnerCarDetail;
