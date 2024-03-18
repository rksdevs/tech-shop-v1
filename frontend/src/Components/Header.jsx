import React from "react";
// import "../assets/styles/header.css";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
  Col,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import { FaPhoneAlt, FaRegUser, FaSquare } from "react-icons/fa";

const Header = () => {
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
      {/* <nav> */}
      {/* <Container> */}
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Logo" />
              Tech Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/buildmypc">
                <Nav.Link>Build Your PC</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, item) => a + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo?.name} className="userName">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Row className="header row-1">
            <Row className="header-row-1">
              <Col md={3} className="row-1-cols">
                <FaPhoneAlt /> Hotline: <span>(+91) 7444 4444444</span>
              </Col>
              <Col md={3} className="row-1-cols row-1-cols-user">
                <FaRegUser /> <span>Hi</span>!{" "}
                {userInfo ? (
                  <NavDropdown
                    title={userInfo?.name}
                    className="userName header-username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown
                    title="Admin"
                    id="adminMenu"
                    className="header-username"
                  >
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Col>
            </Row>
          </Row>
          <Row className="header row-2">
            <Col className="header-brand">
              <LinkContainer to="/">
                <Navbar.Brand>
                  TechShop
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
                  <FaShoppingCart className="header-cart-icon" />{" "}
                  <span className="header-cart-span">Your Cart</span>
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, item) => a + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Col>
          </Row>
          <Row className="header row-3">
            <Col>Categories</Col>
            <Col>Navigation</Col>
            <Col>Free Shipping on Order Above ₹1000</Col>
          </Row> */}
      {/* <Row className="header row-4">Header 4</Row> */}
      {/* </Container> */}
      {/* </nav> */}
    </header>
  );
};

export default Header;
