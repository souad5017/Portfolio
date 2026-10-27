export default function Field({ label, error, as: Control = 'input', children, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <Control {...props}>{children}</Control>
      {error && <small>{error}</small>}
    </label>
  );
}