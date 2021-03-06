import { Backdrop, CircularProgress } from "@mui/material";

export const Loading = (): JSX.Element => (
  <Backdrop open>
    <CircularProgress color="inherit" />
  </Backdrop>
);
