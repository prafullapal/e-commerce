import ProductCard from "./product-card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Card } from "react-bootstrap";

function FeaturedProductBox() {
  const products = [
    {
      name: "Product 1",
      img: "",
      price: "700",
    },
    {
      name: "Product 2",
      img: "",
      price: "700",
    },
    {
      name: "Product 3",
      img: "",
      price: "700",
    },
    {
      name: "Product 4",
      img: "",
      price: "700",
    },
    {
      name: "Product 5",
      img: "",
      price: "700",
    },
    {
      name: "Product 6",
      img: "",
      price: "700",
    },
    {
      name: "Product 7",
      img: "",
      price: "700",
    },
    {
      name: "Product 8",
      img: "",
      price: "700",
    },
    {
      name: "Product 9",
      img: "",
      price: "700",
    },
    {
      name: "Product 10",
      img: "",
      price: "700",
    },
    {
      name: "Product 11",
      img: "",
      price: "700",
    },
    {
      name: "Product 12",
      img: "",
      price: "700",
    },
  ];
  return (
    <>
      <Container style={{ padding: "20px" }}>
        <Card>
          <Card.Body>
            <Swiper
              // install Swiper modules
              modules={[Navigation, A11y]}
              breakpoints={{
                // when window width is >= 640px
                260: {
                  width: 260,
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                500: {
                  width: 500,
                  slidesPerView: 2,
                },
              }}
              navigation
              onSwiper={(swiper) =>
                swiper.__swiper__
                  ? console.log("Swiper Loaded Successfully!")
                  : console.log(swiper)
              }
              onSlideChange={() => console.log("slide change")}
            >
              <Row lg={4} md={3} sm={2} xl={5} xs={1} xxl={6}>
                {products.map((prod, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard product={prod} />
                  </SwiperSlide>
                ))}
              </Row>
            </Swiper>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default FeaturedProductBox;
