import "./hospital.css";
import React, { useEffect, useState, StyleSheet } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Button, Modal } from "react-bootstrap"
import axios from "axios"
import { icons } from "material-icons"
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import MapRender from "../MapRender";

function Hospital() {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [View, setView] = useState(false)
    const [ViewSHow, setViewShow] = useState(false)
    const handleViewClose = () => setViewShow(false);
    const handleViewShow = () => setViewShow(true);

    const [EditSHow, setEditShow] = useState(false)
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [mapModel, setMapeModel] = useState(false);
    const [Delete, setDelete] = useState(false)
    const handleMapClose = () => setMapeModel(false);
    const handleMapShow = () => setMapeModel(true);

    const [RowData, setRowData] = useState([]);
    const [Message, setMessage] = useState("")

    const [Name, setName] = useState(RowData.Name)
    const [Email, setEmail] = useState(RowData.Email);
    const [Location, setLocation] = useState(RowData.location);
    const [HelpLine, setHelpLine] = useState(RowData.HelpLine);
    const [HospDis, setHospDis] = useState(RowData.HospDis);
    const [Password, setHosPass] = useState("");
    const [HosConPass, setHospConPass] = useState("");
    const [UserName, setHospUserName] = useState("");

    const [ID, setID] = useState("");

    const handleSubmitte = (e) => {
        e.preventDefault();
    }
    const handleSignup = () => {
        let credentials = { Name, Email, Location, HelpLine, HospDis, UserName, Password, Role: "Hospital" }
        console.log(credentials)
        const url = 'https://mydonatmeapi.herokuapp.com/hospital/addHospital'
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    alert(message, status)
                } else {
                    alert(message)
                    setShow(false)
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleMessage = (message, status) => {
        setMessage(message);
    };
    const HospitalData = () => {
        axios.get(`https://mydonatmeapi.herokuapp.com/Hospital`)
            .then(function (response) {
                const result = response.data;
                const { status, message, data } = result;
                console.log(message)
                if (status !== 'SUCCESS') {
                    console.log(message)
                } else {
                    setData(data)
                }
            })
            .catch((error) => {
                console.log(error.response.message)
            })
            .finally(() => setIsLoading(false));
    }
    const handleDelete = () => {
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/hospital/${ID}`
        axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    alert(message, status)
                } else {
                    alert(message)
                    setShow(false)
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
            })
    };
    const handleEdit = () => {
        let HospitalID = { "_id": ID, "Name": Name, "Email": Email, "Location": Location, "HelpLine": HelpLine, "HospDis": HospDis }
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/hospitalEdit/`
        axios.post(url, HospitalID, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    swal({
                        title: status,
                        text: message,
                        icon: "warning",
                    }).then((value) => {
                        window.location.reload()
                    })
                } else {
                    swal({
                        title: status,
                        text: message,
                        icon: "success",
                    }).then((value) => {
                        window.location.reload()
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    };
    useEffect(() => {
        setIsLoading(true)
        HospitalData();
    }, [])
    return (
        <Container style={{ maxWidth: '100%', padding: 0 }}>
            <Navbar />
            <Sidebar />
            <main>
                <div className="main_container">
                    <div className="crud shadow-lg p-3 mb-5 mt-2 bg-body rounded">
                        <div className="row ">
                            <div className="col-sm-3 mt-5 mb-4 text-gred">
                                <div className="search">
                                    <form className="form-inline">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search Hospital" aria-label="Search" />

                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-3 offset-sm-2 mt-5" style={{ color: "black" }}><h4><b>Hospital Details</b></h4></div>
                            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}><i className="fa fa-plus"></i>
                                    Add New Hospital
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive " >
                                <table className="table table-striped table-hover table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>S/N</th>
                                            <th>Name </th>
                                            <th>Email</th>
                                            <th>HelpLine </th>
                                            <th>Location </th>
                                            <th>IsActive</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) =>
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.HelpLine}</td>
                                                <td>{item.Location}</td>
                                                <td>{item.IsActive ? <p style={{ color: "#3ea175" }}>Active</p> : <p style={{ color: "#ffc107" }}>Disabled</p>}</td>
                                                <td style={{ minWidth: 180 }}>
                                                    <Button size="sm" variant="primary" onClick={() => handleViewShow(setRowData(item), setView(true), setDelete(false))}>View</Button>|
                                                    <Button size="sm" variant="warning" onClick={() => handleEditShow(setRowData(item), setID(item._id))}>Edit</Button>|
                                                    <Button size="sm" variant="danger" onClick={() => handleViewShow(setRowData(item), setDelete(true), setView(false), setID(item._id))}>Delete</Button>
                                                    {/* <a href="#" className="View" title="View" data-toggle="tooltip" style={{ color: "#10ab80" }}><i className="material-icons">&#xE417;</i></a>
                                                        <a href="#" className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                        <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }}><i className="material-icons">&#xE872;</i></a> */}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Hospital</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter hospital Name" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter hospital Email" />
                                </div>
                                <div className="form-group mt-3">
                                    {/* <Button className="form-control" type="button" onClick={() => handleMapShow(setMapeModel(true))}>Please select hospital location</Button> */}
                                    <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} placeholder="Enter hospital Location" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHelpLine(e.target.value)} placeholder="Enter hospital HelpLine" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHospDis(e.target.value)} placeholder="Enter Hospital description" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHospUserName(e.target.value)} placeholder="Enter hospital UserName" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHosPass(e.target.value)} placeholder="Enter hospital Password" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHospConPass(e.target.value)} placeholder="Confirm Password" />
                                </div>
                                <button type="submit" className="btn btn-success mt-4" onClick={handleSignup}>Add Record</button>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
                {/* Model Box Finsihs */}
                {/* Map Model */}
                <div className="model_box_Map">
                    <Modal
                        show={mapModel}
                        onHide={handleMapClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Select Map</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MapRender />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" className="btn btn-success" variant="secondary">Select Location</Button>
                            <Button variant="secondary" onClick={handleMapClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
                {/* View Record */}
                <div className="model_box_view">
                    <Modal
                        show={ViewSHow}
                        onHide={handleViewClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Hospital</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={RowData.Name} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="email" className="form-control" value={RowData.Email} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.Location} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.HelpLine} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.HospDis} readOnly />
                                </div>
                                {Delete && (
                                    <button type="submit" className="btn btn-danger mt-4" onClick={handleDelete}>Delete Record</button>
                                )}
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleViewClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {/* Edit Record */}
                <div className="model_box_Edit">
                    <Modal
                        show={EditSHow}
                        onHide={handleEditClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Record</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <label>Hospital Name</label>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" defaultValue={RowData.Name} readOnly={false} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Hospital Email</label>
                                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" defaultValue={RowData.Email} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Hospital Location</label>
                                    <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location" defaultValue={RowData.Location} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Hospital HelpLine</label>
                                    <input type="text" className="form-control" onChange={(e) => setHelpLine(e.target.value)} placeholder="Enter HelpLine" defaultValue={RowData.HelpLine} />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Hospital Description</label>
                                    <input type="text" className="form-control" onChange={(e) => setHospDis(e.target.value)} placeholder="Enter Hospital description" defaultValue={RowData.HospDis} />
                                </div>

                                <button type="submit" className="btn btn-warning mt-4" onClick={handleEdit}>Edit Record</button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </main>
        </Container>
    );
}
export default Hospital