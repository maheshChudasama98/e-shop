import React from 'react';
import {
  Card,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import { fDateTime12hr } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';

const STATUS_MAP = {
  active: { color: 'success', label: 'Delivery successful' },
  shipped: { color: 'info', label: 'Transporting to [2]' },
  processing: { color: 'warning', label: 'Transporting to [1]' },
  pending: { color: 'grey', label: 'Order has been created' },
  cancelled: { color: 'error', label: 'Order has been cancelled' },
};

export default function OrderHistory({ history, order }) {
  // Sort history by date descending
  const sortedHistory = [...history].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        History
      </Typography>

      <Box sx={{ position: 'relative', mt: 3 }}>
        <Timeline position="right" sx={{ p: 0 }}>
          {sortedHistory.map((item, index) => {
            const isLast = index === sortedHistory.length - 1;
            const status = STATUS_MAP[item.status] || { color: 'grey', label: item.status_label || item.status };

            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ 
                    flex: 0.1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: 120,
                    textAlign: 'left',
                    px: 0
                  }}
                >
                  <Typography variant="subtitle2" component="span">
                    {status.label}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {fDateTime12hr(item.createdAt)}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot color={status.color} />
                  {!isLast && <TimelineConnector />}
                </TimelineSeparator>

                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {item.comment || ''}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>

      <Button
        size="small"
        color="inherit"
        endIcon={<Iconify icon="eva:chevron-right-fill" />}
        sx={{ mt: 2 }}
      >
        Show more
      </Button>
    </Card>
  );
}
