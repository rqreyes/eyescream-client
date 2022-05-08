import { breadcrumbsReducer } from "core/state/breadcrumbs/reducer";
import { createContext, useMemo, useReducer } from "react";
import { BreadcrumbsContext as BreadcrumbsContextType } from "types/app";

export const initialState = {
  breadcrumbs: [],
};

export const BreadcrumbsContext = createContext({} as BreadcrumbsContextType);

interface BreadcrumbsProviderProps {
  children: React.ReactNode;
}

export const BreadcrumbsProvider = ({
  children,
}: BreadcrumbsProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(breadcrumbsReducer, initialState);
  const context = useMemo(() => ({ state, dispatch }), []);

  return (
    <BreadcrumbsContext.Provider value={context}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};
