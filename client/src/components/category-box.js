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

import category_1 from "./assets/images/category/category_1.webp";
import category_2 from "./assets/images/category/category_2.webp";
import category_3 from "./assets/images/category/category_3.webp";
import category_4 from "./assets/images/category/category_4.webp";
import category_5 from "./assets/images/category/category_5.webp";
import category_6 from "./assets/images/category/category_6.webp";
import category_7 from "./assets/images/category/category_7.webp";
import category_8 from "./assets/images/category/category_8.webp";
import category_9 from "./assets/images/category/category_9.webp";
import category_10 from "./assets/images/category/category_10.webp";
import category_11 from "./assets/images/category/category_11.webp";
import category_12 from "./assets/images/category/category_12.webp";

function CategoryBox() {
  const categories = [
    {
      name: "Category 1",
      img: category_1,
    },
    {
      name: "Category 2",
      img: category_2,
    },
    {
      name: "Category 3",
      img: category_3,
    },
    {
      name: "Category 4",
      img: category_4,
    },
    {
      name: "Category 5",
      img: category_5,
    },
    {
      name: "Category 6",
      img: category_6,
    },
    {
      name: "Category 7",
      img: category_7,
    },
    {
      name: "Category 8",
      img: category_8,
    },
    {
      name: "Category 9",
      img: category_9,
    },
    {
      name: "Category 10",
      img: category_10,
    },
    {
      name: "Category 11",
      img: category_11,
    },
    {
      name: "Category 12",
      img: category_12,
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
