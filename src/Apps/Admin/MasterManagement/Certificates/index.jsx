import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination, CustomSearchInput } from 'src/components/CustomComponents';

import { Table } from 'antd';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { fDateTime12hr } from 'src/utils/format-time';
import { fText } from 'src/utils/format-text';
import CertificatesModifyModal from './CertificatesModifyModal';
import { CertificateDeleteService, CertificatesListService } from 'src/Services/master.services';

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
  const [loadingLoader, setLoadingLoader] = useState(false);

  const [editObject, setEditObject] = useState({});
  const [modifyModel, setModifyModel] = useState(false);

  const showDisplayAction = () => {
    setModifyModel(false);
    setApiFlag(!apiFlag);
  };

  const DeleteActions = (id) => {
    sweetAlertQuestion(
      'This certificate will be permanently deleted. You won’t be able to recover it.',
      'Delete Certificate?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            CertificateDeleteService({ certificate_id: id }, (res) => {
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('Certificate deleted successfully').then(() => {});
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
      title: 'Certificate Name',
      dataIndex: 'certificate_name',
      key: 'certificate_name',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item, record) => (
        <Stack spacing={1} direction="row" alignItems="center">
          <Avatar
            sx={{ width: 30, height: 30, background: '#FFFF', color: record?.certificate_color }}
          >
            <i className={record?.certificate_icon} />
          </Avatar>
          <Typography fontWeight={700} variant="caption">
            {fText(item)}
          </Typography>
        </Stack>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fText(item),
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
              DeleteActions(item?.certificate_id);
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
    };
    setLoadingLoader(true);

    dispatch(
      CertificatesListService(payLoad, (res) => {
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

  return (
    <Card>
      <Stack spacing={1.5}>
        <Stack
          sx={{ px: 1.5, pt: 1.5 }}
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
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

        <CertificatesModifyModal
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
