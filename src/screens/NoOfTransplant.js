import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';

const NoOfTransplant = () => {
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
                                <div className="col-sm-3 offset-sm-2 mt-5" style={{ color: "black" }}><h4><b>Transplanted Details</b></h4></div>
                                {/* <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}><i className="fa fa-plus"></i>
                                    Add New Hospital
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
                                                <th>UserName</th>
                                                <th>IsActive </th>
                                                <th>CreatedON</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Container>
        </div>
    );
};

export default NoOfTransplant;