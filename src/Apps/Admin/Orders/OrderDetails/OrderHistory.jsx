import React from 'react';
import { Card, Typography, Box } from '@mui/material';
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

const STATUS_MAP = {
  pending: { color: 'grey', label: 'Order has been created' },
  confirmed: { color: 'success', label: 'Order has been Confirmed' },
  processing: { color: 'info', label: 'Processing' },
  shipped: { color: 'warning', label: 'Shipped' },
  delivered: { color: 'success', label: 'Delivery successful' },
  cancelled: { color: 'error', label: 'Order has been cancelled' },
  returned: { color: 'secondary', label: 'Order has been Returned' },
};

export default function OrderHistory({ history, order }) {
  // Sort history by date descending
  const sortedHistory = [...history].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        History
      </Typography>

      <Box sx={{ position: 'relative', mt: 3 }}>
        <Timeline position="right" sx={{ p: 0 }}>
          {sortedHistory.map((item, index) => {
            const isLast = index === sortedHistory.length - 1;
            const status = STATUS_MAP[item.status] || {
              color: 'grey',
              label: item.status_label || item.status,
            };

            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{
                    flex: 0.1,
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    minWidth: 250,
                    textAlign: 'left',
                    px: 2,
                  }}
                >
                  <Typography variant="subtitle2" component="span">
                    {status.label}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {fDateTime12hr(item.created_at)}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot color={status.color} />
                  {!isLast && <TimelineConnector />}
                </TimelineSeparator>

                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {item.note || ''}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    </Card>
  );
}
