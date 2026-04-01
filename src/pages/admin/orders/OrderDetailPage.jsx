import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Page from 'src/Apps/Admin/Orders/OrderDetails';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: 'Order Details' });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Order Details </title>
      </Helmet>
      <Page />
    </>
  );
}
