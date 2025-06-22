import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import HeroSection from "../components/Home/Content/HeroSection";
import SearchContainer from "../components/Home/Content/SearchContainer";
import ModalPickLocation from "../components/Home/Content/ModalPickLocation";
import ModalPickDate from "../components/Home/Content/ModalPickDate";
function SearchCar() {
  return (
    <Container>
      <SearchContainer />
      <ModalPickLocation />
      <ModalPickDate />
      <row>
        <h1>Search result</h1>
        <div className="col-md-4">Column 1</div>
        <div className="col-md-4">Column 2</div>
        <div className="col-md-4">Column 3</div>
      </row>
    </Container>
  );
}

export default SearchCar;
