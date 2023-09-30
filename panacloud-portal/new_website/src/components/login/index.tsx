import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import SignInForm from "./SignIn";
import { Auth, Hub } from "aws-amplify";
import { CircularProgress, Collapse, IconButton } from "@material-ui/core";
import { graphql, useStaticQuery, navigate } from "gatsby";
import { useStyles } from "./style";
import ForgotPassword from "./ForgotPassword";

const SignIn = ({ variant }) => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allContentfulCompanyWebsite {
        nodes {
          logo {
            file {
              url
              fileName
            }
          }
        }
      }
    }
  `);

  const { allContentfulCompanyWebsite } = data;
  const checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then(() => navigate("/"))
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkUser();
    return () => {
      Hub.remove("auth", checkUser);
    };
  }, []);

  if (loading) {
    return (
      <div className={classes.loader} data-testid="signin">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.signIn} data-testid="signin">
      <div className={classes.signIn__form}>
        <div className={classes.authenticationForm__logo}>
          <img
            src={allContentfulCompanyWebsite.nodes[0].logo.file.url}
            className={classes.authenticationForm__logo__img}
            alt="Company Logo"
          />
        </div>
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

        {!forgotPassword ? (
          <SignInForm
            setError={setError}
            setOpen={setOpen}
            setForgotPassword={setForgotPassword}
          />
        ) : (
          <ForgotPassword
            setError={setError}
            setOpen={setOpen}
            setForgotPassword={setForgotPassword}
          />
        )}
      </div>
    </div>
  );
};

export default SignIn;
