import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    marginTop: 50,
    textAlign: "center",
    padding: 20,
  },
  footerText: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

export default function Footer() {
  const styles = useStyles();

  return (
    <AppBar position="static" color="primary" className={styles.footer}>
      <Container>
        <Toolbar>
          <div>
            <Typography
              variant="h6"
              color="inherit"
              className={styles.footerText}
            >
              Disclaimer
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              className={styles.footerText}
            >
              {
                'findmyvaxsc.com does not provide medical advice and all content, including text, graphics, images and information, contained on or available through this web site is for general information purposes only. All data on this site is expressly provided "AS IS". findmyvaxsc.com makes no warranty of any kind, express or implied, concerning this information, including but not limited to any warranties of merchantability or fitness for any particular purpose. findmyvaxsc.com assumes no responsibility or legal liability concerning the Data’s accuracy, reliability, completeness, timeliness, or usefulness. Users assume the risk of using this Data and shall have no remedy at law or equity against findmyvaxsc.com or any related entity in case the Data provided is inaccurate, incomplete or otherwise defective in any way.'
              }
            </Typography>
            <Typography
              variant="body1"
              color="inherit"
              className={styles.footerText}
            >
              © 2021 Find My Vax Santa Clara
            </Typography>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
