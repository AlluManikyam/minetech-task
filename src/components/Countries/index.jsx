import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import theme from '../../assets/images/theme.jpg';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
    const history = useHistory()
    const [countries, setCountries] = useState([])
    const [modal, setModal] = useState(false);
    const [playersInfo, setPlayersInfo] = useState({});
    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get('http://test.oye.direct/players.json').then(resp => {
            console.log("countries", resp.data);
            if (resp.data && Object.keys(resp.data).length > 0) {
                const countriesWithPlayers = Object.keys(resp.data).map((key) => {
                    return { name: key, players: resp.data[key] }
                })
                setCountries(countriesWithPlayers)
                console.log("countriesWithPlayers", countriesWithPlayers);
            }
        });
    }, [])

    const handleViewPlayersInfo=(players)=>{
        setPlayersInfo(players)
        setModal(!modal)
    }

    const columns = [
        {
            dataField: "name",
            text: "Country Name",
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Actions',
            sort: false,
            headerAlign: 'center',
            align: 'center',
            formatter: (cellContent, row) => {
                return (
                    <div className="d-flex">
                        <button
                            style={{
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                        onClick={() => handleViewPlayersInfo(row)}
                        >
                            View Players
                        </button>
                    </div>
                )
            },
        },

    ];

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <img className="bg-img" alt="theme" src={theme} width="100%" />
                </div>
                <div className="col-6 py-5">
                    <div className="container">
                    <div className="d-flex justify-content-end">
                    <button className="mx-3" onClick={()=>history.push('/dashboard')}>Back</button> 
                </div>
                        <h3 className="text-center text-bold">User Management</h3>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={countries}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    </div>
                </div >
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-md" id="lb-points-modal">
                <ModalHeader toggle={toggle}>
                    <div>{playersInfo?.name} Players Info</div>
                </ModalHeader>
                <ModalBody style={{ height: 400, overflowY: 'scroll' }}>
                {playersInfo && playersInfo?.players?.map((player)=>{
                    return <div className={player.captain===true?'text-bold':'my-2'}> {player.name} </div>
                })}
                </ModalBody>
            </Modal>
        </>
    );
}
