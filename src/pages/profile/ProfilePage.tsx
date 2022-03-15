import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useJwt } from "react-jwt";
import { useAuth } from "react-oidc-context";

const accordionDetailsStyles = {
  width: "auto", // typescript fix
  "& pre": {
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
};

export const ProfilePage = (): JSX.Element => {
  const auth = useAuth();
  const { decodedToken } = useJwt(auth.user?.access_token ?? "");

  return (
    <>
      <Typography variant="h1">Profile</Typography>
      {auth.user && (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>ID Token Parsed</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(auth.user.profile, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Access Token Parsed</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>ID Token</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <pre>{JSON.stringify(auth.user.id_token, null, 2)}</pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Access Token</Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionDetailsStyles}>
              <Box sx={{ whiteSpace: "pre-wrap" }}>
                <pre>{JSON.stringify(auth.user.access_token, null, 2)}</pre>
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
};
