import React, { useEffect, useState } from 'react';
import { Button, Container, FormCheck, Modal, Spinner } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { useLocation,useNavigate } from "react-router-dom"
import axios from 'axios';
import swal from 'sweetalert'
import { AsyncStorage } from 'AsyncStorage';

const MatchingDataWithRequest = () => {
    const history = useNavigate();
    const location = useLocation();
    const [Role, setRole] = useState("")
    const [Data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const [View, setView] = useState(false)
    const [ViewSHow, setViewShow] = useState(false)
    const handleViewClose = () => setViewShow(false);
    const handleViewShow = () => setViewShow(true);

    const [RowData, setRowData] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const ReqForOrganData = location.state.data
    let Age = ReqForOrganData.Age;
    let organ = ReqForOrganData.PatRequired;
    let RequestID = ReqForOrganData._id
    let HospId = ReqForOrganData.HosId
 
    const ID = localStorage.getItem('ID')
    const handleFetch = () => {
        const token = localStorage.getItem("token")
        const credentials = { Age, organ }
        //const url = `http://localhost:8000/matchedData`
        const url = `https://mydonatmeapi.herokuapp.com/matchedData`
        axios.post(url, credentials, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                const result = response.data;
                const { status, message, data, count } = result;
                if (status !== 'SUCCESS') {
                    console.log("Failed")
                } else {
                    setData(data)
                }
            })
    }
    const handleSelect = (_id) => {
        const token = localStorage.getItem("token")
        const credentials = { "HosId":ID,"_id": _id,"RequestID":RequestID }
        setIsLoading(true)
        const url = `https://mydonatmeapi.herokuapp.com/selectDonar`
        //const url = 'http://localhost:8000/selectDonar'
        axios.post(url, credentials, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    swal({
                        title: status,
                        text: message,
                        icon: "warning",
                    }).then((value) => {
                        window.location.reload()
                        setIsLoading(false)
                    })
                } else {
                    swal({
                        title: status,
                        text: message,
                        icon: "success",
                    }).then((value) => {
                        window.location.reload()
                        setIsLoading(false)

                    })
                }
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }
    const handleTransplantComp = (_id) => {
        const token = localStorage.getItem("token")
        const credentials = { "donarID": _id, "RequestID": RequestID, "Status": "Completed","HospId":HospId }
        console.log(credentials)
        setIsLoading(true)
        const url = `https://mydonatmeapi.herokuapp.com/donarTransPlantcomp`
        // const url = `http://localhost:8000/donarTransPlantcomp`
        axios.post(url, credentials, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    swal({
                        title: status,
                        text: message,
                        icon: "warning",
                    }).then((value) => {
                        window.location.reload()
                        setIsLoading(false)
                    })
                } else {
                    swal({
                        title: status,
                        text: message,
                        icon: "success",
                    }).then((value) => {
                        window.location.reload()
                        setIsLoading(false)

                    })
                }
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }
    const handleShow = () =>{
        history('/selectedDonar',{state: RequestID})
    }
    useEffect(() => {
        AsyncStorage.getItem('Role', (err, result) => {
            setRole(result)
        })
    })
    useEffect(() => {
        handleFetch()
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
                                            <input className="form-control mr-sm-2" type="search" placeholder="Search Request" aria-label="Search" />

                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm-3 offset-sm-2 mt-5" style={{ color: "black" }}><h4><b>Matched Donar</b></h4></div>
                                <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                                    <Button variant="primary" onClick={handleShow}><i className="fa fa-organ"></i>
                                        Selected Donar
                                    </Button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="table-responsive " >
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Organ</th>
                                                <th>Age</th>
                                                <th>Phone No</th>
                                                <th>CNIC</th>
                                                <th>State</th>
                                                <th>Transplant</th>
                                                <th>isActive</th>
                                                <th>IsSelect</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{fontSize:13}}>
                                            {Data.map((item) =>
                                                <tr key={item._id}>
                                                    <td>#</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.organ}</td>
                                                    <td>{item.Age}</td>
                                                    <td>{item.phoneNo}</td>
                                                    <td>{item.cnic}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.isTransplant ? <p style={{ color: "#3ea175" }}>Complete</p> : <p style={{ color: "#ffc107" }}>Pending</p>}</td>
                                                    <td>{item.IsActive ? "Yes" : "NO"}</td>
                                                    <td>{item.IsSelect ? <FormCheck checked={true} label={"selected"}/> : "NO"}</td>
                                                    <td style={{ minWidth: 180 }}>
                                                        <Button size="sm" variant="primary" onClick={() => handleViewShow(setRowData(item), setView(true))}>View</Button>|
                                                        {(!isLoading && Role === "Hospital") && (
                                                            <Button size="sm" variant="primary" onClick={() => handleSelect(item._id)}>
                                                                Select
                                                            </Button>
                                                        )}
                                                        {isLoading && (
                                                            <Spinner animation="border" role="status" size='sm'>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner>
                                                        )}|
                                                        {Role === "Hospital" && (
                                                            <Button size="sm" variant="danger" onClick={() => handleTransplantComp(item._id)}>
                                                                T-Comp
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <input type="text" className="form-control" value={RowData._id} readOnly />
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
                                    {/* {Delete && (
                                        <button type="submit" className="btn btn-danger mt-4" onClick={handleDelete} >Delete Record</button>
                                    )} */}
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleViewClose}>
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

export default MatchingDataWithRequest;