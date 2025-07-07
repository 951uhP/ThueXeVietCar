import React, { useEffect, useState } from "react";
import OwnerListCar from "../../components/Car/OwnerListCar/OwnerListCar";
import { Button, Container, Spinner } from "react-bootstrap";
import { getUserCarsPaginate } from "../../service/apiService";
import { FaPlusCircle } from "react-icons/fa";
import "./OwnerListCarPage.scss";
import {useNavigate} from "react-router-dom";

const OwnerListCarPage = () => {
  const LIMIT_CAR = 4;
  const [cars, setCars] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar(1);
    // eslint-disable-next-line
  }, []);

  const fetchCar = async (page) => {
    setLoading(true);
    try {
      const response = await getUserCarsPaginate(page, LIMIT_CAR);
      setLoading(false);
      if (response && response.statusCode === 200) {
        setCars(response.data.result);
        setPageCount(response.data.meta.pages);
        setCurrentPage(page);
      } else {
        setCars([]);
      }
    } catch (error) {
      setLoading(false);
      setCars([]);
    }
  };

  const handleAddCar = () => {
    window.location.href = "/add-car";
  };

  return (
    <Container className="owner-list-car-page">
      <div className="owner-list-header d-flex align-items-center justify-content-between mb-4">
        <h3 className="mb-0">List Cars</h3>
        <Button className="add-car-btn" onClick={() => navigate("/add-car")}>
          <FaPlusCircle style={{ marginRight: 8 }} />
          Add New Car
        </Button>
      </div>
      <div className="owner-list-content">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <OwnerListCar
            cars={cars}
            setCars={setCars}
            fetchCar={fetchCar}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </Container>
  );
};

export default OwnerListCarPage;
