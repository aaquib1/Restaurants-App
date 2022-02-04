import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import NavBarMenu from './NavBarMenu';

class RestaurantList extends Component {
    constructor() {
        super()
        this.state = {
            list: null,
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        fetch("http://localhost:3000/restaurant").then((response) => {
            response.json().then((result) => {
                // console.warn(result);
                this.setState({ list: result })
            })
        })
    }
    delete(id) {
        fetch('http://localhost:3000/restaurant/' + id, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((resp) => {
                alert('Restaurant has been deleted')
                this.getData()
            })
        })
    }
    render() {

        return (
            <div>
                <NavBarMenu />
                <h1>Restaurant List</h1>
                {
                    this.state.list ?
                        <Container>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sl. No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Rating</th>
                                        <th>Address</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.rating}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <Link to={"/update/" + item.id}><FontAwesomeIcon icon={faEdit} style={{ marginRight: 15 }} /></Link>
                                                    <span onClick={() => this.delete(item.id)}><FontAwesomeIcon icon={faTrash} color='red' /></span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Container>
                        : <p>Please Wait...</p>
                }
            </div>
        );
    }
}

export default RestaurantList;