import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';


const ModalPickDate = (props) => {

    const { show, setShow, setDateSelected, setDropoffDate, setPickupDate } = props;

    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleStartDateChange = date => setStartDate(date);
    const handleStartTimeChange = time => setStartTime(time);
    const handleEndDateChange = date => setEndDate(date);
    const handleEndTimeChange = time => setEndTime(time);

    const generateTimeSlots = (date) => {
        const slots = [];
        const startHour = date.getDate() === new Date().getDate() ? new Date().getHours() : 0;
        for (let hour = startHour; hour < 24; hour++) {
            for (let minutes of [0, 30]) {
                slots.push(new Date(date.setHours(hour, minutes, 0, 0)));
            }
        }
        return slots;
    };

    const startTimeSlots = generateTimeSlots(startDate);
    const endTimeSlots = generateTimeSlots(endDate).filter(time => time > new Date(startTime.getTime() + 2 * 60 * 60 * 1000));

    const calculateRentalDuration = () => {
        const start = new Date(startDate);
        start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
        const end = new Date(endDate);
        end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
        const diffInMs = end - start; const diffInHours = diffInMs / (1000 * 60 * 60);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInHours >= 24) {
            return `${Math.ceil(diffInDays)} days`;
        } else {
            return `1 day`;
        }
    };
    const time = `${calculateRentalDuration()}`;
    const result = (startTime.getHours().toLocaleString().length === 1 ? "0" + startTime.getHours().toLocaleString() : startTime.getHours().toLocaleString()) + ":" + (startTime.getMinutes().toLocaleString() === "0" ? "00" : startTime.getMinutes().toLocaleString()) + ", "
        + startDate.getDate().toLocaleString() + "/" + startDate.getMonth().toLocaleString() + " - "
        + (endTime.getHours().toLocaleString().length === 1 ? "0" + endTime.getHours().toLocaleString() : endTime.getHours().toLocaleString()) + ":" + (endTime.getMinutes().toLocaleString() === "0" ? "00" : endTime.getMinutes().toLocaleString()) + ", "
        + endDate.getDate().toLocaleString() + "/" + endDate.getMonth().toLocaleString();

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    }

    const handleConfirm = () => {
        setDateSelected((startTime.getHours().toLocaleString().length === 1 ? "0" + startTime.getHours().toLocaleString() : startTime.getHours().toLocaleString()) + ":"
            + (startTime.getMinutes().toLocaleString() === "0" ? "00" : startTime.getMinutes().toLocaleString()) + ", "
            + startDate.getDate().toLocaleString() + "/" + ((startDate.getMonth() + 1) < 10 ? `0${startDate.getMonth() + 1}` : (startDate.getMonth() + 1)) + "/" + startDate.getFullYear().toString() + " - "
            + (endTime.getHours().toLocaleString().length === 1 ? "0" + endTime.getHours().toLocaleString() : endTime.getHours().toLocaleString()) + ":"
            + (endTime.getMinutes().toLocaleString() === "0" ? "00" : endTime.getMinutes().toLocaleString()) + ", "
            + endDate.getDate().toLocaleString() + "/" + ((endDate.getMonth() + 1) < 10 ? `0${endDate.getMonth() + 1}` : (endDate.getMonth() + 1)) + "/" + endDate.getFullYear().toString());
        setPickupDate(startDate.getFullYear().toString() + "-" + ((startDate.getMonth() + 1) < 10 ? `0${startDate.getMonth() + 1}` : (startDate.getMonth() + 1))
            + "-" + ((startDate.getDate()) < 10 ? `0${startDate.getDate()}` : (startDate.getDate())));
        setDropoffDate(endDate.getFullYear().toString() + "-" + ((endDate.getMonth() + 1) < 10 ? `0${endDate.getMonth() + 1}` : (endDate.getMonth() + 1))
            + "-" + ((endDate.getDate()) < 10 ? `0${endDate.getDate()}` : (endDate.getDate())));
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            size='lg'
            centered
            className='modal-pick-date'
        >
            <Modal.Header closeButton>
                <Modal.Title>Pick Date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='mb-3 time-choose'>
                        <Form.Group as={Col} controlId="formStartDate" className='time-choose-item'>
                            <Form.Label>Start Date</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />

                        </Form.Group>
                        <Form.Group as={Col} controlId="formStartTime" className='time-choose-item'>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                as="select"
                                value={startTime}
                                onChange={e => handleStartTimeChange(new Date(e.target.value))}
                            >
                                {startTimeSlots.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className='mb-3 time-choose'>
                        <Form.Group as={Col} controlId="formEndDate" className='time-choose-item'>
                            <Form.Label>End Date</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                minDate={startDate}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formEndTime" className='time-choose-item'>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                as="select"
                                value={endTime}
                                onChange={e => handleEndTimeChange(new Date(e.target.value))}
                            >
                                {endTimeSlots.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="info-time">
                    <p className='time'>
                        {
                            result
                        }
                    </p>
                    <p className='df-align-center total'>
                        Rental time:
                        <span className='text-warning'>{time}</span>
                    </p>
                </div>
                <div className="wrap-btn">
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPickDate;
