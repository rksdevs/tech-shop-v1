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
import { useDispatch } from "react-redux";

const BuildOwnPc = () => {
  // const { category: productCategory } = useParams();
  const dispatch = useDispatch();

  const [cpu, setCpu] = useState("");
  const [coolingSystem, setCoolingSystem] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");
  const [hdd, setHdd] = useState("");
  const [graphicsCard, setGraphicsCard] = useState("");
  const [powerSupply, setPowerSupply] = useState("");
  const [cabinet, setCabinet] = useState("");
  const [monitor, setMonitor] = useState("");
  const [mouse, setMouse] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [mousepad, setMousepad] = useState("");
  const [headphone, setHeadphone] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { data: products, isLoading, error } = useGetProductsByCategoryQuery();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setIsModalOpen(false);
  };
  const handleOpen = (category) => {
    setCategory(category);
    setIsModalOpen(true);
    setOpen(true);
  };

  const handleSearchByCategory = async (category) => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (category) {
      console.log(category);
    }
  }, [category]);

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
                  <TableCell className="build-pc-cell-data">Price</TableCell>
                  <TableCell className="build-pc-cell-data">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="build-pc-cell-data">CPU</TableCell>
                  {cpu ? (
                    <TableCell className="build-pc-cell-data">{cpu}</TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Processor</TableCell>
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
                  {coolingSystem ? (
                    <TableCell className="build-pc-cell-data">
                      {coolingSystem}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Cooling System</TableCell>
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
                  {motherboard ? (
                    <TableCell className="build-pc-cell-data">
                      {motherboard}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Motherboard</TableCell>
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
                  {ram ? (
                    <TableCell className="build-pc-cell-data">{ram}</TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Memory/RAM</TableCell>
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
                  {ssd ? (
                    <TableCell className="build-pc-cell-data">{ssd}</TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>
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
                  {hdd ? (
                    <TableCell className="build-pc-cell-data">{hdd}</TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>
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
                  {graphicsCard ? (
                    <TableCell className="build-pc-cell-data">
                      {graphicsCard}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Graphics Card</TableCell>
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
                  {powerSupply ? (
                    <TableCell className="build-pc-cell-data">
                      {powerSupply}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>
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
                  {cabinet ? (
                    <TableCell className="build-pc-cell-data">
                      {cabinet}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Cabinet</TableCell>
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
                  {monitor ? (
                    <TableCell className="build-pc-cell-data">
                      {monitor}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Monitor</TableCell>
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
                  {mouse ? (
                    <TableCell className="build-pc-cell-data">
                      {mouse}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Mouse</TableCell>
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
                  {keyboard ? (
                    <TableCell className="build-pc-cell-data">
                      {keyboard}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Keyboard</TableCell>
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
                  {mousepad ? (
                    <TableCell className="build-pc-cell-data">
                      {mousepad}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Mousepad</TableCell>
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
                  {headphone ? (
                    <TableCell className="build-pc-cell-data">
                      {headphone}
                    </TableCell>
                  ) : (
                    <>
                      <TableCell colSpan={3}>Add a Headphone/Headset</TableCell>
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
          {isModalOpen && (
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
                  <Col>₹10000</Col>
                </Row>
                <Row>
                  <Col>Wattage</Col>
                  <Col>100 W</Col>
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
