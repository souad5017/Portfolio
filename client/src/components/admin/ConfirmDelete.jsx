import AdminButton from './AdminButton.jsx';
import AdminIcon from './AdminIcon.jsx';
import Modal from './Modal.jsx';

export default function ConfirmDelete({ title, itemName, onConfirm, onCancel, busy }) {
  return (
    <Modal title={title} close={onCancel}>
      <div className="modal-danger-icon"><AdminIcon name="trash" /></div>
      <p>Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.</p>
      <div className="modal-actions">
        <AdminButton variant="secondary" onClick={onCancel}>Cancel</AdminButton>
        <AdminButton variant="danger" onClick={onConfirm} disabled={busy}>
          {busy ? 'Deleting...' : 'Delete'}
        </AdminButton>
      </div>
    </Modal>
  );
}