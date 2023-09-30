import React from "react";
import * as Yup from "yup";
import { Auth, Hub } from "aws-amplify";
import { useFormik } from "formik";
import { navigate } from "gatsby";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  InputAdornment,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useStyles } from "./style";

interface formType {
  email: string;
  password: string | undefined;
}

const initialValues: formType = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .max(20, "Password should be maximun of 20 characters")
    .min(6, "Password must be atleast of 6 characters"),
});

const SignInForm = ({ setError, setOpen, setForgotPassword }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Auth.signIn(values.email, values.password)
        .then(() => navigate(-1))
        .catch((err) => {
          setError(err.message);
          setOpen(true);
        });
    },
  });
  return (
    <form
      className={classes.form}
      data-testid="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography className={classes.form__heading}>login</Typography>
      <TextField
        name="email"
        label="E-mail"
        variant="outlined"
        placeholder="Enter Email"
        className={classes.margin}
        inputProps={{ "data-testid": "email" }}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        placeholder="Enter Password"
        inputProps={{ "data-testid": "pass" }}
        className={classes.margin}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyIcon className={classes.icon} />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Typography className={classes.forgotPass}>
        <Link onClick={() => setForgotPassword(true)}>Forgot Password?</Link>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        className={classes.btn}
        fullWidth
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        size="large"
        fullWidth
        className={classes.btn2}
        onClick={() => navigate("/signup")}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignInForm;
