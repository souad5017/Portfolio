import AdminIcon from './AdminIcon.jsx';

export default function Toast({ title, text, onClose }) {
  return (
    <div className="toast success" role="status">
      <AdminIcon name="check" />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <button onClick={onClose} aria-label="Close"><AdminIcon name="close" size={16} /></button>
    </div>
  );
}