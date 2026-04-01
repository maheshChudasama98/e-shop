import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { formatToINR } from 'src/utils/format-number';

export default function OrderSummary({ order }) {
  const subtotal = order?.subtotal || 0;
  const shipping = order?.delivery || 0;
  const discount = order?.discount || 0;
  const taxes = order?.gst_tax || 0;
  const packing = order?.packing || 0;
  const total = order?.final_amount || (subtotal + shipping - discount + taxes + packing);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', p:2}}>
      <Stack spacing={1} sx={{ width: 1, maxWidth: 320 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Subtotal
          </Typography>
          <Typography variant="subtitle2">{formatToINR(subtotal)}</Typography>
        </Stack>
        
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Shipping
          </Typography>
          <Typography variant="subtitle2">
            {formatToINR(shipping)}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Discount
          </Typography>
          <Typography variant="subtitle2" color="error">
            -{formatToINR(discount)}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Taxes (GST)
          </Typography>
          <Typography variant="subtitle2">{formatToINR(taxes)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Packing Charges
          </Typography>
          <Typography variant="subtitle2">{formatToINR(packing)}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">{formatToINR(total)}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
