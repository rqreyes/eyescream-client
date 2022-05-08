import { Container, Link, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { BreadcrumbsContext } from "core/state/breadcrumbs/context";
import { useContext } from "react";
import { Breadcrumb } from "types/app";

export const Breadcrumbs = (): JSX.Element => {
  const { state } = useContext(BreadcrumbsContext);
  const { breadcrumbs } = state;

  return (
    <Container>
      <MuiBreadcrumbs>
        {breadcrumbs.map(({ display, route }: Breadcrumb) => (
          <Link href={route}>{display}</Link>
        ))}
      </MuiBreadcrumbs>
    </Container>
  );
};
