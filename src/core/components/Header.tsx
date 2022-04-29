import {
  AccountCircle as AccountCircleIcon,
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
import { Fragment, useState } from "react";
import { useAuth } from "react-oidc-context";
import { NavLink, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <>
      {auth.isAuthenticated ? (
        <>
          <MenuItem
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              auth.signoutRedirect({
                extraQueryParams: {
                  id_token_hint: auth.user?.id_token ?? "",
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
        </>
      ) : (
        <MenuItem onClick={() => auth.signinRedirect()}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText>Sign In</ListItemText>
        </MenuItem>
      )}
    </>
  );
};

export const Header = (): JSX.Element => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const auth = useAuth();
  const theme = useTheme();
  const isScreenSm = useMediaQuery(theme.breakpoints.down("md"));
  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const pagesHeader = pages.filter((page) =>
    Object.prototype.hasOwnProperty.call(page, "headerName")
  );

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
                pagesHeader.map(({ headerName, path }) => (
                  <StyledNavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    key={path}
                    to={path}
                  >
                    <Button color="inherit">{headerName}</Button>
                  </StyledNavLink>
                ))}
              <MoreMenu
                icon={
                  <Avatar sx={{ lineHeight: "normal" }}>
                    {auth.user?.profile.preferred_username?.charAt(0) ?? null}
                  </Avatar>
                }
              >
                <AccountMenu />
              </MoreMenu>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer onClose={handleCloseDrawer} open={isOpenDrawer}>
        <List sx={{ width: 250 }}>
          {pagesHeader.map(({ headerName, path }, index, array) => {
            const lastItem = index === array.length - 1;

            return (
              <Fragment key={path}>
                <StyledNavLink to={path}>
                  <ListItem button>
                    <ListItemIcon>
                      {index % 2 === 0 ? <MoveToInboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={headerName} />
                  </ListItem>
                </StyledNavLink>
                {!lastItem && <Divider />}
              </Fragment>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};
