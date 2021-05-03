import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Footer from "./components/Footer";
import searchImage from "./assets/searchbar.png";
import apptImage from "./assets/availappts-02.png";
import possibleImage from "./assets/possible.png";
import papptImage from "./assets/pappt.png";
import { useTranslation, Trans } from "react-i18next";

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
  searchImage: {
    width: "400px",
  },
  apptImage: {
    width: "400px",
  },
  possibleImage: {
    maxWidth: "400px",
  },
  papptImage: {
    maxWidth: "400px",
  },
}));

export default function HowToUse(): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
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
          {t("How to Use Find My Vax")}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>1.</strong> {t("howToUse1")}
          {/* Search Bar Image*/}
          <div>
            <img src={searchImage} className={styles.searchImage}></img>
          </div>
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>2.</strong>{" "}
          <Trans i18nKey="howToUse2">
            Scroll down to <strong>Possible Availibilty</strong> to check...
          </Trans>
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>3.</strong> {t("howToUse3")}
        </Typography>
        {/* Appointments Image*/}
        <div>
          <img src={apptImage} className={styles.apptImage}></img>
        </div>
        <Typography variant="body1" className={styles.info}>
          <strong>4.</strong> {t("howToUse4")}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <strong>5.</strong>{" "}
          {/*{"If no appointments fit your schedule, click "}
          <strong>{`"Possible Availability"`}</strong>{" "}
          {" button and check appointments on an individual basis."} */}
          <Trans i18nKey="howToUse5">
            If no appointment fit yout schedule, click{" "}
            <strong>Possible Availability</strong> and ...
          </Trans>
        </Typography>
        {/* Possible Appointments*/}
        <div>
          <img src={possibleImage} className={styles.possibleImage}></img>
        </div>
        {/* Possible Appointments Image*/}
        <div>
          <img src={papptImage} className={styles.papptImage}></img>
        </div>
        <Typography variant="h6" className={styles.info}>
          {t("If you have any questions contact us at")}
          <Link href="mailto:help@findmyvaxsc.com" target="_blank">
            {" "}
            help@findmyvaxsc.com
          </Link>
        </Typography>
      </Container>
      <Footer />
    </>
  );
}
