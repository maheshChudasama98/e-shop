import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Table, Avatar } from 'antd';

import { formatToINR } from 'src/utils/format-number';
import { apiURL, DefaultProductImage } from 'src/constance';

export default function OrderItemsTable({ items }) {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            shape="square"
            size={40}
            src={
              record?.product_variant?.variant_image?.image_url
                ? `${apiURL}/${record?.product_variant?.variant_image?.image_url}`
                : DefaultProductImage
            }
            style={{
              border: 'solid 1px #eee',
              borderRadius: '8px',
            }}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
              {record?.product?.product_name || 'Unknown Product'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              SKU: {record?.product_variant?.sku || 'N/A'} -{' '}
              {record?.product_variant?.variant_name || ''} (
              {record?.product_variant?.variant_value})
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 80,
      render: (qty) => <Typography variant="body2">x{qty}</Typography>,
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) => <Typography variant="body2">{formatToINR(price || 0)}</Typography>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      align: 'right',
      render: (discount) => (
        <Typography variant="body2" color="error.main">
          -{formatToINR(discount || 0)}
        </Typography>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right',
      render: (_, record) => (
        <Typography variant="subtitle2" fontWeight="bold">
          {formatToINR(
            (record.price || 0) * (record.quantity || 1) -
              (record.discount || 0) * (record.quantity || 1)
          )}
        </Typography>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey={(record) => record.order_item_id || record.product_id}
      className="custom-antd-table"
    />
  );
}
