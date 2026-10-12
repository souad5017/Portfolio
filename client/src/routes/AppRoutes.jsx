import { Routes, Route } from 'react-router-dom';
import VisitorLayout from '../components/visitor/VisitorLayout.jsx';
import Home from '../pages/visitor/Home.jsx';
import ProjectDetail from '../pages/visitor/ProjectDetail.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<VisitorLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}