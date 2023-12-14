import React, { useState } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import teacherData from '../utils/dashboard_data.json';
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";

const AllResources = () => {
    const [newResourceName, setNewResourceName] = useState('');
    const [newUtilizationRate, setNewUtilizationRate] = useState('');
    const [newAllocatedTeachers, setNewAllocatedTeachers] = useState('');

    const all_resources = teacherData.resource_management;
    const [rows, setRows] = useState(all_resources.map((resource, index) => ({
        id: index,
        resource_id: resource.resource_id,
        resource_name: resource.resource_name,
        allocated_teachers: resource.allocated_teachers.join(', '),
        utilization_rate: resource.utilization_rate,
    })));

    const columns = [
        { field: 'resource_id', headerName: 'Resource ID', width: 150 },
        { field: 'resource_name', headerName: 'Resource Name', width: 200 },
        { field: 'allocated_teachers', headerName: 'Allocated Teachers', width: 200 },
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
            id: rows.length + 1,
            resource_id: rows.length + 1, // Generate a unique ID for the new resource
            resource_name: newResourceName,
            allocated_teachers: newAllocatedTeachers,
            utilization_rate: newUtilizationRate,
        };
        setRows([...rows, newResource]);
        setNewResourceName('');
        setNewUtilizationRate('');
        setNewAllocatedTeachers('');
    };

    const removeResource = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <div className='app'>
            <Sidebar active={5} />
            <div className='main-content'>
                <ContentTop />
                <div className="main-content-holder">
                    <div className="content-grid-one">
                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div>
                                <input
                                    type="text"
                                    value={newResourceName}
                                    onChange={(e) => setNewResourceName(e.target.value)}
                                    placeholder="Resource Name"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="text"
                                    value={newAllocatedTeachers}
                                    onChange={(e) => setNewAllocatedTeachers(e.target.value)}
                                    placeholder="Allocated Teachers"
                                    style={{ padding: 10, margin: '5px' }}
                                />
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
