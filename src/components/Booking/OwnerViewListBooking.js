import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import "./MyBooking.scss";
import {
  getUserCarsDetail,
  cancelBooking,
  confirmDeposit,
  getOwnersBooking,
  postConfirmPayment,
} from "../../service/apiService";
import LoadingIcon from "../Loading";
import { useNavigate } from "react-router-dom";
import SelectPaymentMethodModal from "./SelectPaymentMethodModal";
import Swal from "sweetalert2";

function OwnerViewListBooking() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [bookingId, setBookingId] = useState("");
  const [type, setType] = useState("Refund");

  const handleBookingDetail = (bookingId) => {
    navigate(`/booking-detail/${bookingId}`);
  };
  // Format số tiền hiển thị
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handleRefund = async () => {};
  const handleConfirmDeposit = async (bookingId) => {
    try {
      await confirmDeposit(bookingId);
      Swal.fire("Success", `Booking ${bookingId} has been confirmed deposit!`, "success");
      setData((prevData) =>
        prevData.map((item) =>
          item.id === bookingId ? { ...item, bookingStatus: "Confirmed" } : item
        )
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire("Error", "Failed to confirm booking. Please try again.", "error");
    }
  };
  const handleConfirmPayment = async (bookingId) => {
    try {
      await postConfirmPayment(bookingId);
      Swal.fire("Success", `Booking ${bookingId} has been confirmed payment!`, "success");
      setData((prevData) =>
        prevData.map((item) =>
          item.id === bookingId ? { ...item, bookingStatus: "Completed" } : item
        )
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire("Error", "Failed to confirm booking. Please try again.", "error");
    }
  };
  useEffect(() => {
    const fetchBookingsAndCars = async () => {
      try {
        const bookingResponse = await getOwnersBooking();
        if (bookingResponse && bookingResponse.statusCode === 200) {
          const bookings = bookingResponse.data.result;

          const carPromises = bookings.map((booking) =>
            booking.carId
              ? getUserCarsDetail(booking.carId)
              : Promise.resolve(null)
          );

          const carDetails = await Promise.all(carPromises);

          const combinedData = bookings.map((booking, index) => {
            const carDetail = carDetails[index];
            return {
              ...booking,
              car: carDetail?.data || null,
            };
          });

          setData(combinedData);
        } else {
          console.error("Failed to fetch bookings");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching bookings and cars:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsAndCars();
  }, []);
  //   useEffect(() => {
  //     const fetchUserDetail = async () => {
  //       try {
  //         const response = await getUsersDetail(userId);

  //         if (response?.statusCode === 200 && response.data) {
  //           setWallet(response.data?.wallet);
  //         } else {
  //           console.error("Failed to fetch user detail.");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user detail:", error);
  //       } finally {
  //       }
  //     };

  //     fetchUserDetail();
  //   }, [userId]);
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
      await cancelBooking(bookingId);
      Swal.fire("Success", `Booking ${bookingId} has been cancelled!`, "success");
      setData((prevData) =>
        prevData.map((item) =>
          item.id === bookingId ? { ...item, bookingStatus: "Canceled" } : item
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      Swal.fire("Error", "Failed to cancel booking. Please try again.", "error");
    }
  };

  const handleSelectPayment = (event, bookingId) => {
    setType(event.target.name);
    setBookingId(bookingId);
    setShowModalPayment(true);
  };

  // Pending Deposit - sau khi tạo booking - Cancel
  // Deposit Paid - sau khi renter trả tiền - Cancel
  // Confirmed - owner confirm là đã trả deposit
  // In Progress - sau khi renter confirm - pickup
  // Pending Payment - sau khi return car
  // Payment Paid - sau khi renter trả tiền
  // Completed - sau khi owner xác nhận đã nhận đc tiền
  // Canceled

  // View Detail
  // Cancel
  // confirm deposit
  // confirm payment

  const renderActionButtons = (status, bookingId, paymentMethod) => {
    switch (status) {
      // case "Deposit Paid":
      //   return (
      //     <>
      //       <Button
      //         className="btn-detail"
      //         onClick={() => handleConfirmDeposit(bookingId)}
      //       >
      //         Confirm Deposit
      //       </Button>

      //       <Button
      //         onClick={() => handleCancel(bookingId)}
      //         className="btn-danger"
      //       >
      //         Cancel
      //       </Button>
      //       <Button
      //         className="btn-detail"
      //         onClick={() => handleBookingDetail(bookingId)}
      //       >
      //         View details
      //       </Button>
      //     </>
      //   );
      case "Canceled":
        return (
          <Button
            className="btn-detail"
            onClick={() => handleBookingDetail(bookingId)}
          >
            View details
          </Button>
        );
      case "Deposit Paid":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
            <Button
              className="btn-pickup"
              onClick={() => handleConfirmDeposit(bookingId, paymentMethod)}
            >
              Confirm deposit
            </Button>
            <Button
              onClick={() => handleCancel(bookingId)}
              className="btn-danger"
            >
              Cancel
            </Button>
          </>
        );
      case "Pending Payment":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
          </>
        );
      case "Payment Paid":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
            <Button
              className="btn-detail"
              onClick={() => handleConfirmPayment(bookingId)}
            >
              Confirm Payment
            </Button>
          </>
        );
      case "Pending Refund":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
            <Button
              name="Refund"
              onClick={(event) => handleSelectPayment(event, bookingId)}
              className="btn-warning"
            >
              Refund
            </Button>
          </>
        );
      case "Refund Paid":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
          </>
        );
      case "Completed":
        return (
          <Button
            className="btn-detail"
            onClick={() => handleBookingDetail(bookingId)}
          >
            View details
          </Button>
        );
      case "Confirmed":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
          </>
        );
      case "In Progress":
        return (
          <>
            <Button
              className="btn-detail"
              onClick={() => handleBookingDetail(bookingId)}
            >
              View details
            </Button>
          </>
        );
      default:
        return (
          <Button
            className="btn-detail"
            onClick={() => handleBookingDetail(bookingId)}
          >
            View details
          </Button>
        );
    }
  };

  return (
    <Container>
      <SelectPaymentMethodModal
        show={showModalPayment}
        setShow={setShowModalPayment}
        bookingId={bookingId}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        type={type}
      />
      <h1 className="text-center">List of booking requests</h1>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <div className="table-container">
          {data.length === 0 ? (
            <div className="text-center py-5 text-muted">
              Không có yêu cầu thuê xe nào.
            </div>
          ) : (
            data.map((item) => {
              const days = calculateDays(item.startDateTime, item.endDateTime);
              const basePrice = item.car?.basePrice || 0;
              const total = calculateTotal(days, basePrice);
              const deposit = item.car?.deposit || "N/A";
              return (
                <div key={item.id} className="row-item">
                  <div className="image-column">
                    {item.car?.images?.[0] ? (
                      <img
                        src={
                          item.car.images[0].startsWith("http")
                            ? item.car.images[0]
                            : `http://localhost:9999${item.car.images[0]}`
                        }
                        alt={item.car.name || "Car"}
                        className="car-image"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <div className="details-column">
                    <Row>
                      <Col md={6}>
                        <h5 className="car-title">
                          {item.car?.name || "Unknown Car"}
                        </h5>
                        <p className="car-info">
                          <strong>From:</strong>{" "}
                          {new Date(item.startDateTime).toLocaleString()}
                        </p>
                        <p className="car-info">
                          <strong>To:</strong>{" "}
                          {new Date(item.endDateTime).toLocaleString()}
                        </p>
                        <p className="car-info">
                          <strong>Number of days:</strong> {days}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="car-info">
                          <strong>Base price:</strong> {formatCurrency(basePrice)}
                        </p>
                        <p className="car-info">
                          <strong>Total:</strong> {formatCurrency(total)}
                        </p>
                        <p className="car-info">
                          <strong>Deposit:</strong> {formatCurrency(deposit)}
                        </p>
                        <p className="car-info">
                          <strong>Booking No:</strong> {item.id}
                        </p>
                        <p
                          className={`car-info status-${item.bookingStatus.toLowerCase}`}
                        >
                          <strong>Status:</strong>
                          <span className={`status-badge ${item.bookingStatus.replace(/\s/g, '-').toLowerCase()}`}>
                            {item.bookingStatus}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="action-column">
                    {renderActionButtons(
                      item.bookingStatus,
                      item.id,
                      item.paymentMethod
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </Container>
  );
}

export default OwnerViewListBooking;
