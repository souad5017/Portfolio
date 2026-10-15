import { useEffect, useState } from 'react';

export default function useFetch(fetcher, arg) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let ignore = false;
    fetcher(arg)
      .then((data) => {
        if (!ignore) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ data: null, loading: false, error });
      });
    return () => {
      ignore = true;
    };
  }, [fetcher, arg]);

  return state;
}