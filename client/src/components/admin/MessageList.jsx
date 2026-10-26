import { Link } from 'react-router-dom';
import { initials, timeAgo } from '../../utils/format.js';

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Link
          to="/admin/messages"
          className={`message-row ${message.isRead ? '' : 'unread'}`}
          key={message._id}
        >
          <span className="message-avatar">{initials(message.name)}</span>
          <span>
            <strong>{message.name}</strong>
            <small>{message.subject}</small>
          </span>
          <time>{timeAgo(message.createdAt)}</time>
          {!message.isRead && <i />}
        </Link>
      ))}
    </div>
  );
}