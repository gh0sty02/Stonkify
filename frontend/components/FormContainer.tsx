import { FC, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

const FormContainer: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
