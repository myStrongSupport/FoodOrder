import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
const MealItemForm = (props) => {
  const inputUseRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = inputUseRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputUseRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          step: "1",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button> + Add</button>
    </form>
  );
};

export default MealItemForm;
