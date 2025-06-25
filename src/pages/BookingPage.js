import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"; // Import useNavigate để điều hướng
import { Button, Container, ProgressBar } from "react-bootstrap";
import "../pages/BookingPage.scss";
import BookingDetail from "../components/Booking/BookingDetail";
import Payment from "../components/Booking/Payment";
import Finish from "../components/Booking/Finish";
import BookingInfo from "../components/Booking/BookingInfo";
import {
  getTransaction,
  getUserCarsDetail,
  getUsersDetail,
  postANewBooking,
  postConfirmBooking,
  postConfirmBooking2,
} from "../service/apiService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { carId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [searchParams] = useSearchParams();
  const [bookingId, setBookingId] = useState("");
  const [wallet, setWallet] = useState("");
  const { account } = useSelector((state) => state.user);
  const userId = account?.id || localStorage.getItem("userId");
  const [nODay, setNODay] = useState("");
  const [bookingResponse, setBookingResponse] = useState("");

  const [carDetail, setCarDetail] = useState("");

  const [requestBody, setRequestBody] = useState({
    startDateTime: "2024-11-28T10:00:00Z",
    endDateTime: "2024-11-29T14:00:00Z",
    driversInformation: "John Doe, License No: ABC12345",
    paymentMethod: "VNPAY",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [requestRenter, setRequestRenter] = useState({
    fullName: "",
    phoneNumber:"",
    dateOfBirth: "",
    drivingLicense: "",
    address: "",
    nationalId: "",
    email: "",
  });

  const [requestDriver, setRequestDriver] = useState({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    drivingLicense: "",
    address: "",
    nationalId: "",
    email: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("Successfully!");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCancel = () => {
    navigate("/carDetails");
  };

  const handleSetRequestBody = () => {
    if (pickupDate && dropoffDate) {
      setRequestBody((prev) => ({
        ...prev,
        startDateTime: `${pickupDate}T00:00:00Z`,
        endDateTime: `${dropoffDate}T00:00:00Z`,
      }));
      console.log(requestBody);
    }
  };

  const handleSearch = () => {
    navigate(
      `/search-car?pickupDate=${encodeURIComponent(
        pickupDate
      )}&dropoffDate=${encodeURIComponent(
        dropoffDate
      )}&location=${encodeURIComponent(location)}`
    );
  };

  const updatePaymentStatus = async (bookingId, bookingStatus) => {
    try {
      const response = await postConfirmBooking2(bookingId, bookingStatus)

      if (response.data.bookingStatus === "Confirmed" || response.data.bookingStatus === "Deposit Paid") {
        toast.success("Payment status updated successfully!");
      } else {
        toast.error("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("An error occurred while updating payment status.");
    }
  };

  const handleSubmitBooking = async () => {
    try {
      const response = await postANewBooking(
        carId,
        requestBody,
        requestRenter,
        requestDriver
      );
      console.log("Booking successful:", response.data);

      const bookingId = response.data.id;
      setBookingId(bookingId);
      const confirmResponse = await postConfirmBooking(
        response.data.id,
        requestBody.paymentMethod
      );
      console.log("Payment confirmation response:", confirmResponse);

      if (confirmResponse.data.paymentUrl !== "") {
        window.location.href = confirmResponse.data.paymentUrl;
        return;
      }

      handleNext();
      return response.data;
    } catch (error) {
      console.error("Error in booking process:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Có lỗi xảy ra khi xử lý yêu cầu."
        );
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server.");
        console.error("Error request details:", error.request);
      } else {
        toast.error("Lỗi không mong muốn: " + error.message);
        console.error("Error details:", error.message);
      }
    }
  };

  const calculateDays = (pickupDate, dropoffDate) => {
    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      const difference = Math.abs(end - start); // Chênh lệch thời gian (ms)
      return Math.ceil(difference / (1000 * 60 * 60 * 24)); // Chuyển sang ngày
    }
    return 0;
  };

  const [imageURLs, setImageURLs] = useState([]);

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

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await getUsersDetail(userId);

        if (response?.statusCode === 200 && response.data) {
          setWallet(response.data?.wallet);
          // Gán thông tin user vào requestRenter
          setRequestRenter({
            fullName: response.data.name || "",
            phoneNumber: response.data.phoneNo || "",
            dateOfBirth: response.data.dateOfBirth || "",
            drivingLicense: response.data.drivingLicense || "",
            address: response.data.address || "",
            nationalId: response.data.nationalIdNo || "",
            email: response.data.email || "",
          });
        } else {
          console.error("Failed to fetch user detail.");
        }
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    setPickupDate(searchParams.get("pickupDate"));
    setDropoffDate(searchParams.get("dropoffDate"));
    setLocation(searchParams.get("location"));

    const days = calculateDays(pickupDate, dropoffDate);
    setNODay(days);

    handleSetRequestBody();

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
  }, [carId, pickupDate, dropoffDate]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BookingDetail
            carDetail={carDetail}
            requestBody={requestBody}
            setRequestBody={setRequestBody}
            imageURLs={imageURLs}
            requestRenter={requestRenter}
            requestDriver={requestDriver}
            setRequestDriver={setRequestDriver}
            setRequestRenter={setRequestRenter}
          />
        );
      case 2:
        return (
          <Payment
            carDetail={carDetail}
            requestBody={requestBody}
            setRequestBody={setRequestBody}
            wallet={wallet}
            nODay={nODay}
          />
        );
      case 3:
        return (
          <Finish
            carDetail={carDetail}
            bookingResponse={bookingResponse}
            pickupDate={pickupDate}
            dropoffDate={dropoffDate}
            location={location}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <BookingInfo
        pickupDate={pickupDate}
        dropoffDate={dropoffDate}
        location={location}
        requestBody={requestBody}
        handleSearch={handleSearch}
      />
      <div className="booking-page">
        {/* Process Bar */}
        <ProgressBar className="progress position-relative mb-4">
          <div className="progress-bar-label">{`Step ${step} of 3`}</div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(step / 3) * 100}%` }}
            aria-valuenow={(step / 3) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </ProgressBar>

        <div className="step-content">{renderStep()}</div>

        <div className="d-flex justify-content-between mt-4">
          {step === 1 && (
            <Button
              style={{
                backgroundColor: "#f1ac00",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}

          {step !== 1 && step !== 3 && (
            <Button
              style={{
                backgroundColor: "#f1ac00",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={handleBack}
            >
              &larr; Back
            </Button>
          )}

          {step === 2 ? (
            <Button
              style={{
                backgroundColor: "#f1ac00",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={handleSubmitBooking}
            >
              Confirm
            </Button>
          ) : step !== 3 ? (
            <Button
              style={{
                backgroundColor: "#f1ac00",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={handleNext}
            >
              Next →
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default BookingPage;
