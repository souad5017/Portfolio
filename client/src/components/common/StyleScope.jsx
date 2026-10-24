import { Outlet } from 'react-router-dom';
import useStyles from '../../hooks/useStyles.js';

export default function StyleScope({ css }) {
  useStyles(css);
  return <Outlet />;
}