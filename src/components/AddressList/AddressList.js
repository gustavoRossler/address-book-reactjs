import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AddressesContext } from '../../contexts/AddressesContext';
import AddressDetails from '../AddressDetails/AddressDetails';
import AddressForm from '../AddressForm/AddressForm';
import { FaSortAlphaDownAlt, FaSortAlphaDown, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import './index.css';

const AddressList = () => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [addressEdit, setAddressEdit] = useState('');
    const [addressView, setAddressView] = useState('');
    const [sortByName, setSortByName] = useState('');
    const [sortByAddress, setSortByAddress] = useState('');

    const [fixedAddresses, setFixedAddresses] = useState([]);
    const [normalAddresses, setNormalAddresses] = useState([]);

    const handleSortByAddress = (dir) => {
        setSortByName('');
        setSortByAddress(dir);

    }

    const handleSortByName = (dir) => {
        setSortByAddress('');
        setSortByName(dir);

    }

    const toggleModalDetails = () => {
        setShowModalDetails(!showModalDetails);
        if (!showModalDetails) {
            setAddressView('');
        }
    }

    const toggleModalForm = () => {
        setShowModalForm(!showModalForm);
        if (!showModalForm) {
            setAddressEdit('');
        }
    }

    const { addresses, dispatch } = useContext(AddressesContext);

    const confirmRemoveAddress = (id) => {
        if (window.confirm('Deseja realmente remover o endereço?')) {
            dispatch({ type: 'REMOVE_ADDRESS', id });
        }
    }

    const closeModalForm = () => {
        setShowModalForm(false);
        setAddressView('');
    }

    const closeModalDetails = () => {
        setShowModalDetails(false);
        setAddressEdit('');
    }

    const editAddress = (address) => {
        setAddressEdit(address);
        setShowModalForm(true);
    }

    const viewAddress = (address) => {
        setAddressView(address);
        setShowModalDetails(true);
    }

    const sortList = (a, b) => {
        
        if (sortByName !== '') {
            if (sortByName === 'asc') {
                return (a.name.replace(/ /g, '') > b.name.replace(/ /g, '')) ? 1 : -1;
            } else {
                return (a.name.replace(/ /g, '') < b.name.replace(/ /g, '')) ? 1 : -1;
            }
        } else if (sortByAddress !== '') {
            if (sortByAddress === 'asc') {
                return (a.address.replace(/ /g, '') > b.address.replace(/ /g, '')) ? 1 : -1;
            } else {
                return (a.address.replace(/ /g, '') < b.address.replace(/ /g, '')) ? 1 : -1;
            }
        }

        return 0;
    }

    useEffect(() => {
        if (sortByName === '' && sortByAddress === '') {
            setSortByName('asc');
        }

        addresses.sort((a, b) => sortList(a, b));
        setFixedAddresses(addresses.filter(item => item.defaultShippingAddress || item.billingAddress));
        setNormalAddresses(addresses.filter(item => !item.defaultShippingAddress && !item.billingAddress));
    }, [sortByName, sortByAddress, addresses.length, showModalForm]);

    return (
        <>
            <AddressDetails showModal={showModalDetails} onHideModal={toggleModalDetails} closeModal={closeModalDetails} address={addressView} />
            <AddressForm showModal={showModalForm} onHideModal={toggleModalForm} addressEdit={addressEdit} closeModal={closeModalForm} />
            <p>
                <Button onClick={toggleModalForm}>Adicionar</Button>
            </p>
            <h4>
                Endereços cadastrados
            </h4>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSortByName((sortByName === 'asc') ? 'desc' : 'asc')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            {(sortByName === 'desc') ? <FaSortAlphaDownAlt /> : ''}
                            {(sortByName === 'asc') ? <FaSortAlphaDown /> : ''}
                            &nbsp;Nome
                        </th>
                        <th onClick={() => handleSortByAddress((sortByAddress === 'asc') ? 'desc' : 'asc')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            {(sortByAddress === 'desc') ? <FaSortAlphaDownAlt /> : ''}
                            {(sortByAddress === 'asc') ? <FaSortAlphaDown /> : ''}
                            Endereço
                        </th>
                        <th>Cidade/UF</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(normalAddresses.length > 0 || fixedAddresses.length > 0) ? (
                        fixedAddresses.map(address =>
                            <tr key={address.id} style={{ background: (address.defaultShippingAddress || address.billingAddress) ? '#fff9de' : '#fff' }}>
                                <td>{address.name}</td>
                                <td>{address.address}</td>
                                <td>{address.city}/{address.uf}</td>
                                <td>
                                    <Button type="button" variant="secondary" size="sm"
                                        onClick={() => viewAddress(address)}><FaEye /> Visualisar</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="button" variant="primary" size="sm"
                                        onClick={() => editAddress(address)}><FaEdit /> Editar</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="button" variant="danger" size="sm"
                                        onClick={() => confirmRemoveAddress(address.id)}><FaTrash /> Excluir</Button>
                                </td>
                            </tr>
                        )
                    ).concat(
                        normalAddresses.map(address =>
                            <tr key={address.id} style={{ background: (address.defaultShippingAddress || address.billingAddress) ? '#fff9de' : '#fff' }}>
                                <td>{address.name}</td>
                                <td>{address.address}</td>
                                <td>{address.city}/{address.uf}</td>
                                <td>
                                    <Button type="button" variant="secondary" size="sm"
                                        onClick={() => viewAddress(address)}><FaEye /> Visualisar</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="button" variant="primary" size="sm"
                                        onClick={() => editAddress(address)}><FaEdit /> Editar</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="button" variant="danger" size="sm"
                                        onClick={() => confirmRemoveAddress(address.id)}><FaTrash /> Excluir</Button>
                                </td>
                            </tr>
                        )
                    ) : (<tr>
                        <td colSpan="4" className="text-center">Nenhum endereço cadastrado, clique no botão adicionar para começar.</td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    );
}

export default AddressList;