import { Container, Paper } from "@mui/material";
import { Breadcrumbs } from "core/components/Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Breadcrumbs />
    <Container>
      <Paper
        sx={{
          p: 5,
        }}
      >
        {children}
      </Paper>
    </Container>
  </>
);
