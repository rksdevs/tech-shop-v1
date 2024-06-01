import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import "../assets/styles/productCard.css";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card-home">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-card" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong className="p-name">{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as="div">
        <Ratings
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
      </Card.Text>
      <Card.Text as="h3" className="card-text-price">
        {product.productDiscount ? (
          <>
            <span className="product-discount">{product.productDiscount}%</span>
            <span className="product-price-after-discount">
              ₹{product.priceAfterDiscount}
            </span>
            <span className="product-price">₹{product.price}</span>
          </>
        ) : (
          <> ₹{product.price}</>
        )}
      </Card.Text>
    </Card>
  );
};

export default Product;
