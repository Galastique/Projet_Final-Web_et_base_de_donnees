const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_NUMBERDA = "NUMBERDA";
const VALIDATOR_TYPE_TELEPHONE = "TELEPHONE";
const VALIDATOR_TYPE_NUMBERSONLY = "NUMBERSONLY"
const VALIDATOR_TYPE_MONETARY = "MONETARY";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_NUMBERDA = () => ({ type: VALIDATOR_TYPE_NUMBERDA })
export const VALIDATOR_TELEPHONE = () => ({ type: VALIDATOR_TYPE_TELEPHONE })
export const VALIDATOR_NUMBERSONLY = () => ({ type: VALIDATOR_TYPE_NUMBERSONLY })
export const VALIDATOR_MONETARY = () => ({ type: VALIDATOR_TYPE_MONETARY })

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_NUMBERDA) {
      isValid = isValid && /^[0-9]{7}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_TELEPHONE) {
      isValid = isValid && /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_NUMBERSONLY) {
      isValid = isValid && /^[0-9]+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_MONETARY) {
      // eslint-disable-next-line no-useless-escape
      isValid = isValid && /^[0-9]+([,\.][0-9]{1,2})?$/.test(value);
    }
  }
  return isValid;
};