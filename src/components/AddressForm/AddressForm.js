import React, { useContext, useState, useEffect } from 'react';
import { Col, Form, Row, Modal, Button } from 'react-bootstrap';
import { AddressesContext } from '../../contexts/AddressesContext';
import { v1 as uuidv1 } from 'uuid';
import { getUfs, getCities } from '../../services/localesService';

const AddressForm = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [billingAddress, setBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const [validated, setValidated] = useState(false);

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchUfs = async () => {
        const dataUfs = await getUfs();
        dataUfs.sort((a, b) => (a.sigla > b.sigla) ? 0 : -1);
        setUfs(dataUfs);
    };

    const fetchCities = async () => {
        const dataCities = await getCities(uf);
        dataCities.sort((a, b) => (a.nome > b.nome) ? 0 : -1);
        setCities(dataCities);
    };

    useEffect(() => {
        if (ufs.length == 0) {
            fetchUfs();
        }
    }, [ufs.length]);

    useEffect(() => {
        if (uf) {
            fetchCities();
        }
    }, [uf]);

    useEffect(() => {
        if (props.addressEdit.city) {
            setCity(props.addressEdit.city);
        }
    }, [cities]);

    useEffect(() => {
        if (!props.addressEdit && props.showModal) {
            clearForm();
        }
    }, [props.showModal]);

    useEffect(() => {
        async function getUfs() {
            await fetchUfs();
            setUf(props.addressEdit.uf);
            await fetchCities();
        }

        if (props.addressEdit && props.showModal) {
            setId(props.addressEdit.id);
            setName(props.addressEdit.name);
            setAddress(props.addressEdit.address);
            setZipCode(props.addressEdit.zipCode);

            setBillingAddress(props.addressEdit.billingAddress);
            setDefaultShippingAddress(props.addressEdit.defaultShippingAddress);
            setValidated(false);

            getUfs();
        }
    }, [props.addressEdit]);

    const { dispatch } = useContext(AddressesContext);

    const isValid = () => {
        return (
            name.length > 0 && address.length > 0 && city.length > 0 && uf.length == 2 && zipCode.length >= 8
        );
    }

    const clearForm = () => {
        setId('');
        setName('');
        setAddress('');
        setZipCode('');
        setCity('');
        setUf('');
        setBillingAddress(false);
        setDefaultShippingAddress(false);
        setValidated(false);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (isValid()) {
            let payload = {};
            let type = '';

            if (id !== '') {
                type = 'UPDATE_ADDRESS';
                payload = {
                    id,
                    name,
                    address,
                    uf,
                    city,
                    zipCode,
                    billingAddress,
                    defaultShippingAddress
                };
            } else {
                type = 'ADD_ADDRESS';
                payload = {
                    id: uuidv1(),
                    name,
                    address,
                    uf,
                    city,
                    zipCode,
                    billingAddress,
                    defaultShippingAddress
                };
            }

            dispatch({ type, address: payload });

            clearForm();
            props.closeModal();
        }
    };

    return (
        <>
            <Modal show={props.showModal} onHide={props.onHideModal} animation={false} size="lg">
                <Modal.Header>
                    <h2>Cadastro/Alteração</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Nome</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Nome, ex: Casa, trabalho, etc." id="name"
                                    onChange={(e) => setName(e.target.value)} required value={name} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe o nome.
                                    </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Endereço</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Logradouro, número, complemento..."
                                    onChange={(e) => setAddress(e.target.value)} required value={address} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe o endereço.
                                    </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">UF</Form.Label>
                            <Col sm="4">
                                <Form.Control as="select" onChange={(e) => setUf(e.target.value)} required value={uf}>
                                    <option value=""></option>
                                    {ufs.map(item => (
                                        <option value={item.sigla} key={item.id}>{item.sigla}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe a UF.
                                    </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Cidade</Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" onChange={(e) => setCity(e.target.value)} required value={city}>
                                    <option value=""></option>
                                    {cities.map(item => (
                                        <option value={item.nome} key={item.id}>{item.nome}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe a cidade.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">CEP</Form.Label>
                            <Col sm="4">
                                <Form.Control placeholder="Somente números" onChange={(e) => setZipCode(e.target.value)}
                                    required value={zipCode} minLength="8" />
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe um CEP válido.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"></Form.Label>
                            <Col sm="4">
                                <Form.Check type="checkbox" label="Endereço de entrega padrão" id="defaultShippingAddress"
                                    onChange={(e) => setDefaultShippingAddress(e.target.checked)}
                                    checked={defaultShippingAddress} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"></Form.Label>
                            <Col sm="4">
                                <Form.Check type="checkbox" label="Endereço de cobrança padrão" id="billingAddress"
                                    onChange={(e) => setBillingAddress(e.target.checked)}
                                    checked={billingAddress} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHideModal}>Cancelar</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => handleSubmit(e)}>Salvar</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddressForm;