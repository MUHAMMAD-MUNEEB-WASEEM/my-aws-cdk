import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import ConfirmSignUp from "./ConfirmSignUp";
import CreateAccount from "./CreateAccount";
import { CircularProgress } from "@material-ui/core";
import { graphql, useStaticQuery, navigate } from "gatsby";
import { useStyles } from "./style";

const SignUp = () => {
  const classes = useStyles();
  const [authState, setAuthState] = useState<boolean>();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  let isMounted = true;

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
    try {
      if (isMounted) {
        await Auth.currentAuthenticatedUser()
          .then(() => navigate("/"))
          .catch((err) => {
            setLoading(false);
          });
      }
    } catch (error) {}
  };
  async function setAuthListener() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signUp":
          setAuthState(data?.userConfirmed);
          setUsername(data?.user?.username);
          break;
        default:
          break;
      }
    });
  }
  useEffect(() => {
    setAuthListener();
    checkUser();
    return () => {
      Hub.remove("auth", setAuthListener);
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className={classes.loader} data-testid="signup">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.signUp} data-testid="signup">
      <div className={classes.signUp__form}>
        <div className={classes.authenticationForm__logo}>
          <img
            src={allContentfulCompanyWebsite.nodes[0].logo.file.url}
            className={classes.authenticationForm__logo__img}
            alt="Company Logo"
          />
        </div>
        {authState === false ? (
          <ConfirmSignUp
            variant="filled"
            backgroundColor="#e2fae2"
            username={username}
          />
        ) : (
          <CreateAccount
            variant="outlined"
            backgroundColor="transparent"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
