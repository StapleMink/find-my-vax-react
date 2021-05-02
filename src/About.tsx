import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import sfChronicle from "./assets/sfChronicle.png";
import spotlight from "./assets/spotlightlogo.png";
import laTimes from "./assets/latimes.png";
import Footer from "./components/Footer";
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
    marginLeft: 10,
    marginRight: 10,
  },
  info: {
    maxWidth: 1000,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  funds_list: {
    maxWidth: 1000,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  pressLogoGrid: {
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  pressLogoGridItem: {},
  pressLogoImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
  },
  pressLogo: {
    height: 100,
    position: "relative",
  },
}));

export default function About(): JSX.Element {
  const styles = useStyles();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");
  const { t } = useTranslation();

  return (
    <>
      <ResponsiveNavBar value={3} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {t("About")}
        </Typography>
        <Typography variant="body1" className={styles.info}>
        <Trans i18nKey="about1">
          Find My Vax Santa Clara was created as a branch off of parent site 
          <Link href="https://www.findmyvaxla.com/" target="_blank">
            Find My Vax LA
          </Link>
          to help eligible Santa Clara residents receive COVID-19 vaccines by centralizing vaccination availability.
          </Trans>
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <Trans i18nKey="about2">
          The project was developed by 
          <Link
            href="https://www.linkedin.com/in/daniel-budziwojski-559b15168/"
            target="_blank"
          >
            Daniel Budziwojski
          </Link>
           and 
          <Link href="https://www.linkedin.com/in/jjessica-li/" target="_blank">
            Jessica Li
          </Link>
           in collaboration with 
          <Link
            href="https://www.linkedin.com/in/andrew-friedman4/"
            target="_blank"
          >
            Andrew Friedman
          </Link>
          from parent site Find My Vax LA.
          </Trans>
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {t("about3")}
        </Typography>
        <Typography variant="h4" className={styles.title}>
          {t("In The News")}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <Trans i18nKey="about4">
            Find My Vax Santa Clara has appeared in media outlets below. For media inquiries, email us at
          
          <Link href="mailto:press@findmyvaxsc.com" target="_blank">
            press@findmyvaxsc.com
          </Link>{" "}
          or direct message us on 
          <Link href="https://twitter.com/findmyvaxsc" target="_blank">
            Twitter
          </Link>.
          </Trans>
        </Typography>
        <div className={styles.pressLogoGrid}>
          <Grid spacing={4} container>
            <Grid item xs={6} md={4} className={styles.pressLogoGridItem}>
              <div className={styles.pressLogo}>
                <img
                    src={spotlight}
                    alt="San Jose Spotlight"
                    className={styles.pressLogoImg}
                  />
              </div>
            </Grid>
            <Grid item xs={6} md={4} className={styles.pressLogoGridItem}>
              <div className={styles.pressLogo}>
                <img
                  src={sfChronicle}
                  alt="San Francisco Chronicle"
                  className={styles.pressLogoImg}
                />
              </div>
            </Grid>
            <Grid item xs={6} md={4} className={styles.pressLogoGridItem}>
              <div className={styles.pressLogo}>
                <img
                    src={laTimes}                   
                    alt="LA Times"
                    className={styles.pressLogoImg}
                  />
              </div>
            </Grid>
          </Grid>
        </div>

        <Typography variant="h4" className={styles.title}>
          {t("Donate")}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {
            t("donate1")
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          <Link
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"
              target="_blank"
            >
              COVID Relief Fund
            </Link>{" "}
        </Typography>
        <Typography variant="body1" className={styles.info}>
            <Link
              href="https://impact.site/"
              target="_blank"
            >
              Impact Resources
            </Link>{" "}
        </Typography>
        <Typography variant="body1" className={styles.info}>
            <Link
              href="https://donate.givedirect.org/?cid=14711&n=272810/"
              target="_blank"
            >
              Stop AAPI Hate
            </Link>{" "}
        </Typography>
      </Container>
      <Footer />
    </>
  );
}
