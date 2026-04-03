import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/MasterManagement/Colors';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Colors' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Colors </title>
      </Helmet>
      <Page />
    </>
  );
}
