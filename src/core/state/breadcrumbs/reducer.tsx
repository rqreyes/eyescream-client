import { SET_BREADCRUMBS } from "core/state/actions/actions";
import { BreadcrumbsAction, BreadcrumbsState } from "types/app";

export const breadcrumbsReducer = (
  state: BreadcrumbsState,
  action: BreadcrumbsAction
): BreadcrumbsState => {
  switch (action.type) {
    case SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload,
      };
    default:
      throw new Error();
  }
};
