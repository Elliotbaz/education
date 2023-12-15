import React, { useState } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import teacherData from '../utils/dashboard_data.json';
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";

const AllInteractions = () => {
    const [newInteractionCoachId, setNewInteractionCoachId] = useState('');
    const [newInteractionTeacherId, setNewInteractionTeacherId] = useState('');
    const [newInteractionDate, setNewInteractionDate] = useState('');
    const [newInteractionNotes, setNewInteractionNotes] = useState('');

    const all_interactions = teacherData.coach_teacher_interactions;
    const [rows, setRows] = useState(all_interactions.map((interaction, index) => ({
        id: index,
        coach_id: interaction.coach_id,
        teacher_id: interaction.teacher_id,
        last_meeting_date: interaction.last_meeting_date,
        meeting_notes: interaction.meeting_notes,
    })));

    const columns = [
        { field: 'coach_id', headerName: 'Coach ID', width: 150 },
        { field: 'teacher_id', headerName: 'Teacher ID', width: 150 },
        { field: 'last_meeting_date', headerName: 'Last Meeting Date', width: 180 },
        {
            field: 'meeting_notes',
            headerName: 'Meeting Notes',
            width: 250,
            renderCell: (params) => (
                <div style={{
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxHeight: '100%',
                    lineHeight: 'normal'
                }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => removeInteraction(params.id)} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '5px 10px', borderRadius: '10px' }}>Delete</button>
            ),
        }
    ];

    const handleAddNewInteraction = () => {
        const newInteraction = {
            id: rows.length + 1,
            coach_id: newInteractionCoachId,
            teacher_id: newInteractionTeacherId,
            last_meeting_date: newInteractionDate,
            meeting_notes: newInteractionNotes,
        };
        setRows([...rows, newInteraction]);
        // Reset form fields
        setNewInteractionCoachId('');
        setNewInteractionTeacherId('');
        setNewInteractionDate('');
        setNewInteractionNotes('');
    };

    const removeInteraction = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <div className='app'>
            <Sidebar active={4} />
            <div className='main-content'>
                <ContentTop />
                <div className="main-content-holder">
                    <div className="content-grid-one">
                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div >
                                <input
                                    type="text"
                                    value={newInteractionCoachId}
                                    onChange={(e) => setNewInteractionCoachId(e.target.value)}
                                    placeholder="Coach ID"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="text"
                                    value={newInteractionTeacherId}
                                    onChange={(e) => setNewInteractionTeacherId(e.target.value)}
                                    placeholder="Teacher ID"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="date"
                                    value={newInteractionDate}
                                    onChange={(e) => setNewInteractionDate(e.target.value)}
                                    placeholder="Last Meeting Date"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <textarea
                                    value={newInteractionNotes}
                                    onChange={(e) => setNewInteractionNotes(e.target.value)}
                                    placeholder="Meeting Notes"
                                    style={{ padding: 10, margin: '5px', height: '140px', width: '100%' }}
                                />
                                <button onClick={handleAddNewInteraction} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '12px 10px' }}>
                                    Add New Interaction
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

export default AllInteractions;
