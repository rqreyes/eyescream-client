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
import { FlavorItemData, FormInput } from "types/app";

interface FlavorUpdateDialogProps {
  handleCloseUpdate: () => void;
  id: string;
  isOpenUpdate: boolean;
}

export const FlavorUpdateDialog: React.FC<FlavorUpdateDialogProps> = ({
  handleCloseUpdate,
  id,
  isOpenUpdate,
}) => {
  const [isCancel, setIsCancel] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const defaultValues = {
    id: "",
    ingredients: "",
    name: "",
  };
  const { control, handleSubmit, reset } = useForm({ defaultValues });
  // update flavor item
  const { isLoading, mutate } = useMutation<AxiosResponse, Error, FormInput>(
    (data) =>
      axios.patch(`${process.env.REACT_APP_API_SERVER}/flavors/${id}`, data),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("flavorList");
        handleCloseUpdate();
        enqueueSnackbar("Flavor updated successfully", { variant: "success" });
      },
    }
  );
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    const defaultFlavorListData =
      queryClient.getQueryData<FlavorItemData[]>("flavorList");
    const defaultFlavorItemData = defaultFlavorListData
      ? defaultFlavorListData.find(
          (flavorItem: FlavorItemData) => flavorItem.id === id
        )
      : {
          ingredients: "",
          id: "",
          name: "",
        };

    reset(defaultFlavorItemData);
  }, [id, isCancel, queryClient, reset]);

  return (
    <Dialog onClose={handleCloseUpdate} open={isOpenUpdate}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Flavor</DialogTitle>
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
          <Button
            onClick={() => {
              setIsCancel((prev) => !prev);
              handleCloseUpdate();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isLoading ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
