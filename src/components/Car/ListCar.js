import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Row,
  Col,
  Carousel,
  Dropdown,
} from "react-bootstrap";
import { FiList } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import { getUserCars, refreshToken } from "../../service/apiService";
import { useNavigate } from "react-router-dom";

const ListCar = () => {
  const [viewMode, setViewMode] = useState("list");

  const cars = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "Nissan Navara El 2017",
    images: [
      "https://vinfast-hcm.vn/wp-content/uploads/2023/06/vinfast-vf3.png",
      "https://giaxevinfast.net/wp-content/uploads/2024/04/VinFast-VF3-11.png",
    ],
    rating: 0,
    rides: 0,
    price: "900K/day",
    location: "Cau Giay, Hanoi",
    carStatus: i % 2 === 0 ? "Available" : "Unavailable",
  }));

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchCar();
  }, []);
  const fetchCar = async () => {
    try {
      const response = await getUserCars(); // Gọi API
      console.log(">>> Full Response:", JSON.stringify(response, null, 2));

      if (response && response.statusCode === 200) {
        setData(response.data.result); // Gán nếu là mảng
      } else {
        console.error("Response data is not an array.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setData([]);
    }
  };
  const handleCarDetail = () => {
    navigate("/car-details");
  };

  // Các style
  const styles = {
    image: {
      width: "150px",
      height: "100px",
      objectFit: "cover",
    },
    carouselImage: {
      height: "200px",
      objectFit: "cover",
    },
    available: {
      color: "green",
      fontWeight: "bold",
    },
    stopped: {
      color: "red",
      fontWeight: "bold",
    },
    booked: {
      color: "blue",
      fontWeight: "bold",
    },
    primaryButton: {
      backgroundColor: "#ffc107",
      color: "black",
      border: "none",
      fontWeight: "bold",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
    },
    secondaryButton: {
      backgroundColor: "white",
      color: "#333",
      border: "1pt solid #333",
      fontWeight: "bold",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
    },
    activeButton: {
      backgroundColor: "#ffc107",
      color: "#333",
      border: "none",
    },
    inactiveButton: {
      backgroundColor: "white",
      color: "#333",
      border: "1pt solid #333",
    },
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center">Car Listing</h3>
        <div className="d-flex gap-2">
          <Button
            style={
              viewMode === "list" ? styles.activeButton : styles.inactiveButton
            }
            onClick={() => setViewMode("list")}
          >
            <FiList /> List View
          </Button>
          <Button
            style={
              viewMode === "carousel"
                ? styles.activeButton
                : styles.inactiveButton
            }
            onClick={() => setViewMode("carousel")}
          >
            <MdGridOn /> Grid View
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Latest to Newest</Dropdown.Item>
              <Dropdown.Item>Price: Highest to Lowest</Dropdown.Item>
              <Dropdown.Item>Price: Lowest to Highest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {viewMode === "list" ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Car Name</th>
              <th>Image</th>
              {/* <th>Ratings</th> */}
              <th>No. of Rides</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((car, index) => (
                <tr key={car.id}>
                  <td>{index + 1}</td>
                  <td>{car.name}</td>
                  <td>
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      style={styles.image}
                    />
                  </td>
                  {/* <td>
                  {"★".repeat(car.rating) + "☆".repeat(5 - car.rating)}{" "}
                  {car.rating === 0 && (
                    <span style={{ color: "#aaa" }}>No ratings yet</span>
                  )}
                </td> */}
                  <td>{car.rides}</td>
                  <td>{car.basePrice}</td>
                  <td>{car.address}</td>
                  <td>
                    <span
                      style={
                        car.carStatus === "Available"
                          ? styles.available
                          : car.carStatus === "Stopped"
                          ? styles.stopped
                          : styles.booked
                      }
                    >
                      "Available"
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        style={styles.primaryButton}
                        disabled={car.carStatus !== "Available"}
                      >
                        Rent now
                      </Button>
                      <Button style={styles.secondaryButton}>
                        View details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Row>
          {data.map((car) => (
            <Col md={12} key={car.id} className="mb-4">
              <Card className="p-3">
                <Row className="align-items-center">
                  {/* Carousel */}
                  <Col md={6} className="d-flex justify-content-center">
                    <Carousel>
                      {car.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={img}
                            alt={`Car ${index + 1}`}
                            style={styles.carouselImage}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Col>

                  {/* Nội dung */}
                  <Col
                    md={6}
                    className="d-flex flex-column justify-content-center"
                  >
                    <h5 className="text-center">{car.name}</h5>
                    {/* <p className="text-center">
                      <strong>Ratings:</strong>{" "}
                      {"★".repeat(car.rating) + "☆".repeat(5 - car.rating)}{" "}
                      <span style={{ color: "#aaa" }}>
                        {car.rating === 0 ? "(No ratings yet)" : ""}
                      </span>
                    </p> */}
                    <p className="text-center">
                      <strong>No. of rides:</strong> {car.rides}
                    </p>
                    <p className="text-center">
                      <strong>Price:</strong> {car.price}
                    </p>
                    <p className="text-center">
                      <strong>Location:</strong> {car.location}
                    </p>
                    <p className="text-center">
                      <strong>Status:</strong>{" "}
                      <span
                        style={
                          car.carStatus === "Available"
                            ? styles.available
                            : car.carStatus === "Stopped"
                            ? styles.stopped
                            : styles.booked
                        }
                      >
                        {car.carStatus}
                      </span>
                    </p>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Button
                        style={styles.primaryButton}
                        disabled={car.carStatus !== "Available"}
                      >
                        Rent now
                      </Button>
                      <Button
                        style={styles.secondaryButton}
                        onClick={handleCarDetail()}
                      >
                        View details
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ListCar;
