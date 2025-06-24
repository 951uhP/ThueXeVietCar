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
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FiList } from "react-icons/fi";
import { MdGridOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchCars = (props) => {
    const { cars, setCars, pageCount, currentPage, setCurrentPage, fetchCar, pickupDate, dropoffDate, location } = props;
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("table");
    const [sortOption, setSortOption] = useState("");
    const [imageUrls, setImageUrls] = useState({}); // Lưu URL blob của ảnh

    const handlePageClick = (event) => {
        fetchCar(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    const handleCarDetail = (carId) => {
        navigate(`/car-details/${carId}?pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}&location=${encodeURIComponent(location)}`);
    };

    // Format số tiền hiển thị
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    // Sắp xếp xe dựa trên lựa chọn
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

    // Lấy ảnh từ API và lưu vào state
    useEffect(() => {
        const fetchImages = async () => {
            const urls = {};
            for (const car of cars) {
                if (car.images && car.images.length > 0) {
                    const imageApi = car.images[0];
                    try {
                        const response = await fetch(`http://localhost:9999${imageApi}`);
                        if (response.ok) {
                            const blob = await response.blob();
                            urls[car.id] = URL.createObjectURL(blob); // Lưu URL blob
                        }
                    } catch (error) {
                        console.error(`Error fetching image for car ${car.id}:`, error);
                    }
                }
            }
            setImageUrls(urls);
        };

        fetchImages();

        return () => {
            Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [cars]);

    const styles = {
        image: {
            width: "150px",
            height: "100px",
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
            width: "170px",
            backgroundColor: "white",
            color: "black",
            border: "1pt solid #333",
            fontWeight: "bold",
            padding: "0.5rem ",
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
    };

    return (
        <div className="owner-list-car py-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4>Search Results</h4>
                    <p>There're {cars.length} cars that are available for you!</p>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        style={{
                            backgroundColor: viewMode === "table" ? "#ffc107" : "white",
                            color: viewMode === "table" ? "black" : "#333",
                            borderColor: "#333",
                        }}
                        onClick={() => setViewMode("table")}
                    >
                        <FiList /> Table View
                    </Button>
                    <Button
                        style={{
                            backgroundColor: viewMode === "carousel" ? "#ffc107" : "white",
                            color: viewMode === "carousel" ? "black" : "#333",
                            borderColor: "#333",
                        }}
                        onClick={() => setViewMode("carousel")}
                    >
                        <MdGridOn /> Carousel View
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
                </div>
            </div>

            {viewMode === "table" ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Car Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Rent</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cars) &&
                            cars.map((car, index) => (
                                <tr key={car.id}>
                                    <td>{index + 1}</td>
                                    <td>{car.name}</td>
                                    <td>
                                        <img
                                            src={imageUrls[car.id] || "default-placeholder.png"}
                                            alt={car.name}
                                            style={{
                                                width: "80px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td>{formatCurrency(car.basePrice)}</td>
                                    <td>{car.address}</td>
                                    <td>
                                        <span
                                            style={styles.available}
                                        >
                                            Available
                                        </span>
                                    </td>
                                    <td>
                                        <Button variant="warning">Rental</Button>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleCarDetail(car.id)}
                                            style={styles.secondaryButton}
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
                    {Array.isArray(cars) &&
                        cars.map((car) => (
                            <Col md={12} key={car.id} className="mb-4">
                                <Card className="p-3">
                                    <Row className="align-items-center">
                                        <Col md={6} className="d-flex justify-content-center">
                                            <Carousel>
                                                {car.images.map((img, index) => (
                                                    <Carousel.Item key={index}>
                                                        <img
                                                            src={img}
                                                            alt={`Car ${index + 1}`}
                                                            style={{
                                                                height: "200px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        </Col>
                                        <Col md={6} className="d-flex flex-column justify-content-center">
                                            <h5 className="text-center">{car.name}</h5>
                                            <p className="text-center">
                                                <strong>Price:</strong> {car.basePrice}
                                            </p>
                                            <p className="text-center">
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    style={
                                                        car.carStatus === "Available"
                                                            ? styles.available
                                                            : car.carStatus === "Booked"
                                                                ? styles.booked
                                                                : styles.stopped
                                                    }
                                                >
                                                    {car.carStatus}
                                                </span>
                                            </p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                </Row>
            )}
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
                initialPage={pageCount}
            />
        </div>
    );
};

export default SearchCars;
