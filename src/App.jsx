import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import NavBar from "./components/nav/Navbar";
import NotFoundPage from "./pages/utils/404";
// all [student]pages...
import StudentLoginPage from "./pages/studentPortal/StudentLogin";
import StudentRegistrationPage from "./pages/studentPortal/StudentRegistration";
import LeaderBoardPage from "./pages/studentPortal/LeaderBoardPage";
import QuizzesPage from "./pages/studentPortal/QuizzesPage";
import CourseVideosPage from "./pages/studentPortal/CourseVideos";

// all [admin]pages...
import AdminLoginPage from "./pages/adminPortal/AdminLoginPage";
import AdminDashBoardPage from "./pages/adminPortal/AdminDashBoardPage";
import AdminVideosPage from "./pages/adminPortal/AdminVideosPage";
import AdminQuizzesPage from "./pages/adminPortal/AdminQuizzesPage";
import AdminAssignmentsPage from "./pages/adminPortal/AdminAssignmentsPage";
import AdminAssignmentsMarkPage from "./pages/adminPortal/AdminAssignmentsMark";
// all route protectors...
import StudentPublicRoute from "./components/utils/routes/StudentPublicRoute";
import StudentPrivateRoute from "./components/utils/routes/StudentPrivateRoute";
import AdminPublicRoute from "./components/utils/routes/AdminPublicRoute";
import AdminPrivateRoute from "./components/utils/routes/AdminPrivateRoute";
// 
import VideoPage from "./components/student/coursePlayer/VideoPage";
import AddNewAssignmentPage from "./pages/adminPortal/AddNewAssignmentPage";
import EditSingleAssignmentPage from "./pages/adminPortal/EditSingleAssignmentPage";
import AddNewQuizPage from "./pages/adminPortal/AddNewQuizPage";
import EditQuizPage from "./pages/adminPortal/EditQuizPage";
import AddNewVideoPage from "./pages/adminPortal/AddNewVideoPage";
import EditVideoPage from "./pages/adminPortal/EditVideoPage";
// all [admin]route protectors...

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div className="">Checking authentication....</div>
  ) : (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="*" element={<NotFoundPage />} />
            {/* student route start */}
            <Route path="/" element={<Navigate to={`/videos`} />} />
            <Route
              path="/videos"
              element={
                <StudentPrivateRoute>
                  <VideoPage />
                </StudentPrivateRoute>
              }
            />
            <Route
              path="/videos/:videoId"
              element={
                <StudentPrivateRoute>
                  <CourseVideosPage />
                </StudentPrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <StudentPrivateRoute>
                  <LeaderBoardPage />
                </StudentPrivateRoute>
              }
            />
            <Route
              path="/videos/:videoId/quizes"
              element={
                <StudentPrivateRoute>
                  <QuizzesPage />
                </StudentPrivateRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <StudentPublicRoute>
                <StudentLoginPage />
              </StudentPublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <StudentPublicRoute>
                <StudentRegistrationPage />
              </StudentPublicRoute>
            }
          />
          {/* student route end */}

          {/* admin route  start*/}
          <Route path="/" element={<NavBar />}>
            <Route
              path="/admin"
              element={
                <AdminPrivateRoute>
                  <AdminDashBoardPage />
                </AdminPrivateRoute>
              }
            />
            {/* route for the admin videos pages */}
            <Route
              path="/admin/videos"
              element={
                <AdminPrivateRoute>
                  <AdminVideosPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/videos/add-new-video"
              element={
                <AdminPrivateRoute>
                  <AddNewVideoPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/videos/edit-video/:videoId"
              element={
                <AdminPrivateRoute>
                  <EditVideoPage />
                </AdminPrivateRoute>
              }
            />

            {/* route for the admin quizes pages */}

            <Route
              path="/admin/quizzes"
              element={
                <AdminPrivateRoute>
                  <AdminQuizzesPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/quizzes/add-new-quiz"
              element={
                <AdminPrivateRoute>
                  <AddNewQuizPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/quizzes/edit-quiz/:quizId"
              element={
                <AdminPrivateRoute>
                  <EditQuizPage />
                </AdminPrivateRoute>
              }
            />
            {/* route for the admin assignments pages */}

            <Route
              path="/admin/assignments"
              element={
                <AdminPrivateRoute>
                  <AdminAssignmentsPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/assignments/add-new-assignment"
              element={
                <AdminPrivateRoute>
                  <AddNewAssignmentPage />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/assignments/edit-assignment/:assignmentId"
              element={
                <AdminPrivateRoute>
                  <EditSingleAssignmentPage />
                </AdminPrivateRoute>
              }
            />

            {/* route for the admin assignmentMarkPage */}
            <Route
              path="/admin/assignmentsmark"
              element={
                <AdminPrivateRoute>
                  <AdminAssignmentsMarkPage />
                </AdminPrivateRoute>
              }
            />
          </Route>
          {/* route for admin login page */}
          <Route
            path="/admin/login"
            element={
              <AdminPublicRoute>
                <AdminLoginPage />
              </AdminPublicRoute>
            }
          />
          {/* admin route  end*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
