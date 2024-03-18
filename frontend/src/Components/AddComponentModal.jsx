import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetProductsByCategoryQuery } from "../slices/productApiSlice";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./Loader";
import Message from "./Message";
import AddSpecificPartModal from "./AddSpecificPartModal";
import { TableBody, TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Model Number</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Card>
                        <Card.Img
                          src={product.image}
                          className="product-image-from-builder"
                        />
                      </Card>
                    </TableCell>
                    <TableCell>
                      <p className="product-details-from-builder">
                        {product.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="product-details-from-builder">
                        {product.modelNumber}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="product-details-from-builder">
                        ₹{product.price}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="product-details-from-builder">
                        <AddSpecificPartModal productId={product._id} />
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AddComponentModal;
