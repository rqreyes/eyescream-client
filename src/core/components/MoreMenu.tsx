import { Button, Menu } from "@mui/material";
import React, { useState } from "react";

interface MoreMenuProps {
  children: React.ReactElement;
  icon: React.ReactElement;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({ children, icon }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleOpenMenu}>{icon}</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClick={handleCloseMenu}
        open={Boolean(anchorEl)}
      >
        {children}
      </Menu>
    </>
  );
};
