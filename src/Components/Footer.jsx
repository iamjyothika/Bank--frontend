import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Information about the company.</p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul>
              <li>Email: info@bank.com</li>
              <li>Phone: +123 456 789</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#instagram">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="copyright">&copy; 2024 Bank. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
