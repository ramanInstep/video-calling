import fetcher from '../../services/api/utilities/fetcher';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getCategoriesSuccess, getCategoriesError } from '../../actions/categories';
import { GET_CATEGORIES_REQUEST } from '../../types/categories';

import { getCategoryList } from '../../queries/categories';

export function* getCategories() {
    try {
        const result = yield fetcher.post('', { query: getCategoryList() });
        let categories = result?.data?.data?.categories ?? []
        yield put(getCategoriesSuccess({ categories }));
    } catch (error) {
        yield put(getCategoriesError(error));
    }
};

export default function* defaultFunction() {
    // yield takeLatest(GET_CATEGORIES_REQUEST, getCategories);
}
