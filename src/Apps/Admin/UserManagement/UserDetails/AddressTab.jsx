import React from 'react';
import { Box, Card, Chip, Divider, Grid, IconButton, Stack, Tooltip, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

import { fMobileNumber } from 'src/utils/format-text';
import { DataNotFound } from 'src/components/DataNotFound';

export default function AddressTab({ addresses, setAddressModal, handleSetDefaultAddress, handleDeleteAddress }) {
  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={() => setAddressModal({ open: true, data: null })}
        >
          Add 
        </Button>
      </Box>

      {addresses.length > 0 ? (
        <Grid container spacing={2}>
          {addresses.map((address) => (
            <Grid key={address.address_id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  position: 'relative',
                  height: '100%',
                  borderColor: address.is_default ? 'primary.main' : 'divider',
                }}
              >
                {address.is_default === 1 && (
                  <Chip
                    label="Default"
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  />
                )}
                <Typography variant="subtitle2" fontWeight="bold">
                  {address.full_name}
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block">
                  {fMobileNumber(address.phone)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {address.address_line1}, {address.address_line2 && `${address.address_line2}, `}
                  {address.city}, {address.state} - {address.pincode}
                </Typography>
                <Typography variant="caption" fontWeight="medium" display="block">
                  {address.country}
                </Typography>

                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                  {address.is_default === 0 && (
                    <Tooltip title="Set as Default">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleSetDefaultAddress(address.address_id)}
                      >
                        <i className="fa-solid fa-star-half-stroke" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => setAddressModal({ open: true, data: address })}
                    >
                      <i className="fa-solid fa-pen-to-square" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAddress(address.address_id)}
                    >
                      <i className="fa-solid fa-trash" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <DataNotFound />
      )}
    </>
  );
}

AddressTab.propTypes = {
  addresses: PropTypes.array,
  setAddressModal: PropTypes.func,
  handleSetDefaultAddress: PropTypes.func,
  handleDeleteAddress: PropTypes.func,
};
