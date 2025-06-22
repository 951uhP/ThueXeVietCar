import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import HeroSection from "../Content/HeroSection";
import SearchContainer from "../Content/SearchContainer";
import ModalPickLocation from "../Content/ModalPickLocation";
import ModalPickDate from "../Content/ModalPickDate";
import WhyUs from "../Content/WhyUs";
import LocationSection from "../Content/LocationSection";
import TestimonialsSection from "../Content/TestimonialsSection";
import { useNavigate } from "react-router-dom";
const Renter = () => {

    const [showModalPickLocation, setShowModalPickLocation] = useState(false);
    const [showModalPickDate, setShowModalPickDate] = useState(false);
    const [locationSelected, setLocationSelected] = useState("");
    const [dateSelected, setDateSelected] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const navigate = useNavigate();

    const handleClickBtnLocation = () => {
        setShowModalPickLocation(true);
    }

    const handleClickBtnDate = () => {
        setShowModalPickDate(true);
        console.log(pickupDate + dropoffDate);
    }

    const handleSearch = () => {
        console.log(pickupDate, dropoffDate, locationSelected);
        navigate(
            `/search-car?pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}&location=${encodeURIComponent(locationSelected)}`
        );
    };

    return (
        <div className="homepage-container">
            <HeroSection />
            <SearchContainer
                handleClickBtnLocation={handleClickBtnLocation}
                locationSelected={locationSelected}
                handleClickBtnDate={handleClickBtnDate}
                dateSelected={dateSelected}
                handleSearch={handleSearch}
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
                setPickupDate={setPickupDate}
                setDropoffDate={setDropoffDate}
            />
            <WhyUs />
            <TestimonialsSection />
            <LocationSection />
        </div>
    )
};

export default Renter;
