import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Mail as MailIcon,
  MoveToInbox as MoveToInboxIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { MoreMenu } from "core/components/MoreMenu";
import { pages } from "pages";
import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)(() => ({
  color: "#fff",
  textDecoration: "none",

  "&:hover, &.active": {
    color: "#1976d2",

    "> button": {
      backgroundColor: "#fff",
    },
  },
}));

const AccountMenu = () => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <MenuItem
        onClick={() => {
          auth.signoutRedirect({
            extraQueryParams: {
              post_logout_redirect_uri: "http://localhost:3000",
            },
          });
          auth.clearStaleState();
          auth.removeUser();
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    );
  }

  return (
    <MenuItem onClick={() => auth.signinRedirect()}>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText>Sign In</ListItemText>
    </MenuItem>
  );
};

export const Header = (): JSX.Element => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme();
  const isScreenSm = useMediaQuery(theme.breakpoints.down("md"));
  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const pagesHeader = pages.filter((page) => page.hasOwnProperty("headerName"));

  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box>
              {isScreenSm && (
                <IconButton
                  edge="start"
                  onClick={handleOpenDrawer}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <StyledNavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                <Button color="inherit">EyeScream</Button>
              </StyledNavLink>
            </Box>
            <Stack alignItems="center" direction="row" spacing={1}>
              {!isScreenSm &&
                React.Children.toArray(
                  pagesHeader.map(({ headerName, path }) => (
                    <StyledNavLink
                      className={({ isActive }) => (isActive ? "active" : "")}
                      to={path}
                    >
                      <Button color="inherit">{headerName}</Button>
                    </StyledNavLink>
                  ))
                )}
              <MoreMenu icon={<Avatar />}>
                <AccountMenu />
              </MoreMenu>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer onClose={handleCloseDrawer} open={isOpenDrawer}>
        <List sx={{ width: 250 }}>
          {React.Children.toArray(
            pagesHeader.map(({ headerName, path }, index, array) => {
              const lastItem = index === array.length - 1;

              return (
                <>
                  <StyledNavLink to={path}>
                    <ListItem button>
                      <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={headerName} />
                    </ListItem>
                  </StyledNavLink>
                  {!lastItem && <Divider />}
                </>
              );
            })
          )}
        </List>
      </Drawer>
    </>
  );
};
