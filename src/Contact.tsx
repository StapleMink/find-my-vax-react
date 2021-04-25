import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

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
  contact_list: {
    maxWidth: 200,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  contactGrid: {
    marginTop: 20,
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Contact() {
  const styles = useStyles();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  return (
    <>
      <ResponsiveNavBar value={4} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {"Contact"}
        </Typography>
        <Typography variant="h6" className={styles.info}>
          {
            "If you have any other questions or concerns, please contact us through the options below: "
          }
        </Typography>
        <List
          component="nav"
          aria-label="contact us list"
          className={styles.contact_list}
        >
          <ListItem>
            <Link href="https://twitter.com/findmyvaxsc" target="_blank">
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText primary="Twitter: @findmyvaxsc"></ListItemText>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="sc@findmyvaxla.com" target="_blank">
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email: sc@findmyvaxla.com"></ListItemText>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/findmyvaxsc" target="_blank">
              <ListItemIcon>
                <InstagramIcon />
              </ListItemIcon>
              <ListItemText primary="Instagram: @findmyvaxsc"></ListItemText>
            </Link>
          </ListItem>
        </List>
        {/* <div className={styles.contactGrid}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={4}>
              <EmailIcon />
              <Typography>sc@findmyvaxla.com</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <TwitterIcon />
              <Typography>@findmyvaxsc</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <InstagramIcon />
              <Typography>@findmyvaxsc</Typography>
            </Grid>
          </Grid>
        </div> */}
      </Container>
    </>
  );
}
