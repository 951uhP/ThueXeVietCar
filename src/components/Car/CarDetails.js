import React, { useEffect, useState } from "react";
import { Carousel, Tab, Tabs, Table, Button, Container } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getUserCarsDetail } from "../../service/apiService"; // API service
import LoadingIcon from "../Loading";

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
      console.log(carId);
      setPickupDate(searchParams.get("pickupDate"));
      setDropoffDate(searchParams.get("dropoffDate"));
      setLocation(searchParams.get("location"));

      try {
        const response = await getUserCarsDetail(carId);
        console.log(response.statusCode);
        console.log(response.data);

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
        <div className="d-flex justify-content-between">
          {/* Carousel */}
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
            <h2>{carDetail.name}</h2>
            <p>
              Price: <strong>{carDetail.basePrice}/day</strong>
            </p>
            <p>
              Locations: <strong>{carDetail.address}</strong>
            </p>
            <p>
              Status:{" "}
              <span
                style={{
                  color: "green",
                }}
              >
                Available
              </span>
            </p>
            <Button onClick={handleBooking} variant="warning">
              Rent Now
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultActiveKey="basic" id="car-details-tabs" className="mt-4">
          <Tab eventKey="basic" title="Basic Information">
            <Table striped bordered hover className="mt-3">
              <tbody>
                <tr>
                  <td>License plate:</td>
                  <td>{carDetail.licensePlate}</td>
                  <td>Color:</td>
                  <td>{carDetail.color}</td>
                </tr>
                <tr>
                  <td>Brand name:</td>
                  <td>{carDetail.brand}</td>
                  <td>Model:</td>
                  <td>{carDetail.model}</td>
                </tr>
                <tr>
                  <td>Production year:</td>
                  <td>{carDetail.year}</td>
                  <td>No. of seats:</td>
                  <td>{carDetail.seats}</td>
                </tr>
                <tr>
                  <td>Transmission:</td>
                  <td>{carDetail.transmission}</td>
                  <td>Fuel:</td>
                  <td>{carDetail.fuel}</td>
                </tr>
              </tbody>
            </Table>
            <h4 className="mt-4">Documents:</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {carDetail.documents.map((doc, index) => {
                  const fileName = doc.split("/").pop();

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{fileName}</td>
                      <td>None</td>{" "}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <p className="text-muted">
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
                <strong>Fuel consumption:</strong> {carDetail.fuelConsumption}{" "}
                liter/100 km
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
                <strong>Base price:</strong> {carDetail.basePrice} VND/Day
              </p>
              <p>
                <strong>Required Deposit:</strong> {carDetail.deposit} VND
              </p>
              <p>
                <strong>Term of use:</strong>
              </p>
              {/* {carDetail.terms.map((term, index) => (
                <div key={index}>
                  <input type="checkbox" checked={term.checked} disabled />{" "}
                  {term.text}
                </div>
              ))} */}
            </div>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default CarDetails;
