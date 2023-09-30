import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router"
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from '@material-ui/core';
import { createDevApi } from '../graphql/mutations'
import { API } from 'aws-amplify';
import { identityContext } from '../context/authContext';
import { AuthState } from "@aws-amplify/ui-components"

const useStyles = makeStyles({

    detailsButton: {
        backgroundColor: "#3072be",
        color: "white",
        padding: ".4rem",
        width: "100%",
        '&:hover': {
            backgroundColor: "#2a65a8",
        },
    },

})
const createDevApiFunc = async (devId, title, description, schema_uri, image_url) => {
    const data: any = await API.graphql({
        query: createDevApi,
        variables: { devId, title, description, schema_uri, image_url }
    })
    navigate("/api-under-dev")
}

const ApiRegisterDev = () => {
    const classes = useStyles()
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }
    return (
        <Layout>
            <br />
            <h1 style={{ textAlign: 'center' }}>Register API</h1>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Formik
                    initialValues={{ title: "", description: "", schema_uri: "", image_url: "" }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required("Required"),
                        description: Yup.string()
                            .min(15, "Must be greater than 15 characters")
                            .required("Required"),
                    })}
                    onSubmit={({ title, description, schema_uri, image_url }) => {
                        createDevApiFunc(user?.attributes?.sub, title, description, schema_uri, image_url)
                    }}
                >
                    {({ errors, touched, dirty, isValid }) => (
                        <Form
                        >
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Title"
                                name="title"
                                type="text"
                                error={errors.title && touched.title}
                                helperText={touched.title && errors.title}
                            />
                            <br />
                            <br />
                            <Field
                                data-testId="Title"
                                as={TextField}
                                variant="outlined"
                                label="Description"
                                name="description"
                                type="text"
                                error={errors.description && touched.description}
                                helperText={touched.description && errors.description}
                            />
                            <br />
                            <br />
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Schema Uri"
                                name="schema_uri"
                                type="text"

                            />

                            <br />
                            <br />
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Image Url"
                                name="image_url"
                                type="text"

                            />

                            <br />
                            <br />


                            <Button
                                className={classes.detailsButton}
                                variant="contained"
                                type="submit"
                                disabled={!dirty || !isValid}
                            >
                                Register
          </Button>
                            <br /><br />
                            <Button
                                onClick={() => navigate("/api-under-dev")}
                                className={classes.detailsButton}
                                variant="contained"
                            >
                                My Under Development Apis
          </Button>
                            <br />
                            <br />
                            <Button
                                onClick={() => navigate("/api-published")}
                                className={classes.detailsButton}
                                variant="contained"
                            >
                                My Published Apis
          </Button>
                            <br />
                            <br />
                            <Button
                                onClick={() => navigate("/api-subscribed")}
                                className={classes.detailsButton}
                                variant="contained"
                            >
                                My Subscribed Apis
          </Button>


                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

export default ApiRegisterDev
