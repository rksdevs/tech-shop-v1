import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../Components/Message";
import logo from "../assets/logo.png";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useInitiateRazorpayPaymentMutation,
  useGetRazorpayKeyQuery,
  useShipOrderMutation,
} from "../slices/orderApiSlice";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const CheckOutScreen = () => {
  const [courierService, setCourierService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const {
    data: razorpayKey,
    isLoading: loadingRzpKey,
    error: errorRzpKey,
  } = useGetRazorpayKeyQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [shipOrder, { isLoading: loadingShipping }] = useShipOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleOrderDeliver = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleOrderShipped = async (e) => {
    e.preventDefault();
    try {
      await shipOrder({ orderId, courierService, trackingNumber });
      refetch();
      toast.success("Order Shipped");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleRefund = async (e) => {};

  const [
    initiatePayment,
    { isLoading: rzpPaymentLoading, error: rzpPaymentInitiateError },
  ] = useInitiateRazorpayPaymentMutation();

  const [confirmPayment] = usePayOrderMutation();

  const handleRzpPayment = async () => {
    try {
      if (razorpayKey) {
        const paymentData = await initiatePayment({
          amount: parseFloat(order.totalPrice).toFixed(2),
          currency: "INR",
          receipt: "test-receipt",
          notes: {
            user: userInfo.name,
            email: userInfo.email,
          },
        }).unwrap();
        console.log("payment data", paymentData);
        // After receiving payment data from the server, proceed with Razorpay payment initialization
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          toast.error(
            "Razorpay SDK failed to load, please check your connection."
          );
          return;
        }
        const options = {
          key: razorpayKey,
          amount: paymentData.amount, // Amount in paise (100 paise = 1 INR)
          currency: paymentData.currency,
          name: "Your Company Name",
          description: "Test Payment", // URL of your logo
          order_id: paymentData.orderId, // Razorpay order ID
          handler: async (response) => {
            try {
              const paymentConfirmation = await confirmPayment({
                orderId,
                details: {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });
              toast.success("Payment confirmed");
              refetch();
              console.log("Payment confirmation:", paymentConfirmation.data);
              // Handle payment confirmation success
            } catch (error) {
              console.error("Error confirming payment:", error);
              toast.error(
                "An error occurred while confirming your payment: ",
                error
              );
            }
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "+919876543210",
          },
          notes: {
            // Additional notes, if any
          },
          theme: {
            color: "#3399cc", // Theme color
          },
        };

        // Initialize Razorpay payment
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error("An error occurred while confirming your payment: ", error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h2>Order: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address} {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              <p>
                <strong>Contact: </strong>
                {order.shippingAddress.phone}
              </p>
              <div className="order-info-card-container">
                <Card className="order-info-card">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="order-info-card-heading">
                      <p>Shipping Details</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {order.isShipped ? (
                        <ListGroup>
                          <ListGroup.Item>
                            <p>
                              <span className="order-info-card-details">
                                Shipped on:{" "}
                              </span>{" "}
                              {order.shippedAt.substring(0, 10)}
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <p>
                              <span className="order-info-card-details">
                                Courier Name:{" "}
                              </span>
                              {order?.trackingDetails?.courierService}
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <p>
                              <span className="order-info-card-details">
                                Tracking Number:{" "}
                              </span>
                              {order?.trackingDetails?.trackingNumber}
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      ) : (
                        <Message variant="danger">Not yet delivered</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <Card className="order-info-card">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="order-info-card-heading">
                      <p>Delivery Details</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {order.isDelivered ? (
                        <ListGroup>
                          <ListGroup.Item>
                            <p>
                              <span className="order-info-card-details">
                                Delivered on:{" "}
                              </span>{" "}
                              {order.deliveredAt.substring(0, 10)}
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      ) : (
                        <Message variant="danger">Not yet delivered</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <Card className="order-info-card">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="order-info-card-heading">
                      <p>Payment Details</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>
                        <strong>Payment Method: </strong>
                        {order.paymentMethod}
                      </p>
                      <div>
                        {order.isPaid ? (
                          <ListGroup>
                            <ListGroup.Item>
                              <p>
                                <span className="order-info-card-details">
                                  Paid on:{" "}
                                </span>{" "}
                                {order.paidAt.substring(0, 10)}
                              </p>
                            </ListGroup.Item>
                          </ListGroup>
                        ) : (
                          <Message variant="danger">Payment is pending</Message>
                        )}
                      </div>
                    </ListGroup.Item>
                    {userInfo && userInfo.isAdmin && order.isPaid && (
                      <ListGroup.Item className="refund-order-item">
                        <Button>Refund Order</Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {order.orderItems.map((item, index) => (
                <Row key={index}>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} rounded fluid />
                  </Col>
                  <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </Col>
                </Row>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <div>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={handleRzpPayment}
                    >
                      Pay Now
                    </Button>
                  </div>
                </ListGroup.Item>
              )}

              {loadingShipping && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <ListGroup.Item>
                    <Form
                      onSubmit={(e) => handleOrderShipped(e)}
                      className="shipping-form"
                    >
                      <Form.Group controlId="offerName" className="my-2">
                        <Form.Label>Courier Service</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Courier Name"
                          value={courierService}
                          onChange={(e) => {
                            setCourierService(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="offerDiscount" className="my-2">
                        <Form.Label>Tracking Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tracking Number"
                          value={trackingNumber}
                          onChange={(e) => {
                            setTrackingNumber(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        className="my-2 offer-btn"
                      >
                        Mark as Shipped
                      </Button>
                    </Form>
                  </ListGroup.Item>
                )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={handleOrderDeliver}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckOutScreen;
