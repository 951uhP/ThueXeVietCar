import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../Guest/GuestHomePage.scss";

const TestimonialsSection = () => {
    const testimonials = [
        {
            avatar:
                "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/240468522_828469948032611_8410269615795091902_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeEpHrBiGnh2Z22GjSzC3Czlg8z6mVUW_taDzPqZVRb-1leEYEXhcAmRCBUXwU5R0dnAuKW4lRQy9epTnaRkOVP3&_nc_ohc=4oYG2gXZKYoQ7kNvgEgZdKi&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Amx3YFfOX6kY4TgAB569LaK&oh=00_AYAJhYr2_CMW-qrxDfRCyPShDybDf8KzMAmJufTUDZRTHg&oe=673E2E1C",
            name: "Giang Hoang TwoBars",
            topic: "Amazing service and super convenient!",
            text: "I was amazed by how easy it was to rent a car. The process was straightforward, and the car quality exceeded my expectations. Highly recommend this service to anyone looking for convenience and reliability.",
            time: new Date().toDateString(),
        },
        {
            avatar:
                "https://scontent.xx.fbcdn.net/v/t1.15752-9/462553322_1074683467495738_3448202683790813251_n.png?_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEhfMWDhugIL06UFPnacPznYAq1bWzYp_5gCrVtbNin_mdZYaTBaHaBtnwipkICKFkBO9BT-ALoRpo9ThZ3Ns-z&_nc_ohc=rYG6AmGJFisQ7kNvgEM5-Xu&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QE-Ytdbaqd7HiDdAN0c4BMophqNRtnP8taNSYQG7UVcCA&oe=675FC780",
            name: "Antoni Duc Nhat",
            topic: "Excellent support team!",
            text: "The 24/7 support team was a lifesaver during my trip. They were friendly, professional, and solved my issue within minutes. It's great to know someone always has your back!",
            time: new Date().toDateString(),
        },
        {
            avatar:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg",
            name: "Cat",
            topic: "Mew mew mew mew mew mew mew mew mew",
            text: "Mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mewm ew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew",
            time: new Date().toDateString(),
        },
        {
            avatar:
                "https://scontent.fhan19-1.fna.fbcdn.net/v/t1.15752-9/462642894_1566487597337530_5515626527356497209_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGHYpZ25_7Bjdw5RB7cEMiAUDqqGUls0hdQOqoZSWzSF56cEShy8yX1QpID1K5SoWyGw2sBntoJocbN8Q8nfbns&_nc_ohc=9YnskT8TecEQ7kNvgHiBVR9&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&oh=03_Q7cD1QEXa_MfGEWZkKo3RN0JbzqymUCenCAsJGT3gvu2jkPopA&oe=675FB255",
            name: "Louis Dang",
            topic: "Great value for the price!",
            text: "I saved so much money compared to other services. No hidden fees, and I only paid for what I used. Plus, the insurance coverage gave me peace of mind throughout the rental.",
            time: new Date().toDateString(),
        },
        {
            avatar:
                "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-1/453484089_1385140456222650_1793083831237077224_n.jpg?stp=dst-jpg_s200x200&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGbq6WczbFE3u3hY9ug8B3ey5Xgb6f3yZvLleBvp_fJm_eA1MjVYMtrTAoM5ym7HYE2qCj_HWC1WjdxtYj72ib6&_nc_ohc=mTHe0aqxPsQQ7kNvgFZOftt&_nc_zt=24&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Az5ObYsn3nSJs77f0kF3Ej8&oh=00_AYA7LEjeu_hc6IGauWiLUvVGBlh4dsOI77rtB4DrM_OOnQ&oe=673E1830",
            name: "Do Tien Thuat",
            topic: "A wide range of cars to choose from!",
            text: "I found the perfect car for my needs, and the selection was amazing. Whether you need a compact car for city driving or an SUV for a road trip, they have it all!",
            time: new Date().toDateString(),
        },
        {
            avatar:
                "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-1/428674824_1125339381996685_6243269251680985142_n.jpg?stp=c0.29.1152.1152a_dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeEsqhEBLT4oeWAkds8P70jUNJTfmWL8c-Q0lN-ZYvxz5No5ICVSxMDu_FPwcbhbs3iniCfmu7-NlLhcF_Fd8yO3&_nc_ohc=rV43Ebc8ZccQ7kNvgEjNare&_nc_zt=24&_nc_ht=scontent.fhan19-1.fna&_nc_gid=An_Qq6ZCJG6h3Z9660BXUO5&oh=00_AYCaD6ELsedm3DQjAcZ5zlZTTpjOItUj3uiHGkeZXD2uDA&oe=673E3A43",
            name: "Mr Bốp",
            topic: "Super smooth experience!",
            text: "Everything from booking to returning the car was effortless. The platform is user-friendly, and I had no trouble finding what I was looking for. Will definitely recommend to my friends!",
            time: new Date().toDateString(),
        },
    ];

    // Hàm hiển thị các testimonial cards
    const renderTestimonials = () =>
        testimonials.map((testimonial, index) => (
            <Col md={6} key={index} className="p-3">
                <Card className="p-3">
                    <Card.Body>
                        <Card.Img
                            variant="top"
                            src={testimonial.avatar}
                            alt="avatar"
                            className="rounded-circle mb-3"
                        />
                        <Card.Title>{testimonial.name}</Card.Title>
                        <Card.Text>{testimonial.text}</Card.Text>
                        <Card.Subtitle>Time: {testimonial.time}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Col>
        ));

    return (
        <div className="testimonials-section text-center bg-light">
            <Container>
                <Row>
                    <h3>What people say?</h3>
                    {renderTestimonials()}
                </Row>
            </Container>
        </div>
    );
};
export default TestimonialsSection