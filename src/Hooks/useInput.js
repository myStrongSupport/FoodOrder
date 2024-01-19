import { useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(value);

  const valueIsInvalid = !valueIsValid && isTouched;

  //   const nameClasses = nameIsInvalid
  //     ? `${classes.control} ${classes.invalid}`
  //     : `${classes.control}`;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const valueBlurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    value,
    valueIsValid,
    valueIsInvalid,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
