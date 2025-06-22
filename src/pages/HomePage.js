import React, { useState } from "react";
import { Container } from "react-bootstrap";
import HeroSection from "../components/Home/Content/HeroSection";
import SearchContainer from "../components/Home/Content/SearchContainer";
import ModalPickLocation from "../components/Home/Content/ModalPickLocation";
import ModalPickDate from "../components/Home/Content/ModalPickDate";
import Header from "../components/Header/Header";
import GuestHomePage from "../components/Home/Guest/GuestHomePage";
import GuestPage from "./GuestPage";
import "../pages/HomePage.scss";
import WhyUs from "../components/Home/Content/WhyUs";
import LoadingIcon from "../components/Loading";
const HomePage = () => {
  const [showModalPickLocation, setShowModalPickLocation] = useState(false);
  const [showModalPickDate, setShowModalPickDate] = useState(false);
  const [locationSelected, setLocationSelected] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const handleClickBtnLocation = () => {
    setShowModalPickLocation(true);
  };

  const handleClickBtnDate = () => {
    setShowModalPickDate(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <Container className="homepage-container">
      <HeroSection />
      <SearchContainer
        handleClickBtnLocation={handleClickBtnLocation}
        locationSelected={locationSelected}
        handleClickBtnDate={handleClickBtnDate}
        dateSelected={dateSelected}
      />
      <ModalPickLocation
        show={showModalPickLocation}
        setShow={setShowModalPickLocation}
        locationSelected={locationSelected}
        setLocationSelected={setLocationSelected}
      />
      <ModalPickDate
        show={showModalPickDate}
        setShow={setShowModalPickDate}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
      <WhyUs />
      <GuestPage />
    </Container>
  );
};

export default HomePage;
