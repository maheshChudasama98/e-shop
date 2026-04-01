import React, { useState } from 'react';
import { Box, Card, Stack, Avatar, Typography, Button, MenuItem, Menu, Chip } from '@mui/material';

import Iconify from 'src/components/iconify';
import { fMobileNumber } from 'src/utils/format-text';
import { getDisplayData } from 'src/utils/utils';

export default function OrderSidebar({
  user,
  address,
  payment,
  order,
  selectors,
  onUpdatePaymentStatus,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    onUpdatePaymentStatus(status);
    handleCloseStatus();
  };

  const paymentStatusData = getDisplayData({
    list: selectors?.payment_status || [],
    value: order?.payment_status,
  });

  return (
    <Stack spacing={2}>
      {/* Payment Information */}
      <Card sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            Payment
          </Typography>
          <Button
            size="small"
            variant="soft"
            color="info"
            onClick={handleOpenStatus}
            endIcon={<Iconify icon={anchorEl ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
          >
            Change
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseStatus}>
            {selectors?.payment_status?.map((status) => (
              <MenuItem
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                selected={status.value === order?.payment_status}
              >
                {status.label}
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Method
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2">{payment || 'N/A'}</Typography>
              {payment === 'ONLINE' && <Iconify icon="logos:razorpay-icon" width={24} />}
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={paymentStatusData?.label || order?.payment_status}
              size="small"
              sx={{
                color: paymentStatusData?.textColor || 'inherit',
                backgroundColor: paymentStatusData?.bgColor || 'action.hover',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            />
          </Stack>
        </Stack>
      </Card>
      
      {/* Customer Info */}
      <Card sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight="600">
            Customer
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={user?.photoURL} />
            <Box>
              <Typography variant="subtitle2">
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {user?.email}
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
              Phone
            </Typography>
            <Typography variant="body2">{fMobileNumber(user?.phone)}</Typography>
          </Box>
        </Stack>
      </Card>

      {/* Shipping Address */}
      <Card sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            Shipping
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Stack>
            <Typography variant="caption" color="textSecondary" sx={{ width: 120 }}>
              Address
            </Typography>
            <Typography variant="body2">
              {address?.address_line1},
              <br />
              {address?.address_line2}, {address?.city}
              <br />
              {address?.state}, {address?.country} / {address?.pincode}
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="caption" color="textSecondary" sx={{ width: 120 }}>
              Phone number
            </Typography>
            <Typography variant="body2">{fMobileNumber(address?.phone) || '-'}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
