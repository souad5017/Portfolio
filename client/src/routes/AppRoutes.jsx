import { Routes, Route } from 'react-router-dom';
import StyleScope from '../components/common/StyleScope.jsx';
import VisitorLayout from '../components/visitor/VisitorLayout.jsx';
import Home from '../pages/visitor/Home.jsx';
import ProjectDetail from '../pages/visitor/ProjectDetail.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import ProjectForm from '../components/admin/ProjectForm.jsx';
import PageHeader from '../components/admin/PageHeader.jsx';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import Profile from '../pages/admin/Profile.jsx';
import Projects from '../pages/admin/Projects.jsx';
import EditProject from '../pages/admin/EditProject.jsx';
import Technologies from '../pages/admin/Technologies.jsx';
import Skills from '../pages/admin/Skills.jsx';
import Experiences from '../pages/admin/Experiences.jsx';
import Education from '../pages/admin/Education.jsx';
import Certificates from '../pages/admin/Certificates.jsx';
import Messages from '../pages/admin/Messages.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import visitorCss from '../styles/visitor.css?inline';
import adminCss from '../styles/admin.css?inline';
import CvManagement from '../pages/admin/CvManagement.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StyleScope css={visitorCss} />}>
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Route>

      <Route element={<AuthProvider><StyleScope css={adminCss} /></AuthProvider>}>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/projects/new" element={<ProjectForm />} />
            <Route path="/admin/projects/:id/edit" element={<EditProject />} />
            <Route path="/admin/technologies" element={<Technologies />} />
            <Route path="/admin/skills" element={<Skills />} />
            <Route path="/admin/experiences" element={<Experiences />} />
            <Route path="/admin/education" element={<Education />} />
            <Route path="/admin/certificates" element={<Certificates />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/cv" element={<CvManagement />} />
            <Route path="/admin/*" element={<PageHeader title="Coming soon" description="This section is not built yet." />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}