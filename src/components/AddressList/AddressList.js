import React, { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AddressesContext } from '../../contexts/AddressesContext';
import AddressForm from '../AddressForm/AddressForm';
import './index.css';

const AddressList = () => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [addressEdit, setAddressEdit] = useState('');

    const toggleModalForm = () => {
        setShowModalForm(!showModalForm);
    }

    const { addresses, dispatch } = useContext(AddressesContext);

    const confirmRemoveAddress = (id) => {
        if (window.confirm('Deseja realmente remover o endereço?')) {
            dispatch({ type: 'REMOVE_ADDRESS', id });
        }
    }

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const editAddress = (address) => {
        setAddressEdit(address);
        setShowModalForm(true);
    }

    return (
        <>
            <AddressForm showModal={showModalForm} onHideModal={toggleModalForm} addressEdit={addressEdit} closeModal={closeModalForm} />
            <p>
                <Button onClick={toggleModalForm}>Adicionar</Button>
            </p>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Cidade/UF</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(addresses.length > 0) ? addresses.map(address =>
                        <tr key={address.id}>
                            <td>{address.name}</td>
                            <td>{address.address}</td>
                            <td>{address.city}/{address.uf}</td>
                            <td>
                                <Button type="button" variant="primary" size="sm"
                                    onClick={() => editAddress(address)}>Editar</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="button" variant="danger" size="sm"
                                    onClick={() => confirmRemoveAddress(address.id)}>Excluir</Button>
                            </td>
                        </tr>
                    ) : (<tr>
                        <td colSpan="4" className="text-center">Nenhum endereço cadastrado, clique no botão adicionar para começar.</td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    );
}

export default AddressList;