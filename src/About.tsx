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

  return (
    <>
      <ResponsiveNavBar value={3} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {"About"}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {
            "Find My Vax Santa Clara was created as a branch off of parent site "
          }
          <Link href="https://www.findmyvaxla.com/" target="_blank">
            Find My Vax LA
          </Link>{" "}
          {
            "to help eligible Santa Clara residents receive COVID-19 vaccines by centralizing vaccination availability."
          }
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {"The project was originally developed by "}
          <Link
            href="https://www.linkedin.com/in/andrew-friedman4/"
            target="_blank"
          >
            Andrew Friedman
          </Link>{" "}
          {
            "from Find My Vax LA, with Santa Clara county-specific features added by "
          }
          <Link
            href="https://www.linkedin.com/in/daniel-budziwojski-559b15168/"
            target="_blank"
          >
            Daniel Budziwojski
          </Link>{" "}
          {"and"}{" "}
          <Link href="https://www.linkedin.com/in/jjessica-li/" target="_blank">
            Jessica Li
          </Link>
          {"."}
        </Typography>
        <Typography variant="h4" className={styles.title}>
          {"In The News"}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {
            "Find My Vax Santa Clara has appeared in media outlets below. For media inquiries, email us at "
          }
          <Link href="mailto:press@findmyvaxsc.com" target="_blank">
            press@findmyvaxsc.com
          </Link>{" "}
          {"or direct message us on "}
          <Link href="https://twitter.com/findmyvaxsc" target="_blank">
            Twitter
          </Link>
          {"."}
          <div className={styles.pressLogoGrid}>
            <Grid spacing={4} container>
              <Grid item xs={6} md={4} className={styles.pressLogoGridItem}>
                <div className={styles.pressLogo}>
                  {/* <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/1022px-American_Broadcasting_Company_Logo.svg.png"
                    }
                    alt="San Francisco Chronicle"
                    className={styles.pressLogoImg}
                  /> */}
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
                  {/* <img
                    src={
                      "https://cdn.abcotvs.net/abcotv/static/kgo/logos/kgo_logo_2x.png"
                    }
                    alt="San Francisco Chronicle"
                    className={styles.pressLogoImg}
                  /> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </Typography>
        <Typography variant="h4" className={styles.title}>
          {"Donate"}
        </Typography>
        <Typography variant="body1" className={styles.info}>
          {
            "We are not accepting donations at this time. Please consider donating in our names to an existing charity suggested by members of our team:"
          }
        </Typography>
        <List component="nav" className={styles.funds_list}>
          <ListItem>
            <ListItemText primary="Impact Resources: Impact Site provies a myriad of funds and causes you can support, from racial justice to COVID-19 relief" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Stop AAPI Hate - In response to the alarming escalation in xenophobia and bigotry resulting from the COVID-19 pandemic, the Asian Pacific Planning and Policy Council (A3PCON), Chinese for Affirmative Action (CAA), and the Asian American Studies Department of San Francisco State University launched the Stop AAPI Hate reporting center on March 19, 2020. The center tracks and responds to incidents of hate, violence, harassment, discrimination, shunning, and child bullying against Asian Americans and Pacific Islanders in the United States." />
          </ListItem>
          <ListItem>
            <ListItemText primary="COVID Relief Fund" />
          </ListItem>
        </List>
      </Container>
    </>
  );
}
