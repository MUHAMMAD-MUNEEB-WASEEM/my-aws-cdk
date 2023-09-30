import React, { FC, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography } from "@material-ui/core";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useStyles } from "./style";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { createOpenApi } from "../../graphql/mutations";
import { Types } from "./apiType";
import { navigate } from "gatsby-link";

interface Form {
  apiId: string;
  title: string;
  apiRootURL: string;
  openAPIDef: string;
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
  apiRootURL: "",
  openAPIDef: "",
};

const validationSchema = Yup.object({
  apiId: Yup.string()
    .matches(/^(\S+$)/, "* API ID cannnot include whitespaces")
    .min(4, "API ID needs to be at least 4 char")
    .max(24, "API ID cannot exceed 24 char")
    .required("API ID Required"),
  title: Yup.string().required("Title Required"),
  apiRootURL: Yup.string().url().required("API Root Url Required"),
  openAPIDef: Yup.string().required("Open API Def Required"),
});

const OpenAPI: FC<Props> = ({ apiType, setError, setOpen, variant }) => {
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

  async function registerOpenAPI(values: Form) {
    try {
      const data = {
        entityId: entityId,
        apiId: values.apiId,
        title: values.title,
        apiType: apiSaasType,
        apiRootUrl: values.apiRootURL,
        openApiDef: values.openAPIDef,
      };
      await API.graphql(graphqlOperation(createOpenApi, { input: data }));
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
        registerOpenAPI(values);
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
            variant="standard"
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
        id="apiRootURL"
        placeholder="API Root URL"
        className={classes.textField}
        value={formik.values.apiRootURL}
        onChange={formik.handleChange}
        error={formik.touched.apiRootURL && Boolean(formik.errors.apiRootURL)}
        helperText={formik.touched.apiRootURL && formik.errors.apiRootURL}
        inputProps={{ "data-testid": "rootUrl" }}
        fullWidth
      />

      <TextField
        id="openAPIDef"
        placeholder="Open API Def"
        className={classes.textField}
        value={formik.values.openAPIDef}
        onChange={formik.handleChange}
        error={formik.touched.openAPIDef && Boolean(formik.errors.openAPIDef)}
        helperText={formik.touched.openAPIDef && formik.errors.openAPIDef}
        inputProps={{ "data-testid": "openApiDef" }}
        fullWidth
      />

      <button type="submit" className={classes.regBtn} data-testid="btn">
        Register
      </button>
    </form>
  );
};

export default OpenAPI;
