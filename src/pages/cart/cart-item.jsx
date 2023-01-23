import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateItemsAmount } =
    useContext(ShopContext);

  return (
    <div className="cart">
      <div className="cartItem">
        <img src={productImage} />
        <div className="checkoutDisplay">
          <div className="description">
            <p>
              <b>{productName}</b>
            </p>
            <p> {price} PLN</p>
          </div>
          <div className="countHandler">
            <button onClick={() => removeFromCart(id)}> - </button>
            <input
              value={cartItems[id]}
              onChange={(e) => updateItemsAmount(Number(e.target.value), id)}
            />
            <button onClick={() => addToCart(id)}> + </button>
          </div>
        </div>
      </div>
    </div>
  );
};
