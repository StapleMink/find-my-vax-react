import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink } from "react-router-dom";
import AppleIcon from "@material-ui/icons/Apple";
import MenuIcon from "@material-ui/icons/Menu";

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

interface NavTabProps {
  label?: string;
  href?: string;
  to: string;
}

function NavTab(props: NavTabProps) {
  //console.log("Destination: " + props.to);
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={props.to} {...itemProps} />
      )),
    [props.to]
  );

  return <Tab component={renderLink} {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    marginRight:10,
  },
}));

export default function NavTabs() {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
              edge="start"
              className={styles.logo}
              color="inherit"
              aria-label="menu"
              disableRipple
              disableFocusRipple
              style={{ backgroundColor: "transparent" }}
            >
              <AppleIcon />
            </IconButton>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <NavTab to="/" label="Home" {...a11yProps(0)} />
          <NavTab to="/users" label="How to Use" {...a11yProps(1)} />
          <NavTab to="/" label="Get Involved" {...a11yProps(2)} />
          <NavTab to="/" label="News" {...a11yProps(3)} />
          <NavTab to="/" label="About Us" {...a11yProps(4)} />
        </Tabs>
        </Toolbar>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        Page One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel> */}
    </div>
  );
}
