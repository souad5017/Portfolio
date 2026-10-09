import { Routes, Route } from 'react-router-dom';
import VisitorLayout from '../components/visitor/VisitorLayout.jsx';
import Home from '../pages/visitor/Home.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<VisitorLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}