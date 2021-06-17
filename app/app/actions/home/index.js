import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from '../../types/home';

export function getProductsRequest(args) {
  return {
    type: GET_PRODUCTS_REQUEST,
    args
  };
}

export function getProductsSuccess(payload) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error,
  };
}
