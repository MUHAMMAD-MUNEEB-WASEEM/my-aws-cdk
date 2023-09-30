import React, { FC, useState } from "react";
import GraphQLAPI from "./GraphqlAPI";
import OpenAPI from "./OpenAPI";
import { useStyles } from "./style";
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

export interface Props {
  variant: "standard" | "outlined" | "filled";
  backgroundColor: "transparent" | "#f5f5f5" | "#333333";
  color: "primary" | "secondary" | "initial";
}

const ApiRegPage: FC<Props> = ({ variant, backgroundColor, color }) => {
  const [apiType, setApiType] = useState<"OPEN" | "GraphQL">("GraphQL");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  return (
    <div
      className={classes.apiRegPage}
      style={{ backgroundColor: backgroundColor }}
    >
      <Typography variant="h5" color={color}>
        API Register Form
      </Typography>
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
      <RadioGroup
        row
        value={apiType}
        data-testid="radioBtn"
        className={classes.radioBtn}
        color={color}
      >
        <FormControlLabel
          value="GraphQL"
          onChange={(e) => setApiType("GraphQL")}
          control={<Radio color="primary" />}
          label="GraphQL API"
          className={classes.radioSize}
        />
        <FormControlLabel
          value="OPEN"
          onChange={(e) => setApiType("OPEN")}
          control={<Radio color="primary" />}
          label="Restful OpenAPI"
          className={classes.radioSize}
        />
      </RadioGroup>
      {apiType === "GraphQL" ? (
        <GraphQLAPI
          apiType={apiType}
          setOpen={setOpen}
          setError={setError}
          variant={variant}
        />
      ) : (
        <OpenAPI
          apiType={apiType}
          setOpen={setOpen}
          setError={setError}
          variant={variant}
        />
      )}
    </div>
  );
};

export default ApiRegPage;
