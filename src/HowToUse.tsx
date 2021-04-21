import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  },
}));

export default function HowToUse() {
  const styles = useStyles();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  return (
    <>
      <ResponsiveNavBar value={1} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {"How to Use Find My Vax"}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>1.</strong>{" "}
          {
            "Type in your zip code if you would like to sort appointments by distance to you."
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>2.</strong>{" "}
          {
            'Scroll down to check near-real-time availability under "Available Appointments" and check if any appointments fit your schedule.'
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>3.</strong>{" "}
          {
            "If you find an appointment that matches your schedule, click on the relevant green button."
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>4.</strong>{" "}
          {
            "Once you click the link, a pop-up window will show with additional instruction and a green continue button to go to the relevant site and follow the instructions on the site to sign up."
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>5.</strong>{" "} {"If no appointments fit your schedule, click "}
          <strong>{`"Possible Availability"`}</strong>{" "}
          {" button and check appointments on an individual basis."}
        </Typography>
        <Typography variant="h6" className={styles.info}>
          {"If you have any questions contact us at "}
          <Link href="mailto:press@findmyvaxsc.com" target="_blank">
            press@findmyvaxsc.com
          </Link>
        </Typography>
      </Container>
    </>
  );
}
