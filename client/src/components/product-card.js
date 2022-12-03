import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ product }) {
  return (
    <Card style={{ width: "12rem", padding: "20px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>
          <a href="#card-title" style={{ textDecoration: "none" }}>
            {product.name}
          </a>
        </Card.Title>
        <Card.Text>Rs. {product.price}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
