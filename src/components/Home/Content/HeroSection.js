import React from 'react'
import background from '../../../assets/homepage_d.jpg'
import { Container } from 'react-bootstrap'

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-image-wrapper">
                <img src={background} className="hero-image img-fluid" alt="Hero" />
            </div>
            <div className="hero-content">
                <h1 className="display-5 fw-bold">Carental - Cùng Bạn Đến Mọi Hành Trình</h1>
                <h6 className="text-white">Trải nghiệm sự khác biệt từ hơn <span className='text-warning'>10.000</span> xe gia đình đời mới khắp Việt Nam</h6>
            </div>
        </div>
    )
}

export default HeroSection