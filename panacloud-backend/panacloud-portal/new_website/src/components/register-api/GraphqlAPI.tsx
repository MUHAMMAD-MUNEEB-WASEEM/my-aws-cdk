import React, { FC, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography } from "@material-ui/core";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useStyles } from "./style";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { createGraphQlApi } from "../../graphql/mutations";
import { Types } from "./apiType";
import { navigate } from "gatsby";

interface Form {
  apiId: string;
  title: string;
  apiUrl: string;
  graphQLSchema: string;
}

interface Props {
  apiType: "OPEN" | "GraphQL";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  variant: "standard" | "outlined" | "filled";
}

const initialValues: Form = {
  apiId: "",
  title: "",
  apiUrl: "",
  graphQLSchema: "",
};

const validationSchema = Yup.object({
  apiId: Yup.string()
    .matches(/^(\S+$)/, "* API ID cannnoT include whitespaces")
    .min(4, "API ID needs to be at least 4 char")
    .max(24, "API ID cannot exceed 24 char")
    .required("API ID Required"),
  title: Yup.string().required("Title Required"),
  apiUrl: Yup.string().url().required("API Url Required"),
  graphQLSchema: Yup.string().required("Graphql Schema Required"),
});

const GraphQLAPI: FC<Props> = ({ apiType, setError, setOpen, variant }) => {
  const classes = useStyles();
  const [apiSaasType, setApiSaasType] = useState<string[]>([]);
  const [apiTypeValidation, setApiTypeValidation] = useState<string>("");
  const [entityId, setEntityId] = useState<string>("");

  const checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then((data) => setEntityId(data.username))
      .catch((err) => {});
  };

  useEffect(() => {
    checkUser();
    return () => {
      Hub.remove("auth", checkUser);
    };
  }, []);

  function handleApiType(value) {
    if (apiSaasType?.length >= 3) {
      alert("Cannot select more than 3 types");
    } else {
      setApiSaasType([...value]);
    }
  }

  function handleDelete(value) {
    setApiSaasType([...value]);
  }

  async function registerGraphQlAPI(values: Form) {
    try {
      const data = {
        entityId: entityId,
        apiId: values.apiId,
        title: values.title,
        apiType: apiSaasType,
        apiUrl: values.apiUrl,
        graphQlSchema: values.graphQLSchema,
      };
      await API.graphql(graphqlOperation(createGraphQlApi, { input: data }));
      navigate("/api-details");
    } catch (error) {
      setError(error.errors[0].message);
      setOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!apiSaasType.length) {
        setApiTypeValidation("Atleast select one type");
      } else {
        setApiTypeValidation("");
        registerGraphQlAPI(values);
      }
    },
  });

  return (
    <form
      className={classes.apiRegPage_formContainer}
      data-testid="form"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="apiId"
        placeholder="API ID (unique without spaces)"
        className={classes.textField}
        variant={variant}
        value={formik.values.apiId}
        onChange={formik.handleChange}
        error={formik.touched.apiId && Boolean(formik.errors.apiId)}
        helperText={formik.touched.apiId && formik.errors.apiId}
        inputProps={{ "data-testid": "apiId" }}
        fullWidth
      />

      <TextField
        id="title"
        placeholder="Title"
        className={classes.textField}
        variant={variant}
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        inputProps={{ "data-testid": "title" }}
        fullWidth
      />

      <Autocomplete
        className={classes.textField}
        id="apiType"
        multiple
        value={apiSaasType}
        onChange={(e, newVal, reason) => {
          if (reason === "select-option") {
            handleApiType(newVal);
          } else if (reason === "remove-option") {
            handleDelete(newVal);
          } else if (reason === "clear") {
            setApiSaasType([]);
          }
        }}
        options={Types}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            id="apiType"
            variant={variant}
            placeholder="API SAAS Type (Max-Three)"
            value={apiSaasType}
            fullWidth
          />
        )}
        fullWidth
      />
      {apiTypeValidation && (
        <p className={classes.error}>{apiTypeValidation} </p>
      )}

      <TextField
        id="apiUrl"
        placeholder="API URL"
        variant={variant}
        className={classes.textField}
        value={formik.values.apiUrl}
        onChange={formik.handleChange}
        error={formik.touched.apiUrl && Boolean(formik.errors.apiUrl)}
        helperText={formik.touched.apiUrl && formik.errors.apiUrl}
        inputProps={{ "data-testid": "apiUrl" }}
        fullWidth
      />

      <TextField
        id="graphQLSchema"
        placeholder="GraphQL Schema"
        variant={variant}
        className={classes.textField}
        multiline
        rows={4}
        value={formik.values.graphQLSchema}
        onChange={formik.handleChange}
        error={
          formik.touched.graphQLSchema && Boolean(formik.errors.graphQLSchema)
        }
        helperText={formik.touched.graphQLSchema && formik.errors.graphQLSchema}
        inputProps={{ "data-testid": "schema" }}
        fullWidth
      />

      <button type="submit" className={classes.regBtn} data-testid="btn">
        Register
      </button>
    </form>
  );
};

export default GraphQLAPI;
