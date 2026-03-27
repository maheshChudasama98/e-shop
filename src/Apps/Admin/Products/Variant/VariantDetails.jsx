import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import * as Yup from 'yup';

import { Formik, Form } from 'formik';
import { AutoCompleteSelectMenu, MultiImagePicker, TextFieldForm } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { CustomBackButton } from 'src/components/CustomComponents';
import { apiURL } from 'src/constance';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';
import { getDisplayData } from 'src/utils/utils';
import { formatToINR } from 'src/utils/format-number';

import {
  VariantSelectedService,
  VariantModifyService,
  VariantImagesPrimaryService,
  VariantImagesUploadsService,
  VariantImageDeleteService,
  VariantDiscountsService,
  VariantDeleteService,
} from 'src/Services/product.services';
import { SelectorsService } from 'src/Services/master.services';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

import Inventory from './Inventory';
import InventoryLogs from './Inventory/InventoryLogs';

export default function ProductModifyForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const variantId = searchParams.get('id') || searchParams.get('variantid');

  // Global States
  const [selectors, setSelectors] = useState({});
  const [variantDetails, setVariantDetails] = useState({});
  const [oldPrimaryImage, setOldPrimaryImage] = useState(null);
  const [oldImages, setOldImages] = useState([]);
  const [primaryImage, setPrimaryImage] = useState([]);
  const [variantImages, setVariantImages] = useState([]);

  // Form-specific loaders
  const [primaryImageLoader, setPrimaryImageLoader] = useState(false);
  const [galleryImageLoader, setGalleryImageLoader] = useState(false);
  const [variantInfoLoader, setVariantInfoLoader] = useState(false);
  const [discountLoader, setDiscountLoader] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [apiFlag, setApiFlag] = useState(false);

  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fetch Variant Details
  useEffect(() => {
    dispatch(
      VariantSelectedService({ variant_id: variantId }, (res) => {
        if (res?.status) {
          setVariantDetails(res?.data);

          const images = res?.data?.product_images || [];
          const primaryImg = images.find((item) => item?.is_primary);
          setOldPrimaryImage(primaryImg?.image_url ? `${apiURL}/${primaryImg.image_url}` : null);

          const galleryImages = images.filter((item) => !item?.is_primary);
          setOldImages(
            galleryImages.map((item) => (item?.image_url ? `${apiURL}/${item.image_url}` : null))
          );
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  }, [variantId, apiFlag]);

  // Fetch Selectors
  useEffect(() => {
    dispatch(
      SelectorsService({ products_variants_status: true, discount_type: true }, (res) => {
        if (res?.status) {
          setSelectors(res?.data);
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  }, []);

  // Status display
  const statusResult = getDisplayData({
    list: selectors?.products_variants_status || [],
    value: variantDetails?.status,
  });

  // Variant Delete action
  const VariantDeleteActions = () => {
    sweetAlertQuestion(
      'This Variant will be permanently deleted. You won’t be able to recover it.',
      'Delete Variant?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            VariantDeleteService({ variant_id: variantId }, (res) => {
              if (res?.status) {
                sweetAlertSuccess('Variant deleted successfully').then(() => {});
                router.push(`${ADMIN_ROUTES.PRODUCT_DETAILS}?id=${variantDetails.product_id}`);
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete image action
  const ImageDeleteHandleAction = (image_url) => {
    setErrorMsg(null);
    const dbPath = image_url.replace(`${apiURL}/`, '');
    dispatch(
      VariantImageDeleteService(
        {
          image_url: dbPath,
          variant_id: variantId,
          product_id: variantDetails.product_id,
        },
        (res) => {
          if (res?.status) {
            setApiFlag(!apiFlag);
            sweetAlertSuccess('Image deleted successfully');
          } else {
            setErrorMsg(res?.message);
          }
        }
      )
    );
  };

  // Upload Primary Image
  const variantHandlePrimaryAction = () => {
    if (!primaryImage[0]) return;
    setPrimaryImageLoader(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('variant_id', variantDetails.variant_id);
    formData.append('product_id', variantDetails.product_id);
    formData.append('product_primary', primaryImage[0]);

    dispatch(
      VariantImagesPrimaryService(formData, (res) => {
        setPrimaryImageLoader(false);
        if (res?.status) {
          setApiFlag(!apiFlag);
          sweetAlertSuccess('Primary image uploaded successfully');
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  // Upload Gallery Images
  const variantHandleUploadsAction = () => {
    if (!variantImages.length) return;
    setGalleryImageLoader(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('variant_id', variantDetails.variant_id);
    formData.append('product_id', variantDetails.product_id);

    variantImages.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`variant_${String(index + 1).padStart(2, '')}`, file);
      }
    });

    dispatch(
      VariantImagesUploadsService(formData, (res) => {
        setGalleryImageLoader(false);
        if (res?.status) {
          setApiFlag(!apiFlag);
          sweetAlertSuccess('Gallery images uploaded successfully');
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  // Variant info update
  const ActionSubmit = (values) => {
    setVariantInfoLoader(true);
    setErrorMsg(null);
    values.variant_id = variantId;
    values.product_id = variantDetails?.product_id;

    dispatch(
      VariantModifyService(values, (res) => {
        setVariantInfoLoader(false);
        if (res?.status) {
          setApiFlag(!apiFlag);
          sweetAlertSuccess('Variant info updated successfully');
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  // Discount update
  const DiscountActionSubmit = (values) => {
    setDiscountLoader(true);
    setErrorMsg(null);
    values.variant_id = variantId;
    values.product_id = variantDetails?.product_id;
    if (variantDetails?.product_discount?.discount_id) {
      values.discount_id = variantDetails?.product_discount?.discount_id;
    }

    dispatch(
      VariantDiscountsService(values, (res) => {
        setDiscountLoader(false);
        if (res?.status) {
          setApiFlag(!apiFlag);
          sweetAlertSuccess('Variant discount set successfully');
        } else {
          setErrorMsg(res?.message);
        }
      })
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ p: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between', m: 1, alignItems: 'center' }}
            >
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <CustomBackButton />

                <Stack spacing={0.5}>
                  <Typography variant="h6" color="text.primary">
                    {variantDetails?.variant_name}
                  </Typography>
                </Stack>

                <Chip
                  label={statusResult?.label}
                  sx={{
                    color: statusResult?.textColor,
                    backgroundColor: statusResult?.bgColor,
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="error" onClick={VariantDeleteActions}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Variant Details
            </Typography>

            <Stack spacing={1}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Variant Name
                </Typography>
                <Typography variant="body2">
                  {variantDetails ? variantDetails?.variant_name : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Variant Value
                </Typography>
                <Typography variant="body2">
                  {variantDetails ? variantDetails?.variant_value : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Sku
                </Typography>
                <Typography variant="body2">
                  {variantDetails ? variantDetails?.sku : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="body2">
                  {variantDetails ? formatToINR(variantDetails?.price) : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Quantity
                </Typography>
                <Typography variant="body2">
                  {variantDetails ? variantDetails?.inventory?.quantity : '-'}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Card sx={{ p: 2 }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              disableRipple
              value={tabValue}
              onChange={handleChange}
              sx={{ mb: 1 }}
            >
              <Tab value={1} label="Details" />
              <Tab value={2} label="Inventory" />
              <Tab value={3} label="Inventory Log" />
            </Tabs>

            {tabValue === 1 && (
              <Box>
                <Formik
                  enableReinitialize
                  initialValues={{ images: oldPrimaryImage ? [oldPrimaryImage] : [] }}
                  onSubmit={variantHandlePrimaryAction}
                >
                  {(props) => {
                    const { handleSubmit, dirty, resetForm } = props;
                    return (
                      <Form onSubmit={handleSubmit}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                        <Typography variant="h5" mb={2}>
                          Variant Thumbnail
                        </Typography>
                        <MultiImagePicker
                          formik={props}
                          field="images"
                          maxImages={1}
                          imageReturn={(items) => setPrimaryImage(items)}
                          removeAction={(url) => {
                            if (url.startsWith(apiURL)) ImageDeleteHandleAction(url);
                            else setPrimaryImage((prev) => prev.filter((i) => i !== url));
                          }}
                        />
                        <Box mt={2} display="flex" justifyContent="center" gap={1}>
                          {dirty && (
                            <Button variant="outlined" onClick={resetForm}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={!dirty || primaryImageLoader}
                          >
                            {primaryImageLoader ? <ButtonLoader /> : 'Upload'}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>

                <Box my={2} borderBottom="dashed 1px #bbb" />

                <Formik
                  enableReinitialize
                  initialValues={{
                    variant_name: variantDetails?.variant_name || '',
                    variant_value: variantDetails?.variant_value || '',
                    sku: variantDetails?.sku || '',
                    price: variantDetails?.price || '',
                  }}
                  validationSchema={Yup.object({
                    variant_name: Yup.string().required('Required'),
                    variant_value: Yup.string().required('Required'),
                    sku: Yup.string().required('Sku is required'),
                    price: Yup.number().positive().required('Required'),
                  })}
                  onSubmit={ActionSubmit}
                >
                  {(props) => {
                    const { handleSubmit, dirty, resetForm } = props;
                    return (
                      <Form onSubmit={handleSubmit}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                        <Typography variant="h5" mb={2}>
                          Variant Info
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextFieldForm
                              formik={props}
                              label="Variant Name"
                              field="variant_name"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextFieldForm
                              formik={props}
                              label="Variant Value"
                              field="variant_value"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextFieldForm formik={props} label="SKU" field="sku" />
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
                        </Grid>
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                          {dirty && (
                            <Button variant="outlined" onClick={resetForm}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={!dirty || variantInfoLoader}
                          >
                            {variantInfoLoader ? <ButtonLoader /> : 'Update Info'}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>

                <Box my={2} borderBottom="dashed 1px #bbb" />

                {/* Gallery Images Form */}
                <Formik
                  enableReinitialize
                  initialValues={{ images: oldImages }}
                  onSubmit={variantHandleUploadsAction}
                >
                  {(props) => {
                    const { handleSubmit, dirty, resetForm } = props;
                    return (
                      <Form onSubmit={handleSubmit}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                        <Typography variant="h5" mb={2}>
                          Variant Gallery
                        </Typography>
                        <MultiImagePicker
                          formik={props}
                          field="images"
                          maxImages={5}
                          imageReturn={(items) => setVariantImages(items)}
                          removeAction={(url) => {
                            if (url.startsWith(apiURL)) ImageDeleteHandleAction(url);
                            else setVariantImages((prev) => prev.filter((i) => i !== url));
                          }}
                        />
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                          {dirty && (
                            <Button variant="outlined" onClick={resetForm}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={!dirty || galleryImageLoader}
                          >
                            {galleryImageLoader ? <ButtonLoader /> : 'Upload'}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>

                <Box my={2} borderBottom="dashed 1px #bbb" />

                {/* Discount Form */}
                <Formik
                  enableReinitialize
                  initialValues={{
                    discount_type: variantDetails?.product_discount?.discount_type || '',
                    discount_value: variantDetails?.product_discount?.discount_value || '',
                  }}
                  validationSchema={Yup.object({
                    discount_type: Yup.string()
                      .oneOf(['PERCENTAGE', 'FLAT'], 'Invalid discount type')
                      .required('Discount type is required'),
                    discount_value: Yup.number()
                      .typeError('Discount value must be a number')
                      .when('discount_type', {
                        is: 'PERCENTAGE',
                        then: (schema) =>
                          schema
                            .min(0, 'Must be at least 0')
                            .max(100, 'Percentage cannot exceed 100%')
                            .required('Discount value is required'),
                        otherwise: (schema) =>
                          schema
                            .positive('Must be a positive number')
                            .required('Discount value is required'),
                      }),
                  })}
                  onSubmit={DiscountActionSubmit}
                >
                  {(props) => {
                    const { handleSubmit, dirty, resetForm } = props;
                    return (
                      <Form onSubmit={handleSubmit}>
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                        <Typography variant="h5" mb={2}>
                          Discount
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <AutoCompleteSelectMenu
                              formik={props}
                              label="Discount Type"
                              field="discount_type"
                              valueKey="value"
                              labelKey="label"
                              menuList={selectors?.discount_type || []}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextFieldForm
                              formik={props}
                              label="Discount Value"
                              field="discount_value"
                              type="number"
                              isRight
                            />
                          </Grid>
                        </Grid>
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                          {dirty && (
                            <Button variant="outlined" onClick={resetForm}>
                              Cancel
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={!dirty || discountLoader}
                          >
                            {discountLoader ? <ButtonLoader /> : 'Update Discount'}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Inventory
                  variantDetails={variantDetails}
                  ApiFlagAction={() => setApiFlag(!apiFlag)}
                />
              </Box>
            )}
            {tabValue === 3 && (
              <Box>
                <InventoryLogs variantDetails={variantDetails} />
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
