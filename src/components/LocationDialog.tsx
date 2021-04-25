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

// const GreenButton = withStyles((theme: Theme) => ({
//   root: {
//     borderColor: green[600],
//     color: green[700],
//     "&:hover": {
//       backgroundColor: green[100],
//     },
//   },
// }))(Button);

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
    width: "50%"
  }
}));

const GreenButton = withStyles((theme: Theme) => ({
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
}) {
  const { location, setShowLocationDialog, showLocationDialog } = props;
  const styles = useStyles();

  const handleClickOpen = () => {
    setShowLocationDialog(true);
  };
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
          {" "}
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {location.name}
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <Typography variant="h6" className={styles.subtitle}>{"Required Identification:"}</Typography>   
          <Divider />
          <Typography gutterBottom className={styles.content}>
            <strong>
              In order to be vaccinated, you will need to show:
              <ol>
                <li>Photo ID, and</li>
                <li>Proof yout live or work in LA County, and</li>
                <li>Proof that you are 16 or older.</li>
              </ol>
            </strong>
          </Typography>
          <Typography gutterBottom>
            {
              "You do not need to show government issued ID and you do not need to be a US citizen to get a vaccine. Below, is a list of documents that will be accepted. This list is not complete and other documents may be accepted One document may meet more than one requirement (e.g. a driving license)."
            }
          </Typography>
          <Typography gutterBottom>
            {
              "If you have health insurance, please bring your health insurance card (COVID-19 vaccines are free regardless of insurance status)"
            }
          </Typography>
          <Typography gutterBottom>
            <strong>{"Consent for minors:"}</strong>{" "}
            {
              "Minors (age 16 and 17) who meet the eligibility criteria can only receive the Pfizer vaccine. Minors must be accompanied by a parent or guardian who can provide consent for vaccination."
            }
          </Typography>
          <Typography gutterBottom>
            <strong>Examples of proof of age:</strong>
            <ul>
              <li>
                Driving license or permit (foreign country or expired ID okay)
              </li>
              <li>California ID card or REAL ID card (from the DMV)</li>
              <li>Consular ID (Matricula Consular)</li>
              <li>Social Security card</li>
              <li>Military ID</li>
              <li>Passport (foreign country or expired okay)</li>
              <li>Birth certificate</li>
              <li>
                Medical document/records from medical provider, clinic, or
                doctor
              </li>
              <li>
                Membership card (foreign country okay if written in English)
              </li>
              <li>
                Any official document that includes name and date of birth for
                example, school record
              </li>
            </ul>
          </Typography>
          <Typography gutterBottom>
            <strong>
              Examples of proof that you live or work in LA County:
            </strong>
            <ul>
              <li>TO DO</li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            {"Go Back"}
          </Button>
          <div className={styles.grow} />
          <GreenButton
            endIcon={<LaunchIcon />}
            color="primary"
            variant="outlined"
            href={location.link}
          >
            {"Continue to Book Appointment"}
          </GreenButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
