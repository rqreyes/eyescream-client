import { CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Error } from "core/components/Error";
import { env } from "core/env";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FlavorItemData } from "types/app";

export const FlavorInfoPage = (): JSX.Element => {
  const { API_SERVER } = env;
  const { id } = useParams();
  const { data, error, isFetching } = useQuery<FlavorItemData, Error>(
    "flavorItem",
    async (): Promise<FlavorItemData> => {
      const { data } = await axios.get(`${API_SERVER}/flavors/${id}`);

      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {/* handle error */}
      {error && <Error error={error} />}

      <Typography variant="h1">Flavor Information</Typography>

      {isFetching && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      )}

      {!isFetching && data && (
        <Typography>
          <strong>ID</strong>: {id}
          <br />
          <strong>Name</strong>: {data.name}
          <br />
          <strong>Ingredients</strong>: {data.ingredients}
        </Typography>
      )}
    </>
  );
};
