import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/Products/ProductModify';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Product Modify' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Product Modify </title>
      </Helmet>
      <Page />
    </>
  );
}
