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
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
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
    <Card className={styles.root}>
      {props.distance === 0 ? (
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
        <CardMedia
          className={styles.media}
          image="https://stanfordhealthcare.org/content/dam/SHC/newsroom/press-releases/2019/new-stanford-hospital-opens.jpg"
          title={props.name}
        />
        {/* <Typography variant="caption"><strong>4.5 Miles Away</strong></Typography> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* Mountain View Community Center */}
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* 201 S Rengstorff Ave */}
            {props.addr1}
            <br />
            {/* Mountain View, CA 94040 */}
            {props.addr2}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Show available apointments */}
        <Grid container spacing={1}>
          {props.appointment_list.map((appointment:AppointmentProps, apptKey) => {
            return (
              <Grid item xs={12}>
                <Typography>
                  <strong>{appointment.date_str}:</strong>
                </Typography>
                <Tooltip arrow title="Book Apointment" placement="bottom">
                  <GreenButton variant="outlined" endIcon={<LaunchIcon />}>
                    {appointment.appointment_num} Apointments Available
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
        <Button size="small" color="primary">
          Share
        </Button>
        <a href={"sms:&body=I found a vaccine appointments at " + props.name + "! Book it here: " + props.link}>Share</a>
      </CardActions>
      <Divider />
      <CardActions>
        <Typography variant="caption">Last Updated: {props.time_past}</Typography>
      </CardActions>
    </Card>
  );
}
