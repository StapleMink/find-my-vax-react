import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
    <ListItem
      selected={true ? false : false}
      button
      key={props.label}
      component={renderLink}
    >
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
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  pages: {
    name: string;
    link: string;
  }[];
}

export default function SideBar(props: SideBarProps) {
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
          {/* <NavSideBarTab to="/" label="Home" {...a11yProps(0)} />
          <NavSideBarTab to="/tips" label="Tips" {...a11yProps(1)} />
          <NavSideBarTab to="/about" label="About" {...a11yProps(2)} />
          <NavSideBarTab to="/contact" label="Contact" {...a11yProps(3)} /> */}
          {props.pages.map((page, index) => {
            return (
              <NavSideBarTab to={page.link} label={page.name} {...a11yProps(index)} />
            );
          })}
        </List>
        {/* <Divider /> */}
        {/* Add More Links Here */}
      </div>
    </Drawer>
  );
}
