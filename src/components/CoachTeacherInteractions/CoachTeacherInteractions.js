import React from 'react';
import "./CoachTeacherInteractions.css";
import { Link } from 'react-router-dom';

const CoachTeacherInteractions = ({ coachTeacherInteractions }) => {

    const sortedInteractions = coachTeacherInteractions.sort((a, b) => new Date(b.last_meeting_date) - new Date(a.last_meeting_date));
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
                        sortedInteractions.slice(0, 3).map((interaction) => (
                            <div className="grid-item" key={interaction._id}>
                                <div className="grid-item-l">
                                    <p className="text text-silver-v1">
                                        Coach: {interaction.coach_id.name} <span>
                                            <b> Teacher:</b> {interaction.teacher_id.name}</span>
                                        <span>  <b>Meeting Notes: </b>{interaction.meeting_notes} </span>
                                    </p>
                                </div>
                                <div className="grid-item-r">
                                    <span className="text-silver-v1">{new Date(interaction.last_meeting_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="see-more">
                    <Link to="/interactions/all">See all</Link>
                </div>
            </div>
        </div>
    )
}


export default CoachTeacherInteractions;
