import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Tabs,
  Tab,
  Table,
  Row,
  Col,
  Button,
  Carousel,
} from "react-bootstrap";
import {
  cancelBooking,
  getBookingDetail,
  getUserCarsDetail,
  getUsersBooking,
  getUsersDetail,
} from "../../service/apiService";
import { useEffect } from "react";
import LoadingIcon from "../Loading";
import { useSelector } from "react-redux";
import "./ViewBookingDetail.scss"

function BookingDetails() {
  const [carDetail, setCarDetail] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(null);
  const { bookingId } = useParams();
  const [key, setKey] = useState("bookingInfo");
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [carLoading, setCarLoading] = useState(true);
  const { account } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const userId = account?.id || localStorage.getItem("userId");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await getUsersDetail(userId);

        if (response?.statusCode === 200 && response.data) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user detail.");
        }
      } catch (error) {
        console.error("Error fetching user detail:", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  const fetchImages = async (imageApis) => {
    try {
      const imagePromises = imageApis.map((api) =>
        fetch(`http://localhost:8386${api}`).then((res) => {
          if (res.ok) {
            return res.blob();
          }

          throw new Error("Failed to fetch image");
        })
      );
      const blobs = await Promise.all(imagePromises);
      const urls = blobs.map((blob) => URL.createObjectURL(blob));
      setImageURLs(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const response = await getBookingDetail(bookingId);
        if (response && response.statusCode === 200) {
          setBookingDetail(response.data);
          if (response.data.images?.length) {
            await fetchImages(response.data.images);
          }
        } else {
          console.error("Failed to fetch booking details.");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchBookingDetail();
  }, [bookingId]);

  useEffect(() => {
    if (bookingDetail?.carId) {
      const fetchCarDetail = async () => {
        try {
          const response = await getUserCarsDetail(bookingDetail.carId);
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
          setCarLoading(false);
        }
      };

      fetchCarDetail();
    }
  }, [bookingDetail?.carId]);

  if (bookingLoading || carLoading || isUserLoading) {
    return <LoadingIcon />;
  }
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = (days, basePrice) => {
    return days * basePrice;
  };
  const handleCancel = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      if (response && response.statusCode === 200) {
        alert(`Booking ${bookingId} has been cancelled successfully!`);

        setBookingDetail((prev) => ({
          ...prev,
          bookingStatus: "Canceled",
        }));
      } else {
        throw new Error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again later.");
    }
  };

  const isDriverSameAsRenter =
    JSON.stringify(bookingDetail.renter.id) ===
    JSON.stringify(bookingDetail.driver.id);
  // const total = calculateTotal(days, basePrice);
  return (
    <Container style={{ paddingRight: "1.5 rem", paddingLeft: "1.5 rem" }}>
      <div className="view-booking-detail-container">
        <h2 className="mb-4">Booking Details</h2>
        <div className="d-flex justify-content-between">
          {/* Khu vực hình ảnh */}
          <div style={{ width: "60%", paddingRight: "20px" }}>
            <Carousel>
              {imageURLs.length > 0 ? (
                imageURLs.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block"
                      src={url}
                      alt={`Car Image ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "/no-image-available.jpg"; // Ảnh dự phòng
                      }}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block"
                    src="/no-image-available.jpg" // Ảnh mặc định
                    alt="No Images Available"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          <div style={{ width: "40%" }}>
            <h4>{carDetail.name}</h4>
            <p>
              <strong>Form: </strong>
              {new Date(bookingDetail.startDateTime).toLocaleString()}
            </p>
            <p>
              <strong>To:</strong>{" "}
              {new Date(bookingDetail.endDateTime).toLocaleString()}
            </p>
            <p>
              Number of days:{" "}
              <strong>
                {calculateDays(
                  bookingDetail.startDateTime,
                  bookingDetail.endDateTime
                )}
              </strong>
            </p>
            <p>
              Booking No.: <strong>BKN{bookingDetail.id}</strong>
            </p>
            <p>
              Status:{" "}
              <strong
                style={{
                  color:
                    bookingDetail.bookingStatus === "Awaiting Pickup Confirmation"
                      ? "#b88400"
                      : bookingDetail.bookingStatus === "Pending Deposit"
                        ? "blue"
                        : bookingDetail.bookingStatus === "Cancelled"
                          ? "red"
                          : bookingDetail.bookingStatus === "Available"
                            ? "green"
                            : bookingDetail.bookingStatus === "In Progress"
                              ? "orange"
                              : "black",
                }}
              >
                {bookingDetail.bookingStatus}
              </strong>
            </p>
            <div className="d-flex justify-content-between mt-3">
              <Button
                onClick={() => {
                  navigate(`/my-booking`);
                }}
                variant="success"
                style={{
                  backgroundColor: "#ffc107",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                }}
              >
                Back to list
              </Button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/car-details/${bookingDetail.carId}`);
                }}
              >
                View Details
              </Button>
            </div>

            <div className="d-flex justify-content-between mt-3">
              {["Awaiting Pickup Confirmation", "Pending Deposit"].includes(
                bookingDetail.bookingStatus
              ) && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleCancel(bookingDetail.id);
                    }}
                  >
                    Cancel Booking
                  </Button>
                )}
            </div>
            <div className="d-flex justify-content-between mt-3">
              {"In Progress".includes(bookingDetail.bookingStatus) && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCancel(bookingDetail.id);
                  }}
                >
                  Return Car
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Tabs hiển thị thông tin */}
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-4">
        <Tab eventKey="bookingInfo" title="Booking Information">
          <div className="mt-3">
            <h5>Renter's Information</h5>
            <Row className="mb-3">
              <Col md={6}>
                <p>
                  <strong>Full Name:</strong> {bookingDetail.renter.fullName}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {bookingDetail.renter.dateOfBirth}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {bookingDetail.renter.phoneNumber}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Email Address:</strong> {bookingDetail.renter.email}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <p>
                  <strong>National ID No.:</strong>{" "}
                  {bookingDetail.renter.nationalId}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Driving License:</strong>{" "}
                  {bookingDetail.renter.drivingLicense}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <p>
                  <strong>Address:</strong> {bookingDetail.renter.address}
                </p>
              </Col>
            </Row>

            <h5>Driver's Information</h5>
            {isDriverSameAsRenter ? (
              <p>Same with renter</p>
            ) : (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Full Name:</strong>{" "}
                      {bookingDetail.driver.fullName}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {bookingDetail.driver.dateOfBirth}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {bookingDetail.driver.phoneNumber}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Email Address:</strong>{" "}
                      {bookingDetail.driver.email}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>National ID No.:</strong>{" "}
                      {bookingDetail.driver.nationalId}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Driving License:</strong>{" "}
                      {bookingDetail.driver.drivingLicense}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <p>
                      <strong>Address:</strong> {bookingDetail.driver.address}
                    </p>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Tab>

        <Tab eventKey="carInfo" title="Car Information">
          <div className="mt-4">
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>License Plate</td>
                  <td>{carDetail.licensePlate}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{carDetail.color}</td>
                </tr>
                <tr>
                  <td>Brand Name</td>
                  <td>{carDetail.brand}</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{carDetail.model}</td>
                </tr>
                <tr>
                  <td>Production Year</td>
                  <td>{carDetail.productionYears}</td>
                </tr>
                <tr>
                  <td>No. of Seats</td>
                  <td>{carDetail.numberOfSeats}</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{carDetail.transmissionType}</td>
                </tr>
                <tr>
                  <td>Fuel</td>
                  <td>{carDetail.fuelType}</td>
                </tr>
              </tbody>
            </Table>

            <p>
              <strong>Mileage:</strong> {carDetail.mileage}
            </p>
            <p>
              <strong>Fuel Consumption:</strong> {carDetail.fuelConsumption}/100
              km
            </p>
            <p>
              <strong>Address:</strong> {carDetail.address}
            </p>
          </div>
        </Tab>

        {/* Tab Payment Information */}
        <Tab eventKey="paymentInfo" title="Payment Information">
          <div className="mt-3">
            <form>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="walletOption"
                  value="wallet"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="walletOption">
                  My Wallet
                </label>
              </div>

              <p className="mt-2">
                <strong>Current Balance:</strong>{" "}
                {formatCurrency(user?.wallet || 0)}
              </p>
              <p className="text-muted">
                Please make sure to have sufficient balance when you return the
                car.
              </p>

              <p>
                Go to{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/wallet");
                  }}
                >
                  My Wallet
                </a>
              </p>
            </form>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default BookingDetails;
