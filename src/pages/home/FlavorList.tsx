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
import React, { useState } from "react";
import { useQuery } from "react-query";

import { FlavorAddDialog } from "./FlavorAddDialog";
import { FlavorItem } from "./FlavorItem";

export interface FlavorItemData {
  ingredients: string;
  id: string;
  name: string;
}

export interface FormInput {
  ingredients: string;
  name: string;
}

export const FlavorList = (): JSX.Element => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data, error, isLoading } = useQuery<FlavorItemData[], Error>(
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
        direction={"row"}
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

      {isLoading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      )}
      {data && data.length === 0 && (
        <Typography variant="body1">No flavors are available.</Typography>
      )}
      {data && data.length > 0 && (
        <List>
          {React.Children.toArray(
            data.map(({ ingredients, id, name }, index, array) => {
              const lastItem = index === array.length - 1;

              return (
                <FlavorItem
                  ingredients={ingredients}
                  id={id}
                  lastItem={lastItem}
                  name={name}
                />
              );
            })
          )}
        </List>
      )}

      {/* add dialog */}
      <FlavorAddDialog handleCloseAdd={handleCloseAdd} isOpenAdd={isOpenAdd} />
    </>
  );
};
