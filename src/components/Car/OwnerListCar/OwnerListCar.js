import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Dropdown,
  Row,
  Col,
  Card,
  Carousel,
  Badge,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FiList } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../Loading";
import { confirmPickup } from "../../../service/apiService";
import "./OwnerListCar.scss";

const OwnerListCar = (props) => {
  const { cars, setCars, pageCount, currentPage, setCurrentPage, fetchCar } =
    props;
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("table");
  const [sortOption, setSortOption] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const handlePageClick = (event) => {
    fetchCar(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  const handleCarDetail = (carId) => {
    navigate(`/owner-car-details/${carId}`);
  };

  const sortCars = (option) => {
    let sortedCars = [...cars];
    switch (option) {
      case "price_high_to_low":
        sortedCars.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "price_low_to_high":
        sortedCars.sort((a, b) => a.basePrice - b.basePrice);
        break;
      default:
        break;
    }
    setCars(sortedCars);
  };

  const handleSort = (option) => {
    setSortOption(option);
    sortCars(option);
  };

  const filterCarsByStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredCars = filterStatus
    ? cars.filter((car) => car.carStatus === filterStatus)
    : cars;

  useEffect(() => {
    const fetchImages = async () => {
      const urls = {};
      for (const car of cars) {
        if (car.images && car.images.length > 0) {
          urls[car.id] = [];
          for (const imageApi of car.images) {
            try {
              const response = await fetch(`http://localhost:9999${imageApi}`);
              if (response.ok) {
                const blob = await response.blob();
                urls[car.id].push(URL.createObjectURL(blob));
              }
            } catch (error) {
              console.error(`Error fetching image for car ${car.id}:`, error);
            }
          }
        }
      }
      setImageUrls(urls);
    };

    fetchImages();

    return () => {
      Object.values(imageUrls).flat().forEach((url) => URL.revokeObjectURL(url));
    };
  }, [cars]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Available":
        return (
          <Badge bg="success" className="px-3 py-2" style={{ fontSize: "1rem" }}>
            Available
          </Badge>
        );
      case "Booked":
        return (
          <Badge bg="warning" text="dark" className="px-3 py-2" style={{ fontSize: "1rem" }}>
            Booked
          </Badge>
        );
      case "Stopped":
        return (
          <Badge bg="danger" className="px-3 py-2" style={{ fontSize: "1rem" }}>
            Stopped
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary" className="px-3 py-2" style={{ fontSize: "1rem" }}>
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <Container className="owner-list-car py-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div className="ms-md-auto d-flex gap-2 align-items-center flex-wrap justify-content-md-end w-100">
          <Button
            className={viewMode === "table" ? "primary-button" : "secondary-button"}
            onClick={() => setViewMode("table")}
          >
            <FiList /> Table View
          </Button>
          <Button
            className={viewMode === "carousel" ? "primary-button" : "secondary-button"}
            onClick={() => setViewMode("carousel")}
          >
            <MdGridOn /> Card View
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("price_high_to_low")}>
                Price: Highest to Lowest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("price_low_to_high")}>
                Price: Lowest to Highest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              Filter by Status
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterCarsByStatus("")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterCarsByStatus("Available")}>
                Available
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterCarsByStatus("Booked")}>
                Booked
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterCarsByStatus("Stopped")}>
                Stopped
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {viewMode === "table" ? (
        <Table striped bordered hover responsive className="rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Car Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>View details</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredCars) &&
              filteredCars.map((car, index) => (
                <tr key={car.id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{car.name}</td>
                  <td>
                    <img
                      src={
                        imageUrls[car.id] && imageUrls[car.id].length > 0
                          ? imageUrls[car.id][0]
                          : "default-placeholder.png"
                      }
                      alt={car.name}
                      className="car-image rounded"
                    />
                  </td>
                  <td className="text-primary fw-bold">{formatCurrency(car.basePrice)}</td>
                  <td>{car.address}</td>
                  <td>{getStatusBadge(car.carStatus)}</td>
                  <td>
                    <Button
                      onClick={() => handleCarDetail(car.id)}
                      className="secondary-button"
                    >
                      View details
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <Row>
          {Array.isArray(filteredCars) &&
            filteredCars.map((car) => (
              <Col md={6} lg={4} key={car.id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Carousel interval={null} indicators={false}>
                    {(imageUrls[car.id] && imageUrls[car.id].length > 0
                      ? imageUrls[car.id]
                      : ["default-placeholder.png"]
                    ).map((imgUrl, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={imgUrl}
                          alt={`Car ${index + 1}`}
                          className="carousel-image rounded-top"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-2">{car.name}</h5>
                      <div className="mb-2 text-primary fw-bold">
                        {formatCurrency(car.basePrice)}
                      </div>
                      <div className="mb-2">{car.address}</div>
                      <div className="mb-2">{getStatusBadge(car.carStatus)}</div>
                    </div>
                    <Button
                      onClick={() => handleCarDetail(car.id)}
                      className="secondary-button mt-2"
                    >
                      View details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
      <ReactPaginate
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </Container>
  );
};

export default OwnerListCar;
