import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Stack, Skeleton, Card } from '@mui/material';

import {
  AdminOrderDetailsService,
  AdminOrderUpdateStatusService,
  AdminOrderUpdatePaymentStatusService,
  AdminOrderDeleteService,
} from 'src/Services/orders.services';
import { SelectorsService } from 'src/Services/master.services';
import { sweetAlertSuccess, sweetAlerts, sweetAlertQuestion } from 'src/utils/sweet-alerts';
import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

import OrderDetailsHeader from './OrderDetailsHeader';
import OrderItemsTable from './OrderItemsTable';
import OrderSummary from './OrderSummary';
import OrderHistory from './OrderHistory';
import OrderSidebar from './OrderSidebar';

export default function OrderDetailsView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [selectors, setSelectors] = useState({});

  const fetchData = () => {
    setLoading(true);
    dispatch(
      AdminOrderDetailsService({ order_id: id }, (res) => {
        setLoading(false);
        if (res?.status) {
          setOrderData(res.data);
        }
      })
    );
  };

  useEffect(() => {
    fetchData();
    dispatch(
      SelectorsService({ order_status: true, payment_status: true }, (res) => {
        if (res?.status) {
          setSelectors(res.data);
        }
      })
    );
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    const confirmation = await sweetAlertQuestion('Are you sure you want to change the order status?');
    if (confirmation === 'Yes') {
      dispatch(
        AdminOrderUpdateStatusService({ order_id: id, order_status: newStatus }, (res) => {
          if (res?.status) {
            sweetAlertSuccess('Order status updated successfully');
            fetchData();
          } else {
            sweetAlerts('error', res?.message || 'Failed to update status');
          }
        })
      );
    }
  };

  const handleUpdatePaymentStatus = async (newStatus) => {
    const confirmation = await sweetAlertQuestion('Are you sure you want to change the payment status?');
    if (confirmation === 'Yes') {
      dispatch(
        AdminOrderUpdatePaymentStatusService({ order_id: id, payment_status: newStatus }, (res) => {
          if (res?.status) {
            sweetAlertSuccess('Payment status updated successfully');
            fetchData();
          } else {
            sweetAlerts('error', res?.message || 'Failed to update payment status');
          }
        })
      );
    }
  };

  const handleDeleteOrder = async () => {
    const confirmation = await sweetAlertQuestion('Are you sure you want to delete this order?');
    if (confirmation === 'Yes') {
      dispatch(
        AdminOrderDeleteService({ order_id: id }, (res) => {
          if (res?.status) {
            sweetAlertSuccess('Order deleted successfully');
            router.push(ADMIN_ROUTES.ORDERS_MANAGEMENT_LIST);
          } else {
            sweetAlerts('error', res?.message || 'Failed to delete order');
          }
        })
      );
    }
  };

  if (loading && !orderData) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="text" width={300} height={40} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <OrderDetailsHeader
        order={orderData}
        selectors={selectors}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteOrder}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <Card>
              <OrderItemsTable items={orderData?.order_items || []} />
              <OrderSummary order={orderData} />
            </Card>
            {orderData?.order_history && <OrderHistory history={orderData?.order_history} />}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSidebar
            user={orderData?.user}
            address={orderData?.user_address}
            payment={orderData?.payment_method}
            order={orderData}
            selectors={selectors}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
