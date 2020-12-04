import {
    ADD_TO_ORDER_START,
    ADD_TO_ORDER_SUCCESS,
    UPDATE_ORDER_START,
    UPDATE_ORDER_SUCCESS,
    OPEN_ORDER_CARD_START,
    OPEN_ORDER_CARD_SUCCESS,
    CLOSE_ORDER_CARD_START,
    CLOSE_ORDER_CARD_SUCCESS,
    SUBMIT_INQUIRY_START,
    SUBMIT_INQUIRY_SUCCESS
} from "../actions";

const initialState = {
    order: [],
    isLoading: false,
    error: ''
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_ORDER_START:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_TO_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: [...state.order, action.payload],
            };
        case UPDATE_ORDER_START:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_ORDER_SUCCESS:
        // let newOrder = state.order.filter(item => {return item.item !== action.payload})
            return {
                ...state,
                isLoading: false,
                order: [
                ...state.order.filter((item) => {
                    return item.item !== action.payload.item;
                }),
                action.payload
                ]
            };
        case OPEN_ORDER_CARD_START:
            return {
                ...state,
                isLoading: true,
            };
        case OPEN_ORDER_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderCardOpen: true,
            };
        case CLOSE_ORDER_CARD_START:
            return {
                ...state,
                isLoading: true,
            };
        case CLOSE_ORDER_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orderCardOpen: false,
            };
        case SUBMIT_INQUIRY_START:
            return {
                ...state,
                isLoading: true
            };
        case SUBMIT_INQUIRY_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}