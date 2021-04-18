import React from "react";
import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LaunchIcon from "@material-ui/icons/Launch";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import ShareIcon from '@material-ui/icons/Share';
import clsx from "clsx";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  },
  unknownCard: {
    borderTop: "4px solid orange",
  },
  unavailableCard: {
    borderTop: "4px solid red",
  },
  media: {
    height: 140,
  },
  innerBadgeLeft: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
    // backgroundColor: "#4a4a4a",
    // color: "white",
    backgroundColor: "#FFF",
    color: "black",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  innerBadgeRight: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
    // backgroundColor: "#4a4a4a",
    // color: "white",
    backgroundColor: "#FFF",
    color: "black",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

interface LocationCardProps {
// Extra
  availability:string
// End Extra
  last_check_message: string;
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

const GreenButton = withStyles((theme: Theme) => ({
  root: {
    //color: theme.palette.getContrastText(green[500]),
    //backgroundColor: green[500],
    borderColor: green[600],
    color: green[700],
    "&:hover": {
      backgroundColor: green[100],
    },
  },
}))(Button);

export default function LocationCard(props: LocationCardProps) {
  const styles = useStyles();

  return (
    <Card className={clsx({[styles.root] : true, 
                            [styles.unknownCard] : props.availability === "unknown", 
                            [styles.unavailableCard] : props.availability === "unavailable"})}>
      {props.distance === -1 ? (
        <></>
      ) : (
        <div className={styles.innerBadgeLeft}>
          <Typography variant="caption">
            <strong>{props.distance} Miles Away</strong>
          </Typography>
        </div>
      )}

      {props.vaccines === "" ? (
        <></>
      ) : (
        <div className={styles.innerBadgeRight}>
          <Typography variant="caption">
            <strong>{props.vaccines}</strong>
          </Typography>
        </div>
      )}
      <CardActionArea>
        {props.availability === "available" ?
        (<CardMedia
          className={styles.media}
          image="https://stanfordhealthcare.org/content/dam/SHC/newsroom/press-releases/2019/new-stanford-hospital-opens.jpg"
          title={props.name}
        />)
        :
        (<></>)
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.addr1}
            <br />
            {props.addr2}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Show available apointments */}
        <Grid container spacing={1}>
          {props.appointment_list.map((appointment:AppointmentProps, apptKey) => {
            return (
              <Grid item xs={12} key={`${props.id}-appt-${apptKey}`}>
                <Typography>
                  <strong>{appointment.date_str}:</strong>
                </Typography>
                <Tooltip arrow title="Book Apointment" placement="bottom">
                  <GreenButton variant="outlined" endIcon={<LaunchIcon />}>
                    {`${appointment.appointment_num} Apointment${appointment.appointment_num > 1 ? "s" : ""} Available`}
                  </GreenButton>
                </Tooltip>
              </Grid>
            );
          })}
          {/* <Grid item xs={12}>
            <Typography>
              <strong>April 13, 2021:</strong>
            </Typography>
            <Tooltip arrow title="Book Apointment" placement="bottom">
              <GreenButton variant="outlined" endIcon={<LaunchIcon />}>
                31+ Apointments Available
              </GreenButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>April 14, 2021:</strong>
            </Typography>
            <GreenButton variant="outlined" endIcon={<LaunchIcon />}>
              351+ Apointments Available
            </GreenButton>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>April 15, 2021:</strong>
            </Typography>
            <GreenButton variant="outlined" endIcon={<LaunchIcon />}>
              2+ Apointments Available
            </GreenButton>
          </Grid> */}
        </Grid>
      </CardActions>
      <CardActions>
        <Button startIcon={<ShareIcon />} size="small" color="primary" component={Link} href={`sms:&body=I found a vaccine appointments at ${props.name}! Located at: ${props.addr1}, ${props.addr2}. Book it here: ${props.link}`} >
          Share
        </Button>
      </CardActions>
      <Divider />
      <CardActions>
        <Typography variant="caption">Last Updated: {props.last_check_message}</Typography>
      </CardActions>
    </Card>
  );
}
