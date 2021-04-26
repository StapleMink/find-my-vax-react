import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import { useTranslation, Trans } from "react-i18next";
import { green, orange, red } from "@material-ui/core/colors";
import { LocationCardProps, AppointmentProps } from "../types";
import LocationDialog from "./LocationDialog";
import generic from "../assets/generic.jpg";
import cvsLogo from "../assets/cvsLogo.jpeg";
import walgreensLogo from "../assets/walgreensLogo.jpeg";
import riteAidLogo from "../assets/riteAidLogo.jpg";
import emmanuelChurch from "../assets/emmanuelChurch.jpg";
import eastValley from "../assets/eastValley.jpg";

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
  metadata: {
    display: "block",
    textAlign: "left",
  },
  warning: {
    // height: 50,\
  },
  low: {
    color: "green",
  },
  medium: {
    color: "orange",
  },
  high: {
    color: "red",
  },
  cardText: {
    display: "block",
    // width: "100%",
  },
});

const GreenButton = withStyles(() => ({
  root: {
    borderColor: green[600],
    color: green[700],
    "&:hover": {
      backgroundColor: green[100],
    },
  },
}))(Button);

const OrangeButton = withStyles(() => ({
  root: {
    borderColor: orange[700],
    color: orange[800],
    "&:hover": {
      backgroundColor: orange[100],
    },
  },
}))(Button);

const RedButton = withStyles(() => ({
  root: {
    borderColor: red[600],
    color: red[700],
    "&:hover": {
      backgroundColor: red[100],
    },
  },
}))(Button);

export default function LocationCard(props: LocationCardProps): JSX.Element {
  const styles = useStyles();
  const { t } = useTranslation();

  const last_checked_unit: string = props.last_check_unit;
  const last_checked_value: number = props.last_check_val;
  const last_time_available_unit: string = props.last_time_available_unit;
  const last_time_available_value: number = props.last_time_available_val;

  //Location Dialog
  const [showLocationDialog, setShowLocationDialog] = React.useState(false);

  //Banner Image
  let bannerImage = generic;
  if (props.id === "6a44f9fe-2263-4688-b46b-9c4a0be74b01") {
    bannerImage = emmanuelChurch;
  } else if (props.id === "40965187-1b98-4135-bc1d-625c7bb46558") {
    bannerImage = eastValley;
  } else if (props.x_parent === "-21") {
    bannerImage = cvsLogo;
  } else if (props.x_parent === "-13") {
    bannerImage = walgreensLogo;
  } else if (props.x_parent === "") {
    bannerImage = riteAidLogo;
  }

  return (
    <>
      <Card
        className={clsx({
          [styles.root]: true,
          [styles.unknownCard]: props.category === "unknown",
          [styles.unavailableCard]: props.category === "not_available",
        })}
      >
        {props.distance === -1 ? (
          <></>
        ) : (
          <div className={styles.innerBadgeLeft}>
            <Typography variant="caption">
              <strong>
                {Math.round(props.distance * 10) / 10} {t("Miles Away")}
              </strong>
            </Typography>
          </div>
        )}

        {props.vaccines === null || props.vaccines === "Unknown" ? (
          <div className={styles.innerBadgeRight}>
            <Typography variant="caption">
              <strong>
                {props.age === null || props.age === "Unknown"
                  ? "Unknown Age"
                  : props.age}
              </strong>
            </Typography>
          </div>
        ) : (
          <div className={styles.innerBadgeRight}>
            <Typography variant="caption">
              <strong>{props.vaccines}</strong>
            </Typography>
          </div>
        )}
        <CardActionArea>
          {props.category === "available" ? (
            <CardMedia
              className={styles.media}
              //image="https://stanfordhealthcare.org/content/dam/SHC/newsroom/press-releases/2019/new-stanford-hospital-opens.jpg"
              image={bannerImage}
              //src={CVSLogo}
              //component="img"
              title={props.name}
            />
          ) : (
            <></>
          )}
        </CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={styles.cardText}
          >
            {props.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={styles.cardText}
          >
            {props.addr1}
            <br />
            {props.addr2}
          </Typography>
        </CardContent>
        <CardActions>
          {/* Show available appointments */}
          <Grid container spacing={1}>
            {props.category === "available" ? (
              <>
                {props.appointment_list.map((appointment: AppointmentProps) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={`${props.id}-appt-${appointment.id}`}
                    >
                      <Typography>
                        <strong>{appointment.date_str}:</strong>
                      </Typography>
                      <Tooltip
                        arrow
                        title={t("Book Appointment").toString()}
                        placement="bottom"
                      >
                        <GreenButton
                          variant="outlined"
                          endIcon={<LaunchIcon />}
                          onClick={() => setShowLocationDialog(true)}
                        >
                          {`${appointment.appointment_num} ${t("Appointment")}${
                            appointment.appointment_num > 1 ? "s" : ""
                          } ${t("Available")}`}
                        </GreenButton>
                      </Tooltip>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Grid item xs={12}>
                {/* <Typography>
                <strong>{"Placeholder"}:</strong>
              </Typography> */}
                <Tooltip
                  arrow
                  title={t("Check Appointments").toString()}
                  placement="bottom"
                >
                  {props.category === "unknown" ? (
                    <OrangeButton variant="outlined" endIcon={<LaunchIcon />}>
                      {t("Check Appointments")}
                    </OrangeButton>
                  ) : (
                    <RedButton variant="outlined" endIcon={<LaunchIcon />}>
                      {t("Check Appointments")}
                    </RedButton>
                  )}
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </CardActions>
        <CardActions>
          <Button
            startIcon={<ShareIcon />}
            size="small"
            color="primary"
            component={Link}
            href={`sms:&body=${t("I found a vaccine appointments at")} ${
              props.name
            }! ${t("Located at")} ${props.addr1}, ${props.addr2}. ${t(
              "Book it here"
            )}: ${props.link}`}
          >
            {t("Share")}
          </Button>
        </CardActions>

        {/* <>
          <Divider />
          <CardActions>
          <ReportProblemRoundedIcon className={styles.warning}/>
          </CardActions>
        </> */}

        {props.notes !== null ? (
          <>
            <Divider />
            <CardActions>
              <ReportProblemRoundedIcon
                className={clsx({
                  [styles.warning]: true,
                  [styles.low]: props.warning_tier === 1,
                  [styles.medium]: props.warning_tier === 2,
                  [styles.high]: props.warning_tier === 3,
                })}
              />
              <Typography variant="body2" className={styles.metadata}>
                <strong>{t("Note")}:</strong> {props.notes}
              </Typography>
            </CardActions>
          </>
        ) : (
          <></>
        )}
        <Divider />
        <CardActions>
          <div>
            <Typography variant="caption" className={styles.metadata}>
              <strong>{t("Last Updated")}:</strong>{" "}
              <Trans
                i18nKey={last_checked_unit + "UpdateCaptionLC"}
                count={last_checked_value}
              >
                {{ last_checked_value }} ago
              </Trans>
            </Typography>
            {props.category === "available" ? (
              <></>
            ) : (
              <Typography variant="caption" className={styles.metadata}>
                <strong>{t("Last Availability")}:</strong>{" "}
                {props.last_time_available_message === null ? (
                  t("Unknown")
                ) : (
                  <Trans
                    i18nKey={last_time_available_unit + "UpdateCaptionLA"}
                    count={last_time_available_value}
                  >
                    {{ last_time_available_value }} ago
                  </Trans>
                )}
              </Typography>
            )}
          </div>
        </CardActions>
      </Card>
      <LocationDialog
        location={props}
        showLocationDialog={showLocationDialog}
        setShowLocationDialog={setShowLocationDialog}
      />
    </>
  );
}
