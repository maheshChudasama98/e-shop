import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/MasterManagement/Tabs';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Tabs' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Tabs </title>
      </Helmet>
      <Page />
    </>
  );
}
