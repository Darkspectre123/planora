import { Navigate, useRoutes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Forgotpasswordlayout from "../layouts/Forgotpasswordlayout";
import ResetLayout from "../layouts/ResetLayout";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import NotesPage from "../pages/NotesPage";
import ProfilePage from "../pages/ProfilePage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import ProjectsPage from "../pages/ProjectsPage";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import ChangePassword from "../components/auth/ChangePassword";
import TasksPage from "../pages/TasksPage";
import useAuthStore from "../store/authStore";
import DashboardPage from "../pages/Dashboard"; // add this import at the top

// Inside your ProtectedRoute routes:


// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default function Router() {
  return useRoutes([
    {
  path: "/login",
  element: <AuthLayout />,
  children: [{ path: "", element: <AuthPage /> }],
},

{
  path: "/forgot-password",
  element: <Forgotpasswordlayout />,
  children: [{ path: "", element: <ForgotPassword /> }],
},
{
  path: "/reset-password/:resetToken",
  element: <ResetLayout/>,
  children: [{ path: "", element: <ResetPassword /> }],
},



    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Navigate to="/projects" replace /> },
        { path: "tasks", element: <TasksPage /> },
        { path: "projects/:projectId/tasks", element: <TasksPage /> },
        { path: "notes", element: <NotesPage /> },
        { path: "projects/:projectId/notes", element: <NotesPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "profile/change-password", element: <ChangePassword /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "projects/:projectId", element: <ProjectDetailsPage /> },
        // Catch any unmatched routes within the protected area
        { path: "*", element: <NotFoundPage /> },
        {
  path: "dashboard",
  element: <DashboardPage />,
},

      ],
    },
    // Catch any unmatched routes outside the protected area
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
}
