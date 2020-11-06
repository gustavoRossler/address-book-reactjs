import React, { createContext, useEffect, useReducer } from 'react';
import { addressesReducer } from '../reducers/addressesReducer';

export const AddressesContext = createContext();

const AddressesContextProvider = (props) => {
    const [addresses, dispatch] = useReducer(addressesReducer, [], () => {
        const localData = localStorage.getItem('addresses');
        return localData ? JSON.parse(localData) : [];
    });
    useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);
    return (
        <AddressesContext.Provider value={{ addresses, dispatch }}>
            {props.children}
        </AddressesContext.Provider>
    );
};

export default AddressesContextProvider;