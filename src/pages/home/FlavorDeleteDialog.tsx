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
import { FlavorItemData } from "types/app";

interface FlavorDeleteDialogProps {
  handleCloseDelete: () => void;
  id: string;
  isOpenDelete: boolean;
}

export const FlavorDeleteDialog: React.FC<FlavorDeleteDialogProps> = ({
  handleCloseDelete,
  id,
  isOpenDelete,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const flavorList = queryClient.getQueryData<FlavorItemData[]>("flavorList");
  let flavorItem = { id: "", ingredients: "", name: "" };
  if (flavorList) {
    const flavorItemFound = flavorList.find(
      (flavorItem) => flavorItem.id === id
    );

    if (flavorItemFound) flavorItem = flavorItemFound;
  }
  const { isLoading, mutate } = useMutation<AxiosResponse, Error, string>(
    (id) => axios.delete(`${process.env.REACT_APP_API_SERVER}/flavors/${id}`),
    {
      onError: (error) => {
        enqueueSnackbar(`An error has occurred: ${error.message}`, {
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("flavorList");
        handleCloseDelete();
        enqueueSnackbar("Flavor deleted successfully", { variant: "success" });
      },
    }
  );

  return (
    <Dialog onClose={handleCloseDelete} open={isOpenDelete}>
      <DialogTitle>Delete Flavor</DialogTitle>
      <DialogContent>
        Are you sure you want to permanently delete this flavor?
        <Paper
          sx={{
            mt: 2,
            p: 2,
          }}
        >
          <strong>{flavorItem.name}</strong>
          <br />
          {flavorItem.ingredients}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        <Button onClick={() => mutate(id)}>
          {isLoading ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
