import {
  Box,
  Button,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Error } from "components/Error";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { BookAddDialog } from "./BookAddDialog";
import { BookItem } from "./BookItem";

export interface BookItemData {
  author: string;
  id: string;
  title: string;
}

export interface FormInput {
  author: string;
  title: string;
}

export const BookList = (): JSX.Element => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data, error, isLoading } = useQuery<BookItemData[], Error>(
    "bookList",
    async (): Promise<BookItemData[]> => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/books`
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
          <Typography variant="h1">Book List</Typography>
        </Box>
        <Box>
          <Button onClick={handleOpenAdd}>Create</Button>
        </Box>
      </Stack>

      {isLoading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100 }} />
        </Stack>
      )}
      {data && data.length === 0 && (
        <Typography variant="body1">No books are available.</Typography>
      )}
      {data && data.length > 0 && (
        <List>
          {React.Children.toArray(
            data.map(({ author, id, title }, index, array) => {
              const lastItem = index === array.length - 1;

              return (
                <BookItem
                  author={author}
                  id={id}
                  lastItem={lastItem}
                  title={title}
                />
              );
            })
          )}
        </List>
      )}

      {/* add dialog */}
      <BookAddDialog handleCloseAdd={handleCloseAdd} isOpenAdd={isOpenAdd} />
    </>
  );
};
