import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllTeachers from './pages/AllTeachers';
import AllCoach from './pages/AllCoach';
import AllInteractions from './pages/AllInteraction';
import AllResources from './pages/AllResources'
import AllStudentProgress from './pages/AllStudentProgress'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/teachers/all" element={<AllTeachers />} />
                <Route path="/coach/all" element={<AllCoach />} />
                <Route path="/interactions/all" element={<AllInteractions />} />
                <Route path="/all_report" element={<AllResources />} />
                <Route path="/students_progress" element={<AllStudentProgress />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
