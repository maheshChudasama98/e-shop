import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { AutoCompleteSelectMenu, TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { ModalDialog } from 'src/components/model';
import { PHONE_NUMBER_REGEX } from 'src/constance';
import { SelectorsService } from 'src/Services/master.services';
import { UsersModifyService } from 'src/Services/user.services';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

export default function UserModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [selectors, setSelectors] = useState({});

  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.user_id) {
      values.user_id = editObject?.user_id;
    }
    setErrorMsg(null);
    dispatch(
      UsersModifyService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          backAction();
          sweetAlertSuccess(
            editObject?.user_id
              ? 'User updated successfully'
              : 'User added successfully'
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
    if (!open) return;
    dispatch(
      SelectorsService({ roles: true, user_status: true }, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          setSelectors(res?.data);
        } else {
          setFormSubmitLoader(false);
        }
      })
    );
  }, [open]);

  return (
    <ModalDialog
      open={modelOpenFlag}
      handleClose={handleCloseAction}
      title={editObject?.user_id ? 'Edit User' : 'Add User'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            first_name: editObject?.first_name || '',
            last_name: editObject?.last_name || '',
            email: editObject?.email || '',
            phone: editObject?.phone || '',
            role_id: editObject?.role_id || '',
            status: editObject?.status || '',
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
          {(props) => {
            const { handleSubmit, dirty, resetForm } = props;
            return (
              <Form>
                <Grid container spacing={2}>
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

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Email Address"
                      field="email"
                      placeholder="Enter email address (e.g. abc@example.com)"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
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

                  <Grid size={{ xs: 12, md: 12 }}>
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

                  <Grid size={{ xs: 12, md: 12 }}>
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

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      required={false}
                      formik={props}
                      label="Password"
                      field="password"
                      placeholder="Enter password (min 8 characters)"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                      {dirty && (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            resetForm();
                          }}
                          color="darker"
                        >
                          Cancel{' '}
                        </Button>
                      )}

                      {!formSubmitLoader ? (
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!dirty}
                          onClick={handleSubmit}
                          color="primary"
                        >
                          {editObject?.user_id ? 'Save Changes' : 'Add User'}
                        </Button>
                      ) : (
                        <ButtonLoader />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      }
      PaperProps={{
        sx: {
          width: '500px',
          maxWidth: 'none',
        },
      }}
    />
  );
}
