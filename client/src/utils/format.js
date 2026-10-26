export const initials = (text = '') =>
  text.split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase();

export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '—';

export const timeAgo = (date) => {
  const minutes = Math.floor((Date.now() - new Date(date)) / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)} min`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hr`;
  return `${Math.floor(minutes / 1440)} day`;
};