import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetProductsByCategoryQuery } from "../slices/productApiSlice";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./Loader";
import Message from "./Message";
import AddSpecificPartModal from "./AddSpecificPartModal";

const AddComponentModal = ({ openModal, closeModal, category }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(category);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
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
            Choose a {category}
          </Typography>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped hover responsive bordered className="table-sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Model Number</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Card>
                        <Card.Img
                          src={product.image}
                          className="product-image-from-builder"
                        />
                      </Card>
                    </td>
                    <td>
                      <p className="product-details-from-builder">
                        {product.name}
                      </p>
                    </td>
                    <td>
                      <p className="product-details-from-builder">
                        {product.modelNumber}
                      </p>
                    </td>
                    <td>
                      <p className="product-details-from-builder">
                        ₹{product.price}
                      </p>
                    </td>
                    <td>
                      <p className="product-details-from-builder">
                        <AddSpecificPartModal productId={product._id} />
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AddComponentModal;
