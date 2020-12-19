import {
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  ADD_MENU_ITEM_START,
  ADD_MENU_ITEM_SUCCESS,
} from "../actions";

const initialState = {
  account: {},
  isLoading: false,
  error: "",
};

export const admin = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_START:
      return {
        ...state,
        isLoading: true,
        // I can take this out once I have a sign out button
        admin_access: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: action.payload,
        admin_access: true,
      };
    case ADD_MENU_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_MENU_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
