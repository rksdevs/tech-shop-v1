import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import { Link } from "react-router-dom";
import { Carousel, Image, Card } from "react-bootstrap";
import Ratings from "./Ratings";

const ProductsCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel interval={5000000} className="product-carousel">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`product/${product._id}`}>
            <div className="test-carousel-body">
              <div className="c-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  className="carousel-image"
                />
              </div>
              <div className="c-caption">
                <Carousel.Caption className="carousel-caption">
                  <div className="caption-content">
                    {/* <Card className="caption-content-details">
                      
                    </Card> */}
                    <div className="caption-heading-container">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="caption-content-container">
                      <p>{product.description}</p>
                      <p>
                        {" "}
                        <span className="carousel-price">Current Price:</span> ₹
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <div className="caption-content">
                    {/* <Card className="caption-content-details">
                      
                    </Card> */}

                    <div className="caption-heading-container">
                      <h3 className="feature-heading">What's Inside</h3>
                    </div>
                    <ul className="features">
                      <li className="feature-item">13th Gen</li>
                      <li className="feature-item">12 Thread 6 Cores</li>
                      <li className="feature-item">4.7 GHZ - Unlocked</li>
                      <li className="feature-item">Unleash </li>
                    </ul>
                  </div>
                </Carousel.Caption>
              </div>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
