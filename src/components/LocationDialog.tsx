import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import { LocationCardProps } from "../types";
import Divider from "@material-ui/core/Divider";
import { green } from "@material-ui/core/colors";
import { useTranslation } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "white",
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  content: {
    marginTop: 10,
  },
  subtitle: {
    width: "50%",
    marginRight: 0,
  },
  quickButton: {
    width: "50%",
  },
}));

const GreenButton = withStyles(() => ({
  root: {
    borderColor: green[600],
    color: "white",
    "&:hover": {
      backgroundColor: green[800],
    },
    backgroundColor: green[600],
  },
}))(Button);

export default function LocationDialog(props: {
  location: LocationCardProps;
  setShowLocationDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showLocationDialog: boolean;
}): JSX.Element {
  const { location, setShowLocationDialog, showLocationDialog } = props;
  const styles = useStyles();
  const { t } = useTranslation();

  // const handleClickOpen = () => {
  //   setShowLocationDialog(true);
  // };
  const handleClose = () => {
    setShowLocationDialog(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showLocationDialog}
      >
        <div className={styles.header}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {location.name}
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <Typography variant="h6" className={styles.subtitle}>
            {t("Required Identification")}
          </Typography>
          <Divider />
          <Typography gutterBottom className={styles.content}>
            <strong>
              {t("vaccinationRequirementsTitle")}
              {t("vaccinationRequirementsItems")
                .split(";")
                .map((val) => {
                  return <li key={val}>{val}</li>;
                })}
            </strong>
          </Typography>
          <Typography gutterBottom>
            {t("vaccinationRequirementsBody1")}
          </Typography>
          <Typography gutterBottom>
            {t("vaccinationRequirementsBody2")}
          </Typography>
          <Typography gutterBottom>
            <strong>{t("minorsConsentTitle")}</strong>{" "}
            {t("minorsConsentContent")}
          </Typography>
          <Typography gutterBottom>
            <strong>{t("proofOfAgeTitle")}</strong>
            <ul>
              {t("proofOfAgeItems")
                .split(";")
                .map((val) => {
                  return <li key={val}>{val}</li>;
                })}
            </ul>
          </Typography>
          <Typography gutterBottom>
            <strong>
              <strong>{t("proofOfResidenceTitle")}</strong>
            </strong>
            <ul>
              {t("proofOfResidenceItems")
                .split(";")
                .map((val) => {
                  return <li key={val}>{val}</li>;
                })}
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            {t("Go Back")}
          </Button>
          <div className={styles.grow} />
          <GreenButton
            endIcon={<LaunchIcon />}
            color="primary"
            variant="outlined"
            href={location.link}
          >
            {t("Continue to Book Appointment")}
          </GreenButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
