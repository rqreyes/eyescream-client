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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { BookItemData, FormInput } from "./BookList";

interface BookUpdateDialogProps {
  handleCloseUpdate: () => void;
  id: string;
  isOpenUpdate: boolean;
}

export const BookUpdateDialog: React.FC<BookUpdateDialogProps> = ({
  handleCloseUpdate,
  id,
  isOpenUpdate,
}) => {
  const [isCancel, setIsCancel] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const defaultValues = {
    author: "",
    id: "",
    title: "",
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  // update book item
  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation<
    AxiosResponse,
    Error,
    FormInput
  >(
    (data) =>
      axios.patch(`${process.env.REACT_APP_API_SERVER}/books/${id}`, data),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("bookList");
        handleCloseUpdate();
        enqueueSnackbar("Book updated successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutateUpdate(data);
  };

  useEffect(() => {
    const defaultBookListData =
      queryClient.getQueryData<BookItemData[]>("bookList");
    const defaultBookItemData = defaultBookListData
      ? defaultBookListData.find((bookItem: BookItemData) => bookItem.id === id)
      : {
          author: "",
          id: "",
          title: "",
        };

    reset(defaultBookItemData);
  }, [id, isCancel, queryClient, reset]);

  return (
    <Dialog onClose={handleCloseUpdate} open={isOpenUpdate}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Book</DialogTitle>
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
          <Button
            onClick={() => {
              setIsCancel((prev) => !prev);
              handleCloseUpdate();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isLoadingUpdate ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
