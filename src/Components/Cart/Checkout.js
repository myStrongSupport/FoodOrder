import classes from "./Checkout.module.css";
import useInput from "../../Hooks/useInput";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isFiveCharacter = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const {
    value: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: street,
    valueIsValid: streetIsValid,
    valueIsInvalid: streetIsInvalid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: postalCode,
    valueIsValid: postalCodeIsValid,
    valueIsInvalid: postalCodeIsInvalid,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
  } = useInput(isFiveCharacter);
  const {
    value: city,
    valueIsValid: cityIsValid,
    valueIsInvalid: cityIsInvalid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  const nameClasses = nameIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const streetClasses = streetIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const postalCodeClasses = postalCodeIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cityClasses = cityIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  let formIsValid = false;

  if (nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const formData = {
      enteredName,
      street,
      postalCode,
      city,
    };

    props.onSubmit(formData);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={classes.submit}
          onClick={confirmHandler}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
