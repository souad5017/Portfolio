import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminButton from '../../components/admin/AdminButton.jsx';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Badge from '../../components/admin/Badge.jsx';
import Card from '../../components/admin/Card.jsx';
import ConfirmDelete from '../../components/admin/ConfirmDelete.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { deleteMessage, getMessages, setMessageRead } from '../../services/messageService.js';
import { formatDate, formatDateTime, initials } from '../../utils/format.js';

export default function Messages() {
  const { refreshStats } = useOutletContext();
  const { data: messages, error, reload } = useFetch(getMessages);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const query = search.toLowerCase();
  const filtered = (messages ?? []).filter(({ name, email, subject }) =>
    [name, email, subject].some((value) => value.toLowerCase().includes(query))
  );
  const active = filtered.find((message) => message._id === selectedId) ?? filtered[0];

  const refresh = () => {
    reload();
    refreshStats();
  };

  const toggleRead = async () => {
    await setMessageRead(active._id, !active.isRead);
    refresh();
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteMessage(toDelete._id);
      setToDelete(null);
      refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader title="Messages" description="Messages received from your portfolio visitors." />

      {error && <p className="empty">Unable to load messages.</p>}
      {!error && !messages && <p className="empty">Loading…</p>}
      {messages && !messages.length && <p className="empty">No messages yet.</p>}

      {messages?.length > 0 && (
        <div className="inbox">
          <Card className="inbox-list">
            <div className="inbox-tools">
              <div className="search-field">
                <AdminIcon name="search" />
                <input placeholder="Search messages..." value={search} onChange={(event) => setSearch(event.target.value)} />
              </div>
            </div>
            {filtered.length ? filtered.map((message) => (
              <button
                key={message._id}
                onClick={() => setSelectedId(message._id)}
                className={`inbox-item ${message._id === active?._id ? 'selected' : ''} ${message.isRead ? '' : 'unread'}`}
              >
                <span className="message-avatar">{initials(message.name)}</span>
                <span>
                  <strong>{message.name}</strong>
                  <b>{message.subject}</b>
                  <small>{message.email}</small>
                </span>
                <time>{formatDate(message.createdAt)}</time>
                {!message.isRead && <i />}
              </button>
            )) : <p className="empty">No messages found.</p>}
          </Card>

          {active && (
            <Card className="message-detail">
              <div className="message-detail-head">
                <div>
                  <span className="message-avatar large">{initials(active.name)}</span>
                  <div>
                    <h2>{active.name}</h2>
                    <p>{active.email}</p>
                  </div>
                </div>
                <div className="row-actions">
                  <button onClick={toggleRead} aria-label={active.isRead ? 'Mark as unread' : 'Mark as read'}>
                    <AdminIcon name="check" />
                  </button>
                  <button onClick={() => setToDelete(active)} aria-label="Delete">
                    <AdminIcon name="trash" />
                  </button>
                </div>
              </div>

              <div className="message-subject">
                <Badge tone={active.isRead ? 'muted' : 'purple'}>{active.isRead ? 'Read' : 'Unread'}</Badge>
                <h3>{active.subject}</h3>
                <time>{formatDateTime(active.createdAt)}</time>
              </div>

              <div className="message-body">
                {active.message.split('\n').filter(Boolean).map((line, index) => <p key={index}>{line}</p>)}
              </div>

              <div className="message-reply">
                <a
                  className="btn btn-primary"
                  href={`mailto:${active.email}?subject=${encodeURIComponent(`Re: ${active.subject}`)}`}
                >
                  Reply via email
                </a>
                <AdminButton variant="secondary" onClick={toggleRead}>
                  {active.isRead ? 'Mark as unread' : 'Mark as read'}
                </AdminButton>
              </div>
            </Card>
          )}
        </div>
      )}

      {toDelete && (
        <ConfirmDelete
          title="Delete message?"
          itemName={toDelete.subject}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
          busy={busy}
        />
      )}
    </>
  );
}