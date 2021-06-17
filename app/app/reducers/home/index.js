import produce from 'immer';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from '../../types/home';

export const initialState = {
  loading: false,
  error: false,
  products: []
};

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case GET_PRODUCTS_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCTS_SUCCESS:
        draft.products = action.payload.products;
        draft.loading = false;
        break;

      case GET_PRODUCTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
