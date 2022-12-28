import Header from "../../components/header";
import AdminAllUser from "../../components/adminAllUser";
import { Card, Col, Container, Row } from "react-bootstrap";
import AdminAllSeller from "../../components/adminAllSeller";

function Admin(props) {
  return (
    <>
      {props.isLoggedIn && props.user.role === "admin" ? (
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
                <h1>Users</h1>
                <AdminAllUser {...props} />
              </Col>
              <Col>
                <h1>Sellers</h1>
                <AdminAllSeller {...props} />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>Page Not Found</div>
      )}
    </>
  );
}

export default Admin;
