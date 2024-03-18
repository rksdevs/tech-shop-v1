import React from "react";
import "../assets/styles/headerMiddle.css";
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

const HeaderMiddle = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        className="navbar-middle"
      >
        <Container className="middle-container">
          <Row className="header-middle row-2">
            <Col className="header-brand">
              <LinkContainer to="/">
                <Navbar.Brand>
                  techshop
                  <span className="header-brand-span">
                    <FaSquare />
                  </span>
                </Navbar.Brand>
              </LinkContainer>
            </Col>
            <Col className="header-search">
              <SearchBox />
            </Col>
            <Col className="header-cart">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <ShoppingBagOutlinedIcon className="header-cart-icon" />{" "}
                  <span className="header-cart-span">Your Cart</span>
                  {cartItems.length > 0 && (
                    <Badge
                      className="cart-badge"
                      pill
                      style={{ marginLeft: "5px" }}
                    >
                      {cartItems.reduce((a, item) => a + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderMiddle;
