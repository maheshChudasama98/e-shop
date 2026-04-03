import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Table } from 'antd'; // Using antd Table

import { Box, Button, Grid, IconButton, Typography, Alert, Divider } from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { AutoCompleteSelectMenu, TextFieldForm } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { ModalDialog } from 'src/components/model';
import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

import { SelectorsService } from 'src/Services/master.services';
import { UsersListService, AdminUserDetailsService } from 'src/Services/user.services';
import { ProductsListService, ProductSelectedService } from 'src/Services/product.services';
import { AdminAddOrUpdateOrderService } from 'src/Services/orders.services';

import UserModifyModal from 'src/Apps/Admin/UserManagement/UserModifyModal';
import AddressModal from 'src/Apps/Admin/UserManagement/UserDetails/AddressModal';

export default function ProductAddModel({ open, handleClose, editObject }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [selectors, setSelectors] = useState({});
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]);
  const [variantsMap, setVariantsMap] = useState({}); // { productId: [variants] }

  // Modals for adding user/address on the fly
  const [openUserModal, setOpenUserModal] = useState(false);
  const [addressModalState, setAddressModalState] = useState({ open: false, data: null });

  const fetchUsers = useCallback(() => {
    dispatch(
      UsersListService({ page_size: 1000 }, (res) => {
        if (res?.status) setUsers(res?.data?.list || []);
      })
    );
  }, [dispatch]);

  const fetchAddresses = useCallback(
    (userId) => {
      if (!userId) {
        setAddresses([]);
        return;
      }
      dispatch(
        AdminUserDetailsService({ user_id: userId }, (res) => {
          if (res?.status) {
            setAddresses(res?.data?.addresses || []);
          }
        })
      );
    },
    [dispatch]
  );

  const fetchProducts = useCallback(() => {
    dispatch(
      ProductsListService({ page_size: 1000 }, (res) => {
        if (res?.status) setProducts(res?.data?.list || []);
      })
    );
  }, [dispatch]);

  const fetchVariants = useCallback(
    (productId) => {
      if (!productId || variantsMap[productId]) return;
      dispatch(
        ProductSelectedService({ product_id: productId }, (res) => {
          if (res?.status) {
            setVariantsMap((prev) => ({ ...prev, [productId]: res?.data?.product_variants || [] }));
          }
        })
      );
    },
    [dispatch, variantsMap]
  );

  useEffect(() => {
    if (!open) return;
    dispatch(
      SelectorsService({ payment_method: true }, (res) => {
        if (res?.status) setSelectors(res?.data);
      })
    );
    fetchUsers();
    fetchProducts();
  }, [open, fetchUsers, fetchProducts, dispatch]);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    setErrorMsg(null);

    const payload = {
      ...values,
      order_id: editObject?.order_id || undefined,
    };

    dispatch(
      AdminAddOrUpdateOrderService(payload, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          sweetAlertSuccess(
            editObject?.order_id ? 'Order updated successfully' : 'Order created successfully'
          );
          handleClose();
          router.push(`${ADMIN_ROUTES.ORDER_DETAILS}?id=${res?.data?.order_id}`);
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  return (
    <>
      <ModalDialog
        open={open}
        handleClose={handleClose}
        title={editObject?.order_id ? 'Update Order' : 'Create New Order'}
        PaperProps={{ sx: { width: '1100px', maxWidth: 'none' } }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            user_id: editObject?.user_id || '',
            address_id: editObject?.address_id || '',
            payment_method: editObject?.payment_method || 'cod',
            items: editObject?.order_items?.map((item) => ({
              product_id: item.product_id,
              variant_id: item.variant_id,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount || 0,
            })) || [{ product_id: '', variant_id: '', quantity: 1, price: 0, discount: 0 }],
            delivery_charge: 0,
            gst_tax: 0,
          }}
          validationSchema={Yup.object().shape({
            user_id: Yup.string().required('User is required'),
            address_id: Yup.string().required('Address is required'),
            items: Yup.array()
              .of(
                Yup.object().shape({
                  product_id: Yup.string().required('Required'),
                  variant_id: Yup.string().required('Required'),
                  quantity: Yup.number().min(1, 'Min 1').required('Required'),
                })
              )
              .min(1, 'At least one item is required'),
          })}
          onSubmit={ActionSubmit}
        >
          {(props) => {
            const { values, setFieldValue, handleSubmit, dirty } = props;

            // Recalculate Subtotal
            const subtotal = values.items.reduce(
              (acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity,
              0
            );
            const gstCalculated = subtotal * 0.18;
            const grandTotal =
              subtotal + (values.gst_tax || gstCalculated) + (values.delivery_charge || 0);

            // Ant Design Table Columns
            const getColumns = (remove) => [
              {
                title: 'Product',
                dataIndex: 'product_id',
                key: 'product_id',
                render: (_, record, index) => (
                  <AutoCompleteSelectMenu
                    formik={props}
                    field={`items.${index}.product_id`}
                    valueKey="product_id"
                    labelKey="product_name"
                    menuList={products}
                    required={false}
                    placeholder="Select Product"
                    callBackAction={(val) => {
                      // Using callBackAction instead of onChange for better selection display
                      setFieldValue(`items.${index}.product_id`, val?.product_id || '');
                      setFieldValue(`items.${index}.variant_id`, '');
                      setFieldValue(`items.${index}.price`, 0);
                      if (val?.product_id) fetchVariants(val.product_id);
                    }}
                  />
                ),
              },
              {
                title: 'Variant',
                dataIndex: 'variant_id',
                key: 'variant_id',
                render: (_, record, index) => (
                  <AutoCompleteSelectMenu
                    formik={props}
                    required={false}
                    field={`items.${index}.variant_id`}
                    valueKey="variant_id"
                    labelKey="variant_name"
                    disabled={!values.items[index]?.product_id}
                    menuList={variantsMap[values.items[index]?.product_id] || []}
                    placeholder="Select Variant"
                    callBackAction={(val) => {
                      setFieldValue(`items.${index}.variant_id`, val?.variant_id || '');
                      setFieldValue(`items.${index}.price`, val?.price || 0);
                    }}
                  />
                ),
              },
              {
                title: 'Qty',
                dataIndex: 'quantity',
                key: 'quantity',
                width: 90,
                render: (_, record, index) => (
                  <TextFieldForm formik={props} field={`items.${index}.quantity`} type="number" />
                ),
              },
              {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: 100,
                render: (val) => `₹${val || 0}`,
              },
              {
                title: 'Discount',
                dataIndex: 'discount',
                key: 'discount',
                width: 100,
                render: (_, record, index) => (
                  <TextFieldForm
                    formik={props}
                    field={`items.${index}.discount`}
                    type="number"
                    placeholder="0"
                  />
                ),
              },
              {
                title: 'Total',
                width: 110,
                render: (_, record) =>
                  `₹${((record.price - (record.discount || 0)) * (record.quantity || 0)).toFixed(2)}`,
              },
              {
                title: 'Action',
                width: 50,
                render: (_, record, index) => (
                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                    disabled={values.items.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                ),
              },
            ];

            return (
              <Form>
                <Box sx={{ maxHeight: '70vh', overflowY: 'auto', p: 1 }}>
                  <Grid container spacing={3}>
                    {errorMsg && (
                      <Grid size={{ xs: 12 }}>
                        <Alert severity="error">{errorMsg}</Alert>
                      </Grid>
                    )}

                    {/* Step 1: User & Address */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <Box sx={{ flex: 1 }}>
                          <AutoCompleteSelectMenu
                            formik={props}
                            label="Select User"
                            field="user_id"
                            valueKey="user_id"
                            labelKey="email"
                            menuList={users}
                            placeholder="Search user by email"
                            callBackAction={(val) => {
                              setFieldValue('user_id', val?.user_id || '');
                              setFieldValue('address_id', '');
                              fetchAddresses(val?.user_id);
                            }}
                          />
                        </Box>
                        <IconButton
                          color="primary"
                          onClick={() => setOpenUserModal(true)}
                          sx={{ mt: 2 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.1em"
                            height="1.1em"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                              <path
                                fill="#3AD29F"
                                d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
                              />
                            </g>
                          </svg>
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                          <AutoCompleteSelectMenu
                            formik={props}
                            label="Select Delivery Address"
                            field="address_id"
                            valueKey="address_id"
                            labelKey="address_line1"
                            fullWidth
                            disabled={!values.user_id}
                            menuList={addresses}
                            placeholder={values.user_id ? 'Select address' : 'Select user first'}
                          />
                        </Box>

                        <IconButton
                          color="primary"
                          disabled={!values.user_id}
                          onClick={() => setAddressModalState({ open: true, data: null })}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.1em"
                            height="1.1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#3AD29F"
                              d="M13.413 11.413Q14 10.825 14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12t1.413-.587M11.3 21.2q-.35-.125-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q1 0 1.5.538t.5 1.337V4q0 .825.588 1.413T16 6h1v1q0 .425.15.788t.425.637q.225.225.5.362t.575.188q.75.125 1.05.563t.3 1.087q0 .725-.312 1.613t-.738 1.737t-.85 1.538t-.675 1.012q-1.075 1.425-2.213 2.538t-1.887 1.762q-.275.25-.625.375t-.7.125t-.7-.125M18 5h-2q-.425 0-.712-.287T15 4t.288-.712T16 3h2V1q0-.425.288-.712T19 0t.713.288T20 1v2h2q.425 0 .713.288T23 4t-.288.713T22 5h-2v2q0 .425-.288.713T19 8t-.712-.288T18 7z"
                            />
                          </svg>
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <AutoCompleteSelectMenu
                        formik={props}
                        label="Payment Method"
                        field="payment_method"
                        valueKey="value"
                        labelKey="label"
                        menuList={selectors?.payment_method || []}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Divider sx={{ my: 1 }} />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6">Order Items</Typography>
                        <Button
                          startIcon={<AddIcon />}
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setFieldValue('items', [
                              ...values.items,
                              {
                                product_id: '',
                                variant_id: '',
                                quantity: 1,
                                price: 0,
                                discount: 0,
                              },
                            ])
                          }
                        >
                          Add Row
                        </Button>
                      </Box>

                      <FieldArray name="items">
                        {({ remove }) => (
                          <Table
                            className="custom-ant-table"
                            dataSource={values.items}
                            columns={getColumns(remove)}
                            pagination={false}
                            rowKey={(record, index) => index}
                            bordered
                            size="small"
                          />
                        )}
                      </FieldArray>
                    </Grid>

                    {/* Summary Section */}
                    <Grid size={{ xs: 12, md: 7 }} />

                    <Grid size={{ xs: 12, md: 5 }}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography color="text.secondary">Subtotal:</Typography>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            ₹{subtotal.toFixed(2)}
                          </Typography>
                        </Box>

                        <Grid container spacing={1} sx={{ mb: 1 }}>
                          <Grid size={{ xs: 6 }}>
                            <TextFieldForm
                              formik={props}
                              label="GST (18%)"
                              field="gst_tax"
                              type="number"
                              placeholder={gstCalculated.toFixed(2)}
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextFieldForm
                              formik={props}
                              label="Delivery Charge"
                              field="delivery_charge"
                              type="number"
                            />
                          </Grid>
                        </Grid>

                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h6">Grand Total:</Typography>
                          <Typography variant="h6" color="primary">
                            ₹{grandTotal.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 3, mb: 1 }}>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    {!formSubmitLoader ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!dirty}
                      >
                        {editObject?.order_id ? 'Update Order' : 'Create Order'}
                      </Button>
                    ) : (
                      <ButtonLoader />
                    )}
                  </Box>
                </Box>

                {/* Nested Modals requiring formik context */}
                <AddressModal
                  open={addressModalState.open}
                  handleClose={() => setAddressModalState({ open: false, data: null })}
                  userId={values?.user_id}
                  addressModal={addressModalState}
                  backAction={() => {
                    fetchAddresses(values?.user_id);
                    setAddressModalState({ open: false, data: null });
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      </ModalDialog>

      {/* Mini Modals for Quick Add */}
      <UserModifyModal
        open={openUserModal}
        handleClose={() => setOpenUserModal(false)}
        backAction={() => {
          fetchUsers();
          setOpenUserModal(false);
        }}
      />
    </>
  );
}
