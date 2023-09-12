import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { rootStyles, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { routes, navConfig } from "../../lib/routeConfig";
import { UserIcon, BellIcon, CollapseIcon } from "../../assets/icons";
import { emptyApps } from "../../features/appstore/appstore-slice";
import * as sx from "./Container.styles";
import * as types from "./Container.types";
import _ from "lodash";
import * as mock from "./Container.mock";

// images
import authSlice from "../../features/auth/auth-slice";
import Modal from "../Modal";
import SplashScreen from "../SplashScreen";
import { useContainer } from "./Container.hook";
import Notifications from "../Notifications";

type elementNameT = "user" | "notify";
interface modelElsT {
  user?: types.AnchorEleT | null;
  notify?: types.AnchorEleT | null;
}

const Container = ({ sidebarItems }: types.ContainerProps) => {
  const [modalEls, setModalEls] = React.useState<modelElsT>({ user: null, notify: null });
  const [logoutModal, setLogoutModal] = React.useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { snackbar } = useSnackbar();
  const {
    showEditModal,
    showPasswordModal,
    changePasswordForm,
    editProfileForm,
    openModal,
    closeModal,
  } = useContainer();

  const theme = useTheme();

  const navLogo = useAppSelector((state) => state.config.ui.images.navLogo);
  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);
  const isAppLoading = useAppSelector((state) => state.apps.isInitialLoading);

  const appCopyright = useAppSelector((state) => state.config.ui.meta.name);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    dispatch(emptyApps());
    snackbar({ message: "Logout successful." });

    navigate(routes.auth.login);
  };

  const handleNavigate = (value: string) => navigate(value);
  const handleLogoutModal = () => setLogoutModal(!logoutModal);

  const handleOpenDropDown = (event: types.MouseEventT) => {
    const { currentTarget } = event;
    setModalEls({
      ...modalEls,
      [currentTarget.id]: currentTarget,
    });
  };
  const handleCloseDropDown = (el: elementNameT) => {
    setModalEls({
      ...modalEls,
      [el]: null,
    });
  };

  const matchedPath = React.useMemo(() => location.pathname.match(/.*\//gm)?.[0], [location]);
  const indexPath: string = React.useMemo(
    () => matchedPath?.substring(0, matchedPath?.length - 1) || "",
    [matchedPath],
  );

  const tabs = React.useMemo(() => {
    let route = _.find(navConfig, (x) => x.route === location.pathname);

    if (route) {
      return route.tabs;
    } else {
      route = _.find(navConfig, (x) => x.route === indexPath);
    }

    return route?.tabs || [];
  }, [location]);

  const handleTabChange = (_: unknown, value: string) => {
    if (location.pathname !== value) {
      navigate(value);
    }
  };

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate(routes.auth.login);
    }
  }, [navigate, isLoggedIn]);

  if (isAppLoading || !isLoggedIn) {
    return <SplashScreen />;
  }

  return (
    <React.Fragment>
      <Box sx={sx.containerRoot}>
        <Box sx={sx.leftSidebar}>
          <Box component='img' src={navLogo} sx={sx.sideBarLogo} />
          <Box sx={sx.sideBavNavWrapper}>
            {_.map(sidebarItems, (navItem, index) => (
              <Box
                key={navItem.route}
                sx={{
                  filter:
                    navItem.route === location.pathname || navItem.route === indexPath
                      ? "invert(24%) sepia(27%) saturate(5700%) hue-rotate(188deg) brightness(90%) contrast(101%)"
                      : "invert(79%) sepia(8%) saturate(312%) hue-rotate(180deg) brightness(93%) contrast(84%)",
                }}
              >
                <Box
                  key={index}
                  onClick={() => handleNavigate(navItem.route)}
                  sx={sx.sideBarNavItem}
                >
                  <Box sx={sx.navIcon}>
                    {navItem.sidebar_icon ? (
                      <Box component='img' src={navItem.sidebar_icon} />
                    ) : (
                      <Box component={navItem.icon} />
                    )}
                  </Box>
                  <Typography
                    sx={sx.navLabel}
                    fontWeight={
                      navItem.route === location.pathname || navItem.route === indexPath ? 700 : 500
                    }
                  >
                    {navItem.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={sx.contentWrapper}>
          <Box sx={sx.contentHeaderWrapper}>
            <Tabs
              value={location.pathname}
              onChange={handleTabChange}
              sx={sx.tabContainer}
              variant='scrollable'
              scrollButtons='auto'
              allowScrollButtonsMobile
            >
              {_.map(tabs, (value, index) => (
                <Tab key={index} label={value.label} value={value.route} />
              ))}
            </Tabs>
            <Box sx={sx.contentHeaderIconWrapper}>
              <CollapseIcon style={{ ...sx.contentHeaderIcon(theme) }} />
              <Box
                component={BellIcon}
                style={{ ...sx.contentHeaderIcon(theme) }}
                onClick={handleOpenDropDown}
                id='notify'
              />
              <Box
                component={UserIcon}
                style={{ ...sx.contentHeaderIcon(theme) }}
                onClick={handleOpenDropDown}
                id='user'
              />
            </Box>
          </Box>
          <Box sx={sx.childWrapper}>
            <React.Suspense fallback={null}>
              <Outlet />
            </React.Suspense>
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={modalEls.user}
        open={Boolean(modalEls.user)}
        onClose={() => handleCloseDropDown("user")}
        onClick={() => handleCloseDropDown("user")}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            openModal("edit");
          }}
        >
          Edit Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            openModal("change_password");
          }}
        >
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogoutModal}>Logout</MenuItem>
      </Menu>
      <Menu
        anchorEl={modalEls.notify}
        open={Boolean(modalEls.notify)}
        onClose={() => handleCloseDropDown("notify")}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Notifications onClose={() => handleCloseDropDown("notify")} />
      </Menu>

      <Modal
        title='Logout'
        description='Are you sure? Do you want to logout?'
        onClose={handleLogoutModal}
        open={logoutModal}
        onSubmit={handleLogout}
        submitButtonText='Yes, Logout'
        icon={UserIcon}
        align='center'
      />

      <Box sx={rootStyles.footerRoot}>
        <Typography variant='body2' sx={rootStyles.footerText}>
          {appCopyright}
        </Typography>
      </Box>
      <Modal
        title='Edit Profile'
        onClose={() => {
          closeModal("edit");
        }}
        open={showEditModal}
        formik={editProfileForm}
        fields={mock.userProfileFields}
        submitButtonText='Save'
        onSubmit={editProfileForm.handleSubmit}
      />
      <Modal
        title='Change Password'
        onClose={() => {
          closeModal("change_password");
        }}
        open={showPasswordModal}
        formik={changePasswordForm}
        fields={mock.userChangePasswordFields}
        onSubmit={changePasswordForm.handleSubmit}
        submitButtonText='Save'
      />
    </React.Fragment>
  );
};

export default Container;
