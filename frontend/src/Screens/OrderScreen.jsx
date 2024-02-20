import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../Components/Message";
import logo from "../assets/logo.png";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
  useInitiateRazorpayPaymentMutation,
  useGetRazorpayKeyQuery,
} from "../slices/orderApiSlice";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const {
    data: razorpayKey,
    isLoading: loadingRzpKey,
    error: errorRzpKey,
  } = useGetRazorpayKeyQuery();

  // const [payOrder] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // const {
  //   data: paypal,
  //   isLoading: loadingPayPal,
  //   error: errorPayPal,
  // } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);
  // const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   if (!errorPayPal && !loadingPayPal && paypal.clientId) {
  //     const loadPayPalScript = async () => {
  //       paypalDispatch({
  //         type: "resetOptions",
  //         value: {
  //           "client-id": paypal.clientId,
  //           currency: "USD",
  //           disableFunding: "card",
  //         },
  //       });
  //       paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  //     };
  //     if (order && !order.isPaid) {
  //       if (!window.paypal) {
  //         loadPayPalScript();
  //       }
  //     }
  //   }
  // }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       await payOrder({ orderId, details });
  //       refetch();
  //       toast.success("Payment successful!");
  //     } catch (error) {
  //       toast.error(error?.data?.message || error?.message);
  //     }
  //   });
  // };
  // // const onApproveTest = async () => {
  // //   await payOrder({ orderId, details: { payer: {} } });
  // //   refetch();
  // //   toast.success("Payment successful!");
  // // };
  // const createOrder = (data, actions) => {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           amount: {
  //             value: order.totalPrice,
  //           },
  //         },
  //       ],
  //     })
  //     .then((orderId) => {
  //       return orderId;
  //     });
  // };
  // const onError = (err) => {
  //   toast.error(err);
  // };

  const handleOrderDeliver = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

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

        const options = {
          key: razorpayKey,
          amount: paymentData.amount, // Amount in paise (100 paise = 1 INR)
          currency: paymentData.currency,
          name: "Your Company Name",
          description: "Test Payment",
          image: "https://example.com/logo.png", // URL of your logo
          order_id: paymentData.orderId, // Razorpay order ID
          handler: async (response) => {
            try {
              // Send payment details to your backend server for verification
              // const paymentConfirmation = await axios.put(
              //   `/api/orders/${orderId}/pay`,
              //   {
              //     // Include payment confirmation details here, such as payment ID, order ID, etc.
              //   }
              // );
              const paymentConfirmation = await confirmPayment({
                orderId,
                details: {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });
              toast.success("Payment confirmed");
              console.log("Payment confirmation:", paymentConfirmation.data);
              // Handle payment confirmation success
            } catch (error) {
              console.error("Error confirming payment:", error);
              toast.error(
                "An error occurred while confirming your payment: ",
                error
              );
              // Handle payment confirmation error
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
              <div>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not yet delivered</Message>
                )}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              <div>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Payment is pending</Message>
                )}
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
                    {item.qty} x {item.price} = ${item.qty * item.price}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                // <ListGroup.Item>
                //   {loadingPayPal && <Loader />}
                //   {isPending ? (
                //     <Loader />
                //   ) : (
                //     <div>
                //       <div>
                //         <PayPalButtons
                //           createOrder={createOrder}
                //           onApprove={onApprove}
                //           onError={onError}
                //         ></PayPalButtons>
                //       </div>
                //     </div>
                //   )}
                // </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={handleRzpPayment}
                    >
                      Pay with Razorpay
                    </Button>
                  </div>
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

export default OrderScreen;
