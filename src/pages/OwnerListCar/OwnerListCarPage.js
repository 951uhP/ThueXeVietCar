import React, { Component, useEffect, useState } from "react";
import OwnerListCar from "../../components/Car/OwnerListCar/OwnerListCar";
import { Button, Container } from "react-bootstrap";
import { getUserCarsPaginate } from "../../service/apiService";
const OwnerListCarPage = () => {

  const LIMIT_CAR = 4;
  const [cars, setCars] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCar(1);
  }, []);


  const fetchCar = async (page) => {
    try {
      const response = await getUserCarsPaginate(page, LIMIT_CAR); // Gọi API
      console.log(">>> Full Response:", JSON.stringify(response, null, 2));
      setLoading(false);
      if (response && response.statusCode === 200) {
        setCars(response.data.result);
        setPageCount(response.data.meta.pages);
        console.log(pageCount);
      } else {
        console.error("Response data is not an array.");
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    }
  };


  return (
    <Container>
      <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>Your List Car</h3>

      <OwnerListCar
        cars={cars}
        setCars={setCars}
        fetchCar={fetchCar}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default OwnerListCarPage;
