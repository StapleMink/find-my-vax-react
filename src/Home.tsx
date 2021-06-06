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
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { sampleData } from "./sample";
import axios from "axios";
import Lottie from "react-lottie";
import animation from "./animations/loading-vaccine.json";
import { useTranslation } from "react-i18next";
import { LocationCardProps } from "./types";

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
  subtitle: {
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
  supportDisclaimer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    // maxWidth: 700,
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
  },
  disclosureButtons: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
}));

interface AppointmentAPIProps {
  available: LocationCardProps[];
  unknown: LocationCardProps[];
  not_available: LocationCardProps[];
}

export default function Home(): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();
  const [showUnknown, setShowUnknown] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [zipcodeToSearch, setZipcodeToSearch] = useState("");
  const [appointments, setAppointments] = useState<
    AppointmentAPIProps | undefined
  >(undefined);
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  useEffect(() => {
    //Get Appointment Details
    axios
      .get(`/api/v2.0/appointments/results.json?zipcode=${zipcodeToSearch}`)
      .then((response) => {
        const serverResponse = response.data.data;
        console.log(serverResponse);
        setAppointments(serverResponse);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [zipcodeToSearch]);

  useEffect(() => {
    //Get Appointment Details
    axios.get("/api/v2.0/appointments/results.json").then((response) => {
      const serverResponse = response.data.data;
      setAppointments(serverResponse);
    });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  //Search
  function handleSearchClick(e: React.SyntheticEvent<Element>): void {
    e.preventDefault();
    if (zipcode.trim().length === 5) {
      const cleanZip = zipcode.trim();
      setZipcodeToSearch(cleanZip);
      setShowUnknown(false);
      setShowUnavailable(false);
    }
  }

  function onKeyPress(e: React.KeyboardEvent<Element>): void {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();
    handleSearchClick(e);
  }

  //Lottie Animation Options
  const options = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <ResponsiveNavBar value={0} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {t("homeTitle")}
        </Typography>
        <Typography
          variant={!isMobilePortrait ? "h4" : "h5"}
          className={styles.subtitle}
        >
          {t("homeSubtitle")}
        </Typography>
        <Typography className={styles.info} variant="h6">
          {t("homeSubtitle2")}
        </Typography>
        <Typography className={styles.info} variant="subtitle1">
          <strong>{t("homeCaptionStrong")}</strong> {t("homeCaptionWeak")}
        </Typography>
        <ScrollLink
          to="appointmentsTop"
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
            {t("supportText")}
          </em>
        </Typography>
        <Divider className={styles.divider} />
        <Typography
          variant="h4"
          className={styles.subtitle}
          id="appointmentsTop"
        >
          {t("Find Appointments")}
        </Typography>
        {/* Search */}
        <div className={styles.searchArea}>
          <TextField
            id="input-with-icon-textfield"
            className={styles.search}
            label={t("Search by Zipcode")}
            placeholder="95014"
            variant="outlined"
            value={zipcode}
            onChange={(e): void => {
              // console.log(zipcode);
              setZipcode(e.target.value);
            }}
            onKeyPress={onKeyPress}
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
            onClick={handleSearchClick}
            disabled={zipcode.trim().length !== 5}
          >
            {t("Search Locations")}
          </Button>
        </div>

        {/* Show Appointments and Loading */}
        {appointments === undefined ? (
          <div className={styles.loading}>
            <Lottie
              options={options}
              height={200}
              width={200}
              isStopped={false}
            />
            <Typography variant="h5" className={styles.loadingCaption}>
              {t("Loading Appointments!")}
            </Typography>
          </div>
        ) : (
          <>
            {/* Available */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="appointmentsTop"
            >
              {t("Available Appointments") + ":"}
            </Typography>
            <Grid container spacing={2} className={styles.grid}>
              {appointments.available.map(
                (location: LocationCardProps, key) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={`grid-avlb-location-card-${key}`}
                    >
                      <LocationCard {...location} />
                    </Grid>
                  );
                }
              )}
            </Grid>
            {/* Unknown */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="appointmentsTop"
            >
              {t("Possible Availability") + ":"}
            </Typography>
            {showUnknown ? (
              <>
                <Grid container spacing={2} className={styles.grid}>
                  {appointments.unknown.map((location: LocationCardProps) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={`grid-unkn-location-card-${location.id}`}
                      >
                        <LocationCard {...location} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                className={styles.disclosureButtons}
                onClick={() => {
                  setShowUnknown(true);
                }}
              >
                {t("Show Potentially Available Appointments")}
              </Button>
            )}
            {/* Unavailable */}
            <Typography
              variant="h4"
              className={styles.availiblityHeader}
              id="appointmentsTop"
            >
              {t("No Appointments Available") + ":"}
            </Typography>
            {showUnavailable ? (
              <>
                <Grid container spacing={2} className={styles.grid}>
                  {appointments.not_available.map(
                    (location: LocationCardProps) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={`grid-navlb-location-card-${location.id}`}
                        >
                          <LocationCard {...location} />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                className={styles.disclosureButtons}
                onClick={() => {
                  setShowUnavailable(true);
                }}
              >
                {t("Show Unavailable Appointments")}
              </Button>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
