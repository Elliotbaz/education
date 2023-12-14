import React from 'react';
import "./StudentProgress.css";

const StudentProgress = ({ studentProgress }) => {
    return (
        <div className="subgrid-two-item grid-common grid-c5">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Student Progress</h3>
            </div>
            <div className="grid-c-top text-silver-v1">
                <h4 style={{ float: 'left' }}>Subjects</h4>
                <h4 style={{ float: 'right' }}>Attendance</h4>
            </div>
            <br />
            <div className="grid-c5-content">
                <div className="grid-items">
                    {
                        studentProgress.slice(0, 12).map((progress) => (
                            <div className="grid-item" key={progress.id} style={{ marginTop: 10 }}>
                                <div className="grid-item-l">

                                    <p className="text text-silver-v1">{progress.subject} (<span><b>Done Homework:</b>  {progress.homework_completion_rate}%</span>)</p>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">{progress.attendance_rate}%</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentProgress
