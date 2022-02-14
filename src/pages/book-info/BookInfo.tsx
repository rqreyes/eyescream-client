import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const BookInfo = (): JSX.Element => {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h1">Book Information</Typography>
      <Typography variant="h2">book ID: {id}</Typography>
    </>
  );
};
