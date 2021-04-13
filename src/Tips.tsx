import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { AutorenewTwoTone } from "@material-ui/icons";

// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AddIcon from '@material-ui/icons/Add';

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
  subheader: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  faqs_list: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Tips() {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ResponsiveNavBar value={1} />
      {/* Content */}
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {"Tips"}
        </Typography>
        <Typography variant="h6" className={styles.subheader}>
          {"Have questions or want additional information or resources on the COVID-19 vaccine? Read below for more."}
        </Typography>


        <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Table of Contents (click to see)
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Where You Can Get Vaccinated in Santa Clara County" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="FAQs on the COVID-19 Vaccine" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Other Useful Links" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Santa Clara County Dashboard" />
        </StyledMenuItem>
      </StyledMenu>
    </div>


        {/* <Typography variant="h5" className={styles.subheader}>
          {"Where You Can Get Vaccinated in Santa Clara County"}
        </Typography> */}
        <Typography variant="h5" className={styles.subheader}>
          <Link href="vax_locations">Where You Can Get Vaccinated in Santa Clara County</Link>
          </Typography>
          <dl>
            <dt color="primary.main">Santa Clara County Official Vaccination Sites</dt>
            <dd>Website: <Link href="https://vax.sccgov.org" target="_blank">https://vax.sccgov.org</Link></dd>
            <dt>Phone Number: (408)970-2000</dt>
            <dd>NOTE: Only call if you NEED to! Wait times might be long, and we don't want to overwhelm
              the already-overwhelmed call system!</dd>
            <dt>Locations:</dt>
            <dd>Berger Auditorium</dd>
            <dd>Levi’s Stadium</dd>
            <dd>Fairgrounds Expo Hall</dd>
            <dd>Mountain View Community Center</dd>
            <dd>Gilroy High School</dd>
            <dd>Valley Health Center East Valley</dd>
            <dd>Valley Health Center Tully</dd>
            <dd>Valley Speciality Center</dd>
            <dd>Emmanuel Baptist Church</dd>
            <dt>Local Pharmacies:</dt>
            <dd><Link href="https://www.cvs.com/immunizations/covid-19-vaccine" target="_blank">CVS</Link>, 
            <Link href="https://www.riteaid.com/covid-vaccine-apt" target="_blank"> Rite Aid</Link>, 
            <Link href="https://www.walgreens.com/findcare/vaccination/covid-19/location-screening" target="_blank"> Walgreens</Link> (need account), 
            <Link href="https://www.walmart.com/cp/1228302" target="_blank"> Walmart</Link> (need account), etc.</dd>
            <dd>TIP: for CVS, appointments are generally added from 12am to 1am</dd>
            <dt>Local Hospitals (call if you’re not a patient, may need to make an account):</dt>
            <dd>Kaiser</dd>
            <dd>Stanford</dd>
            <dd>Sutter Health</dd>
            <dd>Other hospitals have vaccines, but availability is low</dd>
            <dt>Locations for Specific Groups:</dt>
            <dd>VA Hospital: specifically for veterans</dd>
            <dd>Stanford Children’s Hospital: specifically for those 16-17</dd>
            <dd>Community clinics: specifically for local residents. <strong>Do not go if you are not from that community.</strong></dd>
          </dl>

          <Typography variant="h5" className={styles.subheader}>
          <Link href="faqs">FAQs on the COVID-19 Vaccine</Link>
          </Typography>
          <List className={styles.faqs_list}>
            <ListItem><Link href="http://publichealth.lacounty.gov/media/Coronavirus/docs/about/FAQ-Vaccine.pdf" target="_blank">
            LA County FAQs about the Vaccine</Link>
            </ListItem>
            <ListItem><Link href="https://www.sfchronicle.com/local/article/find-schedule-california-COVID-vaccine-appointment-16062302.php" target="_blank">
            Scheduling a COVID Vaccine Appointment in the Bay Area</Link>
            </ListItem>
            <ListItem><Link href="https://www.sfchronicle.com/local/article/Your-COVID-vaccine-card-What-to-do-if-you-lose-16070378.php" target="_blank">
            On Your COVID Vaccine Card </Link>
            </ListItem>
          </List>
          <Typography variant="h5" className={styles.subheader}>
            <Link href="otherlinks">Other Useful Links</Link>
          </Typography>
          <List className={styles.faqs_list}>
            <ListItem><Link href="https://www.sccgov.org/sites/covid19/Pages/COVID19-vaccine-information-for-public.aspx" target="_blank">
            Santa Clara Official Vaccine Site</Link>
            </ListItem>
            <ListItem><Link href="https://vaccinefairy.org/" target="_blank">
            Vaccine Fairy: </Link>
            <ListItemText primary="sign up to have someone book your appointment" />
            </ListItem>
            <ListItem><Link href="https://www.vta.org/blog/vta-offers-free-rides-covid-vaccination-sites" target="_blank">
            VTA Info on Transportation to Vaccination Sites </Link>
            <ListItemText primary=" (free transportation options to vaccination sites and bus route information)" />
            </ListItem>
            <ListItem><Link href="https://shotoclock.io/" target="_blank">
            Shot O' Clock: </Link>
            <ListItemText primary=" get notifications about pharmacy appointments on your email or phone" />
            </ListItem>
            <ListItem><Link href="https://itsmyshot.weebly.com" target="_blank">
            It's My Shot: </Link>
            <ListItemText primary=" more Bay Area-specific information" />
            </ListItem>
            <ListItem><Link href="https://www.getmyvaccine.org" target="_blank">
            Get My Vaccine: </Link>
            <ListItemText primary=" more vaccine info on pharmacies" />
            </ListItem>
          </List>
          <Typography variant="h5" className={styles.subheader}>
            <Link href="dashboard">Santa Clara County Dashboard</Link>
          </Typography>
          <Typography variant="subtitle1" className={styles.subheader}>
            {"Not compatible on phone or mobile devices, but below are dashboards that go into more detail about vaccine distribution in Santa Clara County"}
          </Typography>
      </div>
    </>
  );
}
