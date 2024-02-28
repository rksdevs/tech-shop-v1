import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddComponentModal from "../Components/AddComponentModal";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../slices/productApiSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";
import {
  clearAllBuild,
  deleteCurrentPriceFromTotalPrice,
  deleteCurrentSelection,
} from "../slices/pcBuilderSlice";
// import { makeStyles } from "@mui/material";
// import { makeStyles } from "@mui/material";
import styled from "@emotion/styled";

const NewTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    border: 1px solid #000;
    font-weight: bold;
  }
`;

const BuildOwnPc = () => {
  // const classes = useStyles();

  const {
    cpu,
    coolingSystem,
    motherboard,
    ram,
    ssd,
    hdd,
    gpu,
    psu,
    cabinet,
    monitor,
    mouse,
    mousepad,
    headphone,
    keyboard,
    totalBuildPrice,
  } = useSelector((state) => state.customPc);
  const customPcItems = useSelector((state) => state.customPc);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [totalBuildValue, setTotalBuildValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setIsAddProductModalOpen(false);
  };
  const handleOpen = (category) => {
    setCategory(category);
    setIsAddProductModalOpen(true);
    setOpen(true);
  };

  const handleAddAllToCart = () => {
    let customBuildItems = Object.values(customPcItems);
    customBuildItems.pop();
    customBuildItems.forEach((item) => {
      if (Object.keys(item).length > 0) {
        dispatch(addToCart(item));
      }
    });
    dispatch(clearAllBuild());
  };

  useEffect(() => {
    setOpen(false);
    setCategory("");
    setIsAddProductModalOpen(false);
  }, [
    cpu,
    coolingSystem,
    motherboard,
    ram,
    ssd,
    hdd,
    gpu,
    psu,
    cabinet,
    monitor,
    mouse,
    mousepad,
    headphone,
    keyboard,
    totalBuildPrice,
  ]);

  useEffect(() => {
    setTotalBuildValue(totalBuildPrice);
  }, [totalBuildPrice]);

  const handleDeleteSelection = (item) => {
    dispatch(deleteCurrentSelection(item));
  };

  return (
    <>
      <Row>
        <Col md={9}>
          <h1>Build Your PC</h1>
          <TableContainer component={Paper}>
            <Table aria-label="Build your pc">
              <TableHead>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Component
                  </NewTableCell>
                  <NewTableCell className="build-pc-cell-data">
                    Product Name
                  </NewTableCell>
                  <NewTableCell className="build-pc-cell-data">
                    Model
                  </NewTableCell>
                  <NewTableCell className="build-pc-cell-data">
                    Unit Price
                  </NewTableCell>
                  <NewTableCell className="build-pc-cell-data">
                    Quantity
                  </NewTableCell>
                  <NewTableCell className="build-pc-cell-data">
                    Actions
                  </NewTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    CPU
                  </NewTableCell>
                  {cpu.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {cpu?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {cpu?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{cpu?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {cpu?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => handleOpen("CPU")}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("cpu")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Processor</NewTableCell>
                      <NewTableCell
                        className="build-pc-cell-data"
                        data-category="CPU"
                      >
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("CPU");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Cooling System
                  </NewTableCell>
                  {coolingSystem.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {coolingSystem?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {coolingSystem?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{coolingSystem?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {coolingSystem?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("CPU COOLER");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("coolingSystem")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Cooling System
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("CPU COOLER");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Motherboard
                  </NewTableCell>
                  {motherboard.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {motherboard?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {motherboard?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{motherboard?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {motherboard?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Motherboard");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("motherboard")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Motherboard</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Motherboard");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Memory/RAM
                  </NewTableCell>
                  {ram.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {ram?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {ram?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{ram?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {ram?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("RAM");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("ram")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Memory/RAM</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("RAM");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Solid State Drive
                  </NewTableCell>
                  {ssd.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {ssd?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {ssd?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{ssd?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {ssd?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("SSD");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("ssd")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Solid State Drive/SSD
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("SSD");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Hard Disk Drive
                  </NewTableCell>
                  {hdd.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {hdd?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {hdd?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{hdd?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {hdd?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("HDD");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("hdd")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Hard Disk Drive/HDD
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("HDD");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Graphics Card
                  </NewTableCell>
                  {gpu.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {gpu?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {gpu?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{gpu?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {gpu?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("gpu");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("gpu")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Graphics Card
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("GPU");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Power Supply Unit
                  </NewTableCell>
                  {psu.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {psu?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {psu?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{psu?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {psu?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("PSU");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("psu")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Power Supply Unit/PSU/SMPS
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("PSU");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Cabinet
                  </NewTableCell>
                  {cabinet.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {cabinet?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {cabinet?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{cabinet?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {cabinet?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Cabinet");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("cabinet")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Cabinet</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Cabinet");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Monitor
                  </NewTableCell>
                  {monitor.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {monitor?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {monitor?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{monitor?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {monitor?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Monitor");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("monitor")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Monitor</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Monitor");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Mouse
                  </NewTableCell>
                  {mouse.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {mouse?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {mouse?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{mouse?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {mouse?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Mouse");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("mouse")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Mouse</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Mouse");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Keyboard
                  </NewTableCell>
                  {keyboard.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {keyboard?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {keyboard?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{keyboard?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {keyboard?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Keyboard");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("keyboard")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Keyboard</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Keyboard");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Mousepad
                  </NewTableCell>
                  {mousepad.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {mousepad?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {mousepad?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{mousepad?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {mousepad?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Mousepad");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("mousepad")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>Add a Mousepad</NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Mousepad");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <NewTableCell className="build-pc-cell-data">
                    Headphone/Headset
                  </NewTableCell>
                  {headphone.name ? (
                    <>
                      <NewTableCell className="build-pc-cell-data">
                        {headphone?.name}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {headphone?.modelNumber}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        ₹{headphone?.price}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        {headphone?.qty}
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleOpen("Headphone");
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="btn-sm mx-2"
                          onClick={() => handleDeleteSelection("headphone")}
                        >
                          <FaTrash />
                        </Button>
                      </NewTableCell>
                    </>
                  ) : (
                    <>
                      <NewTableCell colSpan={4}>
                        Add a Headphone/Headset
                      </NewTableCell>
                      <NewTableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Headphone");
                          }}
                        >
                          Add +
                        </Button>
                      </NewTableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {isAddProductModalOpen && (
            <AddComponentModal
              openModal={open}
              closeModal={handleClose}
              category={category}
            />
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Details</h2>
                <Row>
                  <Col>Total Price</Col>
                  <Col>₹{totalBuildValue}</Col>
                </Row>
                <Row>
                  <Col>Wattage</Col>
                  <Col>FR (WIP)</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={handleAddAllToCart}
                >
                  Add all cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BuildOwnPc;
