import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './component.scss'

import Image1 from '../../../assets/static/image/location/DaLat_v2.jpg';
import Image2 from '../../../assets/static/image/location/DaNang_v2.jpg';
import Image3 from '../../../assets/static/image/location/HaNoi_v2_wd.jpg';
import Image4 from '../../../assets/static/image/location/HaiPhong_v2.jpg';
import Image5 from '../../../assets/static/image/location/HoChiMinh_v2.jpg';
import Image6 from '../../../assets/static/image/location/NhaTrang_v2.jpg';
import Image7 from '../../../assets/static/image/location/PhuQuoc_v2.jpg';
import Image8 from '../../../assets/static/image/location/QuyNhon_v2.jpg';
import LocationCard from './LocationCard';

const cardsData = [
    { title: "Da Lat", text: "100+ cars", imageUrl: Image1 },
    { title: "Da Nang", text: "200+ cars", imageUrl: Image2 },
    { title: "Ha Noi", text: "2200+ cars", imageUrl: Image3 },
    { title: "Hai Phong", text: "200+ cars", imageUrl: Image4 },
    { title: "Ho Chi Minh", text: "4000+ cars", imageUrl: Image5 },
    { title: "Nha Trang", text: "200+ cars", imageUrl: Image6 },
    { title: "Phu Quoc", text: "100+ cars", imageUrl: Image7 },
    { title: "Quy Nhon", text: "150+ cars", imageUrl: Image8 }

];

const LocationSection = () => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        swipeToSlide: true,
        waitForAnimate: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container className="locationSection-container">
            <div className="title">
                <h2>Where to find us?</h2>
            </div>
            <Slider {...sliderSettings} className='mar'>
                {cardsData.map((card, index) => (
                    <div key={index}>
                        <LocationCard title={card.title} text={card.text} imageUrl={card.imageUrl} />
                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default LocationSection