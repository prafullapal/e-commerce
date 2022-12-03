import FeaturedProductBox from "../components/featured-product-box";
import ProductCarousel from "../components/product-carousel";
import CategoryBox from "../components/category-box";
import Header from "../components/header";
function Home(props) {
  return (
    <>
      <Header {...props} />
      <ProductCarousel />
      <CategoryBox />
      <FeaturedProductBox />
    </>
  );
}

export default Home;
