import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';

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
  }
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
        <Typography variant="h6" className={styles.info}>
          {"If you have any other questions or concerns, please contact us through the options below: "}
        </Typography>
        <List component="nav" aria-label="contact us list" className={styles.contact_list}>
          <ListItem>
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary="Twitter: @findmyvaxsc"></ListItemText>
            {/* <Link href="https://twitter.com/findmyvaxsc" target="_blank"></Link> */}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email: sc@findmyvaxla.com"></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InstagramIcon />
            </ListItemIcon>
            <ListItemText primary="Instagram: @findmyvaxsc"></ListItemText>
          </ListItem>
        </List>
      </div>
    </>
  );
}
