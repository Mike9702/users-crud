import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup, Table } from 'react-bootstrap';
import { BASE_URL } from '../constants/Users';

const UsersList = ({ users, getUsers, showSuccessNotf, showFailNotf, setIsLoading, selectUser }) => {

    const deleteUser = id => {
        setIsLoading(true);
        // endpoint DELETE -> /users/:id
        axios.delete(BASE_URL + `/users/${id}`)
            .then(() => {
                getUsers();
                showSuccessNotf("User removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div className='border shadow'>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>   
                {
                    users.map(user => {

                        return (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                
                                <td>{user.birthday}</td>
                                <td>
                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='warning'
                                        size='sm'
                                        onClick={() => selectUser(user)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UsersList;