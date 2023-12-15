import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css'
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";
import { getAllCoachesAPI, createCoachesByIdAPI, deleteCoachesByIdAPI } from '../utils/api'


const AllCoach = () => {
    const [newCoachName, setNewCoachName] = useState('');
    const [newCoachSpecialization, setNewCoachSpecialization] = useState('');
    const [newCoachYears, setNewCoachYears] = useState('');
    const [rows, setRows] = useState([])

    useEffect(() => {
        getAllCoachesAPI().then((response) => {
            setRows(response.data.map((coach => ({
                id: coach._id,
                name: coach.name,
                specialization: coach.specialization,
                years_of_experience: coach.years_of_experience,
            }))));
        }).catch((error) => {
            console.error('There was an error fetching the coaches!', error);
        });
    }, [])



    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'specialization', headerName: 'Specialization', width: 200 },
        { field: 'years_of_experience', headerName: 'Years of Experience', width: 200 },
        {
            field: 'actions',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => removeCoach(params.id)} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '5px 10px', borderRadius: '10px' }}>Delete</button>
            ),
        }
    ];

    const handleAddNewCoach = () => {
        const newCoach = {
            name: newCoachName,
            specialization: newCoachSpecialization,
            years_of_experience: newCoachYears,
        };

        createCoachesByIdAPI(newCoach)
            .then((response) => {
                setRows([...rows, { id: response.data._id, ...response.data }]);
                setNewCoachName('');
                setNewCoachSpecialization('');
                setNewCoachYears('');
            })
            .catch((error) => {
                console.error('There was an error adding the coach!', error);
            });
    };


    const removeCoach = (id) => {
        deleteCoachesByIdAPI(id)
            .then(() => {
                setRows(rows.filter(row => row.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the coach!', error);
            });
    };



    return (
        <div className='app'>
            <Sidebar active={2} />
            <div className='main-content'>
                <ContentTop />

                <div className="main-content-holder">
                    <div className="content-grid-one">

                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div >
                                <input
                                    type="text"
                                    value={newCoachName}
                                    onChange={(e) => setNewCoachName(e.target.value)}
                                    placeholder="Name"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="text"
                                    value={newCoachSpecialization}
                                    onChange={(e) => setNewCoachSpecialization(e.target.value)}
                                    placeholder="Specialization"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newCoachYears}
                                    onChange={(e) => setNewCoachYears(e.target.value)}
                                    placeholder="Years of Experience"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <button onClick={handleAddNewCoach} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '12px 10px' }}>
                                    Add New Coach
                                </button>
                            </div>
                            <DataGrid rows={rows} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AllCoach