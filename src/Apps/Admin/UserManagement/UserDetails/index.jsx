import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Card, Tabs, Tab, Grid, Typography, Stack, Button, Chip } from '@mui/material';

import {
  AdminUserDetailsService,
  AdminUserDeleteAddressService,
  AdminUserDefaultAddressService,
  UsersDeleteService,
} from 'src/Services/user.services';
import { SelectorsService } from 'src/Services/master.services';
import { sweetAlertQuestion, sweetAlertSuccess, sweetAlerts } from 'src/utils/sweet-alerts';
import { fDateTime12hr } from 'src/utils/format-time';
import { fText, fMobileNumber } from 'src/utils/format-text';
import { getDisplayData } from 'src/utils/utils';
import { ADMIN_ROUTES } from 'src/routes/routes';
import { CustomBackButton } from 'src/components/CustomComponents';

import ProfileTab from './ProfileTab';
import AddressTab from './AddressTab';
import OrdersTab from './OrdersTab';
import CartTab from './CartTab';
import AddressModal from './AddressModal';
import Loader from 'src/components/Loaders/Loader';

// ----------------------------------------------------------------------

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectors, setSelectors] = useState({});

  const [addressModal, setAddressModal] = useState({ open: false, data: null });

  const fetchData = () => {
    setLoading(true);
    dispatch(
      AdminUserDetailsService({ user_id: id }, (res) => {
        setLoading(false);
        if (res?.status) {
          setUserData(res.data.user);
          setAddresses(res.data.addresses);
          setOrders(res.data.orders);
          const cartData = res.data.cart || res.data.user_cart || res.data.user?.cart;
          setCartItems(cartData[0]?.cart_items || []);
        }
      })
    );
  };

  useEffect(() => {
    fetchData();
    dispatch(
      SelectorsService(
        {
          roles: true,
          user_status: true,
          order_status: true,
          payment_status: true,
          payment_method: true,
        },
        (res) => {
          if (res?.status) {
            setSelectors(res.data);
          }
        }
      )
    );
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteAddress = (addressId) => {
    sweetAlertQuestion('Are you sure you want to delete this address?', 'Delete Address')
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            AdminUserDeleteAddressService({ address_id: addressId, user_id: id }, (res) => {
              if (res?.status) {
                sweetAlertSuccess('Address deleted');
                fetchData();
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch(console.error);
  };

  const handleSetDefaultAddress = (addressId) => {
    dispatch(
      AdminUserDefaultAddressService({ address_id: addressId, user_id: id }, (res) => {
        if (res?.status) {
          sweetAlertSuccess('Default address updated');
          fetchData();
        } else {
          sweetAlerts('error', res?.message);
        }
      })
    );
  };

  const handleDeleteUser = () => {
    sweetAlertQuestion(
      'This User will be permanently deleted. You won’t be able to recover it.',
      'Delete User?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            UsersDeleteService({ user_id: id }, (res) => {
              if (res?.status) {
                sweetAlertSuccess('User deleted successfully');
                navigate(ADMIN_ROUTES.USER_MANAGEMENT_LIST);
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch(console.error);
  };

  if (loading && !userData) {
    return (
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Loader />
      </Card>
    );
  }

  const statusResult = getDisplayData({
    list: selectors?.user_status || [],
    value: userData?.status,
  });

  const roleResult = getDisplayData({
    list: selectors?.roles || [],
    value: userData?.role_id,
    labelKey: 'role_name',
    valueKey: 'role_id',
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <CustomBackButton />
                <Typography variant="h6" fontWeight="bold">
                  {fText(userData?.first_name)} {fText(userData?.last_name)}
                </Typography>
                <Chip
                  label={statusResult?.label || 'Unknown'}
                  size="small"
                  sx={{
                    color: statusResult?.textColor || 'inherit',
                    backgroundColor: statusResult?.bgColor || 'action.hover',
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="error" onClick={handleDeleteUser}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* Left Sidebar - Info Card */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 1.5 }}>
            <Stack spacing={1.5}>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Email
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {userData?.email || '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Phone
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {fMobileNumber(userData?.phone) || '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Role
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {roleResult?.label || '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Joined At
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {fDateTime12hr(userData?.createdAt) || '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Account Status
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: statusResult?.textColor }}
                >
                  {statusResult?.label || '-'}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Right Main - Tabbed Interface */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Edit Profile" />
                <Tab label="Addresses" />
                <Tab label="Order History" />
                <Tab label="Cart Items" />
              </Tabs>
            </Box>

            <CustomTabPanel value={tabValue} index={0}>
              <ProfileTab
                userData={userData}
                selectors={selectors}
                backAction={() => {
                  fetchData();
                }}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
              <AddressTab
                addresses={addresses}
                setAddressModal={setAddressModal}
                handleSetDefaultAddress={handleSetDefaultAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
              <OrdersTab orders={orders} selectors={selectors} />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={3}>
              <CartTab cartItems={cartItems} />
            </CustomTabPanel>
          </Card>
        </Grid>
      </Grid>

      {console.log('addressModal', addressModal)}

      <AddressModal
        addressModal={addressModal}
        open={addressModal.open}
        handleClose={() => {
          setAddressModal({ open: false, data: null });
        }}
        backAction={() => {
          setAddressModal({ open: false, data: null });
          fetchData();
        }}
      />
    </Box>
  );
}
