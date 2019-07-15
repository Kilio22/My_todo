export const changeFilter = (props) => {
    return (
        {
            type: 'CHANGE_FILTER',
            filter: props
        }
    )
};