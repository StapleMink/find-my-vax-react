import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
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
    //React.forwardRef((itemProps, ref) => 
      React.forwardRef((itemProps) => (
        <RouterLink to={props.to} {...itemProps} />
      )),
    [props.to]
  );

  return (
    <ListItem selected={false} button key={props.label} component={renderLink}>
      <ListItemText primary={props.label} />
    </ListItem>
  );
}

interface SideBarProps {
  drawerOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  pages: {
    name: string;
    link: string;
  }[];
}

export default function SideBar(props: SideBarProps): JSX.Element {
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
          {props.pages.map((page, index) => {
            return (
              <NavSideBarTab
                to={page.link}
                label={page.name}
                key={`nav-sidebar-${index}`}
                aria-controls={`nav-sidebartabpanel-${index}`}
              />
            );
          })}
        </List>
        {/* <Divider /> */}
        {/* Add More Links Here */}
      </div>
    </Drawer>
  );
}
