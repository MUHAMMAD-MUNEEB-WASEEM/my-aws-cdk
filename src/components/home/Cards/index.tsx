import React, { FC } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./Styles";

export interface Props {
  icon: string;
  title: string;
  description: string;
  display: "wider" | "dark";
}

const CardFeatures: FC<Props> = ({
  icon,
  title,
  description,
  display,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar variant="square" className={classes.avatar}>
            <img src={icon} alt={title} />
          </Avatar>
        }
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant={display === "wider" ? "body2" : "subtitle2"}
          color={display === "wider" ? "textSecondary" : "textPrimary"}
          component="p"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardFeatures;
