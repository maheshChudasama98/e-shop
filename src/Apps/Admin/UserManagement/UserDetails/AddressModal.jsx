import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { TextFieldForm } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { ModalDialog } from 'src/components/model';
import { PHONE_NUMBER_REGEX } from 'src/constance';
import { GoogleAddress } from 'src/components/CustomComponents/GoogleAddress';
import { useDispatch } from 'react-redux';
import { AdminUserModifyAddressService } from 'src/Services/user.services';
import { useParams } from 'react-router-dom';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

export default function AddressModal({ open, handleClose, backAction, addressModal, userId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
 
  const currentUserId = userId || id;
 
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);
 
  const handleAddressSubmit = (values) => {
    setFormSubmitLoader(true);
    if (addressModal.data?.address_id) values.address_id = addressModal.data?.address_id;
    dispatch(
      AdminUserModifyAddressService({ ...values, user_id: currentUserId }, (res) => {

        setFormSubmitLoader(false);
        if (res?.status) {
          backAction();
          setModelOpenFlag(false);
          sweetAlertSuccess(
            values.address_id ? 'Address updated successfully' : 'Address added successfully'
          );
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  const handleCloseAction = () => {
    setModelOpenFlag(false);
    handleClose();
  };

  useEffect(() => {
    setErrorMsg(null);
    setModelOpenFlag(open);
  }, [open]);
  return (
    <ModalDialog
      open={modelOpenFlag}
      handleClose={handleCloseAction}
      title={addressModal.data ? 'Edit Address' : 'Add Address'}
      PaperProps={{
        sx: {
          width: '500px',
          maxWidth: 'none',
        },
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          full_name: addressModal.data?.full_name || '',
          phone: addressModal.data?.phone || '',
          address_line1: addressModal.data?.address_line1 || '',
          address_line2: addressModal.data?.address_line2 || '',
          city: addressModal.data?.city || '',
          state: addressModal.data?.state || '',
          pincode: addressModal.data?.pincode || '',
          country: 'India',
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().trim().required('Full Name is required.'),
          phone: Yup.string()
            .matches(PHONE_NUMBER_REGEX, 'Phone must be 10 digits (e.g. 9876543210)')
            .required('Phone number is Required'),
          address_line1: Yup.string().required('Address line is Required'),
          address_line2: Yup.string().nullable(''),
          city: Yup.string().required('City is Required'),
          state: Yup.string().required('State is Required'),
          pincode: Yup.string().required('Pincode is Required'),
        })}
        onSubmit={handleAddressSubmit}
      >
        {(props) => (
          <Form>
            <Grid container spacing={2}>
              {errorMsg && (
                <Grid size={{ xs: 12, md: 12 }}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Grid>
              )}
              <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldForm
                  formik={props}
                  label="Full Name"
                  field="full_name"
                  placeholder="Enter Full name"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldForm
                  formik={props}
                  label="Phone"
                  field="phone"
                  InputProps={{
                    startAdornment: '+91',
                  }}
                  placeholder="Enter 10-digit phone number (e.g. +91 9999955555)"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <GoogleAddress
                  callBackAction={(e) => {
                    props.setFieldValue('address_line1', e.address);
                    props.setFieldValue('address_line2', e.route);
                    props.setFieldValue('city', e.city);
                    props.setFieldValue('state', e.state);
                    props.setFieldValue('pincode', e.pinCode);
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldForm
                  formik={props}
                  label="Address (Line 1)"
                  field="address_line1"
                  placeholder="Enter Address"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldForm
                  formik={props}
                  required={false}
                  label="Address (Line 2)"
                  field="address_line2"
                  placeholder="Enter Address"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldForm formik={props} label="City" field="city" placeholder="Enter city" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextFieldForm
                  formik={props}
                  label="State"
                  field="state"
                  placeholder="Enter state"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextFieldForm
                  formik={props}
                  label="Pincode"
                  field="pincode"
                  placeholder="Enter pincode"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                  {props?.dirty && (
                    <Button variant="outlined" onClick={props?.resetForm}>
                      Cancel
                    </Button>
                  )}

                  {!formSubmitLoader ? (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!props?.dirty}
                      onClick={props?.handleSubmit}
                    >
                      {addressModal.data ? 'Save Changes' : 'Add Address'}
                    </Button>
                  ) : (
                    <ButtonLoader />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </ModalDialog>
  );
}

AddressModal.propTypes = {
  addressModal: PropTypes.object,
  handleClose: PropTypes.func,
  backAction: PropTypes.func,
  open: PropTypes.bool,
};
