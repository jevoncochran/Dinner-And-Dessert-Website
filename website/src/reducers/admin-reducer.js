import { 
    ADMIN_LOGIN_START,
    ADMIN_LOGIN_SUCCESS
} from "../actions";

const initialState = {
    account: {},
    isLoading: false,
    error: ''
}

export const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADMIN_LOGIN_START:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                account: action.payload
            }
        default:
            return state;
    }
}