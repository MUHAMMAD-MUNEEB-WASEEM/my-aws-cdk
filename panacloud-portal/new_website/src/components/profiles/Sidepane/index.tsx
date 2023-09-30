import React, { FC } from "react";
import { useStyles } from "./Stlyes";
import { ListItemText, List, ListItem, Typography } from "@material-ui/core";

const Sidepane: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <List data-testid='list'>
        <SidepaneObject filterName="All developers" quantity={10} />
        <SidepaneObject filterName="Panacloud developers" quantity={5} />
        <SidepaneObject filterName="AWS" quantity={4} />
      </List>
    </div>
  );
};

export default Sidepane;

const SidepaneObject: FC<{ filterName: string; quantity: number }> = ({
  filterName,
  quantity,
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItem button>
        <ListItemText
          primary={filterName}
          classes={{ primary: classes.listItemText }}
        />
        <Typography>{quantity}</Typography>
      </ListItem>
    </>
  );
};
