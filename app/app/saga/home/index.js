import fetcher from '../../services/api/utilities/fetcher';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getProductsSuccess, getProductsError } from '../../actions/home';
import { GET_PRODUCTS_REQUEST } from '../../types/home';
import { GET_CATEGORIES_REQUEST } from '../../types/categories';

import { getAllProducts } from '../../queries/quotes';

import { getCategories } from '../category'

export function* getProducts({args}) {
    console.log(args,'argsargs')
    try {
        const result = yield fetcher.post('', { query: getAllProducts(args) });
        let products = result?.data?.data?.products ?? []
        yield put(getProductsSuccess({ products, count: 0 }));
    } catch (error) {
        yield put(getProductsError(error));
        console.log(error, 'sssssssssssssss');
    }
};

export default function* defaultFunction() {
    yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
    yield takeLatest(GET_CATEGORIES_REQUEST, getCategories);
}
