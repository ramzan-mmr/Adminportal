import "../Hospital/hospital.css";
import React, { useEffect, useState, StyleSheet } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Table, Col, Button, Modal } from "react-bootstrap"
import axios from "axios"
import { icons } from "material-icons"
import swal from 'sweetalert'

function Donar() {
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

    const [name, setName] = useState("")
    const [cnic, setCnic] = useState("");
    const [dateOfBirth, setdob] = useState("");
    const [organ, setorgan] = useState("");
    const [phoneNo, setphoneno] = useState("");
    const [address,setAddress] = useState("");
    const [ID, setID] = useState("");

    const handleDelete = () => {
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/Donars/${ID}`
        axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    swal({
                        title: status,
                        text: message,
                        icon: "error",
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

    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };
    const DonarsData = () => {
        axios.get(`https://mydonatmeapi.herokuapp.com/Donars`)
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
    const handleEdit = () => {
        let credentials = {_id:ID,name:name,cnic:cnic,dateOfBirth:dateOfBirth,organ:organ,phoneNo:phoneNo,address:address}
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/donarEdit/`
        axios.post(url, credentials,{ headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    swal({
                        title: status,
                        text: message,
                        icon: "error",
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
        DonarsData();
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
                            <div className="col-sm-3 offset-sm-2 mt-5" style={{ color: "black" }}><h4><b>Donors Details</b></h4></div>
                            {/* <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}><i className="fa fa-plus"></i>
                                    Add New Donars
                                </Button>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="table-responsive " >
                                <table className="table table-striped table-hover table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>S/N</th>
                                            <th>Name </th>
                                            <th>CNIC</th>
                                            <th>DOB</th>
                                            <th>Organ</th>
                                            <th>PhoneNo</th>
                                            <th>address</th>
                                            <th>Create On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) =>
                                            <tr key={item._id}>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.cnic}</td>
                                                <td>{item.dateOfBirth}</td>
                                                <td>{item.organ}</td>
                                                <td>{item.phoneNo}</td>
                                                <td>{item.address}</td>
                                                <td>{item.CreatedON}</td>
                                                <td style={{ minWidth: 180 }}>
                                                    <Button size="sm" variant="primary" onClick={() => handleViewShow(setRowData(item), setView(true),setDelete(false))}>View</Button>|
                                                    <Button size="sm" variant="warning" onClick={() => handleEditShow(setRowData(item))}>Edit</Button>|
                                                    <Button size="sm" variant="danger" onClick={() => handleViewShow(setRowData(item),setDelete(true),setView(false),setID(item._id))}>Delete</Button>
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
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setCnic(e.target.value)} placeholder="Enter Email" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setdob(e.target.value)} placeholder="Enter Location" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setorgan(e.target.value)} placeholder="Enter HelpLine" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setphoneno(e.target.value)} placeholder="Enter Hospital description" />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Enter Hospital description" />
                                </div>
                                <button type="submit" className="btn btn-success mt-4" onClick={handleDelete}>Add Record</button>
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
                            <Modal.Title>View Donors</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={RowData.name} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.cnic} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.dateOfBirth} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.organ} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.phoneNo} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.address} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowData.CreatedON} readOnly />
                                </div>
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
                            <Modal.Title>Add Donors</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                            <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" defaultValue={RowData.name}/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setCnic(e.target.value)} placeholder="Enter Email" defaultValue={RowData.cnic}/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setdob(e.target.value)} placeholder="Enter Location" defaultValue={RowData.dateOfBirth}/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setorgan(e.target.value)} placeholder="Enter HelpLine" defaultValue={RowData.organ} />
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setphoneno(e.target.value)} placeholder="Enter Hospital description" defaultValue={RowData.phoneNo}/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Enter Hospital description" defaultValue={RowData.address}/>
                                </div>

                                <button type="submit" className="btn btn-warning mt-4" onClick={handleEdit}>Edit Donors</button>
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
}
export default Donar