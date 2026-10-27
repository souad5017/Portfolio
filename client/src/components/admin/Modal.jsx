import AdminIcon from './AdminIcon.jsx';

export default function Modal({ title, children, close }) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button onClick={close} aria-label="Close"><AdminIcon name="close" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}