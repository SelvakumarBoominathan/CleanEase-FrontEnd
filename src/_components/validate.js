// validating the password

export async function passwordvalidate(values) {
  const errors = passwordVerify(values);
  return errors;
}

let passwordVerify = (values) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(values.password);
  const hasLowerCase = /[a-z]/.test(values.password);
  const hasNumbers = /[0-9]/.test(values.password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

  if (values.password.length < minLength) {
    return "Password must be at least 12 characters long";
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter";
  }
  if (!hasNumbers) {
    return "Password must contain at least one number";
  }
  if (!hasSpecialChars) {
    return "Password must contain at least one special character";
  }
  return "Password is strong";
};
