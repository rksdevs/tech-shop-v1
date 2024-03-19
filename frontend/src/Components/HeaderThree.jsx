import { useState } from "react";
import "../assets/styles/headerThree.css";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Container,
  Badge,
  Nav,
  NavDropdown,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaPhoneAlt,
  FaRegUser,
  FaSquare,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

const HeaderThree = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickNavigation = (path) => {
    navigate(`${path}`);
  };

  return (
    <header>
      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        className="navbar-three"
      >
        <Container className="header-three-container">
          <Row className="header-three row-2">
            <Col className="header-category">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="header-category-btn"
              >
                <MenuOutlinedIcon className="category-btn-icon" />
                All Categories
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Processors</MenuItem>
                <MenuItem onClick={handleClose}>Motherboards</MenuItem>
                <MenuItem onClick={handleClose}>Graphics Cards</MenuItem>
                <MenuItem onClick={handleClose}>Graphics Cards</MenuItem>
                <MenuItem onClick={handleClose}>Storage Stick/SSD</MenuItem>
                <MenuItem onClick={handleClose}>CPU Coolers</MenuItem>
                <MenuItem onClick={handleClose}>Power Supply Units</MenuItem>
                <MenuItem onClick={handleClose}>Hard Disks</MenuItem>
                <MenuItem onClick={handleClose}>Cabinets</MenuItem>
                <MenuItem onClick={handleClose}>Monitors</MenuItem>
                <MenuItem onClick={handleClose}>Mouse</MenuItem>
                <MenuItem onClick={handleClose}>Keyboards</MenuItem>
                <MenuItem onClick={handleClose}>Headphones</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/buildmypc">Mousepad</Link>
                </MenuItem>
              </Menu>
            </Col>
            <Col className="header-menu">
              {/* <Link to="/">Home</Link>
              <Link to="/buildmypc">Build Your PC</Link>
              <Link to="/">Contact Us</Link> */}
              {/* <Button
                variant="outlined"
                size="small"
                onClick={() => handleClickNavigation("/")}
              >
                Home
              </Button> */}
              {/* <Button
                variant="outlined"
                size="small"
                onClick={() => handleClickNavigation("/buildmypc")}
              >
                Build My PC
              </Button> */}
              {/* <Button
                variant="outlined"
                size="small"
                onClick={() => handleClickNavigation("/")}
              >
                Contact us
              </Button> */}
            </Col>
            <Col className="header-offer">
              <div>
                <span>Free shopping on oders above ₹2000</span>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderThree;
