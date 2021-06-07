import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
  footer: {
    marginTop: 50,
    textAlign: "center",
    padding: 20,
  },
  footerText: {
    marginTop: 10,
    marginBottom: 10,
  },
  copyright: {
    backgroundColor: "#162c50",
    // width: "100%",
    padding: 5,
    color: "white",
    // display: "flex",
    // alignItems: "center",
    // flexWrap: "wrap",
  },
  copyrightItem: {
    marginLeft: 7,
    marginRight: 7,
  },
  copyrightItemLink: {
    marginLeft: 7,
    marginRight: 7,
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "lightGrey",
    },
  },
}));

export default function Footer(): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <>
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
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={styles.copyright}>
        <Typography variant="caption" className={styles.copyrightItem}>
          © 2021 Find My Vax Santa Clara
        </Typography>
        |
        <Typography
          variant="caption"
          className={styles.copyrightItemLink}
          component={RouterLink}
          to="/status"
        >
          {t("Status")}
        </Typography>
        {/* <LinkIcon /> */}|
        <Typography
          variant="caption" 
          className={styles.copyrightItemLink}
          component={RouterLink}
          to="/contact"
        >
          {t("Contact")}
        </Typography>
        |
        <Typography
          variant="caption"
          className={styles.copyrightItemLink}
          component={Link}
          href="http://www.phrase.com"
        >
          Translation by Phrase
        </Typography>
      </div>
    </>
  );
}
