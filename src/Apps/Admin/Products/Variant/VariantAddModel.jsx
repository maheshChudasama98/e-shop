import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { SelectorsService } from 'src/Services/master.services';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';
import { VariantModifyService } from 'src/Services/product.services';
import { ModalDialog } from 'src/components/model';
import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

export default function VariantAddModel({ productDetails, open, handleClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  // const [selectors, setSelectors] = useState({});

  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    setErrorMsg(null);
    values.product_id = productDetails?.product_id;
    dispatch(
      VariantModifyService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          sweetAlertSuccess('Variant added successfully');
          handleClose();
          router.push(`${ADMIN_ROUTES.PRODUCT_VARIANT_DETAILS}?id=${res?.data.variant_id}`);
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
          // setSelectors(res?.data);
        }
      })
    );
  }, []);

  return (
    <ModalDialog
      open={open}
      handleClose={handleClose}
      title="Add Variant"
      children={
        <Formik
          enableReinitialize
          initialValues={{
            variant_name: '',
            variant_value: '',
            sku: '',
            price: '',
          }}
          validationSchema={Yup.object().shape({
            variant_name: Yup.string().min(2).required('Variant name is required'),
            variant_value: Yup.string().min(2).required('Variant value is required'),
            sku: Yup.string().required('Sku is required'),
            price: Yup.number().positive().required('Price is required'),
          })}
          onSubmit={ActionSubmit}
        >
          {(props) => {
            const { handleSubmit, dirty, resetForm } = props;
            return (
              <Form>
                {errorMsg && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {errorMsg}
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm formik={props} label="Variant Name" field="variant_name" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm formik={props} label="Variant Value" field="variant_value" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm formik={props} label="Sku" field="sku" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Price"
                      field="price"
                      type="number"
                      isAmount
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
                          Add Variant
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
