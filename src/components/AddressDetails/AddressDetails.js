import React from 'react';
import { Col, Modal, Row, Button } from 'react-bootstrap';

const AddressDetails = (props) => {
    return (
        <>
            <Modal show={props.showModal} onHide={props.onHideModal} animation={false} size="lg">
                <Modal.Header>
                    <h2>Detalhes do endereço</h2>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">{props.address.name}</h4>
                    <br />
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>Endereço:</b></Col>
                        <Col md="8">{props.address.address}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>UF:</b></Col>
                        <Col md="8">{props.address.uf}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>Cidade:</b></Col>
                        <Col md="8">{props.address.city}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>CEP:</b></Col>
                        <Col md="8">{props.address.zipCode}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>Endereço de entrega:</b></Col>
                        <Col md="8">{(props.address.defaultShippingAddress) ? 'Sim' : 'Não'}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="4" className="text-right"><b>Endereço de cobrança:</b></Col>
                        <Col md="8">{(props.address.billingAddress) ? 'Sim' : 'Não'}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHideModal}>Voltar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddressDetails;