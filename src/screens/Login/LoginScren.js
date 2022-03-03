import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'

const LoginScren = () => {
    const [UserName, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([])
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();


    const handleSubmite = (e) => {
        e.preventDefault();
        const newEntry = { Email: UserName, Password: Password };
        setAllEntry([...allEntry, newEntry]);
    }
    const handleLogin = () => {
        let credentials = { UserName, Password }
        console.log(credentials)
        setIsLoading(true)
        const url = 'https://mydonatmeapi.herokuapp.com/portalLogin'
        axios.post(url, credentials)
            .then(res => {
                const result = res.data;
                const { message, status, data } = result;
                if (status !== 'SUCCESS') {
                    swal({
                        title: status,
                        text: message,
                        icon: "warning",
                    }).then((value) => {
                        setIsLoading(false)
                    })
                } else {
                    swal({
                        title: status,
                        text: message,
                        icon: "success",
                    }).then((value) => {
                        setIsLoading(false)
                        localStorage.setItem('token', result.data.token)
                        localStorage.setItem('ID', result.data._id)
                        window.location.reload()
                    })
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error)
            })
    }
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };
    return (
        <>
            <div >
                <h1 className='shadow-sm text-success mt-5 p-3 text-center rounded'>Portal Login</h1>
                <Row className='mt-5'>
                    <Col lg={5} md={6} sm={12} className='m-auto p-5 shadow-sm rounded-lg'>
                        <Form onSubmit={handleSubmite}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control placeholder="Enter UserName" onChange={(e => setEmail(e.target.value))} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            {!isLoading && (
                                <Button variant="success col-12" type="submit" onClick={handleLogin}>
                                    Login
                                </Button>
                            )}
                            {isLoading && (
                                <Button variant="success col-12" type="submit" onClick={handleLogin}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </Button>
                            )}
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default LoginScren