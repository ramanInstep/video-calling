import { createSelector } from 'reselect';
import { initialState } from '../../reducers/home';

const selectCategory = state => state.category || initialState;

const makeSelectCategories = () =>
    createSelector(
        selectCategory,
        categoryState => categoryState.categories,
    );

const makeSelectLoading = () =>
    createSelector(
        selectCategory,
        categoryState => categoryState.loading,
    );

const makeSelectError = () =>
    createSelector(
        selectCategory,
        categoryState => categoryState.error,
    );


export { selectCategory, makeSelectCategories, makeSelectLoading, makeSelectError };
