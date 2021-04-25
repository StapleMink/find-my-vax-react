import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SideBar from "./Sidebar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ReactComponent as FindMyVaxLogo } from "../assets/logo.svg";

interface NavProps {
  label?: string;
  href?: string;
  to: string;
}

function NavTab(props: NavProps) {
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
  grow: {
    flexGrow: 1,
  },
  logo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    width: 200,
  },
  desktopLogo: {
    marginRight: 10,
  },
  menuDivider: {
    marginTop: 8,
    marginBottom: 8,
  },
  fmvLogo: {
    height: 40,
    // width: 40,
  },
}));

interface ResponsiveNavBarProps {
  value: number;
}

interface TranslateMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

function TranslateMenu(props: TranslateMenuProps) {
  const { anchorEl, handleClose } = props;
  const { i18n, t } = useTranslation();
  const styles = useStyles();

  function handleLanguageChange(newLanguageCode: string, newLanguage: string) {
    handleClose();
    i18n.changeLanguage(newLanguageCode);
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => {
          handleLanguageChange("en", "English");
        }}
      >
        English
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLanguageChange("es", "Español");
        }}
      >
        Español
      </MenuItem>
      {/* <MenuItem onClick={() => {handleLanguageChange("fr", "Français")}}>Français</MenuItem> */}
      <Divider className={styles.menuDivider} />
      <MenuItem component={RouterLink} to="/contact" onClick={handleClose}>
        {t("Help to translate")}
      </MenuItem>
    </Menu>
  );
}

export default function ResponsiveNavBar(props: ResponsiveNavBarProps) {
  const styles = useStyles();
  const { t } = useTranslation();
  const pages = [
    {
      name: t("Home"),
      link: "/",
    },
    {
      name: t("How To Use"),
      link: "/howtouse",
    },
    {
      name: t("Tips"),
      link: "/tips",
    },
    {
      name: t("About"),
      link: "/about",
    },
    {
      name: t("Contact"),
      link: "/contact",
    },
  ];
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    // console.log(newValue);
    setValue(newValue);
  };

  //Determine which Nav to show
  const isDesktop = useMediaQuery("(min-width:1150px)");
  const isMobilePortrait = useMediaQuery("(max-width:550px)");
  // console.log(isMobilePortrait);

  // Drawer State
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  //Translation States
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleTranslateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      {isDesktop ? (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.desktopLogo}
              color="inherit"
              aria-label="home"
              disableRipple
              disableFocusRipple
              style={{ backgroundColor: "transparent" }}
              component={RouterLink}
              to="/"
            >
              <FindMyVaxLogo className={styles.fmvLogo} />
            </IconButton>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={() => handleChange}
              aria-label="nav tabs example"
            >
              {pages.map((page, index) => {
                return (
                  <NavTab
                    to={page.link}
                    label={page.name}
                    key={`nav-tab-${index}`}
                    aria-controls={`nav-tabpanel-${index}`}
                  />
                );
              })}
            </Tabs>
            <div className={styles.grow} />
            {/* <IconButton color="inherit" style={{ display: "none" }}>
              <SearchIcon />
            </IconButton> */}
            <Button
              color="inherit"
              size="large"
              onClick={handleTranslateClick}
              startIcon={<TranslateIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {t("English")}
            </Button>
            <TranslateMenu anchorEl={anchorEl} handleClose={handleClose} />
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="home"
              className={styles.logo}
              disableRipple
              disableFocusRipple
              style={{ backgroundColor: "transparent" }}
              component={RouterLink}
              to="/"
            >
              <FindMyVaxLogo className={styles.fmvLogo} />
            </IconButton>
            <div className={styles.grow} />
            {/* <IconButton color="inherit" style={{ display: "none" }}>
              <SearchIcon />
            </IconButton> */}
            <Button
              color="inherit"
              size="large"
              onClick={handleTranslateClick}
              startIcon={<TranslateIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {isMobilePortrait ? <> </> : <> {t("English")} </>}
            </Button>
            <TranslateMenu anchorEl={anchorEl} handleClose={handleClose} />
          </Toolbar>
        </AppBar>
      )}
      <SideBar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        pages={pages}
      />
    </div>
  );
}
