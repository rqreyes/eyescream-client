import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { env } from "core/env";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { useEffect, useState } from "react";

const accordionDetailsStyles = {
  width: "auto", // typescript fix
  "& pre": {
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
};

export const LoginPage = (): JSX.Element => {
  const { AUTH_URL, AUTH_REALM_ID, AUTH_CLIENT_ID } = env;
  const [keycloak, setKeycloak] = useState<null | KeycloakInstance>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloak = Keycloak({
      url: AUTH_URL,
      realm: AUTH_REALM_ID,
      clientId: AUTH_CLIENT_ID,
    });
    setKeycloak(keycloak);

    (async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: "login-required" });
        setAuthenticated(authenticated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [AUTH_URL, AUTH_REALM_ID, AUTH_CLIENT_ID]);

  return (
    <>
      <Typography variant="h1">Authentication</Typography>
      {!keycloak || !authenticated ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      ) : (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>ID Token Parsed</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(keycloak.idTokenParsed, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Access Token Parsed</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(keycloak.tokenParsed, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>ID Token</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(keycloak.idToken, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Access Token</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <Box sx={{ whiteSpace: "pre-wrap" }}>
                <pre>{JSON.stringify(keycloak.token, null, 2)}</pre>
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
};
