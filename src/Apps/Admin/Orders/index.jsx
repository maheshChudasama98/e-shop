import { useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination, CustomSearchInput } from 'src/components/CustomComponents';

import { Table } from 'antd';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { fDateTime12hr } from 'src/utils/format-time';
import { fText } from 'src/utils/format-text';
import ProductAdd from './ProductAddModel';
import { SelectorsService } from 'src/Services/master.services';
import { getDisplayData } from 'src/utils/utils';
import { ProductDeleteService } from 'src/Services/product.services';
import { formatToINR } from 'src/utils/format-number';
import { useRouter } from 'src/routes/hooks';
import { OrdersListService } from 'src/Services/orders.services';
import { ADMIN_ROUTES } from 'src/routes/routes';

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);
  const [field, setField] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecode, setTotalRecode] = useState(0);

  const [list, setList] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [loadingLoader, setLoadingLoader] = useState(false);

  const [editObject, setEditObject] = useState({});
  const [modifyModel, setModifyModel] = useState(false);

  const [selectors, setSelectors] = useState({});

  const showDisplayAction = () => {
    setModifyModel(false);
    setApiFlag(!apiFlag);
  };

  const DeleteActions = (id) => {
    sweetAlertQuestion(
      'This Product will be permanently deleted. You won’t be able to recover it.',
      'Delete Product?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            ProductDeleteService({ product_id: id }, (res) => {
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('Product deleted successfully').then(() => {});
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: 'Order',
      dataIndex: 'order_number',
      key: 'order_number',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Payment',
      dataIndex: 'payment_status',
      key: 'payment_status',
      width: 150,
      ellipsis: true,
      sorter: true,
      render: (value) => {
        const data = getDisplayData({
          list: selectors?.payment_status || [],
          value,
        });
        return (
          <Chip
            sx={{
              color: data.textColor || '#1b925e',
              backgroundColor: data.bgColor || '#dbf6e5',
              fontWeight: 500,
            }}
            label={data.label}
          />
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      width: 150,
      ellipsis: true,
      sorter: true,
      render: (value) => {
        const data = getDisplayData({
          list: selectors?.order_status || [],
          value,
        });
        return (
          <Chip
            sx={{
              color: data.textColor || '#1b925e',
              backgroundColor: data.bgColor || '#dbf6e5',
              fontWeight: 500,
            }}
            label={data.label}
          />
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'final_amount',
      key: 'final_amount',
      width: 150,
      sorter: true,
      ellipsis: true,
      align: 'right',
      render: (item) => formatToINR(item),
    },
    {
      title: 'Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      width: 150,
      ellipsis: true,
      sorter: true,
      render: (value) => {
        const data = getDisplayData({
          list: selectors?.payment_method || [],
          value,
        });
        return (
          <Chip
            sx={{
              color: data.textColor || '#1b925e',
              backgroundColor: data.bgColor || '#dbf6e5',
              fontWeight: 500,
            }}
            label={data.label}
          />
        );
      },
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 150,
      ellipsis: true,
      sorter: true,
      render: (item) => fText(item),
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: 150,
      ellipsis: true,
      render: (_, item) => `${fText(item?.user?.first_name)}  ${fText(item?.user?.last_name)}`,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 150,
      ellipsis: true,
      align: 'right',
      render: (_, item) => item?.order_items?.length || 0,
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 90,
      render: (_, item) => (
        <Stack spacing={1} direction="row" sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            className="mui-action-button"
            onClick={(e) => {
              e.stopPropagation();
              setModifyModel(true);
              setEditObject(item);
            }}
          >
            <i className="fa-solid fa-file-pen" />
          </Button>

          <Button
            variant="outlined"
            color="error"
            className="mui-action-button"
            onClick={(e) => {
              e.stopPropagation();
              DeleteActions(item?.product_id);
            }}
          >
            <i className="fa-solid fa-trash" />
          </Button>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const payLoad = {
      page,
      page_size: pageSize,
      order,
      field,
      search,
      // role_id: filerRole !== -1 ? filerRole : null,
      // status: filerStatus !== -1 ? filerStatus : null,
    };

    setLoadingLoader(true);

    dispatch(
      OrdersListService(payLoad, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setList(res?.data?.list);
          setTotalRecode(res?.data?.totalRecords);
        }
      })
    );
  }, [apiFlag, search, page, pageSize]);

  useEffect(() => {
    setPage(1);
    setApiFlag(!apiFlag);
  }, [field, order]);

  useEffect(() => {
    dispatch(
      SelectorsService(
        { order_status: true, payment_status: true, payment_method: true },
        (res) => {
          if (res?.status) {
            setSelectors(res?.data);
          }
        }
      )
    );
  }, []);

  return (
    <Card>
      <Stack spacing={2}>
        <Stack
          sx={{ px: 1.5, pt: 1.5 }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'space-between' }}
        >
          <Stack
            spacing={1}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <CustomSearchInput
                loading={loadingLoader}
                searchValue={search}
                callBack={setSearch}
              />
            </Box>

            <Typography fontWeight={700} color="primary.main">
              Total: {totalRecode}
            </Typography>
          </Stack>

          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                setModifyModel(true);
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>

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
                rowKey="product_id"
                onRow={(record) => ({
                  onClick: () => {
                    router.push(ADMIN_ROUTES.ORDER_DETAILS.replace(':id', record.order_id));
                  },
                  style: { cursor: 'pointer' },
                })}
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

        <ProductAdd
          open={modifyModel}
          handleClose={() => {
            setModifyModel(false);
            setEditObject(null);
          }}
          editObject={editObject}
          backAction={showDisplayAction}
        />
      </Stack>
    </Card>
  );
}

Index.propTypes = {};
