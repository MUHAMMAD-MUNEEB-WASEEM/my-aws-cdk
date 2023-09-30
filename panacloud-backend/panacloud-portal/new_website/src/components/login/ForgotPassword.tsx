import React, { useState } from "react";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  InputAdornment,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./style";

interface formType {
  email: string;
  code: string;
  password: string;
}

const initialValues: formType = {
  email: "",
  code: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  code: Yup.string().required("Enter your Codes"),
  password: Yup.string()
    .required("Password Required")
    .max(20, "Password should be maximun of 20 characters")
    .min(6, "Password must be atleast of 6 characters"),
});

const ForgotPassword = ({ setForgotPassword, setError, setOpen }) => {
  const [forgotPassState, setForgotPassState] = useState<
    "EMAIL" | "NEW_PASSWORD"
  >("EMAIL");
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Auth.forgotPasswordSubmit(values.email, values.code, values.password)
        .then(() => setForgotPassword(false))
        .catch((err) => {
          setError(err.message);
          setOpen(true);
        });
    },
  });

  const sendCode = async (value) => {
    Auth.forgotPassword(value)
      .then(() => setForgotPassState("NEW_PASSWORD"))
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      });
  };

  return (
    <form
      className={classes.form}
      data-testid="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography className={classes.form__heading}>Forgot Password</Typography>
      {forgotPassState === "EMAIL" && (
        <div className={classes.container}>
          <TextField
            name="email"
            label="Enter Your E-mail"
            variant="outlined"
            placeholder="Enter Your Email"
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            onClick={() => sendCode(formik.values.email)}
            fullWidth
          >
            Send Code
          </Button>
        </div>
      )}

      {forgotPassState === "NEW_PASSWORD" && (
        <div className={classes.container}>
          <TextField
            name="code"
            label="Enter Confirmation Code"
            variant="outlined"
            placeholder="Enter Confirmation Code"
            className={classes.margin}
            inputProps={{ "data-testid": "code" }}
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumberIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            name="password"
            label="Enter New Password"
            type="password"
            variant="outlined"
            placeholder="Enter New Password"
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className={classes.btn}
            fullWidth
          >
            Reset Password
          </Button>
        </div>
      )}
    </form>
  );
};

export default ForgotPassword;
