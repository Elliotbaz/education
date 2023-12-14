import "./ContentMain.css";
import CoachDetails from "../CoachDetails/CoachDetails";
import TeacherActivities from "../TeacherActivities/TeacherActivities";
import Resource from "../Resource/Resource";
import CoachTeacherInteractions from "../CoachTeacherInteractions/CoachTeacherInteractions";
import StudentProgress from "../StudentProgress/StudentProgress";
import TotalResourceCount from "../TotalResourceCount/TotalResourceCount";
import HelpDesk from "../HelpDesk/HelpDesk";
// Import your teacher activities data replicating the API
import teacherData from '../../utils/dashboard_data.json';

const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <CoachDetails coach_details={teacherData.coach_details} />
        <TeacherActivities teacherActivities={teacherData.teacher_activities} />
        <Resource resourceManagement={teacherData.resource_management} />
      </div>
      <div className="content-grid-two">
        <CoachTeacherInteractions coachTeacherInteractions={teacherData.coach_teacher_interactions} />
        <div className="grid-two-item">
          <div className="subgrid-two">
            <StudentProgress studentProgress={teacherData.student_progress} />
          </div>
        </div>

        <div className="grid-two-item">
          <div className="subgrid-two">
            <TotalResourceCount
              teacherActivities={teacherData.teacher_activities}
              coachDetails={teacherData.coach_details}
              resourceManagement={teacherData.resource_management} />
            <HelpDesk />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentMain
