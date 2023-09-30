import React, { useEffect, useState } from "react";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { navigate } from "gatsby-link";
import { useStyles } from "./style";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  InputAdornment,
  TextField,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

const ConfirmSignUp = ({ variant, backgroundColor, username }) => {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  interface formType {
    authCode: string;
  }

  const initialValues: formType = {
    authCode: "",
  };
  const validationSchema = Yup.object({
    authCode: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Auth.confirmSignUp(username, values.authCode)
        .then(() => navigate("/login"))
        .catch((err) => {
          setError(err.message);
          setOpen(true);
        });
    },
  });

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
          confirm your account
        </Typography>
        <TextField
          id="email"
          label="User Name"
          variant={variant}
          style={{ backgroundColor: backgroundColor }}
          value={username}
          className={classes.margin}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        <TextField
          name="authCode"
          label="Enter Code"
          variant={variant}
          style={{ backgroundColor: backgroundColor }}
          className={classes.margin}
          placeholder="Enter Code"
          inputProps={{ "data-testid": "authCode" }}
          value={formik.values.authCode}
          onChange={formik.handleChange}
          error={formik.touched.authCode && Boolean(formik.errors.authCode)}
          helperText={formik.touched.authCode && formik.errors.authCode}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ConfirmationNumberIcon className={classes.icon} />
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ConfirmSignUp;
