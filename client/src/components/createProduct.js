import axios from "axios";
import { useState } from "react";
import { Form, Row, Col, Button, Modal, Figure } from "react-bootstrap";

const baseUrl = "http://localhost:5000";

function AddProduct(props) {
  const [files, setFiles] = useState([])
  const handleFileChange = (event) => {
    setFiles(() => event.target.files);
  };
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });
  const handleChange = (event) => {
    setProduct((product) => ({
      ...product,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for(let i=0; i<files.length;i++){
      data.append(`file-${i}`,files[0])
    }
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("category", product.category);
    data.append("quantity", product.quantity);
    data.append("price", product.price);
    axios
      .post(`${baseUrl}/products/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
              {[...files].map((file,ind)=>(
                <Figure key={ind}>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={URL.createObjectURL(file)}
                />
              </Figure>
              ))}
          </Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <input type="file" onChange={handleFileChange} multiple/>
            </Form.Group>
            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputCustom">Product Name</label>
              </Form.Floating>
            </Form.Group>

            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputCustom">Description</label>
              </Form.Floating>
            </Form.Group>

            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="category"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputCustom">Category</label>
              </Form.Floating>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="number"
                      name="quantity"
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInputCustom">Quantity</label>
                  </Form.Floating>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="number"
                      name="price"
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInputCustom">Price</label>
                  </Form.Floating>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>Product Form</Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
