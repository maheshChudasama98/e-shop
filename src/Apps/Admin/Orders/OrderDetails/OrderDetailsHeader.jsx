import React, { useState } from 'react';
import { Stack, Button, Typography, Chip, MenuItem, Menu, Card } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Iconify from 'src/components/iconify';
import { fDateTime12hr } from 'src/utils/format-time';
import { getDisplayData } from 'src/utils/utils';
import { CustomBackButton } from 'src/components/CustomComponents';
import InvoicePDF from './InvoicePDF';

export default function OrderDetailsHeader({ order, selectors, onUpdateStatus, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    onUpdateStatus(status);
    handleCloseStatus();
  };

  const statusData = getDisplayData({
    list: selectors?.order_status || [],
    value: order?.order_status,
  });

  return (
    <Card sx={{ p: 1.5 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <CustomBackButton />

          <Stack spacing={0}>
            <Typography variant="body2" fontWeight="600">
              #{order?.order_number}
            </Typography>
            <Typography variant="caption" fontSize="10px" color="textSecondary">
              {fDateTime12hr(order?.createdAt)}
            </Typography>
          </Stack>

          <Chip
            label={statusData?.label || 'Unknown'}
            size="small"
            sx={{
              color: statusData?.textColor || 'inherit',
              backgroundColor: statusData?.bgColor || 'action.hover',
              fontWeight: 600,
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleOpenStatus}
            endIcon={<Iconify icon={anchorEl ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
            sx={{ borderRadius: 1 }}
          >
            {statusData?.label || 'Status'}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseStatus}>
            {selectors?.order_status?.map((status) => (
              <MenuItem
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                selected={status.value === order?.order_status}
              >
                {status.label}
              </MenuItem>
            ))}
          </Menu>

          <PDFDownloadLink
            document={<InvoicePDF order={order} />}
            fileName={`Invoice-${order?.order_number}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            {({ loading: pdfLoading }) => (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon="eva:printer-fill" />}
                disabled={pdfLoading}
                sx={{ borderRadius: 1 }}
              >
                {pdfLoading ? '...' : 'Print'}
              </Button>
            )}
          </PDFDownloadLink>

          <Button
            variant="contained"
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            sx={{ borderRadius: 1 }}
          >
            Edit
          </Button>

          {(order?.payment_status === 'paid' || order?.order_status === 'pending') && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={onDelete}
              startIcon={<Iconify icon="eva:trash-2-fill" />}
              sx={{ borderRadius: 1 }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
