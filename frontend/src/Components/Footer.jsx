import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row style={{ backgroundColor: "#1F1717", color: "#fff", margin: 0 }}>
          <Col
            className="text-center py-3"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p>Tech-Shop &copy; {currentYear}</p>
            <p>
              Designed & Developed by{" "}
              <a
                href="https://www.linkedin.com/in/rakesh-kumar-sahu-716b27192/"
                style={{ textDecoration: "none", color: "#F4BF96" }}
              >
                rksdevs
              </a>{" "}
              {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
