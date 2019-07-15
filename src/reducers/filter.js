export const my_filter = (state = 'ALL', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.filter;
        default:
            return state;
    }
}