import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { sweetAlertSuccess } from 'src/utils/sweet-alerts';
import { ModifyProductVariantPurchaseService } from 'src/Services/product.services';
import { ModalDialog } from 'src/components/model';

export default function VariantPurchaseModel({ open, handleClose, editObject, backAction }) {
  const dispatch = useDispatch();

  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const ActionSubmit = (values) => {
    setFormSubmitLoader(true);
    setErrorMsg(null);

    if (editObject?.batch_id) values.batch_id = editObject?.batch_id;
    values.product_id = editObject?.product_id;
    values.variant_id = editObject?.variant_id;

    dispatch(
      ModifyProductVariantPurchaseService(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.status) {
          sweetAlertSuccess(
            editObject?.batch_id ? 'Purchase update successfully' : 'Purchase added successfully'
          );
          handleClose();
          backAction();
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  return (
    <ModalDialog
      open={open}
      handleClose={handleClose}
      title={editObject?.product_id ? 'Edit Purchase' : 'Add Purchase'}
      children={
        <Formik
          enableReinitialize
          initialValues={{
            purchase_qty: editObject?.purchase_qty || '',
            purchase_price: editObject?.purchase_price || '',
            batch_number: editObject?.batch_number || '',
            expiry_date: editObject?.expiry_date || null,
            note: editObject?.note || '',
          }}
          validationSchema={Yup.object().shape({
            purchase_qty: Yup.number()
              .typeError('Purchase quantity must be a number')
              .integer('Purchase quantity must be an integer')
              .positive('Purchase quantity must be positive')
              .required('Purchase quantity is required'),
            purchase_price: Yup.number()
              .typeError('Purchase price must be a number')
              .positive('Purchase price must be positive')
              .required('Purchase price is required'),
            batch_number: Yup.string().nullable(),
            expiry_date: Yup.date().nullable().typeError('Invalid date'),
            note: Yup.string().nullable(),
          })}
          onSubmit={ActionSubmit}
        >
          {(props) => {
            const { handleSubmit, dirty, resetForm } = props;

            return (
              <Form>
                <Grid container spacing={2}>
                  {/* Error */}
                  {errorMsg && (
                    <Grid size={12}>
                      <Alert severity="error">{errorMsg}</Alert>
                    </Grid>
                  )}

                  {/* Purchase Qty */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Purchase Quantity"
                      field="purchase_qty"
                      type="number"
                      placeholder="Enter quantity"
                      isRight
                    />
                  </Grid>

                  {/* Purchase Price */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      label="Purchase Price"
                      field="purchase_price"
                      type="number"
                      placeholder="Enter price"
                      isAmount
                    />
                  </Grid>

                  {/* Batch Number */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      required={false}
                      label="Batch Number"
                      field="batch_number"
                      placeholder="Enter batch number"
                    />
                  </Grid>

                  {/* Expiry Date */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextFieldForm
                      formik={props}
                      required={false}
                      label="Expiry Date"
                      field="expiry_date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Note */}
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextFieldForm
                      formik={props}
                      required={false}
                      label="Note"
                      field="note"
                      multiline
                      rows={3}
                      placeholder="Enter note"
                    />
                  </Grid>

                  {/* Actions */}
                  <Grid size={{ xs: 12, md: 12 }}>
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
                          {editObject?.batch_id ? 'Save Changes' : 'Add Purchase'}
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
