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
import { FormInput } from "types/app";

interface FlavorAddDialogProps {
  handleCloseAdd: () => void;
  isOpenAdd: boolean;
}

export const FlavorAddDialog: React.FC<FlavorAddDialogProps> = ({
  handleCloseAdd,
  isOpenAdd,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const defaultValues = {
    ingredients: "",
    name: "",
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { isLoading, mutate } = useMutation<AxiosResponse, Error, FormInput>(
    (flavorNew) =>
      axios.post(`${process.env.REACT_APP_API_SERVER}/flavors`, flavorNew),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("flavorList");
        reset(defaultValues);
        handleCloseAdd();
        enqueueSnackbar("Flavor added successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    mutate(data);
  };

  return (
    <Dialog onClose={handleCloseAdd} open={isOpenAdd}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Flavor</DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Name"
                required
                variant="standard"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="ingredients"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Ingredients"
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
