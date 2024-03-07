const zod = require("zod");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

exports.signupSchema = zod.object({
  username: zod
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, { message: "Username must be 3 or more characters long" }),
    firstName: zod
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be a string",
    })
    .min(3, { message: "Firstname must be 3 or more characters long" }),
  lastName: zod
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    })
    .min(3, { message: "Lastname must be 3 or more characters long" }),
  password: zod
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be 6 or more characters long" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

exports.validationError = (res, result) => {
  const firstError = result.error.issues[0];
  let errorMessage;
  if (firstError?.message) {
    errorMessage = firstError.message;
  } else if (firstError?.expected && firstError?.received) {
    errorMessage = `Expected ${firstError.expected}, received ${
      firstError.received
    } for ${firstError.path.join(".")}`;
  } else {
    errorMessage = "Validation error";
  }
  return res.status(400).json({ success: false, message: errorMessage });
};
