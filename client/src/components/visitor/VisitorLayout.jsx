import { Outlet } from 'react-router-dom';
import useTheme from '../../hooks/useTheme.js';
import useFetch from '../../hooks/useFetch.js';
import { getProfile } from '../../services/profileService.js';
import { emptyProfile } from '../../data/profile.js';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function VisitorLayout() {
  const [dark, toggleTheme] = useTheme();
  const { data } = useFetch(getProfile);
  const profile = data ?? emptyProfile;

  return (
    <div className="site">
      <Navbar profile={profile} dark={dark} toggleTheme={toggleTheme} />
      <main><Outlet context={profile} /></main>
      <Footer profile={profile} />
    </div>
  );
}