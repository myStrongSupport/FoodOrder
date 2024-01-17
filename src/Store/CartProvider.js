import { useReducer } from "react";
import CartContext from "./cart-content";
const defaultCart = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCart;
};
const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCart);
  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item });
  };
  const removeItemToCartHandler = (id) => {};
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
