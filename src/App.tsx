import { Header } from "core/components/Header";
import { Layout } from "core/components/Layout";
import { pages } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const App = (): JSX.Element => (
  <>
    <Header />
    <Layout>
      <Routes>
        {React.Children.toArray(
          pages.map(({ element, path }) => (
            <Route path={path} element={element} />
          ))
        )}
      </Routes>
    </Layout>
  </>
);

export default App;
