export default function PageHeader({ title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">Portfolio admin</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}