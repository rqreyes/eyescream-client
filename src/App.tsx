import { PrivateRoute } from "core/auth/PrivateRoute";
import { Header } from "core/components/Header";
import { Layout } from "core/components/Layout";
import { pages } from "pages";
import { Route, Routes } from "react-router-dom";

const App = (): JSX.Element => (
  <>
    <Header />
    <Layout>
      <Routes>
        {pages.map(({ element, path, privateRoute }) => {
          if (privateRoute) {
            return (
              <Route key={path} path={path} element={<PrivateRoute />}>
                <Route path={path} element={element} />
              </Route>
            );
          }

          return <Route key={path} path={path} element={element} />;
        })}
      </Routes>
    </Layout>
  </>
);

export default App;
