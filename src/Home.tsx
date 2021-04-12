import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ResponsiveNavBar from "./components/ResponsiveNavBar";

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
  subtitle: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  info: {
    maxWidth: 500,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  supportDisclaimer: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  }
}));

export default function Home() {
  const styles = useStyles();

  return (
    <>
    <ResponsiveNavBar value={0} />
      {/* Content */}
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {"Welcome to Find My Vax Santa Clara"}
        </Typography>
        <Typography variant="h4" className={styles.subtitle}>
          {"A Vaccine Locator for Santa Clara County"}
        </Typography>
        <Typography className={styles.info} variant="h6">
          {"You are eligible for vaccination if you are age 16+!"}
        </Typography>
        <Typography className={styles.info} variant="subtitle1">
          <strong>
            {"COVID-19 vaccines are free regardless of insurance or immigration status."}
          </strong>{" "}
          {"You will not be asked about your immigration status when you get a COVID vaccine. For more information see COVID-19 Vaccine FAQs"}
        </Typography>
        <Typography className={styles.supportDisclaimer}>
          <em><strong>{"Notes: "}</strong>{"At this time we support the Santa Clara County sites, CVS, Rite Aid, Walgreens, and Walmart. We have limited availability support for Safeway. There may be false positives. We are working to continually add more support."}</em>
        </Typography>
      </div>
    </>
  );
}
