import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import React, { useEffect, useState } from "react";

export const Login = (): JSX.Element => {
  const [keycloak, setKeycloak] = useState<null | KeycloakInstance>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenList, setTokenList] = useState({
    accessTokenParsed: {},
    idTokenParsed: {},
  });

  useEffect(() => {
    const keycloak = Keycloak({
      url: "http://localhost/auth/",
      realm: "rreyes",
      clientId: "eyescream",
    });
    setKeycloak(keycloak);

    (async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: "login-required" });
        setAuthenticated(authenticated);

        const accessTokenParsed = (await keycloak.tokenParsed) ?? {};
        const idTokenParsed = (await keycloak.idTokenParsed) ?? {};

        setTokenList({
          accessTokenParsed,
          idTokenParsed,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h1">Authentication</Typography>
      {!keycloak || !authenticated ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      ) : (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h2">Access Token</Typography>
            <ul>
              {React.Children.toArray(
                Object.entries(tokenList.accessTokenParsed).map(
                  ([key, value]) => (
                    <li>
                      <strong>{key}</strong>:{" "}
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : typeof value === "boolean"
                        ? value.toString()
                        : value}
                    </li>
                  )
                )
              )}
            </ul>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h2">ID Token</Typography>
            <ul>
              {React.Children.toArray(
                Object.entries(tokenList.idTokenParsed).map(([key, value]) => (
                  <li>
                    <strong>{key}</strong>:{" "}
                    {typeof value === "boolean" ? value.toString() : value}
                  </li>
                ))
              )}
            </ul>
          </Box>
        </Stack>
      )}
    </>
  );
};
