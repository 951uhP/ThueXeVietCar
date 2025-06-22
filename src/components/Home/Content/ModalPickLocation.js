// import axios from "axios";
// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Modal from "react-bootstrap/Modal";
// import Row from "react-bootstrap/Row";
// import { CiLocationOn } from "react-icons/ci";
// import { FaSearch } from "react-icons/fa";

// function ModalPickLocation(props) {
//   const { show, setShow, setLocationSelected } = props;
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async (e) => {
//     const apiKey = "15c2d02fb05241cdb742e994522b1dd2";
//     const endpoint = `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(
//       query
//     )}`;
//     console.log(endpoint);
//     try {
//       let response = await axios.get(endpoint);
//       console.log(response);
//       setResults(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const handleSelect = (description) => {
//     setQuery(description);
//     setLocationSelected(description);
//     setResults([]);
//     handleClose();
//   };

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     setResults([]);
//   };

//   const handleShow = () => setShow(true);

//   const handleClose = () => {
//     setShow(false);
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       aria-labelledby="contained-modal-title-vcenter"
//       backdrop="static"
//       size="lg"
//       centered
//       className="modal-search-location"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Select your location
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row className="mb-3 search-input">
//           <Col xs={10} md={10}>
//             <Form.Control
//               type="text"
//               placeholder="Enter your location"
//               value={query}
//               onChange={handleInputChange}
//             />
//           </Col>
//           <Col xs={2} md={2}>
//             <Button
//               onClick={() => handleSearch()}
//               variant="warning"
//               className="btn-search-location"
//             >
//               <span className="button-text">Search</span>
//               <span className="button-icon">
//                 <FaSearch />
//               </span>
//             </Button>
//           </Col>
//         </Row>
//         <Row className="search-suggest">
//           {results.length > 0 && (
//             <>
//               {results.map((result, index) => (
//                 <div className="location-item">
//                   <div className="wrap-svg">
//                     <CiLocationOn />
//                   </div>
//                   <div
//                     key={index}
//                     onClick={() =>
//                       handleSelect(result.county + ", " + result.region)
//                     }
//                   >
//                     {result.county + ", " + result.region}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={handleClose} variant="outline-secondary">
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ModalPickLocation;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import "./ModalPickLocation.scss";

function ModalPickLocation(props) {
  const { show, setShow, setLocationSelected } = props;
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    setLocationSelected(query);
    handleClose();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size="lg"
      centered
      className="modal-search-location"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select your location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3 search-input">
          <Col xs={12}>
            <Form.Control
              type="text"
              placeholder="Enter your location"
              value={query}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-loca" onClick={handleSubmit} variant="primary">
          Submit
        </Button>
        <Button
          className="btn-date"
          onClick={handleClose}
          variant="outline-secondary"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPickLocation;
