import React, { useState } from 'react';
import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { fDateTime12hr } from 'src/utils/format-time';
import { formatToINR } from 'src/utils/format-number';
import { getDisplayData } from 'src/utils/utils';
import { DataNotFound } from 'src/components/DataNotFound';
import { ADMIN_ROUTES } from 'src/routes/routes';
import { CustomExpandAll } from 'src/components/CustomComponents';
import { apiURL, DefaultProductImage } from 'src/constance';
import { Avatar } from 'antd';
import { useRouter } from 'src/routes/hooks';

export default function OrdersTab({ orders, selectors }) {
  const router = useRouter();

  const [expandedNodes, setExpandedNodes] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedNodes(
      isExpanded ? [...expandedNodes, panel] : expandedNodes.filter((id) => id !== panel)
    );
  };

  return (
    <>
      {orders.length > 0 ? (
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <CustomExpandAll
              labelKey="order_id"
              rows={orders}
              expandedRowKeys={expandedNodes}
              setExpandedRowKeys={setExpandedNodes}
            />
          </Box>
          {orders.map((order) => {
            const sData = getDisplayData({
              list: selectors?.order_status || [],
              value: order.order_status,
            });
            const pData = getDisplayData({
              list: selectors?.payment_status || [],
              value: order.payment_status,
            });

            return (
              <Accordion
                key={order.order_id}
                expanded={expandedNodes.includes(order.order_id)}
                onChange={handleChange(order.order_id)}
                variant="outlined"
                sx={{
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { m: 0 },
                  borderRadius: 1,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': { m: 0 },
                    bgcolor: expandedNodes.includes(order.order_id) ? 'action.hover' : 'inherit',
                  }}
                >
                  <Box sx={{ width: '100%', py: 1.5 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Order #
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(ADMIN_ROUTES.ORDER_DETAILS.replace(':id', order.order_id));
                          }}
                        >
                          #{order.order_number}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Date
                        </Typography>
                        <Typography variant="body2">{fDateTime12hr(order.createdAt)}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Status
                        </Typography>
                        <Chip
                          label={sData.label}
                          size="small"
                          sx={{ color: sData.textColor, bgcolor: sData.bgColor, fontWeight: 600 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Payment
                        </Typography>
                        <Chip
                          label={pData.label}
                          size="small"
                          sx={{ color: pData.textColor, bgcolor: pData.bgColor, fontWeight: 600 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Amount
                        </Typography>
                        <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                          {formatToINR(order.final_amount)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                      Order Items ({order?.order_items?.length || 0})
                    </Typography>
                    <Stack spacing={1.5}>
                      {order?.order_items?.map((item, index) => (
                        <Box key={index}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 2, md: 1 }}>
                              <Avatar
                                shape="square"
                                size="large"
                                src={
                                  item?.product_variant?.variant_image?.image_url
                                    ? `${apiURL}/${item?.product_variant?.variant_image?.image_url}`
                                    : DefaultProductImage
                                }
                                style={{ border: 'solid 1px #BBB' }}
                              />
                            </Grid>
                            <Grid size={{ xs: 10, md: 4 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {item?.product?.product_name || 'Unknown Product'}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                Variant: {item?.product_variant?.variant_name || 'N/A'} -
                                {item?.product_variant?.variant_value || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 3, md: 1.5 }} sx={{ textAlign: { md: 'center' } }}>
                              <Typography variant="caption" color="textSecondary" display="block">
                                Price
                              </Typography>
                              <Typography variant="body2">{formatToINR(item?.price)}</Typography>
                            </Grid>
                            <Grid size={{ xs: 3, md: 1.5 }} sx={{ textAlign: { md: 'center' } }}>
                              <Typography variant="caption" color="textSecondary" display="block">
                                Discount
                              </Typography>
                              <Typography variant="body2" color="error.main">
                                -{formatToINR(item?.discount || 0)}
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 2, md: 1.5 }} sx={{ textAlign: { md: 'center' } }}>
                              <Typography variant="caption" color="textSecondary" display="block">
                                Qty
                              </Typography>
                              <Typography variant="body2">x {item?.quantity}</Typography>
                            </Grid>
                            <Grid size={{ xs: 4, md: 2.5 }} sx={{ textAlign: 'right' }}>
                              <Typography variant="caption" color="textSecondary" display="block">
                                Total
                              </Typography>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {formatToINR(
                                  ((item?.price || 0) - (item?.discount || 0)) *
                                    (item?.quantity || 0)
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                          {index !== order.order_items.length - 1 && (
                            <Divider sx={{ mt: 1.5, borderStyle: 'dashed' }} />
                          )}
                        </Box>
                      ))}
                    </Stack>

                    <Box
                      sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: (theme) => `1px dashed ${theme.palette.divider}`,
                      }}
                    >
                      <Stack direction="row" justifyContent="end" alignItems="center">
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="textSecondary">
                            Final Total
                          </Typography>
                          <Typography variant="h6" color="primary.main" fontWeight="bold">
                            {formatToINR(order.final_amount)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      ) : (
        <DataNotFound />
      )}
    </>
  );
}

OrdersTab.propTypes = {
  orders: PropTypes.array,
  selectors: PropTypes.object,
};
