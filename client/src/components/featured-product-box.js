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

import product_1 from "./assets/images/products/product_1.webp";
import product_2 from "./assets/images/products/product_2.webp";
import product_3 from "./assets/images/products/product_3.webp";
import product_4 from "./assets/images/products/product_4.webp";
import product_5 from "./assets/images/products/product_5.webp";
import product_6 from "./assets/images/products/product_6.webp";
import product_7 from "./assets/images/products/product_7.webp";
import product_8 from "./assets/images/products/product_8.webp";
import product_9 from "./assets/images/products/product_9.webp";
import product_10 from "./assets/images/products/product_10.webp";
import product_11 from "./assets/images/products/product_11.webp";
import product_12 from "./assets/images/products/product_12.webp";

function FeaturedProductBox() {
  const products = [
    {
      name: "Product 1",
      img: product_1,
      price: "700",
    },
    {
      name: "Product 2",
      img: product_2,
      price: "700",
    },
    {
      name: "Product 3",
      img: product_3,
      price: "700",
    },
    {
      name: "Product 4",
      img: product_4,
      price: "700",
    },
    {
      name: "Product 5",
      img: product_5,
      price: "700",
    },
    {
      name: "Product 6",
      img: product_6,
      price: "700",
    },
    {
      name: "Product 7",
      img: product_7,
      price: "700",
    },
    {
      name: "Product 8",
      img: product_8,
      price: "700",
    },
    {
      name: "Product 9",
      img: product_9,
      price: "700",
    },
    {
      name: "Product 10",
      img: product_10,
      price: "700",
    },
    {
      name: "Product 11",
      img: product_11,
      price: "700",
    },
    {
      name: "Product 12",
      img: product_12,
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
