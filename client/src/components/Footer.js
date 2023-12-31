import { Col, Container, Row } from "react-bootstrap";
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            <Typography>
              {/* Copyright © Your Website 2023. */}
            </Typography>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
