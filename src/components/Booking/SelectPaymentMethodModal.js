import React from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import "./SelectPaymentMethodModal.scss";
import { toast } from "react-toastify";
import { completeBooking, postConfirmBooking, refundBooking } from "../../service/apiService";

function SelectPaymentMethodModal(props) {
    const { show, setShow, bookingId, paymentMethod, setPaymentMethod, type, handleComplete } = props;

    const handleSubmit = async () => {
        if (type === "Deposit") {
            const confirmResponse = await postConfirmBooking(
                bookingId,
                paymentMethod
            );
            window.location.href = confirmResponse.data.paymentUrl;
            return;
        }
        if (type === "Refund") {
            let response = await refundBooking(bookingId, paymentMethod);
            window.location.href = response.paymentUrl;
            return;
        }
        if (type === "Rental") {
            let response = await completeBooking(bookingId, paymentMethod);
            window.location.href = response.paymentUrl;
            return;
        }
        handleClose();
    };

    const handleInputChange = (e) => {
        setPaymentMethod(e.target.value);
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
            size="md"
            centered
            className="modal-search-location"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i className="bi bi-credit-card-2-front-fill" style={{ color: "#ff9800", marginRight: 8 }}></i>
                    Select your Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-4" controlId="paymentMethod">
                        {/* <Form.Label column sm={4} style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                            Payment Method
                        </Form.Label> */}
                        <Col sm={8}>
                            <div className="d-flex flex-column gap-3">
                                <Form.Check
                                    type="radio"
                                    id="wallet"
                                    name="paymentMethod"
                                    value="wallet"
                                    label={
                                        <>
                                            <span className="pay-icon"><i className="bi bi-wallet2" style={{ color: "#ff9800"}}></i></span>
                                            My wallet
                                        </>
                                    }
                                    checked={paymentMethod === "wallet"}
                                    onChange={handleInputChange}
                                    className="pay-radio"
                                />
                                <Form.Check
                                    type="radio"
                                    id="vnpay"
                                    name="paymentMethod"
                                    value="vnpay"
                                    label={
                                        <>
                                            <span className="pay-icon"><i className="bi bi-bank" style={{ color: "#ff9800"}}></i></span>
                                            Bank transfer <br />
                                            <span style={{ fontStyle: "italic" }}>
                                                Pay by VNPAY
                                            </span>
                                        </>
                                    }
                                    checked={paymentMethod === "vnpay"}
                                    onChange={handleInputChange}
                                    className="pay-radio"
                                />
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-loca" onClick={handleSubmit} variant="warning" style={{ fontWeight: 700, minWidth: 100 }}>
                    <i className="bi bi-cash-coin" style={{ marginRight: 6 }}></i>
                    Pay
                </Button>
                <Button
                    className="btn-date"
                    onClick={handleClose}
                    variant="outline-secondary"
                    style={{ fontWeight: 600, minWidth: 100 }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SelectPaymentMethodModal;
