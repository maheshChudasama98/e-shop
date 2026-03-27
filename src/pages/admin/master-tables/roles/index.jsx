import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/MasterManagement/Roles';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Roles' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Roles </title>
      </Helmet>
      <Page />
    </>
  );
}
