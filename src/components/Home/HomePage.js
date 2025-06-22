import React, { useEffect, useState } from "react";
import HeroSection from "./Content/HeroSection";
import SearchContainer from "./Content/SearchContainer";
import ModalPickLocation from "./Content/ModalPickLocation";
import "../Home/HomePage.scss";
import ModalPickDate from "./Content/ModalPickDate";
import WhyUs from "./Content/WhyUs";
import { useSelector } from "react-redux";
import Owner from "./Owner/Owner";
import Renter from "./Renter/Renter";
import GuestHomePage from "./Guest/GuestHomePage";
import LoadingIcon from "../Loading";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, account } = useSelector((state) => state.user);
  // const [showModalPickLocation, setShowModalPickLocation] = useState(false);
  // const [showModalPickDate, setShowModalPickDate] = useState(false);
  // const [locationSelected, setLocationSelected] = useState("");
  // const [dateSelected, setDateSelected] = useState("");

  // const handleClickBtnLocation = () => {
  //     setShowModalPickLocation(true);
  // }

  // const handleClickBtnDate = () => {
  //     setShowModalPickDate(true);
  // }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }
  if (!isAuthenticated) {
    return (
      <>
        <GuestHomePage />
      </>
    );
  } else {
    switch (account?.role?.name) {
      case "RENTER":
        return (
          <>
            <Renter />
          </>
        );
      case "OWNER":
        return (
          <>
            <Owner />
          </>
        );
    }
  }

  // return (
  //     <div className="homepage-container">
  //         <HeroSection />
  //         <SearchContainer
  //             handleClickBtnLocation={handleClickBtnLocation}
  //             locationSelected={locationSelected}
  //             handleClickBtnDate={handleClickBtnDate}
  //             dateSelected={dateSelected}
  //         />
  //         <ModalPickLocation
  //             show={showModalPickLocation}
  //             setShow={setShowModalPickLocation}
  //             locationSelected={locationSelected}
  //             setLocationSelected={setLocationSelected}
  //         />
  //         <ModalPickDate
  //             show={showModalPickDate}
  //             setShow={setShowModalPickDate}
  //             dateSelected={dateSelected}
  //             setDateSelected={setDateSelected}
  //         />
  //         <WhyUs />
  //     </div>
  // )
};

export default HomePage;
