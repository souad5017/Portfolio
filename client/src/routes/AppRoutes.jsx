import { Routes, Route, Outlet } from 'react-router-dom';
import StyleScope from '../components/common/StyleScope.jsx';
import VisitorLayout from '../components/visitor/VisitorLayout.jsx';
import Home from '../pages/visitor/Home.jsx';
import ProjectDetail from '../pages/visitor/ProjectDetail.jsx';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import visitorCss from '../styles/visitor.css?inline';
import Projects from '../pages/admin/Projects.jsx';
import ProjectForm from '../components/admin/ProjectForm.jsx';
import EditProject from '../pages/admin/EditProject.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StyleScope css={visitorCss} />}>
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/projects/:id" element={<ProjectDetail />} />

        <Route element={<AuthProvider><Outlet /></AuthProvider>}>
          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/projects/new" element={<ProjectForm />} />
            <Route path="/admin/projects/:id/edit" element={<EditProject />} />
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}