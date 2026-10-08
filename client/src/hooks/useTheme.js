import { useEffect, useState } from 'react';

export default function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}