import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import './../App.css'
import axios from 'axios';
import Select from 'react-select'
import jwt from 'jwt-decode'
import swl from "sweetalert"
import { useNavigate } from 'react-router';
const RequestForOrgan = () => {
    const history = useNavigate();
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState("");
    const token = localStorage.getItem('token')
    const decodeToken = jwt(token);
    const ID = decodeToken._id;
    //form handling 
    const [HosName, setHosName] = useState("");
    const [HosLocation, setHosLocation] = useState("");
    const [PatName, setPatName] = useState("");
    const [PatDecease, setPatDecease] = useState("");
    const [PatCnic, setPatCnic] = useState("");
    const [PatDOB, setPatDOB] = useState("");
    const [PatRequired, setPatRequired] = useState("");
    const [Description, setDescription] = useState("");

    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const options = data.map((item) => {
        return (
            { value: item.organName, label: item.organName }
        )
    });

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5,
            }}
        />
    );
    //API call
    const getDropdowndata = () => {
        axios.get('https://mydonatmeapi.herokuapp.com/dropdownOrgan')
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                } else {
                    setData(data)
                }
            })
            .catch(erro => {
                console.log(erro);
            })
    }
    const handleselect = (e) => {
        setPatRequired(e.value)
    }
    const handleRequest = () => {
        const credentials = { "HosId": ID, "HosName": HosName, "HosLocation": HosLocation, "PatName": PatName, "PatDecease": PatDecease, "PatCnic": PatCnic, "PatDOB": PatDOB, "PatRequired": PatRequired, "Description": Description }
        
        const url = 'https://mydonatmeapi.herokuapp.com/Request'
        axios
            .post(url, credentials, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                } else {
                    swl({
                        icon: "success",
                        text: message
                    });
                    history('/requestbyHos')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getDropdowndata();
    }, [])
    return (
        <div>
            <Container style={{ maxWidth: '100%', padding: 0 }}>
                <Navbar />
                <Sidebar />
                <main>
                    <div className="main_container">
                        <div style={{ padding: 30 }}>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={6} md={6}>
                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Hospital ID</Form.Label>
                                            <Form.Control type="text" disabled defaultValue={ID} />
                                        </Form.Group>
                                        <Form.Group controlId="form.Email">
                                            <Form.Label>Hospital Name</Form.Label>
                                            <Form.Control type="text" name='HosName' defaultValue={HosName} onChange={(e) => setHosName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={6}>
                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Hospital Location</Form.Label>
                                            <Form.Control type="text" name='HosLocation' defaultValue={HosLocation} onChange={(e) => setHosLocation(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <ColoredLine color="red" />
                                <Row>
                                    <Col xs={6} md={6}>
                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Patient Name</Form.Label>
                                            <Form.Control type="text" name='PatName' placeholder="Enter patient name" defaultValue={PatName} onChange={(e) => setPatName(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Patient Decease</Form.Label>
                                            <Form.Control type="text" name='PatDecease' placeholder="Enter Patient Decease" defaultValue={PatDecease} onChange={(e) => setPatDecease(e.target.value)} required />
                                        </Form.Group>

                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Patient CNIC</Form.Label>
                                            <Form.Control type="text" name='PatCnic' placeholder="Enter patient CNIC" defaultValue={PatCnic} onChange={(e) => setPatCnic(e.target.value)} required />
                                        </Form.Group>

                                    </Col>
                                    <Col xs={6} md={6}>
                                        <Form.Group controlId="form.Name">
                                            <Form.Label>Patient DOB</Form.Label>
                                            <Form.Control type="date" name="PatDOB" placeholder="Enter Patient DOB" defaultValue={PatDOB} onChange={(e) => setPatDOB(e.target.value)} required />
                                        </Form.Group>

                                        <Form.Group controlId="form.dropdown">
                                            <Form.Label>Patient Need</Form.Label>
                                            <Select
                                                defaultValue={PatDOB}
                                                onChange={(e) => { handleselect(e) }}
                                                options={options}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <ColoredLine color="red" />
                                <Row>
                                    <Col>
                                        <Form.Group controlId="form.Textarea">
                                            <Form.Label>Patient Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} name='Description' defaultValue={Description} onChange={(e) => setDescription(e.target.value)} required />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Button onClick={handleRequest} className="fluid ui button blue" type='submit' style={{ marginTop: 10 }}>Submit</Button>
                            </Form>
                        </div>
                    </div>
                </main>
            </Container>
        </div>
    );
};

export default RequestForOrgan;