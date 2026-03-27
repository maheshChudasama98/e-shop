import { useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Skeleton, Stack } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination } from 'src/components/CustomComponents';

import { Table } from 'antd';

import { fDateTime12hr } from 'src/utils/format-time';
import { GetInventoryLogsListService } from 'src/Services/product.services';
import { fText } from 'src/utils/format-text';

export default function InventoryLogs({ variantDetails }) {
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);
  const [field, setField] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecode, setTotalRecode] = useState(0);

  const [list, setList] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [loadingLoader, setLoadingLoader] = useState(false);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'change_type',
      key: 'change_type',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fText(item),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: 150,
      sorter: true,
      ellipsis: true,
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fDateTime12hr(item),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fDateTime12hr(item),
    },
  ];

  useEffect(() => {
    const payLoad = {
      product_id: variantDetails?.product_id,
      variant_id: variantDetails?.variant_id,
      page,
      page_size: pageSize,
      order,
      field,
    };

    setLoadingLoader(true);

    dispatch(
      GetInventoryLogsListService(payLoad, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setList(res?.data?.list);
          setTotalRecode(res?.data?.totalRecords);
        }
      })
    );
  }, [apiFlag, page, pageSize, variantDetails?.product_id]);

  useEffect(() => {
    setPage(1);
    setApiFlag(!apiFlag);
  }, [field, order]);

  return (
    <Stack>
      {list && list?.length > 0 ? (
        <>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            <Table
              className="custom-ant-table"
              showSorterTooltip={false}
              columns={
                !loadingLoader
                  ? columns
                  : columns.map((col) => ({
                      ...col,
                      render: () => (
                        <Skeleton
                          variant=""
                          animation="wave"
                          sx={{ width: '100%', height: 25, borderRadius: 0.5 }}
                        />
                      ),
                    }))
              }
              dataSource={
                !loadingLoader
                  ? list
                  : [...Array(pageSize >= totalRecode ? totalRecode : pageSize)].map((_, i) => ({
                      key: i,
                    }))
              }
              scroll={{ x: 'max-content' }}
              pagination={false}
              rowKey="batch_id"
              onChange={(_, __, sorter) => {
                if (sorter?.field && sorter?.order) {
                  setField(sorter?.field);
                  setOrder(sorter?.order);
                } else {
                  setField(null);
                  setOrder(null);
                }
              }}
            />
          </Box>

          <CustomPagination
            current={page}
            pageSize={pageSize}
            total={totalRecode}
            onShowSizeChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
            onChange={(e) => setPage(e)}
          />
        </>
      ) : (
        <DataNotFound />
      )}
    </Stack>
  );
}

InventoryLogs.propTypes = {};
