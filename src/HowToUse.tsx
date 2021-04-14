import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
  info: {
    maxWidth: 1000,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  }
}));

export default function HowToUse() {
  const styles = useStyles();

  return (
    <>
      <ResponsiveNavBar value={1} />
      {/* Content */}
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {"How to Use Find My Vax"}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {"1. Type in your zip code if you would like to sort appointments by distance to you."}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {'2. Scroll down to check near-real-time availability under "Available Appointments" and check if any appointments fit your schedule.'}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {"3. If you find an appointment that matches your schedule, click on the relevant green button."}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {"4. Once you click the link, a pop-up window will show with additional instruction and a green continue button to go to the relevant site and follow the instructions on the site to sign up."}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {'5. If no appointments fit your schedule, click "Possible Availability" and check appointments on an individual basis.'}
        </Typography>
        <Typography variant="h4" className={styles.info}>
          {"If you have any questions contact us at sc@findmyvaxla.com"}
        </Typography>
      </div>
    </>
  );
}
