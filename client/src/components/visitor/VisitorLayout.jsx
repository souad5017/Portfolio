import { Outlet } from 'react-router-dom';
import useTheme from '../../hooks/useTheme.js';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function VisitorLayout() {
  const [dark, toggleTheme] = useTheme();

  return (
    <div className="site">
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}