import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const FlavorInfo = (): JSX.Element => {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h1">Flavor Information</Typography>
      <Typography variant="h2">flavor ID: {id}</Typography>
    </>
  );
};
