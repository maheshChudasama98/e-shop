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
import { TabModifyService } from 'src/Services/master.services';

export default function TabModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.tab_id) {
      values.tab_id = editObject?.tab_id;
    }
    dispatch(
      TabModifyService(values, (res) => {
        console.log('values', res);
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          if (res?.status) {
            setModelOpenFlag(false);
            backAction();
            sweetAlertSuccess(
              editObject?.tab_id
                ? 'Tab updated successfully'
                : 'Tab added successfully'
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
      title={editObject?.tab_id ? 'Edit Tab' : 'Add Tab'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            tab_name: editObject?.tab_name || '',
            tab_description: editObject?.tab_description || '',
          }}
          validationSchema={Yup.object().shape({
            tab_name: Yup.string().trim().required('Tab Name is required.'),
            tab_description: Yup.string().trim().optional(''),
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
                      label="Tab Name"
                      field="tab_name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Tab Description"
                      field="tab_description"
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
                          {editObject?.tab_id ? 'Save Changes' : 'Add Tab'}
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
