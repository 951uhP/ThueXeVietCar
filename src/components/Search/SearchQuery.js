import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const SearchQuery = (props) => {
    const { pickupDate, dropoffDate, location, setPickupDate, setDropoffDate, setLocation, handleSearch } = props;

    const handlePickupDateChange = (date) => {
        if (date) setPickupDate(formatDate(date));
    };

    const handleDropoffDateChange = (date) => {
        if (date) setDropoffDate(formatDate(date));
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleSetLocation = (e) => {
        setLocation(e.target.value);
    }

    return (
        <>
            <Form className="mb-4 search-section">
                <Row className="align-items-center">
                    <Col md={4}>
                        <Form.Group controlId="pickupLocation">
                            <Form.Label>Pick-Up Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={handleSetLocation}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="pickupDateTime" className='datepicker'>
                            <Form.Label>Pick-Up Date and Time</Form.Label>
                            <DatePicker
                                selected={pickupDate}
                                onChange={handlePickupDateChange}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="dropoffDateTime" className='datepicker'>
                            <Form.Label>Drop-Off Date and Time</Form.Label>
                            <DatePicker
                                selected={dropoffDate}
                                onChange={handleDropoffDateChange}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            className="mt-4 w-100"
                            variant="warning"
                            onClick={handleSearch}
                        >Search</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default SearchQuery