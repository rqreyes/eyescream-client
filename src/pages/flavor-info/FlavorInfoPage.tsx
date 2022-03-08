import { CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Error } from "core/components/Error";
import { env } from "core/env";
import { FlavorItemData } from "pages/home/FlavorList";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const FlavorInfoPage = (): JSX.Element => {
  const { API_SERVER } = env;
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<FlavorItemData, Error>(
    "flavorList",
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

      {isLoading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress sx={{ height: 100, my: 10 }} />
        </Stack>
      )}

      {data && (
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
