import Icon from './Icon.jsx';

export default function Button({ children, variant = 'primary', icon, onClick, href, type = 'button' }) {
  const className = `btn btn-${variant}`;
  const content = <>{children}{icon && <Icon name={icon} />}</>;

  if (href) return <a className={className} href={href}>{content}</a>;
  return <button className={className} onClick={onClick} type={type}>{content}</button>;
}