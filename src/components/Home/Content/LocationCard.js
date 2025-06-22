import React from 'react';
import { Card } from 'react-bootstrap';

const LocationCard = ({ title, text, imageUrl }) => {
    return (
        <Card className="custom-card swiper-slide">
            <Card.Img
                variant="top"
                src={imageUrl}
                alt={title}
                className="card-image"
            />
            <Card.ImgOverlay className='card-content'>
                <p>
                    {title}
                    <span>{text}</span>
                </p>
            </Card.ImgOverlay>
        </Card>
    );
};

export default LocationCard;
