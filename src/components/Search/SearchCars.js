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
import "./SearchCars.scss";

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

    const handleRentNow = (carId) => {
        navigate(
            `/booking/${carId}?pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}&location=${encodeURIComponent(location)}`
        );
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

    return (
        <div className="owner-list-car py-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4>Search Results</h4>
                    <p>There're {cars.length} cars that are available for you!</p>
                </div>
                <div className="d-flex gap-2">
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
            <Row>
                {Array.isArray(cars) && cars.map((car) => (
                    <Col md={4} sm={6} xs={12} key={car.id} className="mb-4">
                        <Card className="car-card">
                            <Card.Img
                                variant="top"
                                src={imageUrls[car.id] || "default-placeholder.png"}
                                alt={car.name}
                                className="car-image"
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <Card.Body className="car-body">
                                <div className="car-title">{car.name}</div>
                                <div className="car-location">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    {car.address}
                                </div>
                                <div className="car-price">
                                    {formatCurrency(car.basePrice)}
                                </div>
                                <div className={`car-status ${
                                    car.carStatus === "Available"
                                        ? "available"
                                        : car.carStatus === "Booked"
                                        ? "booked"
                                        : "stopped"
                                }`}>
                                    {car.carStatus}
                                </div>
                                <div>
                                    <Button
                                    className="car-detail-btn"
                                    onClick={() => handleCarDetail(car.id)}
                                >
                                    View details
                                </Button>
                                <Button
                                    className="rent-now-btn mt-2 mx-2"
                                    variant="success"
                                    onClick={() => handleRentNow(car.id)}
                                >
                                    Rent Now
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
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
