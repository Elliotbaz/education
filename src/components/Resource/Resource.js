import React from 'react';
import "./Resource.css";

const Resource = ({ resourceManagement }) => {

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const randomResources = shuffleArray([...resourceManagement]).slice(0, 3);

    return (
        <div className="grid-one-item grid-common grid-c3">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Resource Management</h3>
            </div>
            <div className="grid-c3-content" style={{ paddingBottom: 20 }}>
                <div className="grid-chart">
                    <div className="chart-vert-value" style={{ marginBottom: 40 }}>
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                    </div>
                    {
                        randomResources.slice(0, 3).map((resource) => (
                            <div className="grid-chart-bar" key={resource.resource_id}>
                                <div className="bar-wrapper">
                                    <div className="bar-item1" style={{ height: `${resource.utilization_rate}%` }}>
                                        {resource.utilization_rate}
                                    </div>
                                </div>
                                <div className="grid-hortz-value" style={{ width: '100px', textAlign: 'center', margin: '0 auto' }}>
                                    {resource.resource_name}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Resource;
