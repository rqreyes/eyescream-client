import {
  Delete as DeleteIcon,
  Info as InfoIcon,
  Edit as UpdateIcon,
} from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FlavorDeleteDialog } from "./FlavorDeleteDialog";
import { FlavorUpdateDialog } from "./FlavorUpdateDialog";

interface FlavorItemMenuProps {
  id: string;
}
type Dialog = "update" | "delete";

export const FlavorItemMenu: React.FC<FlavorItemMenuProps> = ({
  id,
}): JSX.Element => {
  const [isOpenDialog, setIsOpenDialog] = useState({
    delete: false,
    update: false,
  });
  const navigate = useNavigate();
  const handleToggleDialog = (dialog: Dialog, isOpen: boolean) => {
    setIsOpenDialog((prevState) => ({ ...prevState, [dialog]: isOpen }));
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          navigate(`/flavor-info/${id}`);
        }}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText>More Info</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleToggleDialog("update", true)}>
        <ListItemIcon>
          <UpdateIcon />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleToggleDialog("delete", true)}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>

      {/* update dialog */}
      <FlavorUpdateDialog
        handleCloseUpdate={() => handleToggleDialog("update", false)}
        id={id}
        isOpenUpdate={isOpenDialog.update}
      />

      {/* delete dialog */}
      <FlavorDeleteDialog
        handleCloseDelete={() => handleToggleDialog("delete", false)}
        id={id}
        isOpenDelete={isOpenDialog.delete}
      />
    </>
  );
};
