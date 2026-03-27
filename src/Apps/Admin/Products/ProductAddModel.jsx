import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { AutoCompleteSelectMenu, TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { SelectorsService } from 'src/Services/master.services';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';
import { ProductModifyService } from 'src/Services/product.services';
import { ModalDialog } from 'src/components/model';
import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

export default function ProductAddModel({ open, handleClose, editObject, backAction }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [selectors, setSelectors] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    setErrorMsg(null);

    if (editObject?.product_id) values.product_id = editObject?.product_id;

    dispatch(
      ProductModifyService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          sweetAlertSuccess(
            editObject?.product_id ? 'Product update successfully' : 'Product added successfully'
          );
          handleClose();
          if (editObject?.product_id) {
            backAction();
          } else {
            router.push(`${ADMIN_ROUTES.PRODUCT_DETAILS}?id=${res?.data.product_id}`);
          }
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      SelectorsService({ categories: true, brands: true }, (res) => {
        if (res?.status) {
          setSelectors(res?.data);
        }
      })
    );
  }, []);

  return (
    <ModalDialog
      open={open}
      handleClose={handleClose}
      title={editObject?.product_id ? 'Edit Product' : 'Add Product'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            product_name: editObject?.product_name || '',
            slug: editObject?.slug || '',
            category_id: editObject?.category_id || '',
            brand_id: editObject?.brand_id || '',
            description: editObject?.description || '',
            base_price: editObject?.base_price || '',
          }}
          validationSchema={Yup.object().shape({
            product_name: Yup.string()
              .trim()
              .min(2, 'Product name must be at least 2 characters')
              .max(255, 'Product name must not exceed 255 characters')
              .required('Product name is required'),
            slug: Yup.string()
              .trim()
              .min(2, 'Slug must be at least 2 characters')
              .max(50, 'Slug must not exceed 50 characters')
              .nullable(),
            base_price: Yup.number()
              .typeError('Base price must be a number')
              .positive('Base price must be a positive number')
              .required('Base price is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={ActionSubmit}
        >
          {(props) => {
            const { handleSubmit, dirty, resetForm, setFieldValue } = props;

            return (
              <Form>
                <Grid container spacing={2}>
                  {/* Error */}
                  {errorMsg && (
                    <Grid size={{ xs: 12 }}>
                      <Alert severity="error">{errorMsg}</Alert>
                    </Grid>
                  )}

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Product Name"
                      field="product_name"
                      placeholder="Enter product name"
                      onChange={(e) => {
                        const value = e?.target?.value;
                        setFieldValue('product_name', value);
                        setFieldValue('slug', value.toLowerCase().replace(/\s+/g, '-'));
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Slug"
                      field="slug"
                      required={false}
                      placeholder="Auto generated slug"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <AutoCompleteSelectMenu
                      formik={props}
                      required={false}
                      label="Category"
                      field="category_id"
                      valueKey="category_id"
                      labelKey="category_name"
                      menuList={selectors?.categories || []}
                      placeholder="Select category"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <AutoCompleteSelectMenu
                      formik={props}
                      required={false}
                      label="Brand"
                      field="brand_id"
                      valueKey="brand_id"
                      labelKey="brand_name"
                      menuList={selectors?.brands || []}
                      placeholder="Select brand"
                    />
                  </Grid>

                  {/* Base Price */}
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      isAmount
                      formik={props}
                      label="Base Price"
                      field="base_price"
                      type="number"
                      placeholder="Enter base price"
                    />
                  </Grid>

                  {/* Description */}
                  <Grid size={{ xs: 12 }}>
                    <TextFieldForm
                      formik={props}
                      label="Description"
                      field="description"
                      multiline
                      rows={3}
                      placeholder="Enter product description"
                    />
                  </Grid>

                  {/* Actions */}
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
                          {editObject?.product_id ? 'Save Changes' : 'Add Product'}
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
    />
  );
}
