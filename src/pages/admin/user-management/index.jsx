import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/UserManagement';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Users' });
  }, []);
  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>
      <Page />
    </>
  );
}
