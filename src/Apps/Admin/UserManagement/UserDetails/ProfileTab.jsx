import React, { useState } from 'react';
import { Alert, Box, Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { TextFieldForm, AutoCompleteSelectMenu } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { PHONE_NUMBER_REGEX } from 'src/constance';
import { UsersModifyService } from 'src/Services/user.services';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

export default function ProfileTab({ userData, selectors, backAction }) {
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState(null);
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (userData?.user_id) {
      values.user_id = userData?.user_id;
    }
    setErrorMsg(null);
    dispatch(
      UsersModifyService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          backAction();
          sweetAlertSuccess('User updated successfully');
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        role_id: userData?.role_id || '',
        status: userData?.status || '',
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string()
          .trim()
          .min(2, 'First name must be at least 2 characters')
          .max(50, 'First name must not exceed 50 characters')
          .required('First Name is required.'),
        last_name: Yup.string()
          .trim()
          .min(2, 'Last name must be at least 2 characters')
          .max(50, 'Last name must not exceed 50 characters')
          .required('Last Name is required.'),
        phone: Yup.string()
          .matches(PHONE_NUMBER_REGEX, 'Phone must be 10 digits (e.g. 9876543210)')
          .nullable(),
        email: Yup.string()
          .trim()
          .email('Please enter a valid email')
          .required('Email is required.'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').nullable(),
        role_id: Yup.number().typeError('Role is required').required('Role is required'),
        status: Yup.number().typeError('Status is required').required('Status is required'),
      })}
      onSubmit={ActionSubmit}
    >
      {(props) => (
        <Form>
          <Grid container spacing={1}>
            {errorMsg && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Alert severity="error">{errorMsg}</Alert>
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldForm
                formik={props}
                label="First Name"
                field="first_name"
                placeholder="Enter first name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldForm
                formik={props}
                label="Last Name"
                field="last_name"
                placeholder="Enter last name"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldForm
                formik={props}
                label="Email Address"
                field="email"
                placeholder="Enter email address (e.g. abc@example.com)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldForm
                formik={props}
                label="Phone Number"
                field="phone"
                required={false}
                type="number"
                InputProps={{
                  startAdornment: '+91',
                }}
                placeholder="Enter 10-digit phone number (e.g. +91 9999955555)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AutoCompleteSelectMenu
                formik={props}
                label="Role"
                field="role_id"
                valueKey="role_id"
                labelKey="role_name"
                menuList={selectors?.roles || []}
                placeholder="Select role"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AutoCompleteSelectMenu
                formik={props}
                label="Status"
                field="status"
                valueKey="value"
                labelKey="label"
                menuList={selectors?.user_status || []}
                placeholder="Status"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldForm
                required={false}
                formik={props}
                label="Password"
                field="password"
                placeholder="Enter password (min 8 characters)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {props?.dirty && (
                  <Button variant="outlined" onClick={props.resetForm}>
                    Cancel
                  </Button>
                )}
                {formSubmitLoader ? (
                  <ButtonLoader />
                ) : (
                  <Button variant="contained" type="submit" disabled={!props.dirty}>
                    Save Changes
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

ProfileTab.propTypes = {
  userData: PropTypes.object,
  selectors: PropTypes.object,
  backAction: PropTypes.func,
};
