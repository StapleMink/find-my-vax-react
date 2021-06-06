import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Footer from "./components/Footer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { grey } from "@material-ui/core/colors";
import { useTranslation, Trans } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    // textAlign: "center",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
  },
  subheader: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  faqs_list: {
    marginTop: 20,
  },
  faqs_sc: {
    textAlign: "left",
  },
  accord: {
    backgroundColor: grey[100],
  },
  listAcord: {
    width: "100%",
  },
}));

export default function Resources(): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  return (
    <>
      <ResponsiveNavBar value={2} />

      <Container maxWidth="lg">
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc' }} /> */}
        {/* Content */}
        <div className={styles.content}>
          <Typography
            variant={!isMobilePortrait ? "h2" : "h3"}
            className={styles.title}
          >
            {t("Resources")}
          </Typography>
          <Typography variant="h6" className={styles.subheader}>
            {t("resources0")}
          </Typography>
          {/* TODO: vertical tabs */}

          <div></div>

          <Accordion className={styles.accord} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="vaccine-locations-content"
              id="vaccine-locations-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                {t("resources1Title1")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li color="primary.main">{t("resources1Subtitle1")}</li>
                <ul>
                  <li>
                    {`${t("Website")} `}
                    <Link href="https://vax.sccgov.org" target="_blank">
                      https://vax.sccgov.org
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    {`${t("Phone Number")} `}
                    <Link href="tel:4089702000" target="_blank">
                      (408) 970-2000
                    </Link>
                  </li>
                  <ul>
                    <li>
                      <strong>{t("contactNotes")}</strong>
                    </li>
                  </ul>
                </ul>
                <ul>
                  <li>{t("Locations")}</li>
                  <ul>
                    <li>Berger Auditorium</li>
                    <li>Levi’s Stadium</li>
                    <li>Fairgrounds Expo Hall</li>
                    <li>Mountain View Community Center</li>
                    <li>Gilroy High School</li>
                    <li>Valley Health Center East Valley</li>
                    <li>Valley Health Center Tully</li>
                    <li>Valley Speciality Center</li>
                    <li>Emmanuel Baptist Church</li>
                    <li>
                      <strong>
                        <Trans i18nKey="locationNotes">
                          Note: If you are younger than 18 years old, you can only get
                          vaccinated at{" "}
                          <span>
                            Levis Stadium, Fairgrounds Expo Hall, Gilroy High
                            School, and Mountain View Community Center
                          </span>
                        </Trans>
                      </strong>
                    </li>
                  </ul>
                </ul>

                <li>{t("resources1Subtitle2")}</li>
                <ul>
                  <li>
                    <Link
                      href="https://www.cvs.com/immunizations/covid-19-vaccine"
                      target="_blank"
                    >
                      CVS
                    </Link>
                    ,
                    <Link
                      href="https://www.riteaid.com/covid-vaccine-apt"
                      target="_blank"
                    >
                      {" "}
                      Rite Aid
                    </Link>
                    ,
                    <Link
                      href="https://www.walgreens.com/findcare/vaccination/covid-19/location-screening"
                      target="_blank"
                    >
                      {" "}
                      Walgreens
                    </Link>{" "}
                    ({t("need account")}),
                    <Link
                      href="https://www.walmart.com/cp/1228302"
                      target="_blank"
                    >
                      {" "}
                      Walmart
                    </Link>{" "}
                    ({t("need account")})
                  </li>
                  <li>
                    <strong>{t("pharamacyTip")}</strong>
                  </li>
                </ul>

                <li>{t("resources1Subtitle3")}</li>
                <ul>
                  <li>Kaiser</li>
                  <li>Stanford</li>
                  <li>Sutter Health</li>
                  <li>
                    <strong>{t("hospitalNotes")}</strong>
                  </li>
                </ul>

                <li>{t("resources1Subtitle4")}</li>
                <ul>
                  <li>VA Hospital: {t("specialGroup1")}</li>
                  <li>Stanford Children’s Hospital: {t("specialGroup2")}</li>
                  <li>
                    Community clinics: {t("specialGroup3")}.{" "}
                    <strong>{t("specialGroup3-1")}</strong>
                  </li>
                </ul>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accord}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="vaccine-faq-content"
              id="vaccine-faq-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                {t("resources2Title1")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={styles.faqs_list}>
                <ListItem>
                  <Link
                    href="https://covid19.sccgov.org/covid-19-vaccine-information#3925188384-982666580"
                    target="_blank"
                  >
                    {t("resources2Subtitle1")}
                  </Link>
                </ListItem>
                {/* FAQ Missing/Removed */}
                <ListItem>
                  <Link
                    href="https://www.sfchronicle.com/local/article/find-schedule-california-COVID-vaccine-appointment-16062302.php"
                    target="_blank"
                  >
                    {t("resources2Subtitle2")}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://www.sfchronicle.com/local/article/Your-COVID-vaccine-card-What-to-do-if-you-lose-16070378.php"
                    target="_blank"
                  >
                    {t("resources2Subtitle3")}
                  </Link>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accord}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="useful-links-content"
              id="useful-links-header"
            >
              <Typography variant="h5" className={styles.subheader}>
                {t("resources3Title1")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={styles.faqs_list}>
                <ListItem>
                  <ListItemText>
                    <Link
                      href="https://www.sccgov.org/sites/covid19/Pages/COVID19-vaccine-information-for-public.aspx"
                      target="_blank"
                    >
                      {t("resources3Item1Title")}
                    </Link>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <Link href="https://vaccinefairy.org/" target="_blank">
                      {t("resources3Item2Title")}
                    </Link>{" "}
                    {t("resources3Item2Caption")}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <Link
                      href="https://www.vta.org/blog/vta-offers-free-rides-covid-vaccination-sites"
                      target="_blank"
                    >
                      {t("resources3Item3Title")}
                    </Link>{" "}
                    {t("resources3Item3Caption")}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <Link href="https://shotoclock.io/" target="_blank">
                      {t("resources3Item4Title")}
                    </Link>{" "}
                    {t("resources3Item4Caption")}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <Link href="https://itsmyshot.weebly.com" target="_blank">
                      {t("resources3Item5Title")}
                    </Link>{" "}
                    {t("resources3Item5Caption")}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <Link href="https://www.getmyvaccine.org" target="_blank">
                      {t("resources3Item6Title")}
                    </Link>{" "}
                    {t("resources3Item6Caption")}
                  </ListItemText>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
      <Footer />
    </>
  );
}
