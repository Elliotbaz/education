import React from 'react';
import { Link } from 'react-router-dom';
import "./TeacherActivities.css";

const TeacherActivities = ({ teacherActivities }) => {
    const sortedActivities = [...teacherActivities].sort((a, b) => new Date(b.last_active) - new Date(a.last_active));

    return (
        <div className="grid-one-item grid-common grid-c2">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Teacher's Recently Active</h3>
            </div>

            <div className="grid-content">
                <div className="grid-items">
                    {
                        sortedActivities.slice(0, 3).map((activity) => (
                            <div key={activity.teacher_id} className="grid-item">
                                <div className="grid-item-l">
                                    <p className="text">{activity.name}
                                        <span><b>Last Active:</b> {activity.last_active}</span>
                                        <span> <b>Subjects:</b> {activity.subjects_taught.join(', ')}</span>
                                    </p>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-scarlet">Score: {activity.activity_score}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="see-more">
                    <Link to="/teachers/all" style={{ cursor: 'pointer' }}>See all</Link>
                </div>
            </div>
        </div>
    )
}

export default TeacherActivities;
