import { Container, Row } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Logo from "../src/assets/logo51.png";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div fluid="lg" className="app-container">
      <Helmet>
        <title>VIETCAR</title>
      </Helmet>
      <div className="header-container">
        <Header />
      </div>
      {/* <hr className="hr"></hr> */}
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
      <hr className="hr"></hr>
      <Footer />
    </div>
  );
}

export default App;
