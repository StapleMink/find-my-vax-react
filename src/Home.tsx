import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Footer from "./components/Footer";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LocationCard from "./components/LocationCard";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link as ScrollLink } from "react-scroll";
// { animateScroll as scroll } from "react-scroll";
// import { sampleData } from "./sample";
import axios from "axios";
import Lottie from 'react-lottie';
import animation from "./animations/loading-vaccine.json";
import { useTranslation } from 'react-i18next';

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
    maxWidth: 1000,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  supportDisclaimer: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  divider: {
    color: theme.palette.primary.main,
    marginTop: 20,
  },
  grid: {
    marginTop: 50,
  },
  findVaxButton: {
    marginTop: 10,
  },
  searchArea: {
    width: "100%",
    maxWidth: 1000,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
  search: {
    width: "100%",
  },
  searchButton: {
    marginTop: 20,
  },
  availiblityHeader: {
    marginTop: 50,
  },
  loading: {
    marginTop: 50,
  },
  loadingCaption: {
    marginTop: 20,
  }
}));

interface AppointmentAPIProps {
  available: LocationCardProps[];
  unknown: LocationCardProps[];
  not_available: LocationCardProps[];
}

interface LocationCardProps {
  last_check_message: string;
  last_check_date: string;
  last_time_available_date: string;
  last_time_available_message: string;
  id: string;
  x_parent: string;
  organization: string;
  name: string;
  addr1: string;
  addr2: string;
  vaccines: string | undefined;
  map_zoom: string;
  link: string;
  comments: string | undefined;
  lat_loc: string;
  long_loc: string;
  category: string;
  current_uuid_set: string;
  appointment_list: AppointmentProps[];
  distance: number;
  notes: string | undefined;
  warning_tier: number;
}

interface AppointmentProps {
  date_str: string;
  link_appointment: string;
  appointment_num: number;
  updated_date: string;
  id: number;
}

export default function Home() {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  const [appointments, setAppointments] = useState<AppointmentAPIProps | undefined>(undefined);

  useEffect(() => {
    //Get Appointment Details
    axios
      .get("/api/v2.0/appointments/results.json")
      .then((response) => {
        const serverResponse = response.data.data;
        console.log(serverResponse);
        setAppointments(serverResponse);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  //Lottie Animation Options
  const options = {
    loop: true,
    autoplay: true, 
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <ResponsiveNavBar value={0} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {t("Welcome to Find My Vax Santa Clara")}
        </Typography>
        <Typography variant="h4" className={styles.subtitle}>
          {t("A Vaccine Locator for Santa Clara County")}
        </Typography>
        <Typography className={styles.info} variant="h6">
          {t("You are eligible for vaccination if you are 16 and older!")}
        </Typography>
        <Typography className={styles.info} variant="subtitle1">
          <strong>
            {
              t("COVID-19 vaccines are free regardless of insurance or immigration status.")
            }
          </strong>{" "}
          {
            t("You will not be asked about your immigration status when you get a COVID vaccine. For more information see COVID-19 Vaccine FAQs")
          }
        </Typography>
        <ScrollLink
          to="apointmentsTop"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.findVaxButton}
          >
            {t("Find My Vaccine!")}
          </Button>
        </ScrollLink>

        <Typography className={styles.supportDisclaimer}>
          <em>
            <strong>{t("Notes")}: </strong>
            {
              t("At this time we support the Santa Clara County sites, CVS, Rite Aid, Walgreens, and Walmart. We have limited availability support for Safeway. There may be false positives. We are working to continually add more support.")
            }
          </em>
        </Typography>
        <Divider className={styles.divider} />
        <Typography
          variant="h4"
          className={styles.subtitle}
          id="apointmentsTop"
        >
          {t("Find Apointments")}
        </Typography>
        {/* Search */}
        <div className={styles.searchArea}>
          <TextField
            id="input-with-icon-textfield"
            className={styles.search}
            label={t("Search by Zipcode")}
            placeholder="95014"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.searchButton}
            startIcon={<SearchIcon />}
          >
            {t("Search Locations")}
          </Button>
        </div>

        {/* Show Appointments and Loading */}
        {appointments === undefined ? (
          <div className={styles.loading}>
            <Lottie options={options}
              height={200}
              width={200}
              isStopped={false}
            />
            <Typography variant="h5" className={styles.loadingCaption}>{t("Loading Appointments!")}</Typography>
          </div>
        ) : (
          <>
            {/* Available */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="apointmentsTop"
            >
              {t("Available Appointments") + ":"}
            </Typography>
            <Grid container spacing={2} className={styles.grid}>
              {appointments.available.map(
                (location: LocationCardProps, key) => {
                  return (
                    <Grid item xs={12} sm={6} key={`grid-avlb-location-card-${key}`}>
                      <LocationCard availability={"available"} {...location}/>
                    </Grid>
                  );
                }
              )}
            </Grid>
            {/* Unknown */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="apointmentsTop"
            >
              {t("Possible Availability") + ":"}
            </Typography>
            <Grid container spacing={2} className={styles.grid}>
              {appointments.unknown.map(
                (location: LocationCardProps, key) => {
                  return (
                    <Grid item xs={12} sm={6} key={`grid-unkn-location-card-${key}`}>
                      <LocationCard availability={"unknown"} {...location}/>
                    </Grid>
                  );
                }
              )}
            </Grid>
            {/* Unavailable */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="apointmentsTop"
            >
              {t("No Appointments Available") + ":"}
            </Typography>
            <Grid container spacing={2} className={styles.grid}>
              {appointments.not_available.map(
                (location: LocationCardProps, key) => {
                  return (
                    <Grid item xs={12} sm={6} key={`grid-navlb-location-card-${key}`}>
                      <LocationCard availability={"unavailable"} {...location}/>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </>
        )}
      </Container>
      <Footer/>
    </>
  );
}
