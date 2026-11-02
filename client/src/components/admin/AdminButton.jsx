import AdminIcon from './AdminIcon.jsx';

export default function AdminButton({ children, variant = 'primary', icon, type = 'button', ...props }) {
  return (
    <button type={type} className={`btn btn-${variant}`} {...props}>
      {icon && <AdminIcon name={icon} size={16} />}
      {children}
    </button>
  );
}