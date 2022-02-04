import React, { Component } from 'react';
import { Container, Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import NavBarMenu from './NavBarMenu';

class RestaurantSearch extends Component {
    constructor() {
        super()
        this.state = {
            searchData: null,
            noData: false,
            listSearch: ""
        }
    }
    search(key) {
        console.warn(key);
        this.setState({ listSearch: key })
        fetch('http://localhost:3000/restaurant?q=' + key).then((data) => {
            data.json().then((resp) => {
                console.warn(resp);
                if (resp.length > 0) {
                    this.setState({ searchData: resp, noData: false })
                }
                else {
                    this.setState({ noData: true, searchData: null })
                }

            })
        })
    }
    delete(id) {
        fetch('http://localhost:3000/restaurant/' + id, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((resp) => {
                alert('Restaurant has been deleted')
                this.search(this.state.listSearch)
            })
        })
    }
    render() {

        return (
            <Container>
                <NavBarMenu />
                <h1>Restaurant Search</h1>
                {/* <input type="text" onChange={(event) => this.search(event.target.value)} /> */}
                <Form.Control type="text" onChange={(event) => this.search(event.target.value)} placeholder="Search" />
                <div>
                    {
                        this.state.searchData ?
                            <div>
                                <Table striped bordered hover className='search-row'>
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
                                            this.state.searchData.map((item) =>
                                                // <div className='search-row'>{item.name}</div>
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
                            </div>
                            : ""
                    }
                    {
                        this.state.noData ? <h3>No Data Found</h3> : null
                    }
                </div>
            </Container>
        );
    }
}

export default RestaurantSearch;