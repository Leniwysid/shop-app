import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const { id, productName, price, productImage } = props.data;
  const cartItemAmount = cartItems[id];

  return (
    <div className="items">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>{price} PLN</p>
      </div>
      <button className="addToCartBtn" onClick={() => addToCart(id)}>
        Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  );
};
