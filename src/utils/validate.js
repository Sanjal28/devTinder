// validator to valiadate the user data
const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error(
      "{ firstName, lastName, emailId, password } fields are mandatory"
    );
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "emailId",
    "about",
    "photoUrl",
    "gender",
    "age",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
