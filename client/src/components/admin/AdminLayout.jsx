import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProfile } from '../../services/profileService.js';
import { getStats } from '../../services/dashboardService.js';
import { emptyProfile } from '../../data/profile.js';
import { getIdentity } from '../../utils/identity.js';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: profile } = useFetch(getProfile);
  const { data: stats, reload: refreshStats } = useFetch(getStats);
  const identity = getIdentity(profile ?? emptyProfile);

  return (
    <div className="app-shell">
      <Sidebar
        identity={identity}
        unread={stats?.unreadMessages ?? 0}
        open={sidebarOpen}
        close={() => setSidebarOpen(false)}
      />
      {sidebarOpen && (
        <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />
      )}
      <div className="workspace">
        <Header identity={identity} openMenu={() => setSidebarOpen(true)} />
        <main className="main-content"><Outlet context={{ refreshStats }} /></main>
      </div>
    </div>
  );
}