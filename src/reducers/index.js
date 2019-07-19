import { combineReducers } from 'redux';
import byIds, * as fromByIds from './byIds';
import createList, * as fromCreateList from './createList';

const listByFilter = combineReducers({
    all: createList('all'),
    completed: createList('completed'),
    visible: createList('visible')
});

export const todoApp = combineReducers({
    byIds, //full liste
    listByFilter //3 listes, chacune correspondant à un filtre, avec 3 reducers chacun -> un pour récup les Ids de chaque filtre, un pour le loading state, un pour le error message
});

export const getVisibleTodos = (state, filter) => {
    const ids = fromCreateList.getIds(state.listByFilter[filter]); //on récupère les IDs du filtre actuel
    return ids.map(id => fromByIds.getTodo(state.byIds, id)); //on récupère les objets de la full liste avec les IDs de ceux présents dans le filtre
};

export const getIsFetching = (state, filter) => (
    fromCreateList.getIsFetching(state.listByFilter[filter]) //on regarde si oui ou non, la liste à render est en train de charger ou non
);

export const getErrorMessage = (state, filter) => (
    fromCreateList.getErrorMessage(state.listByFilter[filter]) //on récupère l'error message en fonction du filtre actuel
);