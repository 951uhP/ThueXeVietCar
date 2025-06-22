import React from "react";
import Header from "../components/Header/Header";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TermOfUse() {
  const navigate = useNavigate();
  const termMainStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const termH1Style = {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#004c93",
    fontWeight: "bold",
  };

  const termH2Style = {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#000000",
    marginTop: "40px",
    marginBottom: "20px",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: "2px solid #004c93",
  };

  const termH4Style = {
    fontSize: "20px",
    marginTop: "25px",
    color: "#333",
    fontWeight: "bold",
  };

  const termPStyle = {
    fontSize: "16px",
    lineHeight: "1.7",
    marginTop: "10px",
    color: "#555",
  };
  const handleBack = () => {
    navigate("/auth");
  };

  return (
    <Container style={termMainStyle}>
      <h1 style={termH1Style}>Terms of Use</h1>

      <h4 style={termH4Style}>INTRODUCTION</h4>
      <p style={termPStyle}>
        EAN Services, LLC (“Alamo” or “We”) provides this website (“Site”) for
        your use, subject to these Terms of Use and all applicable laws and
        regulations. Please read these Terms of Use carefully. By accessing
        and/or using the Site, you fully and unconditionally accept and agree to
        be bound by these Terms of Use, including binding arbitration. If you do
        not agree to them, please do not visit or use the Site.
      </p>

      <h4 style={termH4Style}>USE OF THE SITE</h4>
      <p style={termPStyle}>
        Alamo maintains the Site for your informational and non-commercial
        personal use. Your use of the Site for any other purpose is permissible
        only upon the express prior written consent of Alamo.
      </p>

      <h4 style={termH4Style}>SCRAPERS AND BOTS</h4>
      <p style={termPStyle}>
        Use of any robot, spider, site search, retrieval application or other
        manual or automatic device to retrieve, index, scrape, data mine or in
        any way gather or extract discount coupons or other content on or
        available through the Site or reproduce or circumvent the navigational
        structure or presentation on the Site without Alamo's express written
        consent is prohibited.
      </p>

      <h4 style={termH4Style}>PRIVACY POLICY</h4>
      <p style={termPStyle}>
        Alamo takes your privacy seriously. Any information submitted on or
        collected through the Site is subject to our Privacy Policy, the terms
        of which are incorporated into these Terms of Use.
      </p>

      <h4 style={termH4Style}>LINKS TO OTHER SITES</h4>
      <p style={termPStyle}>
        The Site may include links to third-party websites. Alamo does not
        control and is not responsible for the content or privacy policies of
        any linked site, and the inclusion of any link on the Site does not
        imply our endorsement, review or approval of it.
      </p>

      <h4 style={termH4Style}>RESERVATIONS AND TRANSACTIONS</h4>
      <p style={termPStyle}>
        All reservations and transactions made through the Site are subject to
        Alamo's acceptance, which is in our sole discretion.
      </p>

      {/* 10 mục bổ sung */}
      <h4 style={termH4Style}>USER RESPONSIBILITIES</h4>
      <p style={termPStyle}>
        You agree to use the Site responsibly and in compliance with all
        applicable laws, regulations, and these Terms of Use.
      </p>

      <h4 style={termH4Style}>LIMITATION OF LIABILITY</h4>
      <p style={termPStyle}>
        Under no circumstances will Alamo be liable for any damages resulting
        from your use of the Site or the inability to use the Site.
      </p>

      <h4 style={termH4Style}>INDEMNIFICATION</h4>
      <p style={termPStyle}>
        You agree to indemnify, defend, and hold harmless Alamo from and against
        all claims, damages, costs, and expenses arising from your use of the
        Site.
      </p>

      <h4 style={termH4Style}>INTELLECTUAL PROPERTY</h4>
      <p style={termPStyle}>
        All content on the Site, including text, graphics, logos, and images, is
        the property of Alamo and is protected by copyright laws.
      </p>

      <h4 style={termH4Style}>TERMINATION</h4>
      <p style={termPStyle}>
        Alamo reserves the right to terminate or suspend your access to the Site
        at any time, without notice, for conduct that violates these Terms of
        Use.
      </p>

      <h4 style={termH4Style}>DISCLAIMER</h4>
      <p style={termPStyle}>
        The Site is provided "as is" without warranty of any kind, express or
        implied.
      </p>

      <h4 style={termH4Style}>GOVERNING LAW</h4>
      <p style={termPStyle}>
        These Terms of Use are governed by and construed in accordance with the
        laws of the state where Alamo is headquartered.
      </p>

      <h4 style={termH4Style}>MODIFICATIONS</h4>
      <p style={termPStyle}>
        Alamo reserves the right to modify these Terms of Use at any time. Your
        continued use of the Site constitutes acceptance of the modified terms.
      </p>

      <h4 style={termH4Style}>CONTACT INFORMATION</h4>
      <p style={termPStyle}>
        If you have any questions about these Terms of Use, please contact us at
        support@alamo.com.
      </p>
      <Button
        variant="secondary"
        onClick={handleBack} // Gọi hàm handleBack khi nút được nhấn
        style={{
          marginTop: "20px",
          padding: "0.8rem 1.6rem",
          fontWeight: "bold",
          borderRadius: "8px",
          backgroundColor: "#ffc107",
          color: "black",
        }}
      >
        Back to Login
      </Button>
    </Container>
  );
}

export default TermOfUse;
