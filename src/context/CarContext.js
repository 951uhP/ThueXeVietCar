// src/context/CarContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const carRespone = await axios.get("http://localhost:8386/cars");
      setCars(carRespone.data);
    };
    fetchData();
  }, []);
  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
