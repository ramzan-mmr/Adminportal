import "../Hospital/hospital.css";
import React, { useEffect, useState, StyleSheet } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Table, Col, Button, Modal, Figure } from "react-bootstrap"
import axios from "axios"
import { icons } from "material-icons"
import FileUploader from "../../components/FileUploader";
import swal from 'sweetalert'

const Organ = (() => {
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

    const [Delete, setDelete] = useState(false)

    const [RowData, setRowData] = useState([]);
    const [Message, setMessage] = useState("")
    const [MessageType, setMessageType] = useState("")

    const [organName, setName] = useState("")
    const [image, setImage] = useState(null)
    const [ID, setID] = useState("")

    const handleOrganUpload = () => {
        const token = localStorage.getItem("token")
        const ID = localStorage.getItem("ID")
        const credentials = { "organName": organName,"avatar": image, "isActive": "true", "userID": ID }
        handleMessage(null);
        console.log(credentials)
        const url = `https://mydonatmeapi.herokuapp.com/Organ`;
        axios
            .post(url, credentials)
                .then(response => {
                    const result = response.data;
                    const { status, message } = result;
                    if (status !== 'SUCCESS') {
                        swal({
                            title: status,
                            text: message,
                            icon: "error",
                        }).then((value) => {
                            window.location.reload()
                        })
                        console.log(status)
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
                .catch(err => {
                    console.log(err)
                })
    };

    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };
    const OrganData = () => {
        axios.get(`https://mydonatmeapi.herokuapp.com/organ`)
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
        const url = `https://mydonatmeapi.herokuapp.com/Organ/${ID}`
        axios.delete(url, {
            headers: { "Authorization": `Bearer ${token}` },
            value: true
        })
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    alert(message, status)
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
    }
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        console.log(e.target.files[0])
    }
    useEffect(() => {
        setIsLoading(true)
        OrganData();
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
                            <div className="col-sm-3 offset-sm-2 mt-5" style={{ color: "black" }}><h4><b>Organs Details</b></h4></div>
                            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}><i className="fa fa-plus"></i>
                                    Add New Organ
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive " >
                                <table className="table table-striped table-hover table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>S/N</th>
                                            <th>Organ Name</th>
                                            <th>is Active </th>
                                            <th>Created On </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) =>
                                            <tr key={item._id}>
                                                <td>#</td>
                                                <td>{item.organName}</td>
                                                <td>{item.isActive}</td>
                                                <td>{item.CreatedON}</td>
                                                <td style={{ minWidth: 180 }}>
                                                    <Button size="sm" variant="primary" onClick={() => handleViewShow(setRowData(item), setView(true), setDelete(false))}>View</Button>|
                                                    <Button size="sm" variant="warning" onClick={() => handleEditShow(setRowData(item))}>Edit</Button>|
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
                            <Modal.Title>Add Record</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Organ Name" />
                                </div>
                                <div className="mt-3">
                                    <input type="file" onChange={(e)=>{onImageChange(e)}} className="filetype" />
                                    <img src={image} alt="preview image" style={{ width: 200 }} className="mt-3" />
                                </div>
                                <button type="submit" className="btn btn-success mt-4" onClick={handleOrganUpload}>Add Record</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
                {/* Model Box Finsihs */}

                {/* View Record */}
                <div className="model_box_view">
                    <Modal
                        show={ViewSHow}
                        onHide={handleViewClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Record</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={RowData.organName} readOnly />
                                </div>
                                <div className="mt-4">
                                    <Figure>
                                        <Figure.Image
                                            width={171}
                                            height={180}
                                            alt="171x180"
                                            src={RowData.avatar}
                                        />
                                        <Figure.Caption>
                                            {RowData.organName}
                                        </Figure.Caption>
                                    </Figure>
                                </div>
                                {/* {View && (
                                    <button type="submit" className="btn btn-success mt-4" onClick={handleSignup}>Add Record</button>
                                )} */}
                                {Delete && (
                                    <button type="submit" className="btn btn-danger mt-4" onClick={handleDelete}>Delete Record</button>
                                )}
                            </form>
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
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" value={RowData.Name} />
                                </div>
                                {/* <div className="form-group mt-3">
                                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" value={RowData.Email} />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location" value={RowData.Location} />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHelpLine(e.target.value)} placeholder="Enter HelpLine" value={RowData.HelpLine} />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setHospDis(e.target.value)} placeholder="Enter Hospital description" value={RowData.HospDis} />
                                </div> */}

                                <button type="submit" className="btn btn-warning mt-4" onClick={() => { }}>Edit Record</button>
                            </form>
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
})
export default Organ