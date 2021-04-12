import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    textAlign: "center",
  },
  title: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
}));

export default function Contact() {
  const styles = useStyles();

  return (
    <>
      <ResponsiveNavBar value={3} />
      {/* Content */}
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {"Contact"}
        </Typography>
      </div>
    </>
  );
}
