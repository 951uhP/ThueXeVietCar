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
  Modal,
} from "react-bootstrap";
import SelectPaymentMethodModal from "./SelectPaymentMethodModal";
import { completeBooking } from "../../service/apiService";
import {
  cancelBooking,
  checkHasFeedback,
  getBookingDetail,
  getUserCarsDetail,
  getUsersBooking,
  getUsersDetail,
  getFeedbackByBookingId,
} from "../../service/apiService";
import { useEffect } from "react";
import LoadingIcon from "../Loading";
import { useSelector } from "react-redux";
import "./ViewBookingDetail.scss";
import Swal from "sweetalert2";
import FeedbackForm from "../Feedback/FeedbackForm";

function BookingDetails() {
  const [carDetail, setCarDetail] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [type, setType] = useState("Deposit");
  const [bookingId, setBookingId] = useState();
  const { bookingId: paramBookingId } = useParams();
  const [key, setKey] = useState("bookingInfo");
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [carLoading, setCarLoading] = useState(true);
  const { account } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [userFeedback, setUserFeedback] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (paramBookingId) setBookingId(paramBookingId);
  }, [paramBookingId]);

  const handleComplete = async (bookingId, paymentMethod) => {
    try {
      let response = await completeBooking(bookingId, paymentMethod);
      console.log(response);
      Swal.fire(
        "Success",
        `Booking ${bookingId} has been completed!`,
        "success"
      );
      setData((prevData) =>
        prevData.map((item) =>
          item.id === bookingId
            ? { ...item, bookingStatus: "Payment Paid" }
            : item
        )
      );
      return response;
    } catch (error) {
      console.error("Error conplete booking:", error);
      Swal.fire(
        "Error",
        "Failed to complete booking. Please try again.",
        "error"
      );
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const response = await getBookingDetail(bookingId);
        console.log("Booking detail response:", response);
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
  // Fetch thông tin người dùng
  useEffect(() => {
    if (!bookingDetail?.userId) return;
    const fetchUserDetail = async () => {
      try {
        const response = await getUsersDetail(bookingDetail.userId);
        if (response?.statusCode === 200 && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user detail:", error);
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchUserDetail();
  }, [bookingDetail?.userId]);

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

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleReturnCar = async (event, bookingId) => {
    try {
      let bookingDetail = await getBookingDetail(bookingId);
      if (bookingDetail.data.totalAmount > bookingDetail.data.deposit) {
        handleSelectPayment(event, bookingId);
        return;
      } else {
        let response = await completeBooking(bookingId, paymentMethod);
        if (response.bookingStatus === "Completed") {
          Swal.fire("Success", "Booking completed", "success");
        }
        if (response.bookingStatus === "Pending Refund") {
          Swal.fire("Success", "Waiting refund", "success");
        }
        return;
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire(
        "Error",
        "Failed to confirm booking. Please try again.",
        "error"
      );
    }
  };

  const handleSelectPayment = (event, bookingId) => {
    setType(event.target.name);
    setBookingId(bookingId);
    setShowModalPayment(true);
  };

  useEffect(() => {
    if (bookingDetail?.carId) {
      const fetchCarDetail = async () => {
        try {
          const response = await getUserCarsDetail(bookingDetail.carId);
          console.log("Car detail response:", response);
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

  // Kiểm tra feedback của user khi có bookingDetail và account
  useEffect(() => {
    const fetchUserFeedback = async () => {
      if (
        account.role?.name === "RENTER" &&
        bookingDetail?.id &&
        account.id
      ) {
        try {
          const res = await checkHasFeedback(bookingDetail.id, account.id);
          if (res?.data) {
            setUserFeedback(res.data);
            console.log("User feedback:", res.data);
          } else {
            setUserFeedback(null);
          }
        } catch {
          setUserFeedback(null);
        }
      }
    };
    fetchUserFeedback();
  }, [bookingDetail?.id, account]);

  // Lấy feedback theo bookingId
  useEffect(() => {
    const fetchFeedback = async () => {
      if (account.role?.name === "ADMIN" && bookingDetail?.id) {
        try {
        const res = await getFeedbackByBookingId(bookingDetail.id);
        if (res?.data) {
          setFeedback(Array.isArray(res.data) ? res.data : [res.data]);
          console.log("Feedback data:", res.data);
        } else {
          setFeedback([]);
        }
      } catch (error) {
        setFeedback([]);
      }
      }
    };
    fetchFeedback();
  }, [bookingDetail?.id]);

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
        Swal.fire(
          "Success",
          `Booking ${bookingId} has been cancelled successfully!`,
          "success"
        );
        setBookingDetail((prev) => ({
          ...prev,
          bookingStatus: "Canceled",
        }));
      } else {
        throw new Error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      Swal.fire(
        "Error",
        "Failed to cancel booking. Please try again later.",
        "error"
      );
    }
  };

  return (
    <Container style={{ paddingRight: "1.5 rem", paddingLeft: "1.5 rem" }}>
      <SelectPaymentMethodModal
        show={showModalPayment}
        setShow={setShowModalPayment}
        bookingId={bookingId}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        type={type}
        handleComplete={handleComplete}
      />
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
            <div style={{ marginBottom: 12 }}>
              <strong>Status:</strong>
              <span
                className={
                  "status-badge1 " +
                  bookingDetail.bookingStatus.replace(/\s/g, "-").toLowerCase()
                }
                style={{ marginLeft: 8 }}
              >
                {bookingDetail.bookingStatus}
              </span>
            </div>
            <div className="booking-actions mt-3">
              <Button
                className="custom-btn-back"
                onClick={() => {
                  if (account.role?.name === "ADMIN") {
                    navigate("/admin/list-booking-requests");
                  } else {
                    navigate("/my-booking");
                  }
                }}
              >
                Back to list
              </Button>
              {/* <Button
                className="custom-btn-primary"
                onClick={() => {
                  if (account.role?.name === "ADMIN") {
                    navigate(`/owner-car-details/${bookingDetail.carId}`);
                  } else {
                    navigate(`/car-details/${bookingDetail.carId}`);
                  }
                }}
              >
                View Details
              </Button> */}
              {["Awaiting Pickup Confirmation", "Pending Deposit"].includes(
                bookingDetail.bookingStatus
              ) && (
                  <Button
                    className="custom-btn-danger"
                    onClick={() => handleCancel(bookingDetail.id)}
                  >
                    Cancel Booking
                  </Button>
                )}
              {"In Progress" === bookingDetail.bookingStatus && account.role?.name === "RENTER" && (
                <Button
                  className="custom-btn-secondary"
                  name="Rental"
                  onClick={(event) => handleReturnCar(event, bookingDetail.id)}
                >
                  Return Car
                </Button>
              )}
              {"Completed" === bookingDetail.bookingStatus && account.role?.name === "RENTER" && (
                <>
                  <Button
                    className="custom-btn-feedback"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    {userFeedback ? "Update Feedback" : "Feedback"}
                  </Button>
                  <Modal
                    show={showFeedbackModal}
                    onHide={() => setShowFeedbackModal(false)}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FeedbackForm
                        bookingId={bookingDetail.id}
                        userId={account.id}
                        carId={bookingDetail.carId}
                        feedback={userFeedback}
                        onSuccess={() => setShowFeedbackModal(false)}
                      />
                    </Modal.Body>
                  </Modal>
                </>
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
                  <strong>Full Name:</strong> {user.name}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {user.dateOfBirth}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {user.phoneNo}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Email Address:</strong> {user.email}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <p>
                  <strong>National ID No.:</strong>{" "}
                  {user.nationalIdNo}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Driving License:</strong>{" "}
                  {user.drivingLicense}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
              </Col>
            </Row>
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
              <strong>Mileage:</strong> {carDetail.mileage} km
            </p>
            <p>
              <strong>Fuel Consumption:</strong> {carDetail.fuelConsumption} liters/100
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
      <hr />
      <div>
        {account.role?.name === "RENTER" ?
          <>
            <h4>My feedback</h4>
            {userFeedback ? (
              <div className="mt-2 p-3 rounded" style={{ background: "#f8f9fa", border: "1px solid #eee" }}>
                <div className="d-flex align-items-center mb-2">
                  <strong className="me-2">{account?.name || "You"}</strong>
                  <span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          color: star <= userFeedback.rating ? "#ffc107" : "#e4e5e9",
                          fontSize: 18,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </div>
                <div className="mb-1">{userFeedback.content}</div>
                <div className="text-muted" style={{ fontSize: 13 }}>
                  <strong>Created at:</strong>{" "}
                  {new Date(userFeedback.date).toLocaleDateString("vi-VN")}
                </div>
              </div>
            ) : (
              <div className="text-muted mt-2">
                You have not submitted feedback for this booking.</div>
            )}
          </>
          :
          <>
            <h4>Feedback from Renter</h4>
            {feedback && feedback.length > 0 ? (
              feedback.map((item, index) => (
                <div
                  key={index}
                  className="mt-2 p-3 rounded"
                  style={{ background: "#f8f9fa", border: "1px solid #eee" }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <strong className="me-2">{item.userName}</strong>
                    <span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            color: star <= item.rating ? "#ffc107" : "#e4e5e9",
                            fontSize: 18,
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="mb-1">{item.content}</div>
                  <div className="text-muted" style={{ fontSize: 13 }}>
                    <strong>Created at:</strong>{" "}
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              ))) : (
              <div className="text-muted mt-2">
                No feedback has been submitted for this booking.
              </div>
            )}
          </>

        }
      </div>
    </Container>
  );
}

export default BookingDetails;
