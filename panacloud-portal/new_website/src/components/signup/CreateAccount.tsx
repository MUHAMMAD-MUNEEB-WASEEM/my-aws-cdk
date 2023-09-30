import * as Yup from "yup";
import { useFormik } from "formik";
import {
  InputAdornment,
  TextField,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { navigate } from "gatsby-link";
import { useStyles } from "./style";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";

interface formType {
  username: string;
  email: string;
  password: string;
}

const initialValues: formType = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^(\S+$)/, "* Username cannnot include whitespaces")
    .min(4, "Username needs to be at least 4 char")
    .max(24, "Username cannot exceed 24 char")
    .required("Username Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const CreateAccount = ({ variant, backgroundColor, color }) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  let mounted = true;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await Auth.signUp({
          username: values.username,
          password: values.password,
          attributes: { email: values.email },
        });
      } catch (error) {
        if (mounted) {
          console.log(error);
          setError(error.message);
          setOpen(true);
        }
      }
    },
  });

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {error && (
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
      )}

      <form
        className={classes.form}
        data-testid="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography className={classes.form__heading}>
          create an account
        </Typography>

        <TextField
          name="username"
          label="User Name"
          color={color}
          variant={variant}
          style={{ backgroundColor: backgroundColor }}
          placeholder="User Name"
          className={classes.margin}
          inputProps={{ "data-testid": "username" }}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          color={color}
          variant={variant}
          style={{ backgroundColor: backgroundColor }}
          placeholder="Email"
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
          variant={variant}
          color={color}
          style={{ backgroundColor: backgroundColor }}
          placeholder="Password"
          type="password"
          className={classes.margin}
          inputProps={{ "data-testid": "pass" }}
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
          Create Account
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          className={classes.btn2}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
        <p className={classes.msgPara}>
          Check your email to complete the next Registration Steps
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
