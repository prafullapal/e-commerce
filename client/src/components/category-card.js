import Card from "react-bootstrap/Card";
import "./assets/stylesheets/categoryCard.css";

function CategoryCard({ category }) {
  return (
    <Card className="category-card">
      <Card.Img variant="top" src={category.img} className="category-image" />
      <Card.Body>
        <Card.Title className="title">
          <a href="#card-title" style={{ textDecoration: "none" }}>
            {category.name}
          </a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;
