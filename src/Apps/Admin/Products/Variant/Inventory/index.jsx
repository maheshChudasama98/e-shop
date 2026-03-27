import { useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Skeleton, Stack, Typography } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination, CustomSearchInput } from 'src/components/CustomComponents';

import { Table } from 'antd';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { fDateTime12hr } from 'src/utils/format-time';
import VariantPurchaseModel from './VariantPurchaseModel';
import {
  DeleteInventoryPurchaseService,
  GetInventoryPurchaseListService,
} from 'src/Services/product.services';
import { formatToINR } from 'src/utils/format-number';

export default function Index({ variantDetails, ApiFlagAction }) {
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

  const showDisplayAction = () => {
    setModifyModel(false);
    setApiFlag(!apiFlag);
    ApiFlagAction();
  };

  const DeleteActions = (id) => {
    sweetAlertQuestion(
      'This Purchase will be permanently deleted. You won’t be able to recover it.',
      'Delete Purchase?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            DeleteInventoryPurchaseService({ batch_id: id }, (res) => {
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('Purchase deleted successfully').then(() => {});
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
      title: 'Purchase Qty',
      dataIndex: 'purchase_qty',
      key: 'purchase_qty',
      align: 'right',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Remaining Qty',
      dataIndex: 'remaining_qty',
      key: 'remaining_qty',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      width: 150,
      sorter: true,
      ellipsis: true,
      align: 'right',
      render: (item) => formatToINR(item),
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      key: 'batch_number',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => (item ? fDateTime12hr(item) : ""),
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
              DeleteActions(item?.batch_id);
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
      product_id: variantDetails?.product_id,
      variant_id: variantDetails?.variant_id,
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
      GetInventoryPurchaseListService(payLoad, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setList(res?.data?.list);
          setTotalRecode(res?.data?.totalRecords);
        }
      })
    );
  }, [apiFlag, search, page, pageSize, variantDetails?.product_id]);

  useEffect(() => {
    setPage(1);
    setApiFlag(!apiFlag);
  }, [field, order]);

  return (
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
            <CustomSearchInput loading={loadingLoader} searchValue={search} callBack={setSearch} />
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

      <VariantPurchaseModel
        open={modifyModel}
        handleClose={() => {
          setModifyModel(false);
          setEditObject(null);
        }}
        editObject={{ ...variantDetails, ...editObject }}
        backAction={showDisplayAction}
      />
    </Stack>
  );
}

Index.propTypes = {};
