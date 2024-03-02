import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../Components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../Components/Paginate";

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={data.page} pages={data.pages} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
