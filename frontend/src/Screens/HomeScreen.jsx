import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../Components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../Components/Paginate";
import ProductsCarousel from "../Components/ProductsCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductsCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="products-home">
          <h1 className="page-heading">Latest Products</h1>
          <Row>
            {!data.products.length > 0 && <Message>No Products Found</Message>}
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
