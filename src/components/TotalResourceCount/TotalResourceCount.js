import React from 'react';
import "./TotalResourceCount.css";

const TotalResourceCount = ({ resourceManagement, teacherActivities, coachDetails }) => {
    const totalResources = resourceManagement.length;
    const totalTeachers = teacherActivities.length;
    const totalCoaches = coachDetails.length;

    return (
        <div className="subgrid-two-item grid-common grid-c7">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Total Resources</h3>
            </div>
            <div className="grid-c7-content">
                <div className="progress-bar">
                    <div className="percent">
                        <svg>
                            <circle cx="105" cy="105" r="50"></circle>
                        </svg>
                        <div className="number">
                            <h3>{totalResources}<span></span></h3>
                        </div>
                    </div>
                </div >
                <ul className="data-list" >
                    <li className="data-item text-silver-v1">
                        <span className="data-item-text">Total Teachers</span>
                        <span className="data-item-value">{totalTeachers}</span>
                    </li>
                    <li className="data-item text-silver-v1">
                        <span className="data-item-text">Total Coaches</span>
                        <span className="data-item-value">{totalCoaches}</span>
                    </li>
                </ul >
            </div >
        </div >
    )
}

export default TotalResourceCount;
