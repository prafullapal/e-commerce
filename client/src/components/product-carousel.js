import Carousel from "react-bootstrap/Carousel";

function ProductCarousel() {
  const docs = [
    {
      label: "First Slide",
      content: "First Slide Description",
      img: "https://rukminim1.flixcart.com/fk-p-flap/50/50/image/2108ab9927af795b.jpg?q=50",
      link: "",
    },
    {
      label: "Second Slide",
      content: "Second Slide Description",
      img: "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/3f256eb02be16383.jpg?q=50",
      link: "",
    },
    {
      label: "Third Slide",
      content: "Third Slide Description",
      img: "https://rukminim1.flixcart.com/fk-p-flap/50/50/image/7c5bf3fdef7df5dd.jpg?q=50",
      link: "",
    },
  ];
  return (
    <Carousel>
      {docs.map((doc, i) => (
        <Carousel.Item key={i}>
          <img className="d-block w-100" src={doc.img} alt={doc.label} />
          <Carousel.Caption>
            <h3>{doc.label}</h3>
            <p>{doc.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
