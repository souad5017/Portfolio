import { Routes, Route, Outlet } from 'react-router-dom';
import VisitorLayout from '../components/visitor/VisitorLayout.jsx';
import Home from '../pages/visitor/Home.jsx';
import ProjectDetail from '../pages/visitor/ProjectDetail.jsx';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<VisitorLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/projects/:id" element={<ProjectDetail />} />

      <Route element={<AuthProvider><Outlet /></AuthProvider>}>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}