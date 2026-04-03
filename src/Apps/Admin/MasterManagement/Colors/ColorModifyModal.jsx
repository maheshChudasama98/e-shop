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
import { ColorModifyService } from 'src/Services/master.services';

export default function ColorModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.color_id) {
      values.color_id = editObject?.color_id;
    }
    dispatch(
      ColorModifyService(values, (res) => {
        console.log('values', res);
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          if (res?.status) {
            setModelOpenFlag(false);
            backAction();
            sweetAlertSuccess(
              editObject?.color_id
                ? 'Color updated successfully'
                : 'Color added successfully'
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
      title={editObject?.color_id ? 'Edit Color' : 'Add Color'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            color_name: editObject?.color_name || '',
            color_code: editObject?.color_code || '',
          }}
          validationSchema={Yup.object().shape({
            color_name: Yup.string().trim().required('Color Name is required.'),
            color_code: Yup.string().trim().required('Color Code is required.'),
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
                      label="Color Name"
                      field="color_name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Color Code"
                      field="color_code"
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
                          {editObject?.color_id ? 'Save Changes' : 'Add Color'}
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
