import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import theme from '../../assets/images/theme.jpg';
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
    const history = useHistory()
    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []

    const columns = [
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "email",
            text: "Email",
            sort: true
        },
        {
            dataField: "phone",
            text: "Phone Number"
        },
        {
            dataField: "dob",
            text: "DOB"
        }
    ];

    return (
        <div className="row">
            <div className="col-6">
                <img className="bg-img" alt="theme" src={theme} width="100%" />
            </div>
            <div className="col-6 py-5">
                <div className="d-flex justify-content-end">
                    <button className="mx-3" onClick={()=>history.push('/countries')}>Countries</button> 
                </div>
                <h3 className="text-center text-bold">User Management</h3>
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={users}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                />
            </div>
        </div >
    );
}
