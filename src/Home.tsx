import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LocationCard from "./components/LocationCard";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { sampleData } from "./sample";

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
  }
}));

interface LocationCardProps {
  time_past: string;
  last_good: string;
  id: string;
  x_parent: string;
  organization: string;
  name: string;
  addr1: string;
  addr2: string;
  vaccines: string;
  map_zoom: string;
  link: string;
  residents: any; //
  comments: string;
  lat_loc: string;
  long_loc: string;
  category: string;
  last_check: string;
  current_uuid_set: string;
  appointment_list: AppointmentProps[];
  distance: number;
  reported_as_not_available: boolean;
  add_eligible: string; //
  eligible: string; //
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

  return (
    <>
      <ResponsiveNavBar value={0} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {"Welcome to Find My Vax Santa Clara"}
        </Typography>
        <Typography variant="h4" className={styles.subtitle}>
          {"A Vaccine Locator for Santa Clara County"}
        </Typography>
        <Typography className={styles.info} variant="h6">
          {"You are eligible for vaccination if you are 16 and older!"}
        </Typography>
        <Typography className={styles.info} variant="subtitle1">
          <strong>
            {
              "COVID-19 vaccines are free regardless of insurance or immigration status."
            }
          </strong>{" "}
          {
            "You will not be asked about your immigration status when you get a COVID vaccine. For more information see COVID-19 Vaccine FAQs"
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
            Find My Vaccine!
          </Button>
        </ScrollLink>

        <Typography className={styles.supportDisclaimer}>
          <em>
            <strong>{"Notes: "}</strong>
            {
              "At this time we support the Santa Clara County sites, CVS, Rite Aid, Walgreens, and Walmart. We have limited availability support for Safeway. There may be false positives. We are working to continually add more support."
            }
          </em>
        </Typography>
        <Divider className={styles.divider} />
        <Typography
          variant="h4"
          className={styles.subtitle}
          id="apointmentsTop"
        >
          {"Available Apointments"}
        </Typography>
        {/* Search */}
        <div className={styles.searchArea}>
          <TextField
            id="input-with-icon-textfield"
            className={styles.search}
            label="Search by Zipcode"
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
            Search Locations
          </Button>
        </div>

        <Grid container spacing={2} className={styles.grid}>
          {/* <Grid item xs={12} sm={6}>
            <LocationCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocationCard />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <Typography>Text</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Text</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Text</Typography>
          </Grid> */}
          {sampleData.available.list.map((location, key) => {
            let locationDetails = location as LocationCardProps;
            return (
              <Grid item xs={12} sm={6}>
                <LocationCard {...location} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}