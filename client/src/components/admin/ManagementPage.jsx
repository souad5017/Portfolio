import { useState } from 'react';
import AdminButton from './AdminButton.jsx';
import AdminIcon from './AdminIcon.jsx';
import Card from './Card.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';
import Field from './Field.jsx';
import Modal from './Modal.jsx';
import PageHeader from './PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { formatDate } from '../../utils/format.js';

const defaultOf = ({ name, type, defaultValue = '' }, item) => {
  const value = item[name];
  if (value === undefined || value === null) return defaultValue;
  if (type === 'date') return value.slice(0, 10);
  if (type === 'lines') return value.join('\n');
  return value;
};

const parse = ({ type }, value) => {
  if (type === 'number') return Number(value);
  if (type === 'date') return value || null;
  if (type === 'lines') return value.split('\n').map((line) => line.trim()).filter(Boolean);
  return value;
};

function FormField({ field, item }) {
  const { name, label, type = 'text', options, required } = field;
  const props = { label, name, required, defaultValue: defaultOf(field, item) };

  if (type === 'select') {
    return (
      <Field as="select" {...props}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </Field>
    );
  }
  if (type === 'textarea' || type === 'lines') return <Field as="textarea" rows={4} {...props} />;
  if (type === 'number') return <Field type="number" min={0} {...props} />;
  return <Field type={type} {...props} />;
}

export default function ManagementPage({ config }) {
  const { title, description, singular, icon, service, primary, columns, fields } = config;
  const lower = title.toLowerCase();
  const { data: items, error, reload } = useFetch(service.list);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');

  const filtered = (items ?? []).filter((item) =>
    String(item[primary.key]).toLowerCase().includes(search.toLowerCase())
  );
  const latest = (items ?? []).reduce((max, item) => (item.updatedAt > max ? item.updatedAt : max), '');

  const openForm = (item) => {
    setFormError('');
    setEditing(item);
  };

  const save = async (event) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const payload = Object.fromEntries(fields.map((field) => [field.name, parse(field, raw[field.name])]));
    setBusy(true);
    setFormError('');
    try {
      await (editing._id ? service.update(editing._id, payload) : service.create(payload));
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.response?.data?.message ?? `Unable to save the ${singular}.`);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await service.remove(toDelete._id);
      setToDelete(null);
      reload();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={<AdminButton icon="plus" onClick={() => openForm({})}>Add {singular}</AdminButton>}
      />

      <div className="mini-stats">
        <div><span>Total {lower}</span><strong>{items ? items.length : '—'}</strong></div>
        <div><span>Portfolio visibility</span><strong>Public</strong></div>
        <div><span>Last updated</span><strong>{latest ? formatDate(latest) : '—'}</strong></div>
      </div>

      <Card className="table-card management-card">
        <div className="filters">
          <div className="search-field">
            <AdminIcon name="search" />
            <input placeholder={`Search ${lower}...`} value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <span>{filtered.length} items</span>
        </div>

        {error && <p className="empty">Unable to load {lower}.</p>}
        {!error && !items && <p className="empty">Loading…</p>}
        {items && (filtered.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>{primary.header}</th>
                  {columns.map(({ header }) => <th key={header}>{header}</th>)}
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div className="entity-cell">
                        <span className={`entity-icon entity-${index % 4}`}><AdminIcon name={icon} size={17} /></span>
                        <strong>{item[primary.key]}</strong>
                      </div>
                    </td>
                    {columns.map(({ header, render }) => <td key={header}>{render(item)}</td>)}
                    <td>
                      <div className="row-actions">
                        <button onClick={() => openForm(item)} aria-label="Edit"><AdminIcon name="edit" size={16} /></button>
                        <button onClick={() => setToDelete(item)} aria-label="Delete"><AdminIcon name="trash" size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="empty">No {lower} found.</p>)}
      </Card>

      {editing && (
        <Modal title={`${editing._id ? 'Edit' : 'Add'} ${singular}`} close={() => setEditing(null)}>
          <form className="modal-form" onSubmit={save}>
            {fields.map((field) => <FormField key={field.name} field={field} item={editing} />)}
            {formError && <p className="form-error">{formError}</p>}
            <div className="modal-actions">
              <AdminButton variant="secondary" onClick={() => setEditing(null)}>Cancel</AdminButton>
              <AdminButton type="submit" disabled={busy}>
                {busy ? 'Saving...' : editing._id ? 'Save changes' : `Add ${singular}`}
              </AdminButton>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDelete
          title={`Delete ${singular}?`}
          itemName={toDelete[primary.key]}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
          busy={busy}
        />
      )}
    </>
  );
}