import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

interface NavTabProps {
  label?: string;
  href?: string;
  to: string;
}

function NavSideBarTab(props: NavTabProps) {
  //console.log("Destination: " + props.to);
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={props.to} {...itemProps} />
      )),
    [props.to]
  );

  return (
    <ListItem selected={true ? false : false} button key={props.label} component={renderLink}>
      <ListItemText primary={props.label} />
    </ListItem>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-sidebar-tab-${index}`,
    "aria-controls": `nav-sidebartabpanel-${index}`,
  };
}

interface SideBarProps {
  drawerOpen: boolean;
  toggleDrawer: any;
}

export default function SideBar(props:SideBarProps) {
  const classes = useStyles();

  return (
  <Drawer open={props.drawerOpen} onClose={props.toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
        >
          <List>
          <NavSideBarTab to="/" label="Home" {...a11yProps(0)} />
          <NavSideBarTab to="/users" label="How to Use" {...a11yProps(1)} />
          <NavSideBarTab to="/" label="Get Involved" {...a11yProps(2)} />
          <NavSideBarTab to="/" label="News" {...a11yProps(3)} />
          <NavSideBarTab to="/" label="About Us" {...a11yProps(4)} />
          </List>
          {/* <Divider /> */}
          {/* Add More Links Here */}
        </div>
      </Drawer>
  );
}
