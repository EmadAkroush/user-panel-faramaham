export const validatorPositive = (value) => {
  if (value >= 0) {
    return true;
  }
  return false;
};

export const validatorPassword = (password) => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password);
  return validPassword;
};

export const validatorCreditCard = (creditnum) => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/;
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum);
  return validCreditCard;
};

export const validatorPhoneNumber = (phone) => {
  /* eslint-disable no-useless-escape */
  // const cRegExp = /^(\+98|0098|98|0)?9\d{9}$/;
  const cRegExp = /^09[0|1|2|3|9][0-9]{8}$/;
  /* eslint-enable no-useless-escape */
  const validPhoneNumber = cRegExp.test(phone);
  return validPhoneNumber;
};

export const validatorIBANNum = (iban) => {
  /* eslint-disable no-useless-escape */
  // const cRegExp = /^(\+98|0098|98|0)?9\d{9}$/;
  const cRegExp = /^(?:IR)(?=.{24}$)[0-9]*$/;
  /* eslint-enable no-useless-escape */
  const validIban = cRegExp.test(iban);
  return validIban;
};

export const validatorNationalCode = (code) => {
  /* eslint-disable no-useless-escape */
  // const cRegExp = /^(\+98|0098|98|0)?9\d{9}$/;
  const cRegExp = /0\d{9}$/g;
  /* eslint-enable no-useless-escape */
  const validNationalCode = cRegExp.test(code);
  return validNationalCode;
};

export const validatorUrlValidator = (val) => {
  if (val === undefined || val === null || val.length === 0) {
    return true;
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  /* eslint-enable no-useless-escape */
  return re.test(val);
};
