import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import axios from 'axios';
import swal from 'sweetalert'

const SelectedDonar = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const RequestID = location.state
    const handleFetch = () => {
        const credentials = { RequestID };
        const token = localStorage.getItem("token")
        console.log(credentials)
        //const url = `http://localhost:8000/selectedRecord`
        const url = `https://mydonatmeapi.herokuapp.com/selectedRecord`
        axios.post(url, credentials, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    console.log("Failed")
                } else {
                    setData(data)
                    console.log(data)
                }
            })
    }
    useState(() => {
        handleFetch();
    }, [])
    return (
        <div style={{ padding: 50 }}>
            <div style={{marginBottom:20}}>
                <Button>Go Back</Button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Organ</th>
                        <th>Age</th>
                        <th>Phone No</th>
                        <th>CNIC</th>
                        <th>State</th>
                        <th>isActive</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>
                        <tr key={item._id}>
                            <td>#</td>
                            <td>{item.name}</td>
                            <td>{item.organ}</td>
                            <td>{item.Age}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.cnic}</td>
                            <td>{item.state}</td>
                            <td>{item.isActive ? "Yes" : "NO"}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default SelectedDonar;