import {
  Collapse,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { env } from "core/env";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// theme
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          paddingTop: "88px",
        },
      },
    },
  },
});

// query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// auth
const { AUTH_AUTHORITY, AUTH_CLIENT_ID, AUTH_REDIRECT_URI } = env;
const oidcConfig = {
  authority: AUTH_AUTHORITY,
  client_id: AUTH_CLIENT_ID,
  redirect_uri: AUTH_REDIRECT_URI,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SnackbarProvider TransitionComponent={Collapse}>
            <AuthProvider {...oidcConfig}>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
