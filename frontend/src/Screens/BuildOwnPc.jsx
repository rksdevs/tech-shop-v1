import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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

const BuildOwnPc = () => {
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
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [totalBuildValue, setTotalBuildValue] = useState(0);

  // const { data: products, isLoading, error } = useGetProductsByCategoryQuery();

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

  return (
    <>
      <Row>
        <Col md={9}>
          <h1>Build Your PC</h1>
          <TableContainer component={Paper}>
            <Table aria-label="Build your pc">
              <TableHead>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Component
                  </TableCell>
                  <TableCell className="build-pc-cell-data">
                    Product Name
                  </TableCell>
                  <TableCell className="build-pc-cell-data">Model</TableCell>
                  <TableCell className="build-pc-cell-data">
                    Unit Price
                  </TableCell>
                  <TableCell className="build-pc-cell-data">Quantity</TableCell>
                  <TableCell className="build-pc-cell-data">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="build-pc-cell-data">CPU</TableCell>
                  {cpu.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {cpu?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {cpu?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{cpu?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {cpu?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Processor</TableCell>
                      <TableCell
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
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Cooling System
                  </TableCell>
                  {coolingSystem.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {coolingSystem?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {coolingSystem?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{coolingSystem?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {coolingSystem?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Cooling System</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("CPU COOLER");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Motherboard
                  </TableCell>
                  {motherboard.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {motherboard?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {motherboard?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{motherboard?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {motherboard?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Motherboard</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Motherboard");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Memory/RAM
                  </TableCell>
                  {ram.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {ram?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {ram?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{ram?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {ram?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Memory/RAM</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("RAM");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Solid State Drive
                  </TableCell>
                  {ssd.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {ssd?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {ssd?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{ssd?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {ssd?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>
                        Add a Solid State Drive/SSD
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("SSD");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Hard Disk Drive
                  </TableCell>
                  {hdd.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {hdd?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {hdd?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{hdd?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {hdd?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>
                        Add a Hard Disk Drive/HDD
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("HDD");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Graphics Card
                  </TableCell>
                  {gpu.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {gpu?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {gpu?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{gpu?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {gpu?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Graphics Card</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("GPU");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Power Supply Unit
                  </TableCell>
                  {psu.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {psu?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {psu?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{psu?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {psu?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>
                        Add a Power Supply Unit/PSU/SMPS
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("PSU");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">Cabinet</TableCell>
                  {cabinet.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {cabinet?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {cabinet?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{cabinet?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {cabinet?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Cabinet</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Cabinet");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">Monitor</TableCell>
                  {monitor.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {monitor?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {monitor?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{monitor?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {monitor?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Monitor</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Monitor");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">Mouse</TableCell>
                  {mouse.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {mouse?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {mouse?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{mouse?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {mouse?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Mouse</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Mouse");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">Keyboard</TableCell>
                  {keyboard.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {keyboard?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {keyboard?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{keyboard?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {keyboard?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Keyboard</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Keyboard");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">Mousepad</TableCell>
                  {mousepad.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {mousepad?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {mousepad?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{mousepad?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {mousepad?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Mousepad</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Mousepad");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className="build-pc-cell-data">
                    Headphone/Headset
                  </TableCell>
                  {headphone.name ? (
                    <>
                      <TableCell className="build-pc-cell-data">
                        {headphone?.name}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {headphone?.modelNumber}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        ₹{headphone?.price}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        {headphone?.qty}
                      </TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button className="btn-sm">
                          <FaEdit />
                        </Button>
                        <Button className="btn-sm mx-2">
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={4}>Add a Headphone/Headset</TableCell>
                      <TableCell className="build-pc-cell-data">
                        <Button
                          className="btn-block"
                          size="sm"
                          onClick={() => {
                            handleOpen("Headphone");
                          }}
                        >
                          Add +
                        </Button>
                      </TableCell>
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
                <Button type="button" className="btn-block">
                  Add to cart
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
