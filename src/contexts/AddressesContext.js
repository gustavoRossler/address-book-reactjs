import React, { createContext, useReducer } from 'react';
import { addressesReducer } from '../reducers/addressesReducer';

export const AddressesContext = createContext();

const AddressesContextProvider = (props) => {
    const [addresses, dispatch] = useReducer(addressesReducer, []);

    return (
        <AddressesContext.Provider value={{ addresses, dispatch }}>
            {props.children}
        </AddressesContext.Provider>
    );
};

export default AddressesContextProvider;