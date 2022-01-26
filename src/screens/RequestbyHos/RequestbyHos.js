import React, { useEffect, useState } from 'react';
import "./../../App.css"
import { Alert, Button, Container, Modal } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import RequestForOrgan from '../RequestForOrgan';
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import { AsyncStorage } from 'AsyncStorage';

const RequestbyHos = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ID, setID] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [View, setView] = useState(false)
    const [ViewSHow, setViewShow] = useState(false)
    const handleViewClose = () => setViewShow(false);
    const handleViewShow = () => setViewShow(true);

    const [EditSHow, setEditShow] = useState(false)
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [Delete, setDelete] = useState(false)

    const [RowData, setRowData] = useState([]);
    //form data
    const [HosName, setHosName] = useState(RowData.HosName);
    const [HosLocation, setHosLocation] = useState(RowData.HosLocation);
    const [PatName, setPatName] = useState(RowData.PatName);
    const [PatDecease, setPatDecease] = useState(RowData.PatCnic);
    const [PatCnic, setPatCnic] = useState(RowData.PatCnic);
    const [PatDOB, setPatDOB] = useState(RowData.PatDOB);
    const [PatRequired, setPatRequired] = useState(RowData.PatRequired);
    const [Description, setDescription] = useState(RowData.Description);

    function handleShow() {
        history('/RequestForOrgan')
    }
    const GetAllHospitalRecord = () => {
        const HosId = localStorage.getItem('ID');
        axios.get(`https://mydonatmeapi.herokuapp.com/Request/${HosId}`)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    // alert(message, status)
                } else {
                    setData(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleDelete = () => {
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/RequestDelete/${ID}`
        axios.delete(url, {
            headers: { "Authorization": `Bearer ${token}` },
            value: true
        })
            .then((response) => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
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
    }
    const handleEdit = () => {
        const credentials = { "HosName": HosName, "HosLocation": HosLocation, "PatName": PatName, "PatDecease": PatDecease, "PatCnic": PatCnic, "PatDOB": PatDOB, "PatRequired": PatRequired, "Description": Description }
        const token = localStorage.getItem("token")
        const url = `https://mydonatmeapi.herokuapp.com/RequestEdit/${ID}`
        axios.post(url, credentials, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
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
    const GetAdminRecoord = () => {
        const token = localStorage.getItem("token")
        axios.get(`https://mydonatmeapi.herokuapp.com/allRequest`,{ headers: { "Authorization": `Bearer ${token}`} })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    // alert(message, status)
                } else {
                    setData(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    async function getData() {
        const Role = await AsyncStorage.getItem('Role')
        if (Role === "Admin") {
            GetAdminRecoord()
        }
        else if (Role === "Hospital") {
            GetAllHospitalRecord();
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
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
                                                <th>P Name</th>
                                                <th>P Decease</th>
                                                <th>P CNIC</th>
                                                <th>P DOB</th>
                                                <th>P Request</th>
                                                <th>H Name</th>
                                                <th>isActive</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item) =>
                                                <tr key={item._id}>
                                                    <td>#</td>
                                                    <td>{item.PatName}</td>
                                                    <td>{item.PatDecease}</td>
                                                    <td>{item.PatCnic}</td>
                                                    <td>{item.PatDOB}</td>
                                                    <td>{item.PatRequired}</td>
                                                    <td>{item.HosName}</td>
                                                    <td>{item.isActive}</td>
                                                    <td style={{ minWidth: 180 }}>
                                                        <Button size="sm" variant="primary" onClick={() => handleViewShow(setRowData(item), setView(true), setDelete(false))}>View</Button>|
                                                        <Button size="sm" variant="warning" onClick={() => handleEditShow(setRowData(item), setID(item._id))}>Edit</Button>|
                                                        <Button size="sm" variant="danger" onClick={() => handleViewShow(setRowData(item), setDelete(true), setView(false), setID(item._id))}>Delete</Button>
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
                                <Modal.Title>View Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.HosName} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.HosLocation} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.PatName} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.PatCnic} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.PatDecease} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.PatRequired} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.PatDOB} readOnly />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" value={RowData.Description} readOnly />
                                    </div>
                                    {Delete && (
                                        <button type="submit" className="btn btn-danger mt-4" onClick={handleDelete} >Delete Record</button>
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
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.HosName} onChange={(e) => setHosName(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.HosLocation} onChange={(e) => setHosLocation(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.PatName} onChange={(e) => setPatName(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.PatCnic} onChange={(e) => setPatCnic(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.PatDecease} onChange={(e) => setPatDecease(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.PatRequired} onChange={(e) => setPatRequired(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.PatDOB} onChange={(e) => setPatDOB(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" defaultValue={RowData.Description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-warning mt-4" onClick={handleEdit}>Edit Record</button>
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
        </div>
    );
};

export default RequestbyHos;