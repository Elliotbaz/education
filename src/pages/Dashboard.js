import React from "react";
import Sidebar from '../layout/Sidebar/Sidebar';
import Content from '../layout/Content/Content';
import '../layout/Dashboard.css'


const Dashboard = (props) => {

    return (
        <>
            <div className='app'>
                <Sidebar active={1} />
                <Content />

            </div>
        </>
    )
}

export default Dashboard