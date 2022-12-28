import { useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import Header from "../../components/header";
import AddProduct from "../../components/createProduct";

const baseUrl = "http://localhost:5000";

function Seller(props) {
  const [showProd, setShowProd] = useState(false);
  axios
    .get(`${baseUrl}/products/myCatalog`, { withCredentials: true })
    .then((res) => {
      console.log(res);
    });
  return (
    <>
      {props.isLoggedIn && props.user.role === "seller" ? (
        <>
          <Header {...props} />
          <AddProduct show={showProd} onHide={() => setShowProd(false)} />
          <Container className="p-4">
            <Row>
              <Col>
                <Card className="m-4">
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>
                          <Card.Title>Products</Card.Title>
                        </Col>
                        <Col className="d-flex justify-content-end">
                          <Button size="sm" onClick={() => setShowProd(true)}>
                            New
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Sold units</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>Page Not Found.</div>
      )}
    </>
  );
}

export default Seller;
