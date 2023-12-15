import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";
import { getAllStudentProgressAPI, createStudentProgressAPI, deleteStudentProgressAPI } from '../utils/api'

const AllStudentProgress = () => {
    const [newSubject, setNewSubject] = useState('');
    const [newAverageScoreImprovement, setNewAverageScoreImprovement] = useState('');
    const [newHomeworkCompletionRate, setNewHomeworkCompletionRate] = useState('');
    const [newAttendanceRate, setNewAttendanceRate] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllStudentProgressAPI()
            .then((response) => {

                setRows(response.data.map((progress) => ({
                    id: progress._id,
                    subject: progress.subject,
                    average_score_improvement: progress.average_score_improvement,
                    homework_completion_rate: progress.homework_completion_rate,
                    attendance_rate: progress.attendance_rate,
                })));
            })
            .catch((error) => {
                console.error('There was an error fetching the student progress!', error);
            });
    }, []);


    const columns = [
        { field: 'subject', headerName: 'Subject', width: 200 },
        { field: 'average_score_improvement', headerName: 'Average Score Improvement', width: 250 },
        { field: 'homework_completion_rate', headerName: 'Homework Completion Rate', width: 250 },
        { field: 'attendance_rate', headerName: 'Attendance Rate', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => handlerRemoveResource(params.id)} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '5px 10px', borderRadius: '10px' }}>Delete</button>
            ),
        }
    ];

    const handlerRemoveResource = (id) => {
        deleteStudentProgressAPI(id)
            .then(() => {
                setRows(rows.filter(row => row.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the student progress!', error);
            });
    };

    const handleAddNewProgress = () => {
        const newProgress = {
            subject: newSubject,
            average_score_improvement: newAverageScoreImprovement,
            homework_completion_rate: newHomeworkCompletionRate,
            attendance_rate: newAttendanceRate,
        };

        createStudentProgressAPI(newProgress)
            .then((response) => {
                setRows([...rows, { id: response.data._id, ...response.data }]);
                setNewSubject('');
                setNewAverageScoreImprovement('');
                setNewHomeworkCompletionRate('');
                setNewAttendanceRate('');
            })
            .catch((error) => {
                console.error('There was an error adding the student progress!', error);
            });
    };


    return (
        <div className='app'>
            <Sidebar active={6} />
            <div className='main-content'>
                <ContentTop />
                <div className="main-content-holder">
                    <div className="content-grid-one">
                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div>
                                <input
                                    type="text"
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    placeholder="Subject"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newAverageScoreImprovement}
                                    onChange={(e) => setNewAverageScoreImprovement(e.target.value)}
                                    placeholder="Average Score Improvement"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newHomeworkCompletionRate}
                                    onChange={(e) => setNewHomeworkCompletionRate(e.target.value)}
                                    placeholder="Homework Completion Rate"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newAttendanceRate}
                                    onChange={(e) => setNewAttendanceRate(e.target.value)}
                                    placeholder="Attendance Rate"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <button onClick={handleAddNewProgress} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '12px 10px' }}>
                                    Add New Progress
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

export default AllStudentProgress;
