import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/Dashboard';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Dashboard' });
    dispatch({ type: 'SET_BACKGROUND_COLOR', payload: 'paper' });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Page />
    </>
  );
}
