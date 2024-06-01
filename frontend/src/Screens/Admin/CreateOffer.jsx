import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormContainer from "../../Components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { useGetAllCategoriesQuery } from "../../slices/productApiSlice";

function CreateOffer() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const submitHandler = () => {};

  useEffect(() => {
    console.log(allCategories);
  }, [allCategories]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Tabs
        defaultActiveKey="bundle"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="bundle" title="Bundle">
          <>
            <FormContainer>
              <h1>Create Bundle Offer</h1>
              {/* {loadingProductUpdate && <Loader />}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-2">
                    Update Product
                  </Button>
                </Form>
              )} */}
              {categoriesLoading ? (
                <Loader />
              ) : categoriesError ? (
                <Message variant="danger">{categoriesError}</Message>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="offer-category"
                  >
                    Select Category
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {allCategories?.map((category, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                  Update Product
                </Button>
              </Form>
            </FormContainer>
          </>
        </Tab>
        <Tab eventKey="coupon" title="Coupon" disabled>
          <>
            {/* <FormContainer>
              <h1>Create Coupon</h1>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                  Update Product
                </Button>
              </Form>
            </FormContainer> */}
          </>
        </Tab>
      </Tabs>
    </>
  );
}

export default CreateOffer;
