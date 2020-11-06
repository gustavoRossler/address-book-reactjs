export const addressesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ADDRESS':
            return [...state, action.address];
        case 'REMOVE_ADDRESS':
            return state.filter(item => item.id !== action.id);
        case 'UPDATE_ADDRESS':
            return state.map(item => (item.id === action.address.id) ? action.address : item);
        default:
            return state;
    }
}