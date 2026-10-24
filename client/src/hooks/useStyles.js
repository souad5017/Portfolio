import { useLayoutEffect } from 'react';

export default function useStyles(css) {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return () => style.remove();
  }, [css]);
}