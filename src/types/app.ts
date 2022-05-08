import { SET_BREADCRUMBS } from "core/state/actions/actions";

export interface Breadcrumb {
  active: boolean;
  display: string;
  route: string;
}
export interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[];
}
export interface BreadcrumbsAction {
  type: typeof SET_BREADCRUMBS;
  payload: Breadcrumb[];
}
export interface BreadcrumbsContext {
  state: BreadcrumbsState;
  dispatch: React.Dispatch<BreadcrumbsAction>;
}

export interface FlavorItemData {
  ingredients: string;
  id: string;
  name: string;
}
export interface FormInput {
  ingredients: string;
  name: string;
}
