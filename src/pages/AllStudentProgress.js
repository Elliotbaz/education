import React, { useState } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css';
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import teacherData from '../utils/dashboard_data.json';
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";

const AllStudentProgress = () => {
    // State hooks for new student progress form fields
    const [newSubject, setNewSubject] = useState('');
    const [newAverageScoreImprovement, setNewAverageScoreImprovement] = useState('');
    const [newHomeworkCompletionRate, setNewHomeworkCompletionRate] = useState('');
    const [newAttendanceRate, setNewAttendanceRate] = useState('');

    const all_student_progress = teacherData.student_progress;
    const [rows, setRows] = useState(all_student_progress.map((progress, index) => ({
        id: index,
        class_id: progress.class_id,
        subject: progress.subject,
        average_score_improvement: progress.average_score_improvement,
        homework_completion_rate: progress.homework_completion_rate,
        attendance_rate: progress.attendance_rate,
    })));

    const columns = [
        { field: 'class_id', headerName: 'Class ID', width: 150 },
        { field: 'subject', headerName: 'Subject', width: 200 },
        { field: 'average_score_improvement', headerName: 'Average Score Improvement', width: 250 },
        { field: 'homework_completion_rate', headerName: 'Homework Completion Rate', width: 250 },
        { field: 'attendance_rate', headerName: 'Attendance Rate', width: 200 },
    ];

    const handleAddNewProgress = () => {
        const newProgress = {
            id: rows.length + 1,
            class_id: rows.length + 1,
            subject: newSubject,
            average_score_improvement: newAverageScoreImprovement,
            homework_completion_rate: newHomeworkCompletionRate,
            attendance_rate: newAttendanceRate,
        };
        setRows([...rows, newProgress]);
        setNewSubject('');
        setNewAverageScoreImprovement('');
        setNewHomeworkCompletionRate('');
        setNewAttendanceRate('');
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
