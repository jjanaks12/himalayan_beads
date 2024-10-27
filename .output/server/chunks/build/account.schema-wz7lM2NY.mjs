import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().label("Password")
});
const registerSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().label("Password"),
  password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Password do not match").label("Confirm password")
});

export { loginSchema as l, registerSchema as r };
//# sourceMappingURL=account.schema-wz7lM2NY.mjs.map
