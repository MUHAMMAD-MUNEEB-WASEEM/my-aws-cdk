import React, { useEffect, useState } from "react";
import ApiRegPage from "../components/register-api/";
import { Auth, Hub } from "aws-amplify";
import { CircularProgress } from "@material-ui/core";
import { navigate } from "gatsby";
import { Layout } from "../components";

const RegisterApi = () => {
  const [loading, setLoading] = useState(true);
  const checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then(() => {
        console.log("logged in");
        setLoading(false);
      })
      .catch((err) => {
        navigate("/login");
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
      <div data-testid="signin">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Layout>
      <ApiRegPage
        variant="standard"
        backgroundColor="transparent"
        color="initial"
      />
    </Layout>
  );
};

export default RegisterApi;
