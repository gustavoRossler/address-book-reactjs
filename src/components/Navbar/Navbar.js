import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Navbar extends Component {
    render() {
        return (
            <Jumbotron fluid style={{ padding: 30 }}>
                <h1>Livro de endereços</h1>
                <p>
                    Aplicação de demonstração com recursos de um livro de endereços.
                    </p>
            </Jumbotron>
        );
    }
};

export default Navbar;