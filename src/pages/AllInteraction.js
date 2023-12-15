import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";
import { getAllInteractionsAPI, createInteractionsAPI, deleteInteractionsAPI, getAllTeachersAPI, getAllCoachesAPI } from '../utils/api'
import Select from 'react-select';

const AllInteractions = () => {
    const [newInteractionDate, setNewInteractionDate] = useState('');
    const [newInteractionNotes, setNewInteractionNotes] = useState('');
    const [coachOptions, setCoachOptions] = useState('');
    const [teacherOptions, setTeacherOptions] = useState('');
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [rows, setRows] = useState([])


    useEffect(() => {
        getAllInteractionsAPI().then(response => {
            setRows(response.data.map((interaction) => ({
                id: interaction._id,
                coach_id: interaction.coach_id.name,
                teacher_id: interaction.teacher_id.name,
                last_meeting_date: new Date(interaction.last_meeting_date).toLocaleDateString(),
                meeting_notes: interaction.meeting_notes,
            })));
        }).catch(error => {
            console.error('There was an error fetching the interactions!', error);
        });

        getAllCoachesAPI().then((response) => {
            setCoachOptions(response.data.map(coach => ({ value: coach._id, label: coach.name })));
        });
        getAllTeachersAPI().then((response) => {
            setTeacherOptions(response.data.map(teacher => ({ value: teacher._id, label: teacher.name })));
        });
    }, []);



    const columns = [
        { field: 'coach_id', headerName: 'Coach', width: 200 },
        { field: 'teacher_id', headerName: 'Teacher', width: 200 },
        { field: 'last_meeting_date', headerName: 'Last Meeting Date', width: 160 },
        {
            field: 'meeting_notes',
            headerName: 'Meeting Notes',
            width: 300,
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
            coach_id: selectedCoach ? selectedCoach.value : null,
            teacher_id: selectedTeacher ? selectedTeacher.value : null,
            last_meeting_date: newInteractionDate,
            meeting_notes: newInteractionNotes,
        };

        createInteractionsAPI(newInteraction)
            .then(() => {
                getAllInteractionsAPI().then(response => {
                    setRows(response.data.map((interaction) => ({
                        id: interaction._id,
                        coach_id: interaction.coach_id.name,
                        teacher_id: interaction.teacher_id.name,
                        last_meeting_date: new Date(interaction.last_meeting_date).toLocaleDateString(),
                        meeting_notes: interaction.meeting_notes,
                    })));
                }).catch(error => {
                    console.error('There was an error refetching the interactions!', error);
                });
            })
            .catch(error => console.error('Error adding new interaction:', error));

        setSelectedCoach(null);
        setSelectedTeacher(null);
        setNewInteractionDate('');
        setNewInteractionNotes('');
    };



    const removeInteraction = (id) => {
        deleteInteractionsAPI(id).then(() => {
            setRows(rows.filter(row => row.id !== id));
        }).catch((error) => {
            console.error('There was an error deleting the interaction!', error);
        });

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
                                <div style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                    <Select
                                        value={selectedCoach}
                                        onChange={setSelectedCoach}
                                        options={coachOptions}
                                        placeholder="Select Coach"
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
                                    <Select
                                        value={selectedTeacher}
                                        onChange={setSelectedTeacher}
                                        options={teacherOptions}
                                        placeholder="Select Teacher"
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
                                    <input
                                        type="date"
                                        value={newInteractionDate}
                                        onChange={(e) => setNewInteractionDate(e.target.value)}
                                        placeholder="Last Meeting Date"
                                        style={{ padding: 10, margin: '5px' }}
                                    />
                                </div>
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
