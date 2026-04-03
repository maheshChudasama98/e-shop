import { useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Avatar, Chip, Skeleton, Stack, Typography } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination, CustomSearchInput, CustomSelect } from 'src/components/CustomComponents';

import { Table } from 'antd';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { fDateTime12hr } from 'src/utils/format-time';
import { fText } from 'src/utils/format-text';
import CategoryModifyModal from './BrandModifyModal';
import {
  BrandDeleteService,
  BrandListService,
  SelectorsService,
} from 'src/Services/master.services';
import { getDisplayData } from 'src/utils/utils';

export default function Index() {
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);
  const [field, setField] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecode, setTotalRecode] = useState(0);

  const [list, setList] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [filerStatus, setFilerStatus] = useState(-1);
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
      'This brand will be permanently deleted. You won’t be able to recover it.',
      'Delete Brand?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            BrandDeleteService({ brand_id: id }, (res) => {
              // setApiFlag(!apiFlag);
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('Brand deleted successfully').then(() => {});
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
      title: 'Brand Name',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => (
        <Stack spacing={1} direction="row" alignItems="center">
          <Avatar sx={{ width: 34, height: 34 }} variant="rounded" />
          <Typography fontWeight={700} variant="caption">
            {fText(item)}
          </Typography>
        </Stack>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: true,
      render: (value) => {
        const roleData = getDisplayData({
          list: selectors?.brands_status || [],
          value,
        });
        return (
          <Chip
            sx={{
              color: roleData.textColor || '#1b925e',
              backgroundColor: roleData.bgColor || '#dbf6e5',
              fontWeight: 500,
            }}
            label={roleData.label}
          />
        );
      },
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
      align: 'right',
      width: 90,
      render: (_, item) => (
        <Stack spacing={1} direction="row" sx={{ justifyContent: 'right' }}>
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
              DeleteActions(item?.brand_id);
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
      status: filerStatus !== -1 ? filerStatus : null,
    };

    setLoadingLoader(true);

    dispatch(
      BrandListService(payLoad, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setList(res?.data?.list);
          setTotalRecode(res?.data?.totalRecords);
        }
      })
    );
  }, [apiFlag, search, filerStatus, page, pageSize]);

  useEffect(() => {
    setPage(1);
    setApiFlag(!apiFlag);
  }, [field, order]);

  useEffect(() => {
    dispatch(
      SelectorsService({ brands_status: true }, (res) => {
        if (res?.status) {
          setSelectors(res?.data);
        }
      })
    );
  }, []);

  return (
    <Card>
      <Stack spacing={1.5}>
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

            <CustomSelect
              label=" Status"
              menuList={[
                { id: -1, name: 'All' },
                ...(selectors?.brands_status?.map((item) => ({
                  id: item.value,
                  name: item.label,
                })) || []),
              ]}
              valueKey="id"
              labelKey="name"
              defaultValue={filerStatus}
              callBackAction={(e) => {
                setFilerStatus(e);
              }}
            />
            <Typography fontWeight={700} color="primary.main">
              Total: {totalRecode}
            </Typography>
          </Stack>

          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                setModifyModel(true);
                setEditObject({});
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
                rowKey="event_id"
                // onRow={(record) => ({
                //   onClick: () => {
                //     navigate(`/user/detail/${record?.event_id}`);
                //   },
                // })}
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

        <CategoryModifyModal
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
