import { createSelector } from 'reselect';
import { initialState } from '../../reducers/home';

const selectHome = state => state.home || initialState;

const makeSelectProducts = () =>
    createSelector(
        selectHome,
        homeState => homeState.products,
    );

const makeSelectLoading = () =>
    createSelector(
        selectHome,
        homeState => homeState.loading,
    );

const makeSelectError = () =>
    createSelector(
        selectHome,
        homeState => homeState.error,
    );


export { selectHome, makeSelectProducts, makeSelectLoading, makeSelectError };
