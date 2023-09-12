import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import persistStore from "redux-persist/es/persistStore";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./lib";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Helmet from "react-helmet";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));

const persistor = persistStore(store);

ReactDOM.render(
  <React.Suspense fallback={null}>
    <ErrorBoundary>
      <React.StrictMode>
        <Helmet>
          <meta name='description' content={store.getState().config.ui.meta.description} />
          <meta name='author' content={store.getState().config.ui.meta.name} />
          <meta property='og:site_name' content={store.getState().config.ui.meta.name} />
          <meta property='og:site' content={store.getState().config.ui.meta.url} />
          <meta property='og:title' content={store.getState().config.ui.meta.title} />
          <meta property='og:description' content={store.getState().config.ui.meta.description} />
          <meta
            property='og:image'
            id='seo-image'
            content={store.getState().config.ui.meta.seoImage}
          />
          <meta property='og:url' content={store.getState().config.ui.meta.url} />
          <link rel='icon' href={store.getState().config.ui.meta.favIcon} />
        </Helmet>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </ReduxProvider>
        </LocalizationProvider>
      </React.StrictMode>
    </ErrorBoundary>
  </React.Suspense>,
  document.getElementById("root") as HTMLElement,
);
