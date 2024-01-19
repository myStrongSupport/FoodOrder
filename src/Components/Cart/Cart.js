import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-content";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmtting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [hasError, setHasError] = useState(null);
  const cartCtx = useContext(CartContext);
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={removeItemHandler.bind(null, item.id)}
      onAdd={addItemHandler.bind(null, item)}
    />
  ));
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length;
  // Fuctions

  const orderHandler = (e) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (formData) => {
    setIsSubmtting(true);
    try {
      const response = await fetch(
        "https://usehook-73f10-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: formData,
            orders: cartCtx.items,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setIsSubmtting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      } else {
        throw new Error("SomeThing went Wrong");
      }
    } catch (e) {
      setIsSubmtting(false);
      setHasError(e.message);
    }
  };
  // Variant
  const buttonActions = (
    <div className={classes.actions}>
      <button onClick={props.onCloseCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let content;

  if (!isSubmitting && !didSubmit) {
    content = (
      <React.Fragment>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout
            onSubmit={submitOrderHandler}
            onCancel={props.onCloseCart}
          />
        )}
        {!isCheckout && buttonActions}
      </React.Fragment>
    );
  }

  if (isSubmitting) {
    content = <h2>Sending data to order ....</h2>;
  }

  if (hasError) {
    content = <h2>{hasError}</h2>;
  }

  if (didSubmit) {
    content = (
      <React.Fragment>
        <h2>Order Submitted</h2>
        <button onClick={props.onCloseCart} className={classes.button}>
          Close
        </button>
      </React.Fragment>
    );
  }

  return <Modal onClose={props.onCloseCart}>{content}</Modal>;
};

export default Cart;
