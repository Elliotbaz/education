import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";
import { getAllResourcesAPI, createResourcesAPI, deleteResourcesAPI, getAllTeachersAPI } from '../utils/api'
import Select from 'react-select';

const AllResources = () => {
    const [newResourceName, setNewResourceName] = useState('');
    const [newUtilizationRate, setNewUtilizationRate] = useState('');
    const [newAllocatedTeachers, setNewAllocatedTeachers] = useState([]);
    const [teachersList, setTeachersList] = useState([]);
    const [rows, setRows] = useState([])

    useEffect(() => {
        getAllResourcesAPI()
            .then((response) => {
                setRows(response.data.map((resource) => ({
                    id: resource._id,
                    resource_name: resource.resource_name,
                    allocated_teachers: resource.allocated_teachers.map(teacher => teacher.name).join(', '),
                    utilization_rate: resource.utilization_rate,
                })));
            })
            .catch((error) => {
                console.error('There was an error fetching the resources!', error);
            });

        getAllTeachersAPI()
            .then(response => {
                setTeachersList(response.data.map(teacher => ({
                    value: teacher._id,
                    label: teacher.name
                })));
            })
            .catch(error => console.error('Error fetching teachers', error));

    }, []);

    const columns = [
        { field: 'resource_name', headerName: 'Resource Name', width: 300 },
        { field: 'allocated_teachers', headerName: 'Allocated Teachers', width: 400 },
        { field: 'utilization_rate', headerName: 'Utilization Rate (%)', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => removeResource(params.id)} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '5px 10px', borderRadius: '10px' }}>Delete</button>
            ),
        }
    ];


    const handleAddNewResource = () => {
        const newResource = {
            resource_name: newResourceName,
            allocated_teachers: newAllocatedTeachers.map(teacher => teacher.value),
            utilization_rate: newUtilizationRate,
        };

        createResourcesAPI(newResource)
            .then(() => {
                // Fetch all resources again to update the table with correct data
                getAllResourcesAPI()
                    .then((response) => {
                        setRows(response.data.map(resource => ({
                            id: resource._id,
                            resource_name: resource.resource_name,
                            allocated_teachers: resource.allocated_teachers.map(teacher => teacher.name).join(', '),
                            utilization_rate: resource.utilization_rate,
                        })));
                    })
                    .catch((error) => {
                        console.error('There was an error refetching the resources!', error);
                    });
            })
            .catch((error) => {
                console.error('Error adding new resource', error);
            });

        // Reset input fields
        setNewResourceName('');
        setNewUtilizationRate('');
        setNewAllocatedTeachers([]);
    };


    const removeResource = (id) => {
        console.log(id)
        deleteResourcesAPI(id)
            .then(() => {
                setRows(rows.filter(row => row.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the resource!', error);
            });
    };

    const handleSelectChange = selectedOptions => {
        setNewAllocatedTeachers(selectedOptions);
    };

    return (
        <div className='app'>
            <Sidebar active={5} />
            <div className='main-content'>
                <ContentTop />
                <div className="main-content-holder">
                    <div className="content-grid-one">
                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div style={{ display: "flex" }}>
                                <input
                                    type="text"
                                    value={newResourceName}
                                    onChange={(e) => setNewResourceName(e.target.value)}
                                    placeholder="Resource Name"
                                    style={{ padding: 10, margin: '5px', width: '30%' }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Select
                                        isMulti
                                        value={newAllocatedTeachers}
                                        onChange={handleSelectChange}
                                        options={teachersList}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={{
                                            option: (provided, state) => ({
                                                ...provided,
                                                color: state.isSelected ? 'white' : 'black',
                                                backgroundColor: state.isSelected ? 'blue' : 'white',
                                                ':hover': {
                                                    backgroundColor: state.isSelected ? 'blue' : 'lightgray'
                                                }
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                width: '300px'
                                            })
                                        }}
                                    />
                                </div>


                                <input
                                    type="number"
                                    value={newUtilizationRate}
                                    onChange={(e) => setNewUtilizationRate(e.target.value)}
                                    placeholder="Utilization Rate"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <button onClick={handleAddNewResource} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '12px 10px' }}>
                                    Add New Resource
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

export default AllResources;
