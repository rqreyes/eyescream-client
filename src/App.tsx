import { Typography } from "@mui/material";
import { Header } from "core/components/Header";
import { Layout } from "core/components/Layout";
import { FlavorInfoPage } from "pages/flavor-info";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/login";
import { Route, Routes } from "react-router-dom";

const App = (): JSX.Element => (
  <>
    <Header />
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flavor-info/:id" element={<FlavorInfoPage />} />
        <Route
          path="/blank"
          element={<Typography variant="h1">Blank</Typography>}
        />
        <Route
          path="/easter-egg"
          element={<Typography variant="h1">Easter Egg</Typography>}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Typography>404 page</Typography>} />
      </Routes>
    </Layout>
  </>
);

export default App;
