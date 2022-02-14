import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { FormInput } from "./BookList";

interface BookAddDialogProps {
  handleCloseAdd: () => void;
  isOpenAdd: boolean;
}

export const BookAddDialog: React.FC<BookAddDialogProps> = ({
  handleCloseAdd,
  isOpenAdd,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const defaultValues = {
    author: "",
    title: "",
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { isLoading, mutate } = useMutation<AxiosResponse, Error, FormInput>(
    (bookNew) =>
      axios.post(`${process.env.REACT_APP_API_SERVER}/books`, bookNew),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("bookList");
        reset(defaultValues);
        handleCloseAdd();
        enqueueSnackbar("Book added successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    mutate(data);
  };

  return (
    <Dialog onClose={handleCloseAdd} open={isOpenAdd}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Book</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Title"
                required
                variant="standard"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="author"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Author"
                required
                variant="standard"
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {isLoading ? <CircularProgress size={20} /> : "Create"}
          </Button>
          <Button onClick={handleCloseAdd}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
