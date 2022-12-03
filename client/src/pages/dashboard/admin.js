import Header from "../../components/header";
import AdminAllUser from "../../components/adminAllUser";
import { Card, Col, Container, Row } from "react-bootstrap";

function Admin(props) {
  return (
    <>
      {props.isLoggedIn && (
        <>
          <Header {...props} />
          <Container className="p-4">
            <Row>
              <Col>
                <Card className="mw-25 m-2 bg-light text-dark">
                  <Card.Body>
                    <Card.Title>Sellers</Card.Title>
                    <Card.Subtitle className="text-primary">184</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="mw-25 m-2 bg-light text-dark">
                  <Card.Body>
                    <Card.Title>Orders</Card.Title>
                    <Card.Subtitle className="text-primary">7487</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="mw-25 m-2 bg-light text-dark">
                  <Card.Body>
                    <Card.Title>Products</Card.Title>
                    <Card.Subtitle className="text-primary">894</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="mw-25 m-2 bg-light text-dark">
                  <Card.Body>
                    <Card.Title>Users</Card.Title>
                    <Card.Subtitle className="text-primary">
                      77487
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="py-4">
              <Col>
                <AdminAllUser {...props} />
              </Col>
            </Row>
          </Container>
        </>
      )}
      {!props.isLoggedIn && <div>404</div>}
    </>
  );
}

export default Admin;
