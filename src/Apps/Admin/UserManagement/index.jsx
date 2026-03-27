import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';

import { DataNotFound } from 'src/components/DataNotFound';
import { CustomPagination, CustomSearchInput, CustomSelect } from 'src/components/CustomComponents';

import { Table } from 'antd';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { fDateTime12hr } from 'src/utils/format-time';
import { fMobileNumber, fText } from 'src/utils/format-text';
import { UsersDeleteService, UsersListService } from 'src/Services/user.services';
import UserModifyModal from './UserModifyModal';
import { SelectorsService } from 'src/Services/master.services';
import { getDisplayData } from 'src/utils/utils';

export default function Index() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [field, setField] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecode, setTotalRecode] = useState(0);

  const [list, setList] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [filerRole, setFilerRole] = useState(-1);
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
      'This user will be permanently deleted. You won’t be able to recover it.',
      'Delete User?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            UsersDeleteService({ user_id: id }, (res) => {
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('User deleted successfully').then(() => {});
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
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fText(item),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fText(item),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (item) => fMobileNumber(item),
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'role_id',
      width: 150,
      sorter: true,
      render: (value) => {
        const roleData = getDisplayData({
          list: selectors?.roles || [],
          value,
          valueKey: 'role_id',
          labelKey: 'role_name',
        });
        return roleData.label;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: true,
      render: (value) => {
        const roleData = getDisplayData({
          list: selectors?.user_status || [],
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
      align: 'center',
      width: 10,
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
            <i className="fa-solid fa-pen-to-square" />
          </Button>
          <Button
            variant="outlined"
            color="error"
            className="mui-action-button"
            onClick={(e) => {
              e.stopPropagation();
              DeleteActions(item?.user_id);
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
      role_id: filerRole !== -1 ? filerRole : null,
      status: filerStatus !== -1 ? filerStatus : null,
    };

    setLoadingLoader(true);

    dispatch(
      UsersListService(payLoad, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setList(res?.data?.list);
          setTotalRecode(res?.data?.totalRecords);
        }
      })
    );
  }, [apiFlag, search, filerRole, filerStatus, page, pageSize]);

  useEffect(() => {
    setPage(1);
    setApiFlag(!apiFlag);
  }, [field, order]);

  useEffect(() => {
    dispatch(
      SelectorsService({ roles: true, user_status: true }, (res) => {
        if (res?.status) {
          setSelectors(res?.data);
        }
      })
    );
  }, []);

  return (
    <Card>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          sx={{ px: 1.5, pt: 1.5 }}
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
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              bgcolor="#F7F8FA"
              height="40px"
              px="10px"
              borderRadius="5px"
            >
              <Typography fontSize={14} color="text.dark" fontWeight={400}>
                Role:
              </Typography>
              <CustomSelect
                menuList={[
                  { id: -1, name: 'All' },
                  ...(selectors?.roles?.map((item) => ({
                    id: item.role_id,
                    name: item.role_name,
                  })) || []),
                ]}
                valueKey="id"
                labelKey="name"
                defaultValue={filerRole}
                callBackAction={(e) => {
                  setFilerRole(e);
                }}
                sx={{
                  height: '40px',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSelect-select': {
                    padding: '0px 15px 0 0px',
                    fontSize: '14px',
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              bgcolor="#F7F8FA"
              height="40px"
              px="10px"
              borderRadius="5px"
            >
              <Typography fontSize={14} color="text.dark" fontWeight={400}>
                Status:
              </Typography>
              <CustomSelect
                menuList={[
                  { id: -1, name: 'All' },
                  ...(selectors?.user_status?.map((item) => ({
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
                sx={{
                  height: '40px',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSelect-select': {
                    padding: '0px 15px 0 0px',
                    fontSize: '14px',
                    fontWeight: 600,
                  },
                }}
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

        <UserModifyModal
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
