import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/UserManagement/UserDetails';

// ----------------------------------------------------------------------

export default function UserDetailPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'User Details' });
  }, []);

  return (
    <>
      <Helmet>
        <title> User Details </title>
      </Helmet>
      <Page />
    </>
  );
}
