import { Box, Button, Typography } from "@mui/material";
import { Error } from "core/components/Error";
import { Loading } from "core/components/Loading";
import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router-dom";

export const PrivateRoute = (): JSX.Element => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
    case "signoutRedirect":
      return <Loading />;
    default:
  }

  if (auth.isLoading) {
    return <Loading />;
  }

  if (auth.error) {
    return <Error error={auth.error} />;
  }

  if (auth.isAuthenticated) {
    return <Outlet />;
  }

  return (
    <Box>
      <Typography variant="h1">Private Page</Typography>
      <Button onClick={() => auth.signinRedirect()}>Sign in</Button>
    </Box>
  );
};
