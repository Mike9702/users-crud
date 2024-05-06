import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants/Users';

const initialToDo = { firstName: "", lastName: "", email: "", password: "", birthday:""}

const UsersForm = ({ getUsers, showSuccessNotf, showFailNotf, setIsLoading, userSelected, deselectUser }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userSelected) reset(userSelected);
        else reset(initialToDo)
    }, [userSelected])

    const submit = (data) => {
        setIsLoading(true);
        if (userSelected) {
            // endpoint PUT -> /users/:id
            axios.put(BASE_URL + `/users/${userSelected.id}`, data)
                .then(() => {
                    getUsers();
                    showSuccessNotf("User updated successfully");
                    deselectUser();
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        } else {
            // endpoint POST -> /users
            axios.post(BASE_URL + '/users/', data)
                .then(() => {
                    getUsers()
                    showSuccessNotf("User created successfully")
                    reset(initialToDo)
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <Form style={{ maxWidth: 900 }} className="mx-auto mb-5" onSubmit={handleSubmit(submit)}>
            <h1>New User</h1>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="user.firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" {...register("firstName")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="user.lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" {...register("lastName")} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="user.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" {...register("email")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="user.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="user.birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" {...register("birthday")} />
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="mt-3">
                Submit
            </Button>
            {userSelected && (
                <Button onClick={deselectUser} variant="secondary" className="mt-3">
                    Clear
                </Button>
            )}
        </Form>
    );
};

export default UsersForm;