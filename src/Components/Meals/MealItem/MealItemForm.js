import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
const MealItemForm = () => {
  return (
    <form className={classes.form}>
      <Input
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
