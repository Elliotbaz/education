import React, { useEffect, useState } from 'react'
import "./ContentMain.css";
import CoachDetails from "../CoachDetails/CoachDetails";
import TeacherActivities from "../TeacherActivities/TeacherActivities";
import Resource from "../Resource/Resource";
import CoachTeacherInteractions from "../CoachTeacherInteractions/CoachTeacherInteractions";
import StudentProgress from "../StudentProgress/StudentProgress";
import TotalResourceCount from "../TotalResourceCount/TotalResourceCount";
import HelpDesk from "../HelpDesk/HelpDesk";
import { getAllCoachesAPI, getAllResourcesAPI, getAllTeachersAPI, getAllStudentProgressAPI, getAllInteractionsAPI } from '../../utils/api'

const ContentMain = () => {
  const [coaches, setCoaches] = useState([])
  const [teachers, setTeachers] = useState([])
  const [resources, setResources] = useState([])
  const [studentsProgress, setStudentsProgress] = useState([])
  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    getAllCoachesAPI().then(response => {
      setCoaches(response.data)
    })

    getAllTeachersAPI().then((response) => {
      setTeachers(response.data)
    })

    getAllResourcesAPI().then((response) => {
      setResources(response.data)
    })

    getAllStudentProgressAPI().then((response) => {
      setStudentsProgress(response.data)
    })

    getAllInteractionsAPI().then((response) => {
      setInteractions(response.data)
    })
  }, [])

  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <CoachDetails coach_details={coaches} />
        <TeacherActivities teacherActivities={teachers} />
        <Resource resourceManagement={resources} />
      </div>
      <div className="content-grid-two">
        <CoachTeacherInteractions coachTeacherInteractions={interactions} />
        <div className="grid-two-item">
          <div className="subgrid-two">
            <StudentProgress studentProgress={studentsProgress} />
          </div>
        </div>

        <div className="grid-two-item">
          <div className="subgrid-two">
            <TotalResourceCount
              teacherActivities={teachers}
              coachDetails={coaches}
              resourceManagement={resources} />
            <HelpDesk />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentMain
