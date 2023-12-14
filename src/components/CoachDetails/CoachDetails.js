import React from 'react';
import { Link } from 'react-router-dom';
import "./CoachDetails.css";

const CoachDetails = ({ coach_details }) => {
    const sortedADetails = [...coach_details].sort((a, b) => a.years_of_experience - b.years_of_experience);

    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Coach Details</h3>
            </div>

            <div className="grid-content">
                <div className="grid-items">
                    {
                        sortedADetails.slice(0, 3).map((activity) => (
                            <div key={activity.coach_id} className="grid-item">
                                <div className="grid-item-l">
                                    <p className="text">{activity.name} <span>{activity.specialization}</span></p>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-scarlet">Experience: {activity.years_of_experience} Yrs</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="see-more">
                    <Link to="/coach/all">See all</Link>
                </div>
            </div>
        </div>
    )
}

export default CoachDetails