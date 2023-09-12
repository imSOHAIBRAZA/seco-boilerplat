import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContainer, Container } from "./components";
import uiConfig from "./features/config/ui-config-slice";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { generateRoutes, initialUIConfig, theme, useAppDispatch, useAppSelector } from "./lib";
import { routes } from "./lib/routeConfig";
import "./styles.css";
import { SnackbarProvider } from "./lib/snackbar";

import _map from "lodash/map";
import { fetchInitialApps } from "./features/appstore/appstore-thunk";

const Login = React.lazy(() => import("./views/Login"));
const Signup = React.lazy(() => import("./views/Signup"));
const NotFound404 = React.lazy(() => import("./views/NotFound404"));

function App() {
  const appColors = useAppSelector((state) => state.config.ui.theme);
  const apps = useAppSelector((state) => state.apps.apps);
  const userType = useAppSelector((state) => state.auth.user?.type);

  const dispatch = useAppDispatch();

  const privateRoutes = React.useMemo(() => generateRoutes(apps, userType), [apps, userType]);

  const appTheme: Partial<Theme> = React.useMemo(() => {
    const updatedTheme = createTheme(theme, {
      palette: {
        primary: {
          main: appColors.primaryColor,
        },
        secondary: {
          main: appColors.secondaryColor,
        },
      },
    });

    return updatedTheme;
  }, [appColors]);

  React.useEffect(() => {
    const UI_CONFIG = JSON.parse(String(localStorage.getItem("UI_CONFIG")));
    if (UI_CONFIG) {
      dispatch(uiConfig.actions.patchConfig(UI_CONFIG));
    } else {
      dispatch(uiConfig.actions.patchConfig(initialUIConfig));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (userType) {
      dispatch(fetchInitialApps());
    }
  }, [dispatch, userType]);

  return (
    <React.Fragment>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider>
          <CssBaseline />
          <Routes>
            <Route path={routes.authRoot} element={<AuthContainer />}>
              <Route path={routes.auth.login} element={<Login />} />
              <Route path={routes.auth.signup} element={<Signup />} />
            </Route>

            {_map(privateRoutes, ({ route, tabs }) => (
              <Route key={route} path={route} element={<Container sidebarItems={privateRoutes} />}>
                {_map(tabs, ({ route: tabRoute, element: TabComponent }) => (
                  <Route
                    key={tabRoute}
                    index={tabRoute === route}
                    path={tabRoute}
                    element={<TabComponent />}
                  />
                ))}
              </Route>
            ))}
            <Route path='/' element={<Navigate to={routes.dashboard.index} />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
