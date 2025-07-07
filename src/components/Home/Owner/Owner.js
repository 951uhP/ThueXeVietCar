import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Owner.scss";
import { useNavigate } from "react-router-dom";
const Owner = () => {
  const navigate = useNavigate();
  const adminActions = [
    {
      title: "Manage Cars",
      icon: "🚗",
      text: "View, add, edit, or remove vehicles listed on the platform.",
      route: "/admin/list-cars",
    },
    {
      title: "Booking Management",
      icon: "📅",
      text: "Review and manage all bookings, including approvals and cancellations.",
      route: "/admin/list-booking-requests",
    },
    {
      title: "User Management",
      icon: "👥",
      text: "Oversee user accounts, verify renters, and handle owner profiles.",
      route: "/admin/users",
    },
    {
      title: "Financial Overview",
      icon: "💰",
      text: "Track payments, revenue, and generate financial reports.",
      route: "/admin/wallet",
    },
    // {
    //   title: "System Settings",
    //   icon: "⚙️",
    //   text: "Configure platform settings, insurance policies, and pricing rules.",
    //   route: "/admin/settings",
    // },
    // {
    //   title: "Support Tickets",
    //   icon: "🎧",
    //   text: "View and respond to user inquiries and support requests.",
    //   route: "/admin/support",
    // },
  ];

  return (
    <div className="admin-dashboard">
      <Container className="py-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <h5 className="text-center mb-5">Manage your car rental platform efficiently</h5>
        <Row>
          {adminActions.map((action, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="icon mb-3" style={{ fontSize: "2.5rem" }}>
                    {action.icon}
                  </div>
                  <Card.Title>{action.title}</Card.Title>
                  <Card.Text>{action.text}</Card.Text>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => navigate(action.route)}
                  >
                    Go to {action.title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <div className="text-center mt-4">
          <Button
            variant="warning"
            size="lg"
            onClick={() => navigate("/admin/reports")}
          >
            View System Reports
          </Button>
        </div> */}
      </Container>
    </div>
  );
};

export default Owner;
