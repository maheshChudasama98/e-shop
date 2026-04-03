import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { AutoCompleteSelectMenu, CheckboxForm, TextFieldForm } from 'src/components/inputs';

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

  const [isSubCategory, setIsSubCategory] = useState(false);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    const payLoad = {
      category_name: values.category_name,
      slug: values.slug,
      status: values.status,
      parent_id: isSubCategory ? values.parent_id : null,
    };
    if (editObject?.category_id) {
      payLoad.category_id = editObject.category_id;
    }
    setErrorMsg(null);
    dispatch(
      CategoryModifyService(payLoad, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          setModelOpenFlag(false);
          backAction();
          sweetAlertSuccess(
            editObject?.category_id
              ? 'Category updated successfully'
              : 'Category added successfully'
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
    setModelOpenFlag(open);
    setErrorMsg(null);
    setIsSubCategory(!!editObject?.parent_id);

    if (!open) return;
    dispatch(
      SelectorsService({ categories_status: true, categories: true }, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          setSelectors(res?.data);
        } else {
          setFormSubmitLoader(false);
        }
      })
    );
  }, [open, editObject]);

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
            status: editObject?.status || 1,
            parent_id: editObject?.parent_id || null,
            isSubCategory,
          }}
          validationSchema={Yup.object().shape({
            category_name: Yup.string()
              .trim()
              .min(2, 'Category name must be at least 2 characters')
              .max(255, 'Category name must not exceed 255 characters')
              .required('Category name is required'),
            slug: Yup.string().nullable(),
            status: Yup.number().typeError('Status is required').required('Status is required'),
            parent_id: Yup.string()
              .nullable()
              .when('isSubCategory', {
                is: true,
                then: (sche) => sche.required('Parent category is required'),
              }),
          })}
          onSubmit={ActionSubmit}
        >
          {(props) => {
            const { handleSubmit, dirty, resetForm, setFieldValue } = props;

            return (
              <Form>
                <Grid container spacing={2}>
                  {errorMsg && (
                    <Grid size={12}>
                      <Alert severity="error">{errorMsg}</Alert>
                    </Grid>
                  )}

                  <Grid size={12}>
                    <TextFieldForm
                      formik={props}
                      label="Category Name"
                      field="category_name"
                      placeholder="Enter category name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
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

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Slug"
                      field="slug"
                      required={false}
                      placeholder="Enter slug (optional)"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxForm
                      formik={props}
                      label="This is a Sub Category"
                      field="isSubCategory"
                      onClick={() => {
                        const newVal = !isSubCategory;
                        setIsSubCategory(newVal);
                        if (!newVal) {
                          setFieldValue('parent_id', null);
                        }
                      }}
                    />

                    {/* <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => {
                        const newVal = !isSubCategory;
                        setIsSubCategory(newVal);
                        if (!newVal) {
                          setFieldValue('parent_id', null);
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSubCategory}
                        onChange={() => {}}
                        style={{ marginRight: '8px', cursor: 'pointer' }}
                      />
                      <Typography variant="body2">This is a Sub Category</Typography>
                    </Box> */}
                  </Grid>

                  {isSubCategory && (
                    <Grid size={{ xs: 12, md: 12 }}>
                      <AutoCompleteSelectMenu
                        formik={props}
                        label="Parent Category"
                        field="parent_id"
                        valueKey="category_id"
                        labelKey="category_name"
                        menuList={
                          selectors?.categories?.filter(
                            (c) => c.category_id !== editObject?.category_id && !c.parent_id
                          ) || []
                        }
                        placeholder="Select parent category"
                      />
                    </Grid>
                  )}

                  <Grid size={{ xs: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                      {dirty && (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            resetForm();
                            setIsSubCategory(!!editObject?.parent_id);
                          }}
                        >
                          Cancel
                        </Button>
                      )}

                      {!formSubmitLoader ? (
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!dirty && isSubCategory === !!editObject?.parent_id}
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
