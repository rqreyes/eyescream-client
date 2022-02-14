import { Typography } from "@mui/material";
import { Header } from "components/Header";
import { Layout } from "components/Layout";
import { BookInfo } from "pages/book-info/BookInfo";
import { Home } from "pages/home";
import { Login } from "pages/login";
import { Route, Routes } from "react-router-dom";

const App = (): JSX.Element => (
  <>
    <Header />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-info/:id" element={<BookInfo />} />
        <Route
          path="/blank"
          element={<Typography variant="h1">Blank</Typography>}
        />
        <Route
          path="/easter-egg"
          element={<Typography variant="h1">Easter Egg</Typography>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Typography>404 page</Typography>} />
      </Routes>
    </Layout>
  </>
);

export default App;
