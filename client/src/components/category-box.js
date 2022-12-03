import CategoryCard from "./category-card";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CategoryBox() {
  const categories = [
    {
      name: "Category 1",
      img: "",
    },
    {
      name: "Category 2",
      img: "",
    },
    {
      name: "Category 3",
      img: "",
    },
    {
      name: "Category 4",
      img: "",
    },
    {
      name: "Category 5",
      img: "",
    },
    {
      name: "Category 6",
      img: "",
    },
    {
      name: "Category 7",
      img: "",
    },
    {
      name: "Category 8",
      img: "",
    },
    {
      name: "Category 9",
      img: "",
    },
    {
      name: "Category 10",
      img: "",
    },
    {
      name: "Category 11",
      img: "",
    },
    {
      name: "Category 12",
      img: "",
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
              spaceBetween={50}
              slidesPerView={5}
              navigation
              onSwiper={(swiper) =>
                swiper.__swiper__
                  ? console.log("Swiper Loaded Successfully!")
                  : console.log(swiper)
              }
              onSlideChange={() => console.log("slide change")}
            >
              {categories.map((cat, i) => (
                <SwiperSlide key={i}>
                  <CategoryCard category={cat} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CategoryBox;
