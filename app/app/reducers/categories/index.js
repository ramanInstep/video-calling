import produce from 'immer';
import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from '../../types/categories';

export const initialState = {
    loading: false,
    error: false,
    categories: []
};

const categoryReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case GET_CATEGORIES_REQUEST:
                draft.loading = true;
                draft.error = false;
                break;

            case GET_CATEGORIES_SUCCESS:
                draft.categories = action.payload.categories;
                draft.loading = false;
                break;

            case GET_CATEGORIES_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break;
        }
    });

export default categoryReducer;
