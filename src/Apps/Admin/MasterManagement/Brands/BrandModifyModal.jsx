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
import { BrandModifyService, SelectorsService } from 'src/Services/master.services';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

export default function BrandModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [selectors, setSelectors] = useState({});
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);

    if (editObject?.brand_id) {
      values.brand_id = editObject.brand_id;
    }

    setErrorMsg(null);

    dispatch(
      BrandModifyService(values, (res) => {
        setFormSubmitLoader(false);

        if (res?.status) {
          setModelOpenFlag(false);

          sweetAlertSuccess(
            editObject?.brand_id ? 'Brand updated successfully' : 'Brand added successfully'
          );

          backAction();
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
    setErrorMsg(null);

    if (!open) return;

    dispatch(
      SelectorsService({ brands_status: true }, (res) => {
        if (res?.status) {
          setSelectors(res?.data);
        }
      })
    );
  }, [open]);

  return (
    <ModalDialog
      open={modelOpenFlag}
      handleClose={handleCloseAction}
      title={editObject?.brand_id ? 'Edit Brand' : 'Add Brand'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            brand_name: editObject?.brand_name || '',
            status: editObject?.status ?? 1,
          }}
          validationSchema={Yup.object().shape({
            brand_name: Yup.string()
              .trim()
              .min(2, 'Brand name must be at least 2 characters')
              .max(50, 'Brand name must not exceed 50 characters')
              .required('Brand name is required'),
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
                    <Grid size={{ xs: 12 }}>
                      <Alert severity="error">{errorMsg}</Alert>
                    </Grid>
                  )}

                  <Grid size={{ xs: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Brand Name"
                      field="brand_name"
                      placeholder="Enter brand name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <AutoCompleteSelectMenu
                      formik={props}
                      label="Status"
                      field="status"
                      valueKey="value"
                      labelKey="label"
                      menuList={selectors?.brands_status || []}
                      placeholder="Select status"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                      {dirty && (
                        <Button variant="outlined" onClick={resetForm}>
                          Cancel
                        </Button>
                      )}

                      {!formSubmitLoader ? (
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!dirty}
                          onClick={handleSubmit}
                        >
                          {editObject?.brand_id ? 'Save Changes' : 'Add Brand'}
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
        },
      }}
    />
  );
}
