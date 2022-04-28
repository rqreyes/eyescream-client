import {
  Box,
  Button,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Error } from "core/components/Error";
import { useState } from "react";
import { useQuery } from "react-query";
import { FlavorItemData } from "types/app";

import { FlavorAddDialog } from "./FlavorAddDialog";
import { FlavorItem } from "./FlavorItem";

export const FlavorList = (): JSX.Element => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data, error, isFetching } = useQuery<FlavorItemData[], Error>(
    "flavorList",
    async (): Promise<FlavorItemData[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/flavors`
      );

      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleOpenAdd = () => {
    setIsOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setIsOpenAdd(false);
  };

  return (
    <>
      {/* handle error */}
      {error && <Error error={error} />}

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography variant="h1">Flavor List</Typography>
        </Box>
        <Box>
          <Button onClick={handleOpenAdd}>Create</Button>
        </Box>
      </Stack>

      {isFetching && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      )}
      {!isFetching && data && data.length === 0 && (
        <Typography variant="body1">No flavors are available.</Typography>
      )}
      {!isFetching && data && data.length > 0 && (
        <List>
          {data.map(({ ingredients, id, name }, index, array) => {
            const lastItem = index === array.length - 1;

            return (
              <FlavorItem
                ingredients={ingredients}
                id={id}
                key={id}
                lastItem={lastItem}
                name={name}
              />
            );
          })}
        </List>
      )}

      {/* add dialog */}
      <FlavorAddDialog handleCloseAdd={handleCloseAdd} isOpenAdd={isOpenAdd} />
    </>
  );
};
