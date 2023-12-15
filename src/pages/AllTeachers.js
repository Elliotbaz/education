import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import '../layout/Dashboard.css'
import { DataGrid } from '@mui/x-data-grid';
import "../components/ContentMain/ContentMain.css";
import ContentTop from "../components/ContentTop/ContentTop";
import "../layout/Content/Content.css";
import { getAllTeachersAPI, createTeacherAPI, deleteTeacherAPI } from '../utils/api'

const AllTeachers = () => {
    const [newTeacherName, setNewTeacherName] = useState('');
    const [newTeacherLastActive, setNewTeacherLastActive] = useState('');
    const [newTeacherActivityScore, setNewTeacherActivityScore] = useState('');
    const [newTeacherInteractionRating, setNewTeacherInteractionRating] = useState('');
    const [newTeacherSubjectsTaught, setNewTeacherSubjectsTaught] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllTeachersAPI()
            .then((response) => {
                setTeachers(response.data);
                setRows(teachers.map((teacher) => ({
                    id: teacher._id,
                    name: teacher.name,
                    last_active: teacher.last_active,
                    activity_score: teacher.activity_score,
                    student_interaction_rating: teacher.student_interaction_rating,
                    subjects_taught: teacher.subjects_taught.join(', '),
                })));
            })
            .catch((error) => {
                console.error('There was an error fetching the teachers!', error);
            });
    }, [teachers]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'last_active', headerName: 'Last Active', width: 150 },
        { field: 'activity_score', headerName: 'Activity Score', width: 150 },
        { field: 'student_interaction_rating', headerName: 'Interaction Rating', width: 180 },
        { field: 'subjects_taught', headerName: 'Subjects Taught', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <button onClick={() => removeTeacher(params.id)} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '5px 10px', borderRadius: '10px' }}>Delete</button>
            ),
        }
    ];

    const handleAddNewTeacher = () => {
        const newTeacher = {
            name: newTeacherName,
            last_active: newTeacherLastActive,
            activity_score: newTeacherActivityScore,
            student_interaction_rating: newTeacherInteractionRating,
            subjects_taught: newTeacherSubjectsTaught.split(', ')
        };

        createTeacherAPI(newTeacher)
            .then((response) => {
                setRows([...rows, { id: response.data._id, ...response.data }]);
                setNewTeacherName('');
                setNewTeacherLastActive('');
                setNewTeacherActivityScore('');
                setNewTeacherInteractionRating('');
                setNewTeacherSubjectsTaught('');
            })
            .catch((error) => {
                console.error('There was an error adding the teacher!', error);
            });
    };


    const removeTeacher = (id) => {
        deleteTeacherAPI(id)
            .then(() => {
                setRows(rows.filter(row => row.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the teacher!', error);
            });
    };


    return (
        <div className='app'>
            <Sidebar active={3} />
            <div className='main-content'>
                <ContentTop />

                <div className="main-content-holder">
                    <div className="content-grid-one">
                        <div className="grid-one-item grid-common grid-c1" style={{ backgroundColor: '#fff' }}>
                            <div>
                                <input
                                    type="text"
                                    value={newTeacherName}
                                    onChange={(e) => setNewTeacherName(e.target.value)}
                                    placeholder="Teacher Name"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="date"
                                    value={newTeacherLastActive}
                                    onChange={(e) => setNewTeacherLastActive(e.target.value)}
                                    placeholder="Last Active Date"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newTeacherActivityScore}
                                    onChange={(e) => setNewTeacherActivityScore(e.target.value)}
                                    placeholder="Activity Score"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={newTeacherInteractionRating}
                                    onChange={(e) => setNewTeacherInteractionRating(e.target.value)}
                                    placeholder="Interaction Rating"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <input
                                    type="text"
                                    value={newTeacherSubjectsTaught}
                                    onChange={(e) => setNewTeacherSubjectsTaught(e.target.value)}
                                    placeholder="Subjects Taught"
                                    style={{ padding: 10, margin: '5px' }}
                                />
                                <button onClick={handleAddNewTeacher} style={{ color: '#fff', backgroundColor: 'var(--clr-pumpkin)', padding: '12px 10px' }}>
                                    Add New Teacher
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

export default AllTeachers;
