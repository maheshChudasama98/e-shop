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
import { CategoryModifyService, SelectorsService } from 'src/Services/master.services';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';

export default function CategoryModifyModal({ open, handleClose, backAction, editObject }) {
  const dispatch = useDispatch();

  const [selectors, setSelectors] = useState({});
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [modelOpenFlag, setModelOpenFlag] = useState(open);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    if (editObject?.category_id) {
      values.category_id = editObject.category_id;
    }
    setErrorMsg(null);
    dispatch(
      CategoryModifyService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          backAction();
          sweetAlertSuccess( editObject?.category_id ? 'Category updated successfully' : 'Category added successfully')
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
      SelectorsService({ categories_status: true }, (res) => {
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
      title={editObject?.category_id ? 'Edit Category' : 'Add Category'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            category_name: editObject?.category_name || '',
            slug: editObject?.slug || '',
            status: editObject?.status || '',
          }}
          validationSchema={Yup.object().shape({
            category_name: Yup.string()
              .trim()
              .min(2, 'Category name must be at least 2 characters')
              .max(255, 'Category name must not exceed 255 characters')
              .required('Category name is required'),
            slug: Yup.string().nullable(),
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
                      label="Category Name"
                      field="category_name"
                      placeholder="Enter category name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <AutoCompleteSelectMenu
                      formik={props}
                      label="Status"
                      field="status"
                      valueKey="value"
                      labelKey="label"
                      menuList={selectors?.categories_status || []}
                      placeholder="Status"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Slug"
                      field="slug"
                      required={false}
                      placeholder="Enter slug (optional)"
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
                          {editObject?.category_id ? 'Save Changes' : 'Add Category'}
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
