export default function Badge({ children, tone = 'purple' }) {
  return <span className={`badge badge-${tone}`}><i />{children}</span>;
}