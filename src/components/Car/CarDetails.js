import React, { useEffect, useState } from "react";
import { Carousel, Tab, Tabs, Table, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getUserCarsDetail } from "../../service/apiService";
import LoadingIcon from "../Loading";
import "./CarDetails.scss";

function CarDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const { carId } = useParams();

  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageURLs, setImageURLs] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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

  const handleBooking = () => {
    navigate(
      `/booking/${carId}?pickupDate=${encodeURIComponent(
        pickupDate
      )}&dropoffDate=${encodeURIComponent(
        dropoffDate
      )}&location=${encodeURIComponent(location)}`
    );
  };

  useEffect(() => {
    const fetchCarDetail = async () => {
      setPickupDate(searchParams.get("pickupDate"));
      setDropoffDate(searchParams.get("dropoffDate"));
      setLocation(searchParams.get("location"));

      try {
        const response = await getUserCarsDetail(carId);
        if (response && response.statusCode === 200) {
          setCarDetail(response.data);
          if (response.data.images?.length) {
            await fetchImages(response.data.images);
          }
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetail();
  }, [carId]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (!carDetail) {
    return <p>No car details found.</p>;
  }

  return (
    <Container>
      <div className="car-details-container">
        <Row>
          <Col lg={7} md={12}>
            <div className="car-carousel mb-4">
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
          </Col>
          <Col lg={5} md={12}>
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
              <div className="car-status-badge">
                <i className="bi bi-check-circle-fill"></i> Available
              </div>
              <Button className="rent-btn" onClick={handleBooking}>
                Rent Now
              </Button>
            </div>
          </Col>
        </Row>

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
                    <span className="doc-name">{fileName}</span>
                    <span className="doc-note">None</span>
                  </div>
                );
              })}
            </div>
            <p className="text-muted mt-2">
              Note: Documents will be available for viewing after you’ve paid
              the deposit to rent.
            </p>
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
                <strong>Description:</strong>
              </p>
              <p>{carDetail.description}</p>
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
        </Tabs>
      </div>
    </Container>
  );
}

export default CarDetails;
