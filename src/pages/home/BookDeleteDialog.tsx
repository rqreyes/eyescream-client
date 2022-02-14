import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

import { BookItemData } from "./BookList";

interface BookDeleteDialogProps {
  handleCloseDelete: () => void;
  id: string;
  isOpenDelete: boolean;
}

export const BookDeleteDialog: React.FC<BookDeleteDialogProps> = ({
  handleCloseDelete,
  id,
  isOpenDelete,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const bookList = queryClient.getQueryData<BookItemData[]>("bookList");
  let bookItem = { author: "", id: "", title: "" };
  if (bookList) {
    const bookItemFound = bookList.find((bookItem) => bookItem.id === id);

    if (bookItemFound) bookItem = bookItemFound;
  }
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation<
    AxiosResponse,
    Error,
    string
  >((id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/books/${id}`), {
    onError: (error) => {
      enqueueSnackbar(`An error has occurred: ${error.message}`, {
        variant: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("bookList");
      handleCloseDelete();
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
    },
  });

  return (
    <Dialog onClose={handleCloseDelete} open={isOpenDelete}>
      <DialogTitle>Delete Book</DialogTitle>
      <DialogContent>
        Are you sure you want to permanently delete this book?
        <Paper
          sx={{
            mt: 2,
            p: 2,
          }}
        >
          <strong>{bookItem.title}</strong>
          <br />
          {bookItem.author}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        <Button onClick={() => mutateDelete(id)}>
          {isLoadingDelete ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
