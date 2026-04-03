import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/MasterManagement/Certificates';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Certificates' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Certificates </title>
      </Helmet>
      <Page />
    </>
  );
}
