export const validate = (data, type) => {
  const errors = {};

  if (type === "signup") {
    if (!data.username.trim()) {
      errors.username = "Username required";
    } else if (data.username.length < 4) {
      errors.username = "Username need to be 4 character or more";
    } else {
      delete errors.username;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm the password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password do not match";
    } else {
      delete errors.confirmPassword;
    }

    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "Accept our regulations";
    }
  }

  if (!data.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password required";
  } else if (data.password.length < 6) {
    errors.password = "Password need to be 6 character or more";
  } else {
    delete errors.password;
  }

  return errors;
};
