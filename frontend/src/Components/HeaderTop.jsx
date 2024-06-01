import React from "react";
import "../assets/styles/headerTop.css";
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

const HeaderTop = () => {
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
        className="navbar-top"
      >
        <Container>
          <Row className="header-row-1">
            <Col md={3} className="row-1-cols">
              <FaPhoneAlt /> Hotline: <span>(+91) 7444 4444444</span>
            </Col>
            <Col md={3} className="row-1-cols row-1-cols-user">
              <FaRegUser className="row-1-user-icon" /> <span>Hi</span>!{" "}
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
                <LinkContainer to="/login" className="sign-in-btn">
                  <Nav.Link>Sign In</Nav.Link>
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
                  <LinkContainer to="/admin/createOffer">
                    <NavDropdown.Item>Offers</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderTop;
