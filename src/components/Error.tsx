import { Alert } from "@mui/material";

interface ErrorProps {
  error: Error;
}

export const Error: React.FC<ErrorProps> = ({ error }): JSX.Element => (
  <Alert severity="error">{`An error has occurred: ${error.message}`}</Alert>
);
