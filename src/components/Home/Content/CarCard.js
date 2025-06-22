import React from 'react';
import { Card } from 'react-bootstrap';

const CarCard = ({ title, text }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CarCard;
