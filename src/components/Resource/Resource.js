import React from 'react';
import { Link } from 'react-router-dom';
import "./Resource.css";

const Resource = ({ resourceManagement }) => {
    return (
        <div className="grid-one-item grid-common grid-c3">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Resource Management</h3>
            </div>
            <div className="grid-c3-content">
                <div className="grid-chart">
                    <div className="chart-vert-value">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                        <span></span>
                    </div>
                    {
                        resourceManagement.slice(0, 3).map((resource) => (
                            <div className="grid-chart-bar" key={resource.resource_id}>
                                <div className="bar-wrapper">
                                    <div className="bar-item1" style={{ height: `${resource.utilization_rate}%` }}>
                                        {resource.utilization_rate}
                                    </div>
                                </div>
                                <span className="grid-hortz-value" style={{ paddingRight: '15px' }}>
                                    {resource.resource_name}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="see-more">
                <Link to="/all_report" style={{ cursor: 'pointer' }}>See all</Link>
            </div>
        </div>
    )
}

export default Resource;
