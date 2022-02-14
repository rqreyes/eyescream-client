import { Delete, Info, Edit as Update } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookDeleteDialog } from "./BookDeleteDialog";
import { BookUpdateDialog } from "./BookUpdateDialog";

interface BookItemMenuProps {
  id: string;
}
type Dialog = "update" | "delete";

export const BookItemMenu: React.FC<BookItemMenuProps> = ({
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
          navigate(`/book-info/${id}`);
        }}
      >
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText>More Info</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleToggleDialog("update", true)}>
        <ListItemIcon>
          <Update />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleToggleDialog("delete", true)}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>

      {/* update dialog */}
      <BookUpdateDialog
        handleCloseUpdate={() => handleToggleDialog("update", false)}
        id={id}
        isOpenUpdate={isOpenDialog.update}
      />

      {/* delete dialog */}
      <BookDeleteDialog
        handleCloseDelete={() => handleToggleDialog("delete", false)}
        id={id}
        isOpenDelete={isOpenDialog.delete}
      />
    </>
  );
};
