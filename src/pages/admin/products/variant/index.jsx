import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/Products/Variant/VariantDetails';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Variant' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Variant </title>
      </Helmet>
      <Page />
    </>
  );
}
