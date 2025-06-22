import React from 'react';
import { Card } from 'react-bootstrap';

const WhyUsCard = ({ title, text, imageUrl }) => {
    return (
        <Card className="mb-4 feature-item">
            <Card.Body>
                <Card.Img variant="top" src={imageUrl} alt={title} />
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default WhyUsCard;
