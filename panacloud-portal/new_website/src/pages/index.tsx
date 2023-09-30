import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { Authenticated, UnAuthenticated } from "../components/home"
import "typeface-roboto";
import { CircularProgress } from "@material-ui/core";
import { Layout } from "../components";
import { signedOutUser } from '../redux/slices/userSlice';
import { useAppDispatch } from "../redux/store";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardArea: {
    marginTop: 30,
  },
}));

// This is comment
export default function Homeww({ data }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  const dispatch = useAppDispatch();
  async function checkUser() {
    await Auth.currentAuthenticatedUser()
      .then((data) => setUserData(data))
      .catch((err) => setUserData(undefined));
  }

  useEffect(() => {
    setLoading(true)
    checkUser();
    setLoading(false)

  }, []);

  function logOut() {
    try {
      Auth.signOut();
      setUserData(undefined)
      dispatch(signedOutUser()) // cleaning the user state in redux
    } catch (error) {
      setError(error);
    }
  }

  return (<Layout>
    {loading ? <CircularProgress /> : (<div className={classes.root}>
      {!userData ? <UnAuthenticated data={data} /> : <Authenticated logOut={logOut} />
      }
    </div>)}
  </Layout>

  );
}

export const query = graphql`
  query HomePageQuery {
    allContentfulCardFeatures {
      nodes {
        title
        icon {
          file {
            url
          }
        }
        description {
          description
        }
      }
    }
  }
`;