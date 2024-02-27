import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
} from "../slices/productApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./Loader";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Ratings from "./Ratings";
import {
  addCabinet,
  addCpu,
  addGpu,
  addCoolingSystem,
  addHdd,
  addHeadphone,
  addKeyboard,
  addMonitor,
  addMotherboard,
  addMouse,
  addMousepad,
  addPsu,
  addRam,
  addSsd,
} from "../slices/pcBuilderSlice";

const AddSpecificPartModal = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customPc } = useSelector((state) => state.customPc);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = (product, qty) => {
    //check product category and dispatch based on the category
    switch (product.category) {
      case "CPU":
        dispatch(addCpu({ ...product, qty }));
        break;
      case "Motherboard":
        dispatch(addMotherboard({ ...product, qty }));
        break;
      case "CPU COOLER":
        dispatch(addCoolingSystem({ ...product, qty }));
        break;
      case "RAM":
        dispatch(addRam({ ...product, qty }));
        break;
      case "SSD":
        dispatch(addSsd({ ...product, qty }));
        break;
      case "HDD":
        dispatch(addHdd({ ...product, qty }));
        break;
      case "GPU":
        dispatch(addGpu({ ...product, qty }));
        break;
      case "PSU":
        dispatch(addPsu({ ...product, qty }));
        break;
      case "Cabinet":
        dispatch(addCabinet({ ...product, qty }));
        break;
      case "Monitor":
        dispatch(addMonitor({ ...product, qty }));
        break;
      case "Keyboard":
        dispatch(addKeyboard({ ...product, qty }));
        break;
      case "Mouse":
        dispatch(addMouse({ ...product, qty }));
        break;
      case "Mousepad":
        dispatch(addMousepad({ ...product, qty }));
        break;
      case "Headphone":
        dispatch(addHeadphone({ ...product, qty }));
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "5px" }}
          >
            Select Product
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>₹{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => {
                                setQty(Number(e.target.value));
                              }}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={() => {
                          handleAddItem(product, qty);
                        }}
                      >
                        Add To Build
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
          {/* </Typography> */}
        </Box>
      </Modal>
    </>
  );
};

export default AddSpecificPartModal;
