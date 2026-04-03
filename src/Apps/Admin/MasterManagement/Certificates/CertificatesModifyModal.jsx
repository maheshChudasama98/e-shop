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
import { CertificateModifyService } from 'src/Services/master.services';

export default function CertificatesModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.certificate_id) {
      values.certificate_id = editObject?.certificate_id;
    }
    dispatch(
      CertificateModifyService(values, (res) => {
        console.log('values', res);
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          if (res?.status) {
            setModelOpenFlag(false);
            backAction();
            sweetAlertSuccess(
              editObject?.certificate_id
                ? 'Certificate updated successfully'
                : 'Certificate added successfully'
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
      title={editObject?.certificate_id ? 'Edit Certificate' : 'Add Certificate'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            certificate_name: editObject?.certificate_name || '',
            certificate_icon: editObject?.certificate_icon || '',
            certificate_color: editObject?.certificate_color || '',
            description: editObject?.description || '',
          }}
          validationSchema={Yup.object().shape({
            certificate_name: Yup.string().trim().required('Certificate Name is required.'),
            certificate_icon: Yup.string().trim().required('Certificate Icon is required.'),
            certificate_color: Yup.string().trim().required('Certificate Color is required.'),
            description: Yup.string().trim().required('Description is required.'),
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
                      label="Certificate Name"
                      field="certificate_name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Certificate Icon"
                      field="certificate_icon"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Certificate Color"
                      field="certificate_color"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Description"
                      field="description"
                      multiline
                      rows={4}
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
                          {editObject?.certificate_id ? 'Save Changes' : 'Add Certificate'}
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
