import { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton.jsx';
import Card from '../../components/admin/Card.jsx';
import Field from '../../components/admin/Field.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import Toast from '../../components/admin/Toast.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { changePassword } from '../../services/authService.js';

export default function Settings() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { currentPassword, newPassword, confirmPassword } = Object.fromEntries(new FormData(form));
    setSaved(false);
    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await changePassword(currentPassword, newPassword);
      form.reset();
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Unable to change the password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Settings" description="Manage your account and security." />
      {saved && <Toast title="Password updated" text="Use your new password next time you sign in." onClose={() => setSaved(false)} />}

      <div className="form-stack narrow">
        <Card>
          <h2>Account</h2>
          <Field label="Email" value={user.email} readOnly />
        </Card>

        <Card>
          <h2>Change password</h2>
          <form onSubmit={handleSubmit}>
            <Field label="Current password" name="currentPassword" type="password" required autoComplete="current-password" />
            <Field label="New password (10 characters minimum)" name="newPassword" type="password" required minLength={10} maxLength={72} autoComplete="new-password" />
            <Field label="Confirm new password" name="confirmPassword" type="password" required autoComplete="new-password" error={error} />
            <AdminButton type="submit" disabled={saving}>{saving ? 'Saving...' : 'Update password'}</AdminButton>
          </form>
        </Card>
      </div>
    </>
  );
}