import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ResponsiveNavBar from "./components/ResponsiveNavBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import clsx from "clsx";
import Footer from "./components/Footer";

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
    marginBottom: 10,
  },
  info: {
    maxWidth: 1000,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  statusTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  statusTableRow: {
    border: "1px solid lightGrey",
  },
  statusTableCell: {
    border: "1px solid lightGrey",
    width: "33%",
  },
  statusIcon: {
    // border: "1px solid grey",
    position: "relative",
  },
  statusIndicator: {
    position: "absolute",
    top: "50%",
    left: 5,
    msTransform: "translate(0%, -50%)",
    transform: "translate(0%, -50%)",
  },
  online: {
    color: "green",
  },
  warning: {
    color: "orange",
  },
  down: {
    color: "red",
  },
  statusService: {
    textAlign: "left",
    marginLeft: 30,
    paddingTop: 5,
    paddingBottom: 5,
  },
}));

//TODO: Add popover and key

function StatusItem(props: { name: string; status: string }) {
  const styles = useStyles();
  return (
    <div className={styles.statusIcon}>
      <FiberManualRecordIcon
        className={clsx({
          [styles.statusIndicator]: true,
          [styles.online]: props.status === "ONLINE",
          [styles.warning]: props.status === "ISSUE",
          [styles.down]: props.status === "DOWN",
        })}
      />
      <Typography className={styles.statusService}>{props.name}</Typography>
    </div>
  );
}

export default function Status(): JSX.Element {
  const styles = useStyles();
  const isMobilePortrait = useMediaQuery("(max-width:550px)");

  return (
    <>
      <ResponsiveNavBar value={-1} />
      {/* Content */}
      <Container maxWidth="lg" className={styles.content}>
        <Typography
          variant={!isMobilePortrait ? "h2" : "h3"}
          className={styles.title}
        >
          {"System Status"}
        </Typography>
        <Typography variant="h5" className={styles.subtitle}>
          Locations:
        </Typography>
        <table className={styles.statusTable}>
          <tr className={styles.statusTableRow}>
            <td className={styles.statusTableCell}>
              <StatusItem name={"SCC Sites"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"Walgreens"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"Walmart"} status="ONLINE" />
            </td>
          </tr>
          <tr className={styles.statusTableRow}>
            <td className={styles.statusTableCell}>
              <StatusItem name={"El Camino Hospital"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"CVS"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"Costco"} status="ONLINE" />
            </td>
          </tr>
          <tr className={styles.statusTableRow}>
            <td className={styles.statusTableCell}>
              <StatusItem name={"Rite Aid"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"MyTurn"} status="ONLINE" />
            </td>
          </tr>
        </table>
        <Typography variant="h5" className={styles.subtitle}>
          Services:
        </Typography>
        <table className={styles.statusTable}>
          <tr className={styles.statusTableRow}>
            <td className={styles.statusTableCell}>
              <StatusItem name={"Twitter Bot"} status="ONLINE" />
            </td>
            <td className={styles.statusTableCell}>
              <StatusItem name={"API"} status="ONLINE" />
            </td>
          </tr>
        </table>
        <Typography variant="body1" className={styles.info}>
          {"If you are experiencing issues not listed here, "}
          <strong>
            <Link href="mailto:support@findmyvaxsc.com" target="_blank">
              contact support.
            </Link>
          </strong>
        </Typography>
      </Container>
      <Footer />
    </>
  );
}
