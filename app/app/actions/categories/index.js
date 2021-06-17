import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from '../../types/categories';

export function getCategoriesRequest() {
    return {
        type: GET_CATEGORIES_REQUEST,
    };
}

export function getCategoriesSuccess(payload) {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload
    };
}

export function getCategoriesError(error) {
    return {
        type: GET_CATEGORIES_ERROR,
        error,
    };
}
