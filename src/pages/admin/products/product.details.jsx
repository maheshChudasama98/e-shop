import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/Products/ProductDetails';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Product Details' });
  }, []);
  return (
    <>
      <Helmet>
        <title> Product Details </title>
      </Helmet>
      <Page />
    </>
  );
}
