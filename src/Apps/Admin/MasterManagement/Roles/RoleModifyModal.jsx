import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { ModalDialog } from 'src/components/model';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';
import { RoleModifyService } from 'src/Services/master.services';

export default function RoleModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.role_id) {
      values.role_id = editObject?.role_id;
    }
    dispatch(
      RoleModifyService(values, (res) => {
        console.log('values', res);
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          if (res?.status) {
            setModelOpenFlag(false);
            backAction();
            sweetAlertSuccess(
              editObject?.role_id ? 'Role updated successfully' : 'Role added successfully'
            );
          } else {
            setErrorMsg(res?.message);
          }
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
    setModelOpenFlag(open);
  }, [open]);

  return (
    <ModalDialog
      open={modelOpenFlag}
      handleClose={handleCloseAction}
      title={editObject?.role_id ? 'Edit Role' : 'Add Role'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            role_name: editObject?.role_name || '',
            description: editObject?.description || '',
          }}
          validationSchema={Yup.object().shape({
            role_name: Yup.string()
              .trim()
              .min(2, 'Role name must be at least 2 characters')
              .max(50, 'Role name must not exceed 50 characters')
              .required('Role Name is required.'),
            description: Yup.string().nullable(),
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

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Role Name"
                      field="role_name"
                      placeholder="Enter Role name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      required={false}
                      formik={props}
                      label="Description"
                      field="description"
                      placeholder=""
                      multiline
                      rows={3}
                      maxRows={3}
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
                          {editObject?.role_id ? 'Save Changes' : 'Add Role'}
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
