import React from 'react';
import "./CoachTeacherInteractions.css"; // Rename your CSS file accordingly
import { Link } from 'react-router-dom';

const CoachTeacherInteractions = ({ coachTeacherInteractions }) => {

    const sortedInteractions = [...coachTeacherInteractions].sort((a, b) => new Date(b.last_meeting_date) - new Date(a.last_meeting_date));

    return (
        <div className="grid-two-item grid-common grid-c4">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Coach-Teacher Interactions</h3>
            </div>
            <div className="grid-c-top text-silver-v1">
                <h2 className="lg-value">Participants</h2>
                <span className="lg-value">Date</span>
            </div>
            <div className="grid-c4-content bg-jet">
                <div className="grid-items">
                    {
                        // Display only the top 5 most recent interactions
                        sortedInteractions.slice(0, 3).map((interaction, index) => (
                            <div className="grid-item" key={index}>
                                <div className="grid-item-l">
                                    {/* Participants names will be fetched from the backend based on IDs in the future */}
                                    <p className="text text-silver-v1">
                                        Coach: {interaction.coach_id} <span>
                                            <b> Teacher:</b> {interaction.teacher_id}</span>
                                        <span>  <b>Meeting Notes: </b>{interaction.meeting_notes} </span>
                                    </p>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">{interaction.last_meeting_date}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="see-more">
                    {/* Link to the page that shows all interactions */}
                    {/* Make sure to set up the route in your router configuration */}
                    <Link to="/interactions/all">See all</Link>
                </div>
            </div>
        </div>
    )
}

export default CoachTeacherInteractions;
